<template>
  <v-virtual-scroll :items="webItems" item-height="58" height="286">
    <template v-slot="{ item }">
      <v-list-item @click="selectItem" dense>
        <!-- <v-list-item-avatar color="#F3F3F3"> -->
        <!-- <v-img v-if="Boolean(item.favIconUrl)" :src="item.favIconUrl" />
          <div class="deep-purple--text text--accent-2 mx-auto" style="width: 100%;" v-if="!Boolean(item.favIconUrl)">
            {{ item.iconText > 2 ? item.iconText : item.username.substr(0, 1) }}
          </div> -->

        <!-- <v-icon dark color="#a3c5fb">mdi-clipboard-text-outline</v-icon> -->
        <!-- </v-list-item-avatar> -->

        <v-list-item-avatar color="#F3F3F3">
          <v-icon dark color="#a3c5fb">
            {{ item.isblocker ? 'mdi-clipboard-text-outline' : 'mdi-cloud' }}
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content class="text-left">
          <v-list-item-title v-text="item.tips"></v-list-item-title>
          <v-list-item-subtitle v-text="item.username"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action style="flex-direction: row;">
          <v-btn @click="goEditItem(item)" small icon color="primary mr-2">
            <v-icon>mdi-file-document-edit-outline</v-icon>
          </v-btn>
          <v-btn @click="deletItem(item)" small icon color="primary ">
            <v-icon>mdi-delete-forever-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-virtual-scroll>
</template>

<script>
import { mapGetters } from 'vuex';

import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_DELETE_WEBSITE_ITEM } from '@/lib/cnst/api-cnst';
import IconLocale from '@/assets/icons/icon-locale.png';

export default {
  name: 'BPassword',
  computed: {
    ...mapGetters('passbook', ['webItems']),
  },
  data() {
    return {
      IconLocale,
      datas: [],
      processing: false,
    };
  },
  methods: {
    selectItem(it) {},
    async goEditItem(item) {
      await this.$store.dispatch('p3/updateTransferPassbook', item);
      await this.$router.push({ name: 'editPassbook', params: item });
    },
    deletItem(item) {
      try {
        if (!item || !item.tips) return;
        this.processing = true;
        const whisperer = new WhispererController({ name: 'Website-whisperer', includeTlsChannelId: false });
        whisperer
          .sendSimpleMsg(APITYPE_DELETE_WEBSITE_ITEM, item)
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
  mounted() {
    //this.$store.dispatch('passbook/reloadItemsFromLocal')
  },
  async beforeMount() {
    // await this.$store.dispatch('passbook/reloadItemsFromLocal');
  },
};
</script>
<style>
.local-icon {
  height: 18px;
  width: 14px;
}
.item-icon-wrap {
  display: flex;
  width: 36px;
  flex: 0 0 40px;
  justify-content: center;
}
</style>
