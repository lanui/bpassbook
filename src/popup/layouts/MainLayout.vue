<template>
  <div class="v-application--wrap">
    <top-bar />
    <main-container />
    <v-navigation-drawer
      ref="rightDrawer"
      :value="rightDrawer"
      @input="setDrawerValue($event)"
      @transitionend="drawerTransitionChanged"
      absolute
      :right="true"
      style="height: 550px; top: 50px;"
    >
      <v-list :dense="dense" class="py-0">
        <v-list-item v-for="(nav, idx) in navMenus" @click.stop="navMenuClick(nav)" :key="idx">
          <v-list-item-avatar size="20">
            <v-icon v-if="!Boolean(nav.iconImg)">{{ nav.icon }}</v-icon>
            <v-img v-if="Boolean(nav.iconImg)" :src="nav.iconImg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content
            ><span class="nav-drawer-item--title">{{ nav.text }}</span></v-list-item-content
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="lockedHandle">
          <v-list-item-avatar size="20">
            <v-img :src="iconLocking"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <span class="nav-drawer-item--title">
              {{ isUnlocked ? $t('nav.login.locking') : $t('nav.login.unlock') }}
            </span>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <drawer-wallet-pannel />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import { LOCKED_MDI, UNLOCKED_MDI } from '@/ui/constants/icon-cnsts';
import MessageController from '@/popup/controllers/message-controller';
import iconLocking from '@/assets/icons/icon-locking.png';

// import Whisperer from '@/lib/controllers/whisperer-controller'

import TopBar from '@popup/widgets/TopBar.vue';
import MainContainer from '@popup/views/MainContainer.vue';
import DrawerWalletPannel from '@/popup/widgets/DrawerWalletPannel.vue';
import { navs } from '@/commrouter/navs';

export default {
  name: 'PopupMainLayout',
  components: {
    TopBar,
    MainContainer,
    DrawerWalletPannel,
  },
  computed: {
    ...mapGetters(['isUnlocked']),
    ...mapGetters('p3', ['drawer']),
    rightDrawer: {
      get() {
        return this.$store.state.p3.drawer;
      },
      set(v) {
        this.$store.state.p3.drawer = v;
      },
    },
    ...mapState(['rdrawer', 'dense']),
  },
  data() {
    return {
      iconLocking,
      lockedIcon: LOCKED_MDI,
      unlockedIcon: UNLOCKED_MDI,
      navMenus: navs.filter((nav) => nav.roles.includes('p3')),
    };
  },
  methods: {
    navMenuClick(nav) {
      // console.log(nav);
      this.$router.push({ path: nav.path });
      this.rightDrawer = false;
    },
    drawerClick() {},
    setDrawerValue($event) {
      // console.log('Drawer>>>>>', $event);
    },
    drawerTransitionChanged(val) {
      // console.log('TransitionChanged>>>>>', val);
    },
    async lockedHandle() {
      const controller = new MessageController();
      controller
        .logout()
        .then(async (initState) => {
          await this.$store.dispatch('setLoginError');
          await this.$store.dispatch('updateInitState', initState);
          this.$router.push({ path: '/signin' });
        })
        .catch(async (err) => {
          await this.$store.dispatch('setLoginError');
        });
    },
  },
};
</script>
<style>
aside.v-navigation-drawer {
  top: 50px;
}

.nav-drawer-item--title {
  font-size: 14px;
  color: rgba(25, 25, 29, 1);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
</style>
