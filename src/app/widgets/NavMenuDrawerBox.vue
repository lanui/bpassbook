<template>
  <v-navigation-drawer :value="drawer" :clipped="clipped" :mini-variant.sync="mini" app>
    <nav-title-bar />
    <v-divider></v-divider>
    <v-list :dense="dense">
      <v-list-item v-for="(item,idx) in navs" @click.stop="navClick(item)" :key="idx">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.text}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

import NavTitleBar from '@app/widgets/AppNavTitle.vue';

import {navs} from '@/commrouter/navs'

export default {
  name: 'NavMenuDrawerBox',
  components: { NavTitleBar },
  computed: {
    ...mapState('app', ['clipped', 'dense', 'mini']),
  },
  data() {
    return {
      drawer: null,
      navs:navs.filter(nav => nav.roles.includes('app'))
    };
  },
  methods: {
    navClick(nav) {
      this.$router.push({path:nav.path})
    },
  },
};
</script>
<style>
</style>
