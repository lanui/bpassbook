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
    <!-- :label="$t('l.password')" -->
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-form ref="signInForm">
          <v-text-field
            :loading="loginLoading"
            :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="pwdShow ? 'text' : 'password'"
            name="Password"
            counter
            :hint="pwdHint"
            @click:append="pwdShow = !pwdShow"
            :error-messages="loginError"
            :placeholder="$t('l.passwordPlaceHolder')"
            v-model="password"
            rounded
            outlined
            dense
            color="bggray"
          >
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-btn @click="login" rounded block color="light-blue darken-1" dark dense>
          <v-progress-circular
            v-if="loginLoading"
            indeterminate
            :size="22"
            :width="2"
            color="white"
          ></v-progress-circular>
          {{ $t('nav.login.unlock') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import LogoBig from '@/widgets/ExtLogo';
import { passwordRules } from '@/ui/constants/valid-rules';
import { APITYPE_LOGIN } from '@/lib/cnst/api-cnst.js';
import Whisperer from '@/lib/controllers/whisperer-controller';
import { INCORRECT_PWD } from '@/lib/message-utils';
export default {
  name: 'PopupSignIn',
  components: {
    LogoBig,
  },
  computed: {
    ...mapState(['isUnlocked', 'loginLoading', 'loginError']),
  },
  data() {
    return {
      password: '',
      pwdShow: false,
      pwdHint: '',
      err: '',
      loading: false,
      rules: {
        password: [...passwordRules],
      },
    };
  },
  methods: {
    async login() {
      if (!this.$refs.signInForm.validate()) {
        return;
      }
      try {
        const password = this.password;
        await $connManager.login(password);

        // const whisperer = new Whisperer({name:"popup-login",includeTlsChannelId:false});
        // const data = {password,redirect:'/index'}
        // this.loading = true
        // whisperer
        //   .sendSimpleMsg(APITYPE_LOGIN,data)
        //   .then(async (resp)=>{
        //     this.loading = false
        //     console.log("initState>>>>>",resp.data)
        //     await this.$store.dispatch('updateInitState',)
        //     this.gotoIndex()
        //   }).catch(async (errState) =>{
        //     console.log(">>>>>>>>>>>>>>>>errState>>>>",errState)
        //     this.loading = false
        //     if(typeof errState === 'object' && errState.code == INCORRECT_PWD) {
        //       this.err = "密码不正确."
        //     }else {
        //       this.err = errState.message || errState?.toString()
        //     }
        //   })
      } catch (err) {
        this.$store.dispatch('setLoginError', '');
        this.loading = false;
        // console.log("Login error>>>",error)
      }
    },
    resetForm() {
      this.loading = false;
      this.$refs.signInForm.reset();
    },
    gotoIndex() {
      this.resetForm();
      this.$router.push({ path: '/index' });
    },
  },
  mounted() {
    this.loading = false;
    const isUnlocked = this.$store.getters['isUnlocked'];
    if (isUnlocked) {
      this.gotoIndex();
    }
  },
  watch: {
    password: function (val, old) {
      this.loading = false;
      this.$refs.signInForm.resetValidation();
      if (val === '') {
        this.$store.dispatch('setLoginError', '');
        this.err = '';
      }
      if (val !== old) {
        this.$store.dispatch('setLoginError', '');
      }
    },
    isUnlocked: function (val, old) {
      if (val) {
        this.gotoIndex();
      }
    },
  },
};
</script>
<style></style>
