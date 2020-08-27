<template>
  <v-app-bar :dense="dense"
    :clipped-left="false"
    app>
    <!-- <v-app-bar-nav-icon @click.stop="toggleLeftDrawer"></v-app-bar-nav-icon>
    <logo class="mx-3"></logo> -->
    <v-toolbar-title class="mr-12 align-center">
      <span class="title">BPassword</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '@/widgets/ExtLogo.vue';
export default {
  name: 'AppTopBar',
  components: {
    Logo,
  },
  computed: {
    ...mapState('app',[
      "dense"
    ])
  },
  data() {
    return {};
  },
  methods: {
    toggleLeftDrawer() {},
  },
};
</script>
<style>
</style>
