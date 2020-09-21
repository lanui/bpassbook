<template>
  <v-app style="background: transparent !important;">
    <v-main>
      <v-card elevation="3" outlined class="text-center mx-0 my-0">
        <v-card-subtitle class="text-center mx-0 px-0 py-0 mt-1">
          <v-row justify="center">
            <v-col cols="10" class="px-0 py-1">
              <div class="icon-bg"></div>
              <v-avatar size="22" @click.native="clickHandle" class="bp-img--pointer">
                <img :src="icon" alt="BPassword" />
              </v-avatar>
            </v-col>
          </v-row>
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
                <v-btn block text small @click="sendFillMessage(item)">{{ item.username }}</v-btn>
              </template>
            </v-virtual-scroll>
            <div class="body-1" v-if="!hasItems">
              没有记录
            </div>
          </v-col>
          <v-col cols="10" class="px-2" v-if="isUnlocked && !hasItems">
            <v-btn @click="addItemHandle" outlined rounded block small style="border: solid 1px rgba(0, 0, 0, 0.06);">
              添加到BPassword 保存?
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/icons/icon_128.png';
import { postMsgToPage } from './helper';
import { sendMessage } from './controller';

const LOG_PREFFIX = 'BP-inputor-APP';
export default {
  name: 'Inputor',
  computed: {
    ...mapGetters(['items']), //'isUnlocked'
    hasItems() {
      return Boolean(this.items && this.items.length > 0);
    },
  },
  data() {
    return {
      isUnlocked: true,
      icon: icon,
      tItems: [],
    };
  },
  methods: {
    clickHandle() {
      const item = { username: 'llll', password: 'xxx' };
      console.log('Ext Inputor logo>>>>', item, chrome.tabs);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;
        sendMessage($remotePort, { item, tabId, tabUrl });
      });
    },
    sendFillMessage(item) {
      console.log('Send >> ', item, window.document.querySelector('#username'));
      console.log('Host>>', window.location.href);
      postMsgToPage(item);
      console.log('Host>>', window.location.host);

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;
        sendMessage($remotePort, { item, tabId, tabUrl });
      });
    },
    addItemHandle() {
      console.log(`${LOG_PREFFIX} >Document>>`, window.self);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;
        console.log(`${LOG_PREFFIX} >>> `, tabId, tabs[0]);

        chrome.tabs.sendMessage(
          tabId,
          {
            apiType: 'reqFieldData',
            tabId,
            tabUrl,
          },
          function (response) {
            console.log(`${LOG_PREFFIX} >>response> `, response);
          }
        );
      });
    },
  },
  beforeCreate() {
    console.log('Create App>>>>>>>>>', chrome.runtime);
  },
  mounted() {},
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
