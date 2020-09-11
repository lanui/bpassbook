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
import QRCode from 'qrcode'
import { mapGetters, mapState } from 'vuex';

import { compressAddress } from '@/utils';

import DemoQrCode from '@/assets/icons/demo-qrcode.png';

export default {
  name: 'WalletHeadCard',
  computed: {
    ...mapGetters(['currentNickname','selectedAddress']),
    shortAddress() {
      const address = this.$store.state.selectedAddress;
      return address ? this.compressAddress(address) : '';
    },
  },
  data() {
    return {
      qrcode: '',
    };
  },
  methods: {
    compressAddress: compressAddress,
    copyWalletAddress(){

    },
    getQrcodeUrl(){
      const text = this.selectedAddress
      QRCode.toDataURL(text)
      .then(url => {
        console.log(url)
        this.qrcode = url
      })
      .catch(err => {
        console.error(err)
      })
    }
  },
  mounted() {
    this.getQrcodeUrl()
  },
};
</script>
<style>
.head-card--wrapper {
  width: 100%;
  justify-content: center;
}
</style>
