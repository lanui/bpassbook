<template>
  <v-container class="fill-height">
    <subnav-bar :gobackCall="gobackHandle" :title="$t('p.wallet.indexTitle')" />

    <wallet-head-card />
    <token-pannel />
  </v-container>
</template>

<script>
import SubnavBar from '@/popup/widgets/SubnavBar.vue';
import WalletHeadCard from './WalletHeadCard.vue';
import TokenPannel from './TokenPannel';

export default {
  name: 'PopupWalletIndex',
  components: {
    SubnavBar,
    WalletHeadCard,
    TokenPannel,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    gobackHandle() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.token-list-wrapper {
  width: 100%;
}
</style>
