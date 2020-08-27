<template>
  <v-app id="appMainLayout">
    <!-- drawer -->
    <nav-menu-drawer-box />
    <!-- app-bar -->
    <app-top-bar />
    <!-- v-main -->
    <v-main>
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import AppTopBar from '@app/widgets/AppTopBar.vue';
import NavMenuDrawerBox from '@app/widgets/NavMenuDrawerBox.vue';
export default {
  name: 'AppMainLayout',
  components: { AppTopBar, NavMenuDrawerBox },
  computed: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
</style>
