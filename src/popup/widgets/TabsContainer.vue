<template>
  <v-container class="px-0 py-0">
    <v-tabs v-model="activeTab" dense centered icons-and-text ripple fixed-tabs>
      <v-tab class="primary--text">
        {{ $t('l.website') }}
        <v-icon>
          mdi-desktop-mac
        </v-icon>
      </v-tab>
      <v-tab class="primary--text">
        {{ $t('l.mobileapp') }}
        <v-icon>
          mdi-cellphone-key
        </v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <!-- <v-tab-item value="passbook" key="1">
        <password-list />
      </v-tab-item>
      <v-tab-item value="activity" key="2">
        <activity-list />
      </v-tab-item> -->
      <v-tab-item v-for="(t, idx) in tabs" :key="idx">
        <password-list v-if="t.name == 'passbook'" />

        <activity-list v-if="t.name == 'activity'" />
        <!-- mdi-shield-sync-outline,mdi-chevron-double-down -->

        <v-speed-dial
          v-model="opened"
          v-if="!drawer"
          absolute
          bottom
          left
          fab
          direction="top"
          :open-on-hover="true"
          :transition="transition"
          style="bottom: -10px; left: 50%;"
        >
          <template v-slot:activator>
            <v-btn x-small v-model="opened" dark fab color="indigo lighten-1">
              <v-icon v-if="opened">mdi-close</v-icon>
              <v-icon v-else>mdi-chevron-double-up</v-icon>
            </v-btn>
          </template>
          <v-btn @click.stop="addItemHandle" dark color="indigo accent-1" x-small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click.stop="syncItemHandle" dark color="indigo accent-1" x-small fab>
            <v-icon>mdi-link-plus</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
//mdi-form-textbox-lock
//mdi-bank-transfer

import PasswordList from '@/popup/views/Home/PasswordList.vue';
import ActivityList from '@/popup/views/Home/ActivityList.vue';
export default {
  name: 'TabsContainer',
  components: {
    PasswordList,
    ActivityList,
  },
  computed: {
    ...mapGetters('p3', ['drawer']),
    // ...mapState(['p3',['drawer']])
  },
  data() {
    return {
      activeTab: null,
      opened: false,
      transition: 'bottom',
      tabs: [
        { name: 'passbook', text: 'PassBook', icon: 'mdi-shield-key-outline', path: '' },
        { name: 'activity', text: 'Activity', icon: 'mdi-bank-transfer', path: '' },
      ],
    };
  },
  methods: {
    addItemHandle() {
      this.$router.push({ path: '/passbook/add' });
    },
    async syncItemHandle() {},
  },
};
</script>
<style>
#operators .v-speed-dial {
  position: absolute;
}

#operators .v-btn--floating {
  position: relative;
}
</style>
