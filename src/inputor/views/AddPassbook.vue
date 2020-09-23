<template>
  <v-card elevation="3" outlined class="text-center mx-0 my-0">
    <!-- <v-card-subtitle class="text-center mx-0 px-0 py-0 mt-1">
      <head-icon />
    </v-card-subtitle>-->
    <v-row justify="center">
      <v-col cols="10" class="py-0 px-2">
        <v-form class="inputor-item-form">
          <div class="text-center my-1" v-if="Boolean(hostname)">{{ origin }}</div>
          <div class="bp-form-control my-1" v-if="!Boolean(hostname)">
            <div class="label">网站</div>
            <div class="input-field">
              <input
                type="text"
                placeholder="网站地址"
                @input="$emit('input', $event.target.value)"
                v-model="origin"
                name="origin"
              />
            </div>
          </div>
          <div class="bp-form-control">
            <div class="label">提示</div>
            <div class="input-field">
              <input
                type="text"
                placeholder="提示"
                @input="$emit('input', $event.target.value)"
                v-model="tips"
                name="tips"
              />
            </div>
          </div>
          <div class="bp-form-control">
            <div class="label">用户名</div>
            <div class="input-field">
              <input
                type="text"
                @input="$emit('input', $event.target.value)"
                placeholder="用户名"
                v-model="username"
                name="username"
              />
            </div>
          </div>
          <div class="bp-form-control">
            <div class="label">密码</div>
            <div class="input-field">
              <input
                type="text"
                @input="$emit('input', $event.target.value)"
                placeholder="密码"
                v-model="password"
                name="password"
              />
            </div>
          </div>
          <div class="bp-form-control">
            <div class="error text-danger" v-if="!!error">
              {{ error }}
            </div>
          </div>
        </v-form>
      </v-col>
      <v-col cols="6" class="px-2 py-2">
        <v-btn @click="saveHandle" dense block rounded outlined small style="border: solid 1px rgba(0, 0, 0, 0.06);">{{
          '保存'
        }}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { APITYPE_GET_PBITEM } from '@/lib/cnst/api-cnst.js';

import HeadIcon from './widgets/HeadIcon.vue';

import { encryptor, decryptor } from '@/lib/powershit';

import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_INPUTOR_ADDITEM } from '@/lib/cnst/api-cnst.js';
import { validItem } from '@/ui/constants/valid-rules';

const LOG_PREFFIX = 'BP-inputor:addItem';

export default {
  name: 'InputorAddPassbook',
  components: {
    HeadIcon,
  },
  data() {
    return {
      origin: '',
      hostname: '',
      tips: '',
      username: '',
      password: '',
      error: '',
      rules: {
        tips: [((v) => !!v && !!v.trim()) || '提示不能为空'],
        username: [((v) => !!v && !!v.trim()) || '用户名不能为空'],
        password: [((v) => !!v && !!v.trim()) || '密码不能为空'],
      },
    };
  },
  methods: {
    resetValid() {},
    saveHandle() {
      //this.getFormDataFromInjet();

      const item = {
        tips: this.tips,
        origin: this.origin,
        username: this.username,
        password: this.password,
        hostname: this.hostname,
      };

      try {
        validItem(item);
      } catch (e) {
        this.error = e;
        setTimeout(() => {
          this.error = '';
        }, 6000);
        return;
      }

      const whisperer = new WhispererController({ name: 'Inputor-whisperer', includeTlsChannelId: true });

      whisperer
        .sendSimpleMsg(APITYPE_INPUTOR_ADDITEM, item)
        .then(async (initstate) => {
          await this.$store.dispatch('updateInitState', initstate);
          this.$router.go(-1);
        })
        .catch((err) => {
          this.error = err;
          setTimeout(() => {
            this.error = '';
          }, 6000);
        });
    },

    getFormDataFromInjet() {
      const that = this;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;
        console.log(tabs[0].url);
        chrome.tabs.sendMessage(tabId, { apiType: APITYPE_GET_PBITEM, item: {}, tabId, tabUrl }, function (response) {
          console.log(`${LOG_PREFFIX} message back >>>>`, response);
          if (response && response.data) {
            that.fillData(response.data);
          }
        });
      });
    },
    fillData(data) {
      if (data) {
        this.origin = data.origin || '';
        this.username = data.username || '';
        this.password = data.password || '';
        this.tips = data.hostname || '';
        this.hostname = data.hostname || '';
      }
    },
  },
  watch: {},
  mounted() {
    this.getFormDataFromInjet();
  },
};
</script>
<style>
div.inputor-item-form {
  display: inline-flex;
  width: 100%;
}

div.bp-form-control {
  display: inline-flex;
  width: 100%;
  margin: 0;
  margin-bottom: 0.25rem;
  border: none;
  padding: auto 0.25rem;
}

.bp-form-control > div.label {
  text-align: right;
  margin-right: 0.75rem;
  flex: 1;
}

.bp-form-control > div.input-field {
  flex: 4;
}

.bp-form-control > div.input-field input {
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.bp-form-control > div.error {
  text-align: center;
  width: 100%;
  font-size: 0.65rem;
}
</style>
