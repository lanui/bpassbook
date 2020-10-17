<template>
  <v-container class="px-0 py-0">
    <v-tabs @change="changedHandle" v-model="activeTab" dense centered icons-and-text ripple fixed-tabs>
      <v-tab class="primary--text">
        {{ $t('l.website') }}
        <v-icon>
          mdi-desktop-mac
        </v-icon>
      </v-tab>
      <v-tab class="primary--text">
        {{ $t('l.mobileapp') }}
        <v-icon>
          mdi-cellphone-key
        </v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="(t, idx) in tabs" :key="idx">
        <password-list v-if="t.name == 'passbook'" />

        <mobile-list v-if="t.name == 'mobbook'" />
        <!-- <activity-list v-if="t.name == 'activity'" /> -->
        <!-- mdi-shield-sync-outline,mdi-chevron-double-down -->

        <!-- <v-speed-dial
          v-model="opened"
          v-if="!drawer"
          absolute
          bottom
          left
          fab
          direction="top"
          :open-on-hover="true"
          :transition="transition"
          style="bottom: -10px; left: 50%;"
        >
          <template v-slot:activator>
            <v-btn x-small v-model="opened" dark fab color="indigo lighten-1">
              <v-icon v-if="opened">mdi-close</v-icon>
              <v-icon v-else>mdi-chevron-double-up</v-icon>
            </v-btn>
          </template>
          <v-btn @click.stop="addItemHandle" dark color="indigo accent-1" x-small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click.stop="syncItemHandle" dark color="indigo accent-1" x-small fab>
            <v-icon>mdi-link-plus</v-icon>
          </v-btn>
        </v-speed-dial> -->
      </v-tab-item>
      <!-- <v-fab-transition>
        <v-btn
          v-if="!drawer"
          @click="addItemHandle"
          absolute
          key="mdi-plus"
          color="indigo"
          fab
          x-small
          dark
          top
          center
          class="float-btn-add"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition> -->
    </v-tabs-items>
    <v-row justify="center" class="fill-height px-0 py-1 my-auto">
      <v-col cols="5" class="px-0 py-0 mr-1">
        <v-btn @click="addItemHandle" outlined rounded small block color="primary">
          添加数据
        </v-btn>
      </v-col>
      <v-col cols="5" class="px-0 py-0 ml-1">
        <v-btn rounded small block color="primary">
          <div class="btn-title">同步数据</div>
          <v-avatar size="18" class="btn-chip" v-if="Boolean(diff)">
            {{ diff }}
          </v-avatar>
        </v-btn>
      </v-col>
      <!-- <v-col cols="5" class="px-0 py-0">
        <v-dialog persistent max-width="350px" v-model="showGasParams">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              @click="syncDataHandle"
              class="ma-2"
              color="indigo accent-1"
              pill
              text-color="white"
              v-bind="attrs"
              v-on="on"
            >
              <span class="mx-10">{{ $t('l.syncdata') }}</span>
              <v-avatar right class="indigo lighten-1" v-if="Boolean(diff)">
                {{ diff }}
              </v-avatar>
            </v-chip>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2 head-title">
              同步密码本
            </v-card-title>
            <v-card-text class="my-2 py-1">
              <div class="gas-params--wrapper">
                <div
                  v-if="Boolean(latestGasParams.safeLow)"
                  @click="clickGasParamHandle('slow')"
                  class="gas-params--item"
                  :class="selectGasParam === 'slow' ? 'item-active' : ''"
                >
                  <div class="gas-price">
                    {{ latestGasParams.safeLow }}
                  </div>
                  <div class="gas-wait">
                    {{ latestGasParams.safeLowWaitDesc }}
                  </div>
                  <div class="speed-type">
                    最慢
                  </div>
                </div>
                <div
                  v-if="Boolean(latestGasParams.fast)"
                  @click="clickGasParamHandle('fast')"
                  class="gas-params--item"
                  :class="selectGasParam === 'fast' ? 'item-active' : ''"
                >
                  <div class="gas-price">
                    {{ latestGasParams.fast }}
                  </div>
                  <div class="gas-wait">
                    {{ latestGasParams.fastWaitDesc }}
                  </div>
                  <div class="speed-type">
                    快
                  </div>
                </div>
                <div
                  v-if="Boolean(latestGasParams.fastest)"
                  @click="clickGasParamHandle('fastest')"
                  class="gas-params--item"
                  :class="selectGasParam === 'fastest' ? 'item-active' : ''"
                >
                  <div class="gas-price">
                    {{ latestGasParams.fastest }}
                  </div>
                  <div class="gas-wait">
                    {{ latestGasParams.fastestWaitDesc }}
                  </div>
                  <div class="speed-type">
                    最快
                  </div>
                </div>
              </div>
            </v-card-text>

            <div class="my-1 mx-2 body-2 text-right">
              默认: {{ latestGasParams.standard }} GWei, {{ latestGasParams.standardWaitDesc }}
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <span class="body-2 red--text">暂未实现区块链同步</span>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="showGasParams = false">
                取消
              </v-btn>
              <v-btn color="primary" text @click="showGasParams = false">
                确认
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
//mdi-form-textbox-lock
//mdi-bank-transfer

