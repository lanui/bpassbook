<template>
  <v-card elevation="3" outlined class="mx-0 my-0">
    <!-- <v-card-subtitle class="text-center mx-0 px-0 py-0 mt-1">
      <head-icon />
    </v-card-subtitle> -->

    <v-row justify="center">
      <v-col cols="10" v-if="!isUnlocked">
        <div>
          按下
          <span class="mx-1 xsmall">Ctrl+Shift+K</span>
          来解锁
        </div>
      </v-col>

      <v-col cols="12" v-if="isUnlocked" class="px-0 py-0 pt-3">
        <v-virtual-scroll v-if="hasItems" :items="items" :item-height="itemHeight" :height="height">
          <template v-slot="{ item }">
            <v-btn dark block text @click="sendFillMessage(item)" color="primary" v-ripple="{ class: 'primary--text' }">
              <div class="selector-item">
                <div class="item-line item-username">
                  {{ item.username }}
                </div>
                <div class="item-line item-password">
                  ....
                </div>
              </div>
            </v-btn>
          </template>
        </v-virtual-scroll>
      </v-col>
      <!-- <v-col cols="10" class="px-2" v-if="isUnlocked">
        <v-btn @click="addItemHandle" outlined rounded block small style="border: solid 1px rgba(0, 0, 0, 0.06);">
          添加到BPassword 保存? {{ filter }}
        </v-btn>
      </v-col> -->
    </v-row>
    <v-card-actions class="v-card-top-border">
      <bpass-icon />
      <v-spacer></v-spacer>
      <v-btn text color="bpgray" small v-ripple="{ class: 'primary--text' }">
        管理账号
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/icons/icon_128.png';
import { postMsgToPage } from '../helper';
import { sendMessage } from '../controller';

import HeadIcon from './widgets/HeadIcon.vue';
import BpassIcon from './widgets/BpassIcon.vue';
import { APITYPE_FILL_PBITEM } from '@/lib/cnst/api-cnst.js';

const LOG_PREFFIX = 'BP-inputor:Index-';
export default {
  name: 'InputorIndex',
  components: {
    HeadIcon,
    BpassIcon,
  },
  computed: {
    ...mapGetters(['items', 'isUnlocked']), //'isUnlocked'
    hasItems() {
      return Boolean(this.items && this.items.length > 0);
    },
    height() {
      return this.items.length > 1 ? 78 : 38;
    },
    itemHeight() {
      return this.items.length > 1 ? 38 : 48;
    },
  },
  data() {
    return {
      // isUnlocked: true,
      icon: icon,
      tItems: [],
      filter: '',
    };
  },
  methods: {
    sendFillMessage(item) {
      return;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;
        const favIconUrl = tabs[0].favIconUrl;
        const tab = {
          tabId: tabs[0].id,
          tabUrl: tabs[0].url,
          favIconUrl: tabs[0].favIconUrl,
        };
        console.log('Tabs >>>>', tab);
        chrome.tabs.sendMessage(tabId, { apiType: APITYPE_FILL_PBITEM, item, tab }, function (response) {
          console.log(response);
        });
      });
    },
    addItemHandle() {
      this.$router.push({ path: 'addPassbook', query: { username: '', password: '', origin: '' } });
    },
  },
  mounted() {},
  beforeCreate() {},
};
</script>
<style>
.v-btn-none {
  text-transform: none;
}

div.selector-item {
  text-transform: none;
  text-align: left;
  display: inline-block;
  width: 100%;
  height: 38px;
  color: rgba(25, 25, 29, 1);
  padding: 4px 6px;
}
.selector-item .item-line {
  font-size: 14px;
}

.item-password {
  line-height: 8px;
}
.select-actived {
  background-color: rgba(69, 138, 249, 1);
}

.v-btn:hover:before,
.v-btn:focus:before {
  background-color: rgba(69, 138, 249, 1);
}

.v-card-top-border {
  border-top: 1px solid rgba(140, 144, 146, 0.15);
}

.v-btn:hover,
.v-btn__content:hover {
  color: rgba(69, 138, 249, 1);
}
</style>
