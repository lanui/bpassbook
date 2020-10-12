<template>
  <v-virtual-scroll :items="mobItemsState" item-height="58" height="276">
    <template v-slot="{ item }">
      <v-list-item @click="selectItem" dense>
        <v-list-item-avatar outlined color="grey lighten-4 text-center">
          <v-img v-if="Boolean(item.favIconUrl)" :src="item.favIconUrl" />
          <div class="deep-purple--text text--accent-2 mx-auto" style="width: 100%;" v-if="!Boolean(item.favIconUrl)">
            {{ item.iconText > 2 ? item.iconText : item.username.substr(0, 1) }}
          </div>
        </v-list-item-avatar>

        <v-list-item-content class="text-left">
          <v-list-item-title v-text="item.tips"></v-list-item-title>
          <v-list-item-subtitle v-text="item.username"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action style="flex-direction: row;">
          <v-btn @click="goEditItem(item)" small icon color="deep-purple accent-2 mr-2">
            <v-icon>mdi-file-document-edit-outline</v-icon>
          </v-btn>
          <v-btn @click="deletItem(item)" small icon color="deep-purple accent-2">
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
import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_DELETE_MOBILE_ITEM } from '@/lib/cnst/api-cnst';

export default {
  name: 'BPassword',
  computed: {
    ...mapGetters('passbook', ['mobItemsState']),
  },
  data() {
    return {
      datas: [],
      processing: false,
    };
  },
  methods: {
    selectItem(it) {},
    async goEditItem(item) {
      await this.$store.dispatch('p3/updateTransferPassbook', item);
      await this.$router.push({ name: 'editMobItem', params: item });
    },
    deletItem(item) {
      try {
        if (!item || !item.tips) return;
        this.processing = true;
        const whisperer = new WhispererController({ name: 'MobileItem-whisperer', includeTlsChannelId: false });
        whisperer
          .sendSimpleMsg(APITYPE_DELETE_MOBILE_ITEM, item)
          .then(async (initState) => {
            await this.$store.dispatch('updateInitState', initState);
          })
          .catch(async (error) => {
            this.error = typeof error === 'object' && error.message ? error.message : error.toString();
          });
      } catch (error) {
        this.processing = false;
      }
    },
  },
};
</script>
<style></style>
