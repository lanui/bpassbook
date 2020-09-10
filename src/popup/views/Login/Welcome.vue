<template>
<v-container class="fill-height">
  <v-row class="text-center">
    <v-col cols="12">
      <logo size="100" />
    </v-col>
    <v-col cols="12">
      <h1 class="text-h5">
        Welcome to BPassword
      </h1>
    </v-col>
  </v-row>
  <v-row justify="center" class="text-center">
    <v-col cols="8">
      <v-btn block outlined
        @click="getStarted"
        color="indigo" class="mx-4 ma-6">
        Create Account
      </v-btn>
      <v-btn block outlined
        @click="importWallet"
        color="indigo" class="mx-4 ma-6">
        Import Wallet
      </v-btn>
    </v-col>
  </v-row>
  <v-row class="fill-height">
    <v-col></v-col>
  </v-row>
</v-container>
</template>

<script>
import Logo from '@/widgets/ExtLogo.vue'
export default {
  name: 'PopupWelcome',
  components:{
    Logo,
  },
  methods: {
    getStarted(){
      const subpath = 'app/app.html'
      const url = this.$browser.extension.getURL(subpath)
      chrome.tabs.create({active:true,url:url},function(tab) {
        console.log(tab)
        //todo notify backend
      })
    },
    importWallet(){

    }
  },
};
</script>
<style>
</style>
