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
          @click="unlockAccount"
          block larage color="light-blue darken-1" dark>
          {{$t('nav.login.unlock')}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import LogoBig from '@/widgets/ExtLogo';
import {passwordRules} from '@/ui/constants/valid-rules'

export default {
  name: 'PopupSignIn',
  components: {
    LogoBig
  },
  data() {
    return {
      password:'',
      pwdShow:false,
      pwdHint:'',
      err:'',
      rules:{
        password: [
          ...passwordRules
        ]
      }
    }
  },
  methods: {
    async unlockAccount() {
      const pwd = this.password
      if(pwd === '') {
        //this.pwdHint = 'Incorrect password.'
        this.err = 'Incorrect password.'
      }else {
        await this.$store.dispatch('p3/unlockedAccount',{})
        await this.$router.push({path:'/index'})
      }
    }
  },
  watch: {
    password:(val,old) => {
      this.err = ''
    }
  },
};
</script>
<style>
</style>
