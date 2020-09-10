<template>
  <v-container>
    <v-row align-content="center" justify="center" class="text-center">
      <v-col cols="12">
        <logo-big :size="58" />
      </v-col>
      <v-col>
        <h1 class="title">
          BPassword
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-form ref="signInForm">
          <v-text-field
            :loading="loading"
            :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="pwdShow ? 'text' : 'password'"
            name="Password"
            :label="$t('l.password')"
            counter
            :hint="pwdHint"
            @click:append="pwdShow = !pwdShow"
            :error-messages="err"
            :placeholder="$t('l.passwordPlaceHolder')"
            v-model="password">
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-btn
          @click="login"
          block larage color="light-blue darken-1" dark>
          <v-progress-circular v-if="loading"
            indeterminate :size="22"
            :width="2"
            color="white"
          ></v-progress-circular>
          {{$t('nav.login.unlock')}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import LogoBig from '@/widgets/ExtLogo';
import {passwordRules} from '@/ui/constants/valid-rules'

export default {
  name: 'PopupSignIn',
  components: {
    LogoBig
  },
  computed: {
    ...mapState([
      'isUnlocked',
      'loginLoading',
      'loginError'
    ])
  },
  data() {
    return {
      password:'',
      pwdShow:false,
      pwdHint:'',
      err:'',
      loading:false,
      rules:{
        password: [
          ...passwordRules
        ]
      }
    }
  },
  methods: {
    async login() {
      if(this.$refs.signInForm.validate()){
        const pwd = this.password
        const env3 = await this.$store.getters['env3']

        try{
          this.loading = true
          await this.$store.dispatch('setLoginLoading',true)
          $conn.clientPort.sendUnlockedReq(pwd,env3)
          this.loading = false
        }catch(err){
          this.loading = false
          this.err = err.message
        }
      }
    },
    gotoIndex(){
      this.$router.push({path:'/index'})
    }
  },
  mounted() {
    this.loading = false
    const isUnlocked = this.$store.getters['isUnlocked']
    if(isUnlocked){
      this.gotoIndex()
    }
  },
  watch: {
    password:function(val,old){
      this.loading = false
      if(val===''){
        this.$store.dispatch('setLoginError','')
      }
      if(val!==old){
        this.$store.dispatch('setLoginError','')
      }
    },
    isUnlocked:function(val,old) {
      console.log("watch:",val,old)
      if(val){
        this.gotoIndex()
      }
    },
  },
};
</script>
<style>
</style>
