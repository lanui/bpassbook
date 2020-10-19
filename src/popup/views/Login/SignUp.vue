<template>
  <v-container>
    <v-row align-content="center" justify="center" class="text-center">
      <v-col cols="12">
        <logo-big :size="40" />
      </v-col>
      <v-col cols="12">
        <div class="text-h5">
          创建密码宝主账号
        </div>
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center">
      <v-col cols="10">
        <v-form ref="signupForm">
          <!-- <div class="label py-2">
            {{$t('l.password')}}
          </div> -->
          <v-text-field
            name="password"
            rounded
            outlined
            :loading="creating"
            label=""
            :placeholder="$t('l.password')"
            :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="pwdShow = !pwdShow"
            :rules="rules.password"
            :type="pwdShow ? 'text' : 'password'"
            v-model="password"
            color="bpgray"
            dense
          >
          </v-text-field>
          <v-text-field
            name="rePassword"
            rounded
            outlined
            :loading="creating"
            :label="''"
            :placeholder="$t('l.confirmPassword')"
            :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="pwdShow = !pwdShow"
            :type="pwdShow ? 'text' : 'password'"
            v-model="rePassword"
            color="bpgray"
            dense
          >
          </v-text-field>
          <div class="error-tips" v-if="!!notMatched">
            <span>
              {{ notMatched }}
            </span>
          </div>
          <v-btn @click="createWallet" rounded block larage color="light-blue darken-1" dark>
            <v-progress-circular
              v-if="creating"
              indeterminate
              :size="22"
              :width="2"
              color="white"
            ></v-progress-circular>
            {{ $t('btn.createWallet') }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div>
          {{ v3 }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import LogoBig from '@/widgets/ExtLogo';
import { passwordRules } from '@/ui/constants/valid-rules';
import { GenerateWalletAndOpen } from '@/bglib/account-creator';

export default {
  name: 'PopSignUp',
  components: {
    LogoBig,
  },
  computed: {
    ...mapGetters('p3', ['creating', 'creatError']),
    ...mapState(['isUnlocked']),
  },
  data() {
    return {
      loading: false,
      error: '',
      pwdShow: false,
      password: '',
      rePassword: '',
      notMatched: '',
      v3: '',
      rules: {
        password: [...passwordRules],
      },
    };
  },
  methods: {
    async createWallet() {
      if (this.$refs.signupForm.validate()) {
        if (this.password !== this.rePassword) {
          this.notMatched = '两次输入密码不一致.';
          return;
        }
        const password = '' + this.password;
        try {
          await this.$store.dispatch('p3/setCreatingState', { creating: true, error: '' });
          await global.$connManager.createNewWallet(password);
        } catch (err) {
          console.warn(err);
          await this.$store.dispatch('p3/setCreatingState', { creating: false, error: '' });
        }
      }
    },
    async sendWalletPost(password) {},
    gotoIndex() {
      this.$router.push({ path: '/index' });
    },
  },
  watch: {
    rePassword: function (val, old) {
      this.notMatched = '';
    },
    password: function (val, old) {
      this.notMatched = '';
    },
    isUnlocked: function (val, old) {
      if (val === true) {
        this.gotoIndex();
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('p3/setCreatingState', { creating: false, error: '' });
  },
};
</script>
<style>
.error-tips {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  color: red;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}
</style>
