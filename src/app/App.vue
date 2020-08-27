<template>
  <v-app>
    <!-- drawer -->
    <!-- <nav-menu-drawer-box /> -->
    <!-- app-bar -->
    <!-- <app-top-bar /> -->
    <!-- v-main -->
    <!-- <v-main>
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </v-main> -->

     <router-view />
  </v-app>
</template>

<script>
import AppTopBar from '@app/widgets/AppTopBar.vue';
import NavMenuDrawerBox from '@app/widgets/NavMenuDrawerBox.vue';
export default {
  name: 'App',
  components: { AppTopBar, NavMenuDrawerBox },
};
</script>
<style>
</style>
