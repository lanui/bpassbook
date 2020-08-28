<template>
  <v-app-bar :dense="dense"
    :clipped-left="false"
    app>
    <!-- <v-app-bar-nav-icon @click.stop="toggleLeftDrawer"></v-app-bar-nav-icon>
    <logo class="mx-3"></logo> -->
    <nav-breadcrumbs />
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '@/widgets/ExtLogo.vue';
import NavBreadcrumbs from '@/widgets/NavBreadcrumbs.vue'

export default {
  name: 'AppTopBar',
  components: {
    Logo,
    NavBreadcrumbs,
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
