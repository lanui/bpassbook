<template>
  <v-container class="px-0 py-0">
    <subnav-bar navColor="rgba(249, 249, 249, 1)" :gobackCall="gobackHandle" :title="$t('p.wallet.indexTitle')" />
    <wallet-head-card />
    <tokens-pannel />
  </v-container>
</template>

<script>
import SubnavBar from '@/popup/widgets/SubnavBar.vue';
import WalletHeadCard from './WalletHeadCard.vue';
import TokenPannel from './TokenPannel';
import TokensPannel from './components/TokensPannel';

export default {
  name: 'PopupWalletIndex',
  components: {
    SubnavBar,
    WalletHeadCard,
    TokensPannel,
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
