<template>
  <v-virtual-scroll :items="mergeItems" item-height="58" height="260">
    <template v-slot="{ item }">
      <v-list-item @click="selectItem" dense>
        <v-list-item-avatar outlined color="grey lighten-4">
          <v-img v-if="Boolean(item.logo)" :src="item.logo" />
          <span class="deep-purple--text text--accent-2" v-if="!Boolean(item.logo)">{{
            item.iconText > 2 ? item.iconText : item.tips.substr(0, 1)
          }}</span>
        </v-list-item-avatar>

        <v-list-item-content class="text-left">
          <v-list-item-title v-text="item.tips"></v-list-item-title>
          <v-list-item-subtitle v-text="item.username"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action style="flex-direction: row;">
          <v-btn @click="goEditItem(item)" x-small icon color="deep-purple accent-2 mx-1">
            <v-icon>mdi-file-document-edit-outline</v-icon>
          </v-btn>
          <v-btn @click="deletItem(item)" x-small icon color="deep-purple accent-2 mx-1">
            <v-icon>mdi-delete-forever-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-virtual-scroll>
</template>

<script>
import { mapGetters } from 'vuex';

import MessageController from '@/popup/controllers/message-controller';

export default {
  name: 'BPassword',
  computed: {
    ...mapGetters('passbook', ['mergeItems']),
  },
  data() {
    return {
      datas: [],
      processing: false,
    };
  },
  methods: {
    selectItem(it) {},
    goEditItem(item) {
      this.$router.push({ path: '/passbook/edit', query: item });
    },
    deletItem(item) {
      const controller = new MessageController();
      this.processing = true;
      controller
        .deletePassbookItem(item)
        .then(async (initState) => {
          await this.$store.dispatch('updateInitState', initState);
          this.processing = false;
        })
        .catch(async (initState) => {
          await this.$store.dispatch('updateInitState', initState);
          this.processing = false;
        });
    },
  },
  mounted() {
    //this.$store.dispatch('passbook/reloadItemsFromLocal')
  },
  async beforeMount() {
    // await this.$store.dispatch('passbook/reloadItemsFromLocal');
  },
};
</script>
<style></style>
