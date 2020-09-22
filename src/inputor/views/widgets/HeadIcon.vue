<template>
  <v-row justify="center">
    <v-col cols="10" class="px-0 py-1">
      <div class="icon-bg"></div>
      <v-avatar size="22" @click.native="clickHandle" class="bp-img--pointer">
        <img :src="icon" alt="BPassword" />
      </v-avatar>
    </v-col>
  </v-row>
</template>

<script>
import icon from '@/icons/icon_128.png';
import { sendMessage } from '@/inputor/controller';

import { APITYPE_FILL_PBITEM } from '@/lib/cnst/api-cnst.js';
export default {
  name: 'InputorHeadIcon',
  data() {
    return {
      icon,
    };
  },
  methods: {
    clickHandle() {
      const item = { username: 'llll', password: 'xxx' };
      console.log('Ext Inputor logo>>>>', item, chrome.tabs);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;
        console.log(`Ext Inputor logo tabs:`, tabs[0].host);

        chrome.tabs.sendMessage(tabId, { apiType: APITYPE_FILL_PBITEM, item, tabId, tabUrl }, function (response) {
          console.log(response);
        });
      });
    },
  },
};
</script>
<style>
.icon-bg {
  width: 28px;
  height: 28px;
  display: block;
  float: left;
  left: 50%;
  top: 15px;
  border-radius: 50%;
  position: absolute;
  margin-top: 4px;
  transform: translate(-50%, -50%);
  border: solid 10px rgba(206, 228, 15, 0.2);
  box-shadow: 0 0 0 1px rgba(21, 131, 235, 0.6);
  box-sizing: border-box;
  animation: outerRipple 5s linear infinite;
}
</style>
