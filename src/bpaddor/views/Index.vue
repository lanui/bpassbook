<template>
  <v-card elevation="3" outlined class="text-center mx-0 my-0">
    <v-btn color="bpgray" absolute top right icon small @click.stop="sendColseBPjet" style="top: 0px; right: 0px;">
      <v-icon dense>mdi-close</v-icon>
    </v-btn>
    <v-row justify="center">
      <v-col cols="10" v-if="isUnlocked">
        <v-btn dark rounded block color="primary" @click="gotoAddItemHandle">
          添加到BPassword保存
        </v-btn>
      </v-col>
      <v-col cols="10" v-if="!isUnlocked">
        <div class="locked-tips">
          BPassword处于锁定状态，请先解锁
        </div>
      </v-col>
    </v-row>
    <v-card-actions class="v-card-top-border">
      <div class="key-commands" v-if="!isUnlocked">
        <span>快捷键</span>
        <span>control+shif+K</span>
        <span>/</span>
        <span>command+shif+K (mac) </span>
      </div>

      <bpass-icon v-if="isUnlocked" />
      <v-spacer></v-spacer>
      <v-btn v-if="isUnlocked" @click="openPopappPage" text color="bpgray" small>
        管理账号
      </v-btn>
      <!-- <div class="mx-0">
        <v-icon>
          mdi-drag-vertical
        </v-icon>
      </div> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import BpassIcon from './widgets/BpassIcon.vue';
import { APITYPE_SIGNAL_COLSE_BPJET } from '@/lib/cnst/api-cnst.js';
import { getExtensionUrl, openActivedTab } from '@/lib/util';
import { P4_PAGER } from '@/ui/comm-cnst';

export default {
  name: 'AddorIndex',
  components: {
    BpassIcon,
  },
  computed: {
    ...mapGetters(['isUnlocked']),
  },
  data() {
    return {};
  },
  methods: {
    gotoAddItemHandle() {
      this.$router.push({ name: 'addItem', params: { a: 'adsadfafsd' } });
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
    async openPopappPage() {
      const url = getExtensionUrl(P4_PAGER);
      if (url) openActivedTab(url);
    },
  },
};
</script>
<style>
.v-card-top-border {
  border-top: 1px solid rgba(140, 144, 146, 0.15);
}

.v-btn:hover {
  color: rgba(69, 138, 249, 1);
}

.v-btn.bpgray--text:hover {
  color: rgba(69, 138, 249, 1) !important;
}
.locked-tips {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(25, 25, 29, 1);
}
.key-commands {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 200;
  color: rgba(140, 144, 146, 1);
}
</style>
