<template>
  <v-container class="head-card--wrapper">
    <v-row class="text-center">
      <v-col cols="12">
        <h3 class="text-h4">{{currentNickname}}</h3>
      </v-col>
    </v-row>
    <v-img :src="qrcode" width="100" class="mx-auto"></v-img>
    <v-row>
      <v-col cols="12">
        <v-card :elevation="0"
          class="d-flex justify-center">
          <v-card :elevation="0" class="pa-2">
            <p class="body-2">{{shortAddress}}</p>
          </v-card>
          <v-card :elevation="0">
            <v-icon @click="copyWalletAddress"
              small color="primary">
              mdi-content-copy
            </v-icon>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import { compressAddress } from '@/utils';

import DemoQrCode from '@/assets/icons/demo-qrcode.png';

export default {
  name: 'WalletHeadCard',
  computed: {
    ...mapGetters(['currentNickname']),
    shortAddress() {
      const address = this.$store.selectAddress;
      return address ? this.compressAddress(address) : '0xA8...e4B8';
    },
  },
  data() {
    return {
      qrcode: DemoQrCode,
    };
  },
  methods: {
    compressAddress: compressAddress,
    copyWalletAddress(){

    }
  },
  mounted() {},
};
</script>
<style>
.head-card--wrapper {
  width: 100%;
  justify-content: center;
}
</style>
