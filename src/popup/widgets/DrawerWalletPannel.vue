<template>
  <v-footer absolute class="px-0 py-0">
    <div class="drawer-wallet--wrapper">
      <v-row class="flex-column fill-height text-center">
        <v-col class="px-0 pt-2">
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
    </div>
  </v-footer>
</template>

<script>
import ExtLogo from '@/icons/icon_128.png';

export default {
  name: 'DrawerWalletPannel',
  computed: {},
  data() {
    return {
      logo: ExtLogo,
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
</style>
