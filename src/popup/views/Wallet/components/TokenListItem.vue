<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon>{{ icons.BTS_MDI }}</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        BTs
        <span class="amber--text text--lighten-1" style="font-size: 6px;">
          年费200元
        </span>
      </v-list-item-title>
      <v-divider></v-divider>
      <v-list-item-subtitle>
        {{ btsBalText }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="py-1">
      <v-btn @click="balanceHandle" icon :loading="ctrl.refreshing">
        <v-icon>
          mdi-refresh
        </v-icon>
      </v-btn>
      <!-- <loading-button :clickFn="buyHandle" text="Buy" outlined xsmall rounded btnClass="my-1"></loading-button>

      <loading-button
        :clickFn="balanceHandle"
        :loading="ctrl.refreshing"
        text="Refresh"
        outlined
        xsmall
        rounded
        btnClass="my-1"
      ></loading-button> -->
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex';

import LoadingButton from '@/widgets/LoadingButton';
export default {
  name: 'TokenListItem',
  components: {
    LoadingButton,
  },
  computed: {
    ...mapGetters('settings', ['icons']),
    ...mapGetters('acc', ['btsBalText']),
  },
  data() {
    return {
      ctrl: {
        refreshing: false,
      },
    };
  },
  methods: {
    buyHandle() {},
    balanceHandle() {},
  },
  props: {
    item: {
      type: Object,
      required: false,
    },
  },
};
</script>
<style></style>
