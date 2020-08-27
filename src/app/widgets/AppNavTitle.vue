<template>
  <v-list-item dense class="px-2">
    <v-list-item-avatar tile  @click.stop="toggleNav">
      <v-img :src="logo" class="app-nav-logo"/>
    </v-list-item-avatar>
    <v-list-item-title>
      <h4 class="title">BPassword</h4>
    </v-list-item-title>
    <v-btn icon
      @click.stop="toggleNav">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-list-item>

</template>

<script>
import { mapState } from 'vuex';
import logo from '@/icons/icon_128.png'
export default {
  name: 'AppNavTitleBar',
  computed: {
    ...mapState('app',[
      'clipped','dense','mini'
    ])
  },
  data() {
    return {
      logo:logo
    };
  },
  methods: {
    async toggleNav(){
      console.log('mini toggle')
      await this.$store.dispatch('app/toggleNavMini')
    }
  },
};
</script>
<style>
.app-nav-logo {
  cursor: pointer;
  height: 30px;
  width: 30px;
}
</style>
