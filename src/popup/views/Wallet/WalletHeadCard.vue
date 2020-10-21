<template>
  <v-container class="head-card--wrapper">
    <v-row class="text-center">
      <v-col cols="12">
        <h3 class="text-h5">{{ currentNickname }}</h3>
      </v-col>
    </v-row>
    <v-img :src="qrcode" width="100" class="mx-auto"></v-img>
    <v-row>
      <v-col cols="12">
        <v-card :elevation="0" class="d-flex justify-center">
          <v-card :elevation="0" class="pa-2">
            <p class="body-2">{{ shortAddress }}</p>
          </v-card>
          <v-card :elevation="0">
            <v-btn ref="clipboardIcon" :data-clipboard-text="selectedAddress" icon x-small>
              <v-icon color="primary">
                mdi-content-copy
              </v-icon>
            </v-btn>
          </v-card>
          <v-snackbar width="220px" :timeout="4000" v-model="showNotifier" centered :elevation="1">
            {{ 'Address copied.' }}
            <template v-slot:action="{ attrs }">
              <v-btn color="pink" text icon v-bind="attrs" @click="showNotifier = false">
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </template>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Clipboard from 'clipboard';
import QRCode from 'qrcode';
import { mapGetters, mapState } from 'vuex';

import { compressAddress } from '@/utils';

export default {
  name: 'WalletHeadCard',
  computed: {
    ...mapGetters(['currentNickname', 'selectedAddress']),
    shortAddress() {
      const address = this.$store.state.selectedAddress;
      return address ? this.compressAddress(address) : '';
    },
  },
  data() {
    return {
      qrcode: '',
      showNotifier: false,
    };
  },
  methods: {
    compressAddress: compressAddress,
    copyWalletAddress() {},
    getQrcodeUrl() {
      const text = this.selectedAddress;
      QRCode.toDataURL(text)
        .then((url) => {
          console.log(url);
          this.qrcode = url;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    initClipboard() {
      const clip = new Clipboard(this.$refs.clipboardIcon.$el);
      clip.on('success', (e) => {
        this.showNotifier = true;
      });
    },
  },
  mounted() {
    this.initClipboard();
    this.getQrcodeUrl();
  },
};
</script>
<style>
.head-card--wrapper {
  width: 100%;
  justify-content: center;
}
</style>
