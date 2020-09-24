<template>
  <v-card elevation="3" outlined class="text-center mx-0 my-0">
    <v-card-subtitle class="text-center mx-0 px-0 py-0 mt-1">
      <head-icon />
    </v-card-subtitle>

    <v-row justify="center">
      <v-col cols="10" v-if="!isUnlocked">
        <div>
          按下
          <span class="mx-1 xsmall">Ctrl+Shift+K</span>
          来解锁
        </div>
      </v-col>

      <v-col cols="10" v-if="isUnlocked" class="px-0 py-0 pt-1">
        <v-virtual-scroll v-if="hasItems" :items="items" :item-height="28" height="56">
          <template v-slot="{ item }">
            <v-btn block text small @click="sendFillMessage(item)">
              <span style="text-transform: none;">
                {{ item.username }}
              </span>
              <span style="font-size: 0.75rem; text-transform: uppercase;">
                {{
                  item.hostname && item.hostname.split('.').length > 2
                    ? '-' + item.hostname.split('.')[1]
                    : item.hostname && item.hostname.split('.').length == 2
                    ? '-' + item.hostname.split('.')[0]
                    : ''
                }}
              </span>
            </v-btn>
          </template>
        </v-virtual-scroll>
        <div class="body-1" v-if="!hasItems">
          没有记录
        </div>
      </v-col>
      <v-col cols="10" class="px-2" v-if="isUnlocked">
        <v-btn @click="addItemHandle" outlined rounded block small style="border: solid 1px rgba(0, 0, 0, 0.06);">
          添加到BPassword 保存?
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/icons/icon_128.png';
import { postMsgToPage } from '../helper';
import { sendMessage } from '../controller';

import HeadIcon from './widgets/HeadIcon.vue';
import { APITYPE_FILL_PBITEM } from '@/lib/cnst/api-cnst.js';

const LOG_PREFFIX = 'BP-inputor:Index-';
export default {
  name: 'InputorIndex',
  components: {
    HeadIcon,
  },
  computed: {
    ...mapGetters(['items', 'isUnlocked']), //'isUnlocked'
    hasItems() {
      return Boolean(this.items && this.items.length > 0);
    },
  },
  data() {
    return {
      // isUnlocked: true,
      icon: icon,
      tItems: [],
    };
  },
  methods: {
    sendFillMessage(item) {
      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   const tabId = tabs[0].id;
      //   const tabUrl = tabs[0].url;
      //   sendMessage($remotePort, { item, tabId, tabUrl });
      // });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;
        console.log(`Ext Inputor logo tabs:`, tabs[0].host);

        chrome.tabs.sendMessage(tabId, { apiType: APITYPE_FILL_PBITEM, item, tabId, tabUrl }, function (response) {
          console.log(response);
        });
      });
    },
    addItemHandle() {
      console.log(`${LOG_PREFFIX} >Document>>`, window.self);
      this.$router.push({ path: 'addPassbook', query: { username: '', password: '', origin: '' } });
    },
  },
  beforeCreate() {},
  mounted() {},
};
</script>
<style>
.v-btn-none {
  text-transform: none;
}
</style>
