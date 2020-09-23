<template>
  <v-card :elevation="0" class="mx-0 fill-height px-0" width="100%">
    <v-list two-list color="" class="token-list-wrapper px-0">
      <v-divider></v-divider>
      <ether-list-item />
      <token-list-item />
    </v-list>
  </v-card>
</template>

<script>
import EtherListItem from './components/EtherListItem';
import TokenListItem from './components/TokenListItem';

export default {
  name: 'TokenPannel',
  components: {
    EtherListItem,
    TokenListItem,
  },
  data() {
    return {};
  },
  methods: {
    tokenSelected(hash) {},
    getBalance(hash) {},
  },
  mounted() {
    this.$store.dispatch('acc/loadBalances');
  },
};
</script>
<style>
.list-bg {
  background: #efecff;
}

.light-rounded-border {
  border: 1px solid rgba(0, 0, 0, 0.02);
}
</style>
