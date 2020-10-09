<template>
  <v-container class="px-0 py-0">
    <v-tabs @change="changedHandle" v-model="activeTab" dense centered icons-and-text ripple fixed-tabs>
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
      <v-tab-item v-for="(t, idx) in tabs" :key="idx">
        <password-list v-if="t.name == 'passbook'" />

        <activity-list v-if="t.name == 'mobbook'" />
        <!-- <activity-list v-if="t.name == 'activity'" /> -->
        <!-- mdi-shield-sync-outline,mdi-chevron-double-down -->

        <!-- <v-speed-dial
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
        </v-speed-dial> -->
      </v-tab-item>
      <v-fab-transition>
        <v-btn
          v-if="!drawer"
          @click="addItemHandle"
          absolute
          key="mdi-plus"
          color="indigo"
          fab
          x-small
          dark
          top
          center
          class="float-btn-add"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-tabs-items>
    <v-row justify="center" class="px-0 py-0 my-0">
      <v-col cols="10" class="px-0 py-0">
        <v-chip
          v-if="Boolean(diff)"
          @click="syncDataHandle"
          class="ma-2"
          color="indigo accent-1"
          pill
          text-color="white"
        >
          <span class="mx-10">{{ $t('l.syncdata') }}</span>
          <v-avatar right class="indigo lighten-1">
            {{ diff }}
          </v-avatar>
        </v-chip>
      </v-col>
    </v-row>
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
    ...mapGetters('passbook', ['webdiff', 'mobdiff']),
    diff() {
      const activeTab = this.activeTab;
      return Boolean(this.activeTab) ? this.mobdiff : this.webdiff;
    },
  },
  data() {
    return {
      activeTab: null,
      opened: false,
      transition: 'bottom',
      tabs: [
        { name: 'passbook', text: 'PassBook', icon: 'mdi-shield-key-outline', path: '' },
        { name: 'activity', text: 'Activity', icon: 'mdi-bank-transfer', path: '' },
        // { name: 'activity', text: 'Activity', icon: 'mdi-bank-transfer', path: '' },
      ],
    };
  },
  methods: {
    addItemHandle() {
      const tabIdx = this.activeTab || 0;
      if (tabIdx == 1) {
        this.$router.push({ name: 'addMobItem' });
      } else {
        this.$router.push({ path: '/passbook/add' });
      }
    },
    async syncItemHandle() {},
    async syncDataHandle() {},
    changedHandle(val) {
      console.log('>>>>>>>>>>>>>>>>>', val, this.activeTab);
    },
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

.float-btn-add {
  transform: translateX(-48%);
}
.sync-btn--wrapper {
  display: flex;
  flex: 1 2 auto;
}
.tips-circle--wrapper {
  position: relative !important;
  float: right;
  right: 0.25rem;
}
.tips-number {
  font-size: 0.75rem;
}
</style>
