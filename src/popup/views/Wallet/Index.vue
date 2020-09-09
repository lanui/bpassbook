<template>
  <v-container class="fill-height">
    <wallet-head-card />
    <token-pannel />
  </v-container>
</template>

<script>
import WalletHeadCard from './WalletHeadCard.vue'
import TokenPannel from './TokenPannel'

export default {
  name: 'PopupWalletIndex',
  components:{
    WalletHeadCard,
    TokenPannel,
  },
  computed: {

  },
  data() {
    return {
    }
  },
  methods: {

  },
};
</script>
<style>
.token-list-wrapper {
  width: 100%;
}
</style>
