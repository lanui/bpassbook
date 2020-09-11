<template>
  <v-container class="px-0 py-0">
    <v-tabs v-model="activeTab"
      dense
      centered
      icons-and-text
      ripple fixed-tabs>
      <v-tab class="primary--text">
        PassBook
        <v-icon>
          mdi-shield-key-outline
        </v-icon>
      </v-tab>
      <v-tab class="primary--text">
        Activity
        <v-icon>
          mdi-bank-transfer
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
      <v-tab-item v-for="(t,idx) in tabs"
        :key="idx">
        <password-list v-if="t.name == 'passbook'" />

        <activity-list v-if="t.name == 'activity'" />
        <v-btn
          @click.stop="addItemHandle"
          v-if="t.name == 'passbook'"
          color="pink"
          dark
          x-small
          absolute
          top
          center
          fab
          style="bottom:-10px;">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
//mdi-form-textbox-lock
//mdi-bank-transfer

import PasswordList from '@/popup/views/Home/PasswordList.vue'
import ActivityList from '@/popup/views/Home/ActivityList.vue'
export default {
  name: 'TabsContainer',
  components: {
    PasswordList,
    ActivityList,
  },
  computed: {},
  data() {
    return {
      activeTab: null,
      tabs: [
        { name: 'passbook', text: 'PassBook', icon: 'mdi-shield-key-outline', path: '' },
        { name: 'activity', text: 'Activity', icon: 'mdi-bank-transfer', path: '' },
      ],
    };
  },
  methods: {
    addItemHandle(){
      this.$router.push({path:'/passbook/add'})
    }
  },
};
</script>
<style>
</style>
