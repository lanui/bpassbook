<template>
  <v-container class="pb-12">
    <v-row class="my-12">
      <v-col class="text-center">
        <logo size="100" />
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="8" md="4" lg="4">
        <h1 style="font-size: 2.75rem; font-weight: 400;">Welcome to BPassword</h1>
        <v-form ref="signInForm">
          <v-text-field
            :loading="loginLoading"
            :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="pwdShow ? 'text' : 'password'"
            name="Password"
            :label="$t('l.password')"
            counter
            :hint="pwdHint"
            @click:append="pwdShow = !pwdShow"
            :error-messages="loginError"
            :placeholder="$t('l.passwordPlaceHolder')"
            v-model="password"
          >
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="2" width="270">
        <v-btn block outlined x-large @click="login" color="indigo" class="mx-4 ma-6">{{
          $t('nav.login.unlock')
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '@/widgets/ExtLogo.vue';

import { passwordRules } from '@/ui/constants/valid-rules';

export default {
  name: 'AppSignIn',
  components: {
    Logo,
  },
  computed: {
    ...mapState(['isUnlocked', 'loginLoading', 'loginError']),
  },
  data() {
    return {
      pwdShow: false,
      password: '',
      pwdHint: '',
      err: '',
      rules: {
        password: [...passwordRules],
      },
    };
  },
  methods: {
    async login() {},
    goHome() {
      this.$router.push({ path: '/index' });
    },
  },
  mounted() {
    const isUnlocked = this.$store.getters['isUnlocked'];
    if (isUnlocked) {
      this.goHome();
    }
  },
  watch: {
    isUnlocked: function (val, old) {
      console.log('watch:', val, old);
      if (val) {
        this.goHome();
      }
    },
    password: function (val, old) {
      if (val === '') {
        this.$store.dispatch('setLoginError', '');
      }
      if (val !== old) {
        this.$store.dispatch('setLoginError', '');
      }
    },
  },
};
</script>
<style></style>
