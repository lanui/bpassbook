<template>
  <v-footer absolute class="px-0 py-0">
    <!-- <div class="drawer-wallet--wrapper">
      <v-row class="flex-column fill-height text-right">
        <v-col class="px-0 pt-2 me-6">
          <v-avatar tile size="48px">
            <img :src="logo" alt="BPassword" />
          </v-avatar>
        </v-col>
        <v-col class="px-0 py-1">
          <h2 class="white--text">BPassword <span class="body-2">测试版</span></h2>
        </v-col>
        <v-col class="px-0 py-1">
          <h5 class="white--text">
            Version: 0.1.0
          </h5>
        </v-col>
      </v-row>
    </div> -->

    <div class="drawer-footer text-right">
      <div class="drawer-footer-row">
        <v-avatar size="36">
          <img :src="logo" alt="BPassword" />
        </v-avatar>
      </div>
      <div class="drawer-footer-row">
        <span class="logo-text">BPassword</span>
      </div>
      <div class="drawer-footer-row">
        <span class="ext-version">Version:</span>
        <span class="ext-version ms-1">{{ extVersion }}</span>
      </div>
      <div class="drawer-footer-row">
        <span class="ext-test-ver">测试版</span>
      </div>
    </div>
  </v-footer>
</template>

<script>
import ExtLogo from '@/icons/icon_128.png';
import IconLogoCircle from '@/assets/icons/icon-logo-circle.png';
import { extVersion } from '@/lib/util';
export default {
  name: 'DrawerWalletPannel',
  computed: {},
  data() {
    return {
      logo: IconLogoCircle,
      extVersion: extVersion(),
    };
  },
};
</script>
<style scoped>
.drawer-wallet--wrapper {
  width: 100%;
  min-height: 150px;
  background: linear-gradient(-30deg, #4f38a4, #a244bc 45%, #4f38a4 45%) #4f38a4;
  display: inline-block;
  vertical-align: middle;
}

.drawer-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 135px;
  background: white;
  color: rgba(140, 144, 146, 1);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  text-align: right;
  padding-right: 12px;
  padding-bottom: 24px;
}

.drawer-footer > div.drawer-footer-row {
  display: flex;
  flex-direction: row;
  text-align: right;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  flex: 1 1 auto;
}

.drawer-footer-row div.v-avatar {
  justify-self: end;
}

.drawer-footer-row .logo-text {
  color: rgba(25, 25, 29, 1);
  font-size: 14px;
  font-weight: 500;
}

.drawer-footer-row .ext-version,
.drawer-footer-row .ext-test-ver {
  font-size: 12px;
  font-weight: 400;
}
</style>
