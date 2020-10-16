<template>
  <v-card elevation="3" outlined class="text-center mx-0 my-0">
    <v-row justify="center">
      <v-col cols="10" class="py-0 px-0">
        <v-form class="addor-item-form" ref="addorItemForm">
          <v-btn
            color="bpgray"
            absolute
            top
            right
            icon
            small
            @click.stop="sendColseBPjet"
            style="top: 0px; right: 0px;"
          >
            <v-icon dense>mdi-close</v-icon>
          </v-btn>
          <!-- <div v-if="false"
            class="text-center my-1 origin-url-wrapper"
            style="line-height: 20px; display: inline-flex;">
            <span class="ml-1 mr-1">{{ $t('l.title') }}</span>
            <span class="ml-1 mr-2">{{ tips }}</span>
            <img :src="favIconUrl" v-if="Boolean(favIconUrl)" style="width: 18px; height: 18px;" />
          </div> -->
          <div class="bp-form-control my-1">
            <div class="label">{{ $t('l.domain') }}</div>
            <div class="input-field">
              <input
                type="text"
                :placeholder="$t('l.domain')"
                @input="$emit('input', $event.target.value)"
                v-model="hostname"
                name="hostname"
              />
            </div>
          </div>
          <div class="bp-form-control">
            <div class="label">提示</div>
            <div class="input-field">
              <input
                ref="suffix"
                type="text"
                @input="$emit('input', $event.target.value)"
                placeholder="提示"
                v-model="suffix"
                name="suffix"
              />
            </div>
          </div>
          <div class="bp-form-control">
            <div class="label">用户名</div>
            <div class="input-field">
              <input type="text" placeholder="用户名" v-model="username" name="username" />
            </div>
          </div>
          <div class="bp-form-control">
            <div class="label">
              <v-icon small class="mr-1" @click="ctrl.showPass = !ctrl.showPass">
                {{ ctrl.showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
              </v-icon>
              密码
            </div>
            <div class="input-field">
              <input
                :type="ctrl.showPass ? 'text' : 'password'"
                @input="$emit('input', $event.target.value)"
                placeholder="密码"
                v-model="password"
                name="password"
              />
            </div>
          </div>

          <div class="bp-form-control" v-if="!!error">
            <div class="error text-danger">
              {{ error }}
            </div>
          </div>
        </v-form>
      </v-col>
      <v-col cols="10" class="px-0 py-1 pb-2">
        <v-btn dark rounded block color="primary" @click="saveItemHandle">
          {{ $t('btn.save') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-card-actions class="v-card-top-border">
      <bpass-icon />
      <v-spacer></v-spacer>
      <v-btn v-if="isUnlocked" text color="bpgray" small>
        管理账号
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import WhispererController from '@/lib/controllers/whisperer-controller';
import BpassIcon from './widgets/BpassIcon.vue';
import {
  APITYPE_SIGNAL_COLSE_BPJET,
  APITYPE_INPUTOR_ADDITEM,
  APITYPE_FETCH_LOGINFORM_DATA,
} from '@/lib/cnst/api-cnst.js';
import { validItem, titleSuffixRules, hostnameRules, trimProps, comboTips } from '@/ui/constants/valid-rules';

import { TITLE_DELIMITER } from '@/bglib/item-transfer';

export default {
  name: 'AddorItem',
  components: {
    BpassIcon,
  },
  computed: {
    ...mapGetters(['isUnlocked']),
  },
  data() {
    return {
      findLoginForm: false,
      tips: '',
      suffix: '',
      username: '',
      hostname: '',
      password: '',
      favIconUrl: '',
      ctrl: {
        delimiter: TITLE_DELIMITER,
        loading: false,
        showPass: false,
      },
      error: '',
      rules: {
        required: [(v) => (!!v && v.trim().length > 0) || 'required'],
        suffix: titleSuffixRules,
        hostname: hostnameRules,
      },
    };
  },
  methods: {
    setItem({ hostname, username, password, favIconUrl, hasLoginForm }) {
      this.findLoginForm = Boolean(hasLoginForm);
      this.hostname = hostname || '';
      this.username = username || '';
      this.password = password || '';
      this.favIconUrl = favIconUrl || '';
      this.tips = comboTips(hostname, '');
    },
    fetchLoginFormData() {
      const that = this;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        const { id, url, favIconUrl } = tab;
        let selfHostname = url ? new URL(url).hostname : '';

        chrome.tabs.sendMessage(
          id,
          {
            apiType: APITYPE_FETCH_LOGINFORM_DATA,
            height: '400px',
            tab, //不用
          },
          function (respnose) {
            console.log('Response Data', respnose);
            if (respnose && typeof respnose.data === 'object') {
              that.setItem(respnose.data);
            }
          }
        );
      });
    },
    saveItemHandle() {
      const item = trimProps({
        tips: this.tips,
        username: this.username,
        password: this.password,
        hostname: this.hostname,
        favIconUrl: this.favIconUrl,
      });

      try {
        const that = this;
        validItem(item);

        const whisperer = new WhispererController({ name: 'Addor-whisperer', includeTlsChannelId: true });
        whisperer
          .sendSimpleMsg(APITYPE_INPUTOR_ADDITEM, item)
          .then(async (initState) => {
            // send message colse
            that.sendColseBPjet();
          })
          .catch((err) => {
            this.error = typeof err === 'object' && err.message ? err.message : err.toString();
            setTimeout(() => {
              this.error = '';
            }, 6000);
          });
      } catch (e) {
        this.error = e;
        setTimeout(() => {
          this.error = '';
        }, 6000);
        return;
      }
    },
    sendColseBPjet() {
      const that = this;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        const { id, url, favIconUrl } = tab;
        chrome.tabs.sendMessage(id, {
          apiType: APITYPE_SIGNAL_COLSE_BPJET,
          signal: 'colse',
        });
      });
    },
  },
  mounted() {
    this.fetchLoginFormData();
    this.$refs.suffix.focus();
  },
  watch: {
    hostname: function (val) {
      this.hostname = val.trim();
      const validRule = hostnameRules[1];
      if (val.trim().length === 0) {
        this.error = '域名未填写';
      } else if (validRule(val.trim()) !== true) {
        this.error = '域名格式不正确.';
      } else {
        this.error = '';
      }
      const tips = comboTips(val, this.suffix);
      this.tips = tips;
    },
    suffix: function (val) {
      this.suffix = val.trim();
      if (val.trim().length === 0) {
        this.error = '提示未填写';
      } else if (new RegExp(TITLE_DELIMITER, 'g').test(val)) {
        this.error = `提示中不允许含有 \'${TITLE_DELIMITER}\' 字符 .`;
      } else {
        this.error = '';
      }
      const tips = comboTips(this.hostname, this.suffix);
      this.tips = tips;
    },
  },
};
</script>
<style>
div.addor-item-form {
  display: inline-flex;
  width: 100%;
  background: #f3f3f3;
}

div.bp-form-control {
  display: inline-flex;
  width: 100%;
  height: 38px;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-bottom: 0.25rem;
  border: none;
  padding: auto 0.25rem;
  border-radius: 16px;
}

div.bp-form-control:focus-within {
  border: 1px solid #458af9;
}

.bp-form-control > div.label {
  text-align: right;
  font-size: 14px;
  margin-right: 0.5rem;
  flex: 0 0 65px;
}

.bp-form-control > div.input-field {
  flex: 1 1;
}

.bp-form-control > div.input-field input {
  font-size: 14px;
  width: 100%;
  border: none !important;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
}

.bp-form-control > div.input-field input:focus {
  border: none !important;
  outline: none !important;
}

.bp-form-control > div.error {
  text-align: center;
  width: 100%;
  font-size: 0.65rem;
}

.origin-url-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
