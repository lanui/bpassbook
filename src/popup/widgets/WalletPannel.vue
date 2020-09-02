<template>
  <div class="white--text wallet--wrapper">
    <v-row class="flex-column fill-height">
      <v-col class="px-0 py-1">
        <div class="inner inner-nickname">
          {{nickname}}
        </div>
      </v-col>
      <v-col class="px-0 py-0">
        <div class="inner inner-wallet">
          {{shortAddress}}
        </div>
      </v-col>
      <v-col class="px-0 py-2">
        <v-btn @click.stop="openLock"
          icon color="grey lighten-5" outlined rounded ripple x-large>
          <v-icon>
            {{locked ? lockIcon : ethIcon }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col class="px-0 py-1">
        <div class="balance">
          <h2 >{{ethBalance}}</h2>
        </div>
      </v-col>
    </v-row>
    <div class="float-right mb-2 mr-2">
      <!-- <v-btn icon ripple color="white">
        <v-icon>mdi-qrcode-edit</v-icon>
      </v-btn> -->
      <v-btn icon ripple
        @click.stop="openExtURL"
        color="white">
        <v-icon>
          mdi-shield-key-outline
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import {ETH_MDI,LOCKED_MDI} from '@/ui/constants/icon-cnsts'

export default {
  name: 'WGWalletPannel',
  computed: {
    ...mapState(['dense', 'wallet', 'nickname']),
    ...mapGetters(['shortAddress', 'networkColor']),
    ...mapGetters('p3',['locked']),
    ethBalance: (state) => {
      const bal = '71.2567';
      return parseFloat(bal || '0').toFixed(4);
    },
  },
  data() {
    return {
      ethIcon:ETH_MDI,
      lockIcon:LOCKED_MDI,
    };
  },
  methods: {
    openExtURL(){
      const subpath = 'app/app.html'
      const url = this.$browser.extension.getURL(subpath)
      console.log(subpath)
      console.log(this.$browser.tabs)

      chrome.tabs.create({active:true,url:url},function(tab) {
        console.log(tab)
      })
    },
    openLock(){
      const locked = this.$store.getters['p3/locked']
      console.log(">>>>",locked)
      if(locked){
        this.$store.dispatch('p3/unlockedAccount')
      }
    }
  },
};
</script>
<style lang="css" scoped>
.wallet--wrapper {
  width: 100%;
  min-height: 180px;
  background: linear-gradient(-30deg, #4f38a4, #a244bc 45%, #4f38a4 45%) #4f38a4;
  display: inline-block;
  vertical-align: middle;
}

.wallet--wrapper .inner-nickname {
  font-size: 1.75rem;
  padding: 1rem auto;
}
.wallet--wrapper .inner-wallet {
  font-size: 0.75rem;
  margin: 0.5rem auto;
}
</style>
