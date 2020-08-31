<template>
  <v-app-bar :dense="dense"
    :clipped-left="false"
    app>
    <!-- <v-app-bar-nav-icon @click.stop="toggleLeftDrawer"></v-app-bar-nav-icon>
    <logo class="mx-3"></logo> -->
    <v-btn icon tile class="mx-0" @click.stop="gotoHome">
      <v-icon>
        mdi-shield-home
      </v-icon>
    </v-btn>
    <nav-breadcrumbs class="pl-1"/>
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
    async gotoHome(){
      await this.$store.dispatch('app/setCurrentNav',[{path:'/index',i18n:'home'}])
      this.$router.push({path:'/index'})
    }
  },
};
</script>
<style>
</style>
