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
          <v-list-item-title>{{ $t(`nav.${item.i18n}`) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

import NavTitleBar from '@app/widgets/AppNavTitle.vue';

import {navs} from '@/commrouter/navs'
// import {appnavs} from '@app/router/routes'

export default {
  name: 'NavMenuDrawerBox',
  components: { NavTitleBar },
  computed: {
    ...mapState('app', ['clipped', 'dense', 'mini']),
  },
  data() {
    return {
      drawer: null,
      navs: appnavs,
      // navs:navs.filter(nav => nav.roles.includes('app'))
    };
  },
  methods: {
    async navClick(nav) {
      await this.$store.dispatch('app/setCurrentNav',nav.breadcrumbs)
      await this.$router.push({path:nav.path})
    },
  },
};
</script>
<style>
</style>
