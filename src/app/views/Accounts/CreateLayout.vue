<template>
  <v-app>
    <v-toolbar dark prominent
      :max-height="128"
      :src="banner">
      <div class="px-2 py-4">
        <logo size="48"/>
      </div>
      <v-toolbar-title>
        <h1>
          Create Account
        </h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon x-large width="80"
          v-for="(step,idx) in stepnavs"
          color="indigo accent-1"
          :key="idx">
          <v-icon >{{step.icon}}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
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
import pwbanner from '@/assets/img/banner_password.png'
import Logo from '@/widgets/ExtLogo.vue'
export default {
  name: 'AppCreatorLayout',
  components:{
    Logo,
  },
  computed: {

  },
  data() {
    return {
      banner:pwbanner,
      stepid:1,
      stepnavs:[
        // {
        //   id:1,
        //   icon:"mdi-keyboard-variant",
        //   text:"EIP39 Words",
        //   flowicon:""
        // },
        // {
        //   id:1,
        //   icon:"mdi-account-key-outline",
        //   text:"PIN",
        //   flowicon:""
        // },
        // {
        //   id:1,
        //   icon:"mdi-account-plus-outline",
        //   text:"Create Account Address",
        //   flowicon:""
        // },
        {
          id:1,
          icon:"mdi-logout",
          text:"Checked Account",
          flowicon:""
        }
      ]
    }
  },
  methods: {
    stepClick(step) {
      console.log(">>>>",step)
    }
  },
};
</script>
<style>
</style>
