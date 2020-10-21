<template>
  <v-container class="fill-height">
    <subnav-bar :gobackCall="gobackHandle" :title="$t('p.wallet.exportTitle')" />
    <v-row justify="center" v-if="!unlocked">
      <v-col cols="10">
        <v-form ref="exportForm">
          <v-text-field
            :loading="loading"
            dense
            outlined
            rounded
            counter
            :label="$t('l.password')"
            :append-icon="pwdHide ? 'mdi-eye-off' : 'mdi-eye'"
            :type="pwdHide ? 'password' : 'text'"
            @click:append="pwdHide = !pwdHide"
            v-model="password"
            :value="password"
            :disabled="loading"
            :rules="rules.password"
            :error="Boolean(error)"
            :error-messages="error"
            name="password"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="10">
        <v-btn block larage rounded @click="unlockedHandle" color="primary" dark>
          <v-progress-circular v-if="loading" indeterminate :size="22" :width="2" color="white"></v-progress-circular>
          解锁
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10" v-if="unlocked" class="text-center">
        <v-img :src="qrcode" width="150" class="py-1 mx-auto" ref="qrcodeImg"></v-img>
        <v-btn @click="downloadQrcodeHandle" rounded dark color="primary" small class="mt-2">
          {{ $t('btn.expqrcode') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="unlocked">
      <v-col cols="10">
        <v-sheet class="keystore-title-wrap">
          <div class="bp-label">Keystore</div>
          <v-spacer></v-spacer>
          <div class="py-1 bp-tips" ref="clipJsonIcon" :data-clipboard-text="v3json">
            <span>点击此处可复制</span>
            <v-icon size="12" color="orange darken-1">
              mdi-hand-pointing-down
            </v-icon>
          </div>
        </v-sheet>
        <!-- <v-textarea
          dense outlined readonly rows="5" color="bpgray"
          :value="v3json" label="" class="keystore-textarea body-2">
        </v-textarea> -->
        <textarea name="keystore" class="keystore-textarea" readonly id="keystore-textarea" rows="5" :value="v3json">
        </textarea>
      </v-col>
      <v-snackbar width="220px" :timeout="4000" v-model="showNotifier" centered :elevation="1">
        {{ 'Keystore copied.' }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text icon v-bind="attrs" @click="showNotifier = false">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
    <v-row class="fill-height">
      <a href="#" id="downloadQrcodeLink" style="display: none;" ref="downloadQrcodeLink"></a>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import QRCode from 'qrcode';
import Clipboard from 'clipboard';
import { passwordRules } from '@/ui/constants/valid-rules';
import DemoQrCode from '@/assets/icons/demo-qrcode.png';
// import GobackBtn from '@/widgets/GobackButton.vue';
import SubnavBar from '@/popup/widgets/SubnavBar.vue';

export default {
  name: 'PopupExportWallet',
  components: {
    SubnavBar,
    // GobackBtn,
  },
  data() {
    return {
      qrcode: '',
      privKey: '',
      hideMnemonic: true,
      v3json: '',
      pwdHide: true,
      password: '',
      error: '',
      unlocked: false,
      loading: false,
      showNotifier: false,
      rules: {
        password: [...passwordRules],
      },
    };
  },
  methods: {
    unlockedHandle() {
      if (this.$refs.exportForm.validate()) {
        const pwd = this.password;
        this.loading = true;
        this.$store
          .dispatch('decryptFromEnv3', pwd)
          .then((ret) => {
            this.v3json = ret.json;
            this.unlocked = true;
            this.loading = false;
            return ret.json;
          })
          .then((jsonText) => {
            this.initClipboard();
            QRCode.toDataURL(jsonText)
              .then((url) => {
                this.qrcode = url;
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            this.loading = false;
            this.error = err.message;
          });
      }
    },
    copyJson() {},
    resetstate() {
      this.loading = false;
      this.unlocked = false;
      this.password = '';
      this.v3json = 'sfdsdfsfdsdf';
    },
    initClipboard() {
      const clip = new Clipboard(this.$refs.clipJsonIcon);
      clip.on('success', (e) => {
        this.showNotifier = true;
      });
      clip.on('error', (e) => {
        console.log('Copy fail', e);
      });
    },
    gobackHandle() {
      this.resetstate();
      this.$router.go(-1);
    },
    downloadQrcodeHandle() {
      const refImg = this.$refs.qrcodeImg;

      let srcUrl = refImg.src;
      const image = refImg.image;

      if (!srcUrl && image) {
        const width = image.width || refImg.$el.clientWidth;
        const height = image.height || refImg.$el.clientHeight;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        canvas.getContext('2d').drawImage(image, 0, 0);
        srcUrl = canvas.toDataURL('image/png');
      }

      if (!srcUrl) {
        console.warn('no image source.');
        return;
      }

      const linkEl = document.querySelector('#downloadQrcodeLink');
      linkEl.setAttribute('href', srcUrl);
      linkEl.setAttribute('download', 'bpassword-keystore.png');

      linkEl.click();
    },
  },
  mounted() {
    this.resetstate();
    this.initClipboard();
  },
  watch: {
    password: function (val, old) {
      this.error = '';
    },
  },
};
</script>
<style>
.keystore-title-wrap {
  display: flex;
  flex-direction: row;
  flex: 1 1 100%;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #19191d;
}

.keystore-title-wrap .bp-tips > span {
  font-size: 12px;
  font-weight: 400;
  color: #c8cccf;
}

.keystore-title-wrap .bp-tips > span:hover {
  cursor: pointer;
  color: rgba(69, 138, 249, 0.85);
}

.keystore-textarea {
  width: 100%;
  background-color: rgba(233, 235, 236, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #19191d;
  padding: 4px 8px;
  border-radius: 16px;
  border: 1px solid #e9ebec;
  outline: 0;
}
</style>