import PasswordList from '@/popup/views/Home/PasswordList.vue';
// import ActivityList from '@/popup/views/Home/ActivityList.vue';
import MobileList from '@/popup/views/Home/MobileList.vue';
export default {
  name: 'TabsContainer',
  components: {
    PasswordList,
    MobileList,
  },
  computed: {
    ...mapGetters('p3', ['drawer']),
    ...mapGetters('passbook', ['webdiff', 'mobdiff']),
    ...mapGetters(['latestGasParams']),
    diff() {
      const activeTab = this.activeTab;
      return Boolean(this.activeTab) ? this.mobdiff : this.webdiff;
    },
  },
  data() {
    return {
      activeTab: 0,
      opened: false,
      transition: 'bottom',
      tabs: [
        { name: 'passbook', text: 'PassBook', icon: 'mdi-shield-key-outline', path: '' },
        { name: 'mobbook', text: 'MobileBook', icon: 'mdi-bank-transfer', path: '' },
        // { name: 'activity', text: 'Activity', icon: 'mdi-bank-transfer', path: '' },
      ],
      showGasParams: false,
      selectGasParam: '',
    };
  },
  methods: {
    addItemHandle() {
      const tabIdx = this.activeTab || 0;
      if (tabIdx == 1) {
        this.$router.push({ name: 'addMobItem' });
      } else {
        this.$router.push({ path: '/passbook/add' });
      }
    },
    async syncItemHandle() {},
    clickGasParamHandle(speedTag) {
      this.selectGasParam = speedTag;
    },
    async syncDataHandle() {
      await this.$store.dispatch('fetchGasParams', { gasLimit: 66126 });
      this.showGasParams = true;

      // setTimeout(() => {
      //   this.showGasParams = false
      // }, 10000);
    },
    changedHandle(val) {
      // console.log('>>>>>>>>>>>>>>>>>', val, this.activeTab);
    },
  },
};
</script>
<style>
#operators .v-speed-dial {
  position: absolute;
}

#operators .v-btn--floating {
  position: relative;
}

.float-btn-add {
  transform: translateX(-48%);
}
.sync-btn--wrapper {
  display: flex;
  flex: 1 2 auto;
}
.tips-circle--wrapper {
  position: relative !important;
  float: right;
  right: 0.25rem;
}
.tips-number {
  font-size: 0.75rem;
}

.head-title {
  padding: 8px 24px 6px;
}

.gas-params--wrapper {
  display: flex;
  flex-direction: row;
  min-height: 80px;
  border: 0 solid transparent;
  padding: 16px 0 0 4px;
  background: transparent;
}

.gas-params--item {
  cursor: pointer;
  flex: 1 1 33.3333333%;
  display: flex;
  flex-direction: column;
  margin: -8px 0 0 -8px;
  border-radius: 3px;
  background: rgba(224, 224, 224, 0.15);
}

.gas-params--item:hover {
  background: rgba(224, 224, 224, 0.35);
}

.gas-params--item.item-active {
  background: rgba(224, 224, 224, 0.45);
  color: #1976d2;
}

.item-active > div.gas-price,
.item-active > div.gas-wait,
.item-active > div.speed-type {
  color: #1976d2;
}

.gas-params--item > div {
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.gas-params--item .gas-price {
  font-size: 0.85rem;
}

.gas-params--item .gas-price::after {
  font-size: 0.15rem;
  content: '';
  margin-left: 2px;
}

.gas-params--item .gas-wait {
  font-size: 0.45rem;
  word-break: break-all;
}

.gas-params--item .speed-type {
  color: rgba(12, 11, 11, 0.5);
}

.v-btn__content div.btn-title {
  display: flex;
  justify-self: center;
  justify-content: center;
  flex: 1 1 auto;
}
.v-btn__content div.btn-chip {
  display: flex;
  background-color: rgba(58, 123, 248, 1);
  justify-self: center;
  flex: 1 1 26px;
  border-radius: 11px;
}
</style>
