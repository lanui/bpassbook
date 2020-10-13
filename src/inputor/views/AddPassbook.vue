<template>
  <v-card elevation="3" outlined class="text-center mx-0 my-0">
    <!-- <v-card-subtitle class="text-center mx-0 px-0 py-0 mt-1">
      <head-icon />
    </v-card-subtitle>-->
    <v-row justify="center">
      <v-col cols="10" class="py-0 px-0">
        <v-form class="inputor-item-form">
          <div class="text-center my-1 origin-url-wrapper" style="line-height: 20px; display: inline-flex;">
            <span class="ml-1 mr-1">{{ $t('l.title') }}</span>
            <span class="ml-1 mr-2">{{ tips }}</span>
            <img :src="favicon" v-if="Boolean(favicon)" style="width: 18px; height: 18px;" />
          </div>
          <div class="bp-form-control my-1" v-if="!Boolean(hostname)">
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
        <v-btn @click="saveHandle" dense block rounded outlined small style="border: solid 1px rgba(0, 0, 0, 0.06);">
          {{ $t('btn.add') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import HeadIcon from './widgets/HeadIcon.vue';

import { encryptor, decryptor } from '@/lib/powershit';

import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_INPUTOR_ADDITEM, APITYPE_GET_PBITEM } from '@/lib/cnst/api-cnst.js';
import { validItem, trimProps } from '@/ui/constants/valid-rules';
import { TITLE_DELIMITER } from '@/bglib/item-transfer';

const LOG_PREFFIX = 'BP-inputor:addItem';

export default {
  name: 'InputorAddPassbook',
  components: {
    HeadIcon,
  },
  computed: {
    ...mapGetters(['delimiter', 'favicon']),
  },
  data() {
    return {
      favIconUrl: '',
      origin: '',
      hostname: '',
      tips: '',
      suffix: '',
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

      const item = trimProps({
        tips: this.tips,
        origin: this.origin,
        username: this.username,
        password: this.password,
        hostname: this.hostname,
        favIconUrl: this.favIconUrl,
      });

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
        .then(async (initState) => {
          await this.$store.dispatch('updateInitState', initState);
          this.$router.go(-1);
        })
        .catch((err) => {
          this.error = typeof err === 'object' && err.message ? err.message : err.toString();
          setTimeout(() => {
            this.error = '';
          }, 6000);
        });
    },

    getFormDataFromInjet() {
      const that = this;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const url = new URL(tabs[0].url);
        const tabHostname = url.hostname;
        const tab = {
          tabId: tabs[0].id,
          tabUrl: tabs[0].url,
          favIconUrl: tabs[0].favIconUrl,
          tabHostname,
        };

        console.log('>>>>getFormDataFromInjet>>>>>>>>>>>', tabs, tabHostname, tabs[0].favIconUrl);
        chrome.tabs.sendMessage(tabId, { apiType: APITYPE_GET_PBITEM, item: {}, tab }, function (response) {
          console.log(`${LOG_PREFFIX} message back >>>>`, response);
          if (chrome.runtime.lastError) {
            const fillItemData = {
              origin: tab.tabUrl,
              favIconUrl: tab.favIconUrl,
              hostname: tabHostname,
            };
            console.log('>>>>>>>chrome.runtime.lastError>>>>', chrome.runtime.lastError, fillItemData);
            that.fillData(fillItemData);
          } else {
            if (response && response.data) {
              console.log('>>>>>>>>>>>', response);
              that.fillData(response.data);
            }
          }
        });

        // window.postMessage({

        // })
      });
    },
    fillData(data) {
      if (data) {
        this.origin = data.origin || '';
        this.username = data.username || '';
        this.password = data.password || '';
        this.tips = data.hostname || '';
        this.hostname = data.hostname || '';
        this.favIconUrl = data.favIconUrl || '';
      }
    },
  },
  watch: {
    hostname: function (val) {
      const parts = [];
      if (val !== undefined && val !== null && val.trim().length > 0) {
        parts.push((val + '').trim());
      }

      const suffix = this.suffix;
      if (suffix !== undefined && suffix !== null && suffix.trim().length > 0) {
        parts.push(suffix.trim());
      }

      if (parts.length) {
        this.tips = parts.join(TITLE_DELIMITER);
      }
    },
    suffix: function (val) {
      const parts = [];
      const hostname = this.hostname;
      if (hostname !== undefined && hostname !== null && hostname.trim().length > 0) {
        parts.push(hostname.trim().toLowerCase());
      }
      if (val !== undefined && val !== null && val.trim().length > 0) {
        parts.push(val.trim());
      }

      if (parts.length) {
        this.tips = parts.join(TITLE_DELIMITER);
      }
    },
  },
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
  margin-right: 0.5rem;
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

.origin-url-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
