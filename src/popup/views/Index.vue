<template>
  <v-container fluid class="px-0 py-0 text-center">
    <wallet-pannel />
    <tabs-container />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import WalletPannel from '@/popup/widgets/WalletPannel';
import TabsContainer from '@/popup/widgets/TabsContainer';
export default {
  name: 'PopupIndex',
  components: {
    WalletPannel,
    TabsContainer,
  },
  computed: {
    ...mapState([
      'dense',
      'chainId'
    ])
  },
};
</script>
<style lang="css" scoped>
</style>


