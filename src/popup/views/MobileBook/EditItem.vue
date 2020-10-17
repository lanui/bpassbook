<template>
  <v-container class="px-0 py-0" v-if="renderState">
    <v-system-bar dark color="primary" :height="40" :lights-out="false" :window="true">
      <v-icon @click.stop="gobackHandle" larage>
        {{ icons.left }}
      </v-icon>
      <span>{{ $t('p.passbook.editItemTitle') }}</span>
      <v-spacer></v-spacer>

      <v-icon>{{ icons.keystone }}</v-icon>
    </v-system-bar>

    <v-row justify="center">
      <v-col cols="10" class="mt-4">
        <v-form ref="passItemForm">
          <v-text-field
            :value="passbook.tips"
            v-model="passbook.tips"
            :label="$t('l.title')"
            disabled
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />

          <v-text-field
            :value="passbook.username"
            v-model="passbook.username"
            :label="$t('l.username')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            :value="passbook.password"
            v-model="passbook.password"
            :label="$t('l.password')"
            outlined
            rounded
            :clearable="false"
            :loading="ctrl.loading"
            :rules="rules.required"
            :counter="true"
            :type="ctrl.showpwd ? 'text' : 'password'"
            :append-icon="ctrl.showpwd ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="togglePwd"
            dense
          />
          <div v-if="Boolean(error)" class="red--text text-center font-xsmall">
            {{ error }}
          </div>
        </v-form>
      </v-col>
      <v-col cols="10">
        <v-btn @click="saveHandle" block rounded :loading="ctrl.loading" color="primary" dark>
          {{ $t('btn.save') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-sheet outlined elevation="2" class="px-4 py-4 rounded-lg">
          <div class="size-xsmall">
            温馨提示:为了你的数据安全,不建议在提示信息里出现账号或密码信息.
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { ARROW_LEFT_MDI, LOCKED_LINK_MDI } from '@/ui/constants/icon-cnsts.js';
import { validMobItem, trimProps } from '@/ui/constants/valid-rules';
import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_EDIT_MOBILE_ITEM } from '@/lib/cnst/api-cnst.js';

export default {
  name: 'EditPassbookItem',
  computed: {
    ...mapGetters('p3', ['passbook']),
  },
  data() {
    return {
      renderState: true,
      icons: {
        left: ARROW_LEFT_MDI,
        keystone: LOCKED_LINK_MDI,
      },
      item: {
        tips: '',
        username: '',
        password: '',
      },
      ctrl: {
        loading: false,
        showpwd: false,
      },
      error: '',
      rules: {
        required: [(v) => !!v || 'required'],
      },
    };
  },
  methods: {
    togglePwd() {
      this.ctrl.showpwd = !this.ctrl.showpwd;
    },
    saveHandle() {
      if (!this.$refs.passItemForm.validate()) {
        return;
      }

      try {
        const item = trimProps(this.passbook);

        const whisperer = new WhispererController({ name: 'MobileItem-whisperer', includeTlsChannelId: false });
        whisperer
          .sendSimpleMsg(APITYPE_EDIT_MOBILE_ITEM, item)
          .then(async (initState) => {
            this.ctrl.loading = false;
            // console.log(`${whisperer.name}>>>>>>>>>>>>>>`,initState)
            await this.$store.dispatch('updateInitState', initState);
            this.gobackHandle();
          })
          .catch(async (error) => {
            this.error = typeof error === 'object' && error.message ? error.message : error.toString();
            this.ctrl.loading = false;
            setTimeout(() => {
              this.error = '';
            }, 6000);
          });
      } catch (error) {
        this.ctrl.loading = false;
        this.error = typeof error === 'object' && error.message ? error.message : error.toString();
        setTimeout(() => {
          this.error = '';
        }, 6000);
      }
    },
    gobackHandle() {
      this.ctrl.loading = false;
      // this.forceRerender()
      this.$router.go(-1);
    },
    forceRerender() {
      this.renderState = false;
      this.$nextTick(() => {
        this.renderState = true;
      });
    },
  },
  mounted() {
    // console.log('>>>>>>>>>>>',this.$route.params)
    // // const passbook = this.$store.getters['p3/passbook']
    // this.item = Object.assign({},this.$route.params)
  },
};
</script>
<style></style>
