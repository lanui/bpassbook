<template>
  <v-container>
    <v-row class="fill-height text-center">
      <v-col>
        Passbook
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="test">
          Lock
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PassbookIndex',
  data() {
    return {

    }
  },
  methods: {
    test(){
      const $vue = this.$router
      //$conn.clientRedirect.bind($vue)
      this.$store.dispatch('unlockWallet',false)
      $conn.clientRedirect(this.$router,{path:'/index'})
    }
  },
};
</script>
<style>
</style>
