<template>
  <v-container class="pb-12">
    <v-row class="my-12">
      <v-col class="text-center">
        <logo size="100" />
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="12" >
        <h1 style="font-size:2.75rem;font-weight:400;">
          Welcome to BPassword
        </h1>
        <p style="font-size:1.2rem">
          BPassword helps you manage passwords
        </p>
      </v-col>
      <v-col cols="2"  width="270">
        <v-btn block outlined
          x-large @click="getStarted"
          color="indigo" class="mx-4 ma-6">
          Get Started
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '@/widgets/ExtLogo.vue'

export default {
  name: 'AppWelcome',
  components:{
    Logo,
  },
  data() {
    return {

    }
  },
  methods: {
    getStarted(){
      this.$router.push({path:'/init/privacy'})
    }
  },
};
</script>
<style>
</style>
