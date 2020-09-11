<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon>mdi-ethereum</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        ETH
        <span class="amber--text text--lighten-1" style="font-size:6px">
          1ETH=1000钻石
        </span>
      </v-list-item-title>
      <v-divider></v-divider>
      <v-list-item-subtitle>
        {{ethBalText}}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action class="py-1">
      <loading-button
        :clickFn="sendHandle"
        :loading="ctrl.sending"
        text="Send"
        outlined
        xsmall
        rounded
        btnClass="my-1"
      ></loading-button>
      <LoadingButton
        :clickFn="balanceHandle"
        :loading="ctrl.refreshing"
        text="refresh"
        outlined
        xsmall
        rounded
        btnClass="my-1"
      ></LoadingButton>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex';

import LoadingButton from '@/widgets/LoadingButton';

export default {
  name: 'EtherListItem',
  components: {
    LoadingButton,
  },
  computed: {
    ...mapGetters('acc', ['ethBalText']),
  },
  data() {
    return {
      ctrl: {
        refreshing: false,
        sending: false,
      },
    };
  },
  methods: {
    sendHandle() {},
    balanceHandle() {
      this.ctrl.refreshing = true;
      const that = this;
      this.$store
        .dispatch('acc/loadBalances')
        .then((ret) => {
          console.log('>>>>>>>>', ret);
          setTimeout(() => {
            that.ctrl.refreshing = false;
          }, 3000);
        })
        .catch((err) => {
          that.ctrl.refreshing = false;
        });
    },
    setRefreshing(b) {
      this.ctrl.refreshing = Boolean(b);
    },
  },
  props: {},
};
</script>
<style>
</style>
