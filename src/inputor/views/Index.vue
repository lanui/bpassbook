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
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/icons/icon_128.png';
import { postMsgToPage } from '../helper';
import { sendMessage } from '../controller';

import HeadIcon from './widgets/HeadIcon.vue';

const LOG_PREFFIX = 'BP-inputor:Index-';
export default {
  name: 'InputorIndex',
  components: {
    HeadIcon,
  },
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

      this.$router.push({ path: 'addPassbook', query: { username: '', password: '', origin: '' } });
    },
  },
  beforeCreate() {
    console.log('Create App>>>>>>>>>', chrome.runtime);
  },
  mounted() {},
};
</script>
<style></style>
