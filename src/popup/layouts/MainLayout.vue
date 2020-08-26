<template>
  <div class="v-application--wrap">
    <top-bar />
    <main-container />
    <v-navigation-drawer @click="drawerClick"
      ref="rightDrawer"
      absolute :value="rdrawer" :right="true" >
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
      navMenus: [
        {
          key: 'walletMgr',
          text: '钱包',
          path: '',
          icon: 'mdi-wallet-giftcard',
        },
        {
          key: 'passbook',
          text: '密码本',
          path: '',
          icon: 'mdi-form-textbox-password',
        },
        {
          key: 'buyBts',
          text: '购买钻石',
          path: '',
          icon: 'mdi-diamond-stone',
        },
        {
          key: 'settings',
          text: '设置',
          path: '',
          icon: 'mdi-cog',
        },
      ],
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
</style>
