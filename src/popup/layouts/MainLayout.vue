<template>
  <div class="v-application--wrap">
    <top-bar />
    <main-container />
    <v-navigation-drawer
      ref="rightDrawer"
      :value="rightDrawer"
      @input="setDrawerValue($event)"
      @transitionend="drawerTransitionChanged"
      absolute  :right="true" style="height:550px;top:50px;">
      <v-list :dense="dense" class="py-0" >
        <v-list-item
          v-for="(nav,idx) in navMenus"
          @click.stop="navMenuClick(nav)"
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
import { mapState ,mapGetters} from 'vuex'

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
    ...mapGetters('p3',['drawer']),
    rightDrawer:{
      get(){
        return this.$store.state.p3.drawer
      },
      set(v){
        this.$store.state.p3.drawer = v
      }
    },
    ...mapState(['rdrawer','dense'])
  },
  data() {
    return {
      navMenus: navs.filter(nav => nav.roles.includes('p3'))
    };
  },
  methods: {
    navMenuClick(nav) {
      console.log(nav)
      this.$router.push({path:nav.path})
      this.rightDrawer = false
    },
    drawerClick(){
      console.log('<<<<>>>>')
    },
    setDrawerValue($event){
      console.log("Drawer>>>>>",$event)
    },
    drawerTransitionChanged(val){
      console.log("TransitionChanged>>>>>",val)
    }
  },
};
</script>
<style>
aside.v-navigation-drawer {
  top:50px;
}
</style>
