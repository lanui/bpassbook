<template>
  <v-virtual-scroll :items="mobItemsState" item-height="56" height="282">
    <template v-slot="{ item }">
      <v-list-item @click="selectItem" dense>
        <v-list-item-avatar outlined color="#F3F3F3">
          <v-icon dark color="#a3c5fb">
            {{ item.isblocker ? 'mdi-cloud' : 'mdi-clipboard-text-outline' }}
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content class="text-left pb-item">
          <v-list-item-title>
            {{ item.username }}
          </v-list-item-title>
          <v-list-item-subtitle class="pb-item-hostname">
            <input :value="item.password" type="password" readonly="readonly" />
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action style="flex-direction: row;">
          <v-btn @click="goEditItem(item)" small icon color="bpgray me-2">
            <v-icon>
              {{ icons.ARROW_RIGHT_MDI }}
            </v-icon>
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
    ...mapGetters('settings', ['icons']),
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
