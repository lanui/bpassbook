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
            <v-btn
              dark
              block
              text
              @click="sendFillItemMessage(item)"
              color="primary"
              v-ripple="{ class: 'primary--text' }"
            >
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
    </v-row>
    <v-card-actions class="v-card-top-border">
      <bpass-icon />
      <v-spacer></v-spacer>
      <v-btn text color="bpgray" @click="openPopappPage" small v-ripple="{ class: 'primary--text' }">
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
import { getExtensionUrl, openActivedTab } from '@/lib/util';
import { P4_PAGER } from '@/ui/comm-cnst';

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
    sendFillItemMessage(item) {
      const { username, password } = item;
      if (!item || !username || !password) {
        console.warn('item lost username or password.');
        return;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tabs[0].id, { apiType: APITYPE_FILL_PBITEM, item, tab }, function (response) {
          console.log('fill result>', response);
        });
      });
    },
    async openPopappPage() {
      const url = getExtensionUrl(P4_PAGER);
      if (url) openActivedTab(url);
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
