<template>
  <div class="v-application--wrap">
    <top-bar />
    <main-container />
    <v-navigation-drawer @click="drawerClick"
      ref="rightDrawer"
      absolute :value="rdrawer" :right="true" style="height:550px;top:50px;">
      <v-list :dense="dense" class="py-0" >
        <v-list-item
          v-for="(nav,idx) in navMenus"
          @click="navMenuClick(nav)"
          :key="idx">
          <v-list-item-avatar>
            <v-icon>{{nav.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>{{ nav.text }}</v-list-item-content>
        </v-list-item>
      </v-list>

      <drawer-wallet-pannel />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TopBar from '@popup/widgets/TopBar.vue';
import MainContainer from '@popup/views/MainContainer.vue';
import DrawerWalletPannel from '@/popup/widgets/DrawerWalletPannel.vue'
import {navs} from '@/commrouter/navs'

export default {
  name: 'PopupMainLayout',
  components: {
    TopBar,
    MainContainer,
    DrawerWalletPannel,
  },
  computed: {
    ...mapState(['rdrawer','dense'])
  },
  data() {
    return {
      drawer: true,
      navMenus: navs.filter(nav => nav.roles.includes('p3'))
    };
  },
  methods: {
    navMenuClick(nav) {
      console.log(nav)
    },
    drawerClick(){
      console.log('<<<<>>>>')
    }
  },
};
</script>
<style>
aside.v-navigation-drawer {
  top:50px;
}
</style>
