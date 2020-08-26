<template>
  <v-app @click="toggleDrawer">
    <router-view></router-view>

  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleDrawer(){
      const rdrawer = this.$store.state.rdrawer
      console.log('APP>',rdrawer)
    }
  },
};
</script>
