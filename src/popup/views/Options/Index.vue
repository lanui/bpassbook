<template>
  <v-container class="px-0 py-0">
    <subnav-bar :gobackCall="gobackHandle" :title="$t('l.options')" />

    <v-list dense class="py-0">
      <v-list-item class="options-list-item">
        <v-list-item-title>
          <div class="options-list-title">
            自动锁定
          </div>
          <v-spacer></v-spacer>
          <div class="options-list-tail">
            {{ lockedTimeSelected }}
          </div>
        </v-list-item-title>
        <v-list-item-icon>
          <v-btn icon small @click="goPageHandle">
            <v-icon>
              {{ icons.ARROW_RIGHT_MDI }}
            </v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item class="options-list-item">
        <v-list-item-title>
          <div class="options-list-title">帮助</div>
          <v-spacer></v-spacer>
        </v-list-item-title>
        <v-list-item-icon>
          <v-btn icon small @click="goPageHandle">
            <v-icon>
              {{ icons.ARROW_RIGHT_MDI }}
            </v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-sheet color="#F3F4F7" elevation="0" height="12" width="100%"></v-sheet>

    <v-list>
      <v-list-item>
        <v-list-item-title>
          版本
        </v-list-item-title>
        <v-spacer></v-spacer>
        <v-list-item-action class="pe-4">
          <v-btn rounded color="#F3F3F3" small>
            {{ extVersion }}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>

    <v-row class="fill-height px-3 py-3">
      <div class="option-down-wrap">
        <div class="bottom-rect-title">
          实时财报
        </div>
        <div class="bottom-rect-address">
          {{ finnacialHash }}
        </div>
        <div class="bottom-rect--chip">
          <v-chip
            @click="openBlockexplorerTab"
            color="rgba(69, 138, 249, .1)"
            text-color="#458AF9"
            filter
            class="chip-btn"
          >
            在区块链上显示
          </v-chip>
        </div>
      </div>
    </v-row>
    <!-- <goback-btn /> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import SubnavBar from '@/popup/widgets/SubnavBar.vue';
import GobackBtn from '@/widgets/GobackButton.vue';
import { FinnacialHash, blockexplorerUrl } from '@/ui/comm-cnst';
import { extVersion } from '@/lib/util';

export default {
  name: 'PopupConfigIndex',
  components: {
    SubnavBar,
    GobackBtn,
  },
  computed: {
    ...mapGetters('settings', ['lockedTimeSelected']),
    ...mapGetters('settings', ['icons']),
  },
  data() {
    return {
      extVersion: extVersion(),
      items: [
        {
          name: 'timeout',
          text: 'Auto locked minutes',
          path: '',
        },
        {
          name: 'help',
          text: 'Help',
          path: '',
        },
      ],
      finnacialHash: FinnacialHash,
    };
  },
  methods: {
    openBlockexplorerTab() {
      const hash = this.finnacialHash;
      chrome.tabs.create({
        url: blockexplorerUrl(hash),
        active: true,
      });
    },
    gobackHandle() {
      this.$router.go(-1);
    },
    goPageHandle(path) {
      if (typeof path === 'string') {
        this.$router.push({ path });
      } else if (typeof path === 'object') {
        this.$router.push(path);
      }
    },
  },
};
</script>
<style>
.options-list-item > div.v-list-item__title {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
}

div.options-list-title {
  justify-self: start;
  text-align: left;
  flex: 1 1 auto;
}

div.options-list-tail {
  justify-self: end;
  text-align: right;
  flex: 0 1 auto;
}

.option-down-wrap {
  font-family: SFProText-Medium, SFProText;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  flex-wrap: nowrap;
  justify-content: start;
  padding: 12px;
}

.option-down-wrap > div {
  flex: 1 1 auto;
  margin: 0px auto 8px 0px;
}

.bottom-rect-title {
  font-weight: 500;
  color: #000000;
  line-height: 16px;
}

.bottom-rect-address {
  font-size: 12px;
  font-weight: 400;
  color: #19191d;
  line-height: 14px;
  word-break: break-all;
}

.chip-btn.v-size--default {
  border-radius: 12px;
  background: rgba(69, 138, 249, 0.1);
  color: rgba(69, 138, 249, 1);
}
</style>
