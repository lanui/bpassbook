<template>
  <v-card :loading="loading" class="mx-auto px-2 flex-grow-1" outlined>
    <v-card-title> {{ $t('p.creator.step1Title') }}</v-card-title>
    <v-spacer></v-spacer>
    <div class="my-auto align-stretch">
      <v-form ref="passwordForm" class="mx-2">
        <v-text-field
          dense
          outlined
          clearable
          counter
          :label="$t('l.password')"
          prepend-inner-icon="mdi-key-outline"
          :append-icon="pwdHide ? 'mdi-eye-off' : 'mdi-eye'"
          :type="pwdHide ? 'password' : 'text'"
          @click:append="pwdHide = !pwdHide"
          v-model="password"
          :value="password"
          name="Password"
          :rules="rules.password"
          :disabled="loading || saved"
        ></v-text-field>
        <v-text-field
          dense
          outlined
          clearable
          counter
          :label="$t('l.confirmPassword')"
          prepend-inner-icon="mdi-key-change"
          :append-icon="pwdHide ? 'mdi-eye-off' : 'mdi-eye'"
          :type="pwdHide ? 'password' : 'text'"
          @click:append="pwdHide = !pwdHide"
          v-model="confirmPassword"
          :value="confirmPassword"
          :disabled="loading || saved"
          :rules="rules.password"
          :error="Boolean(error)"
          :error-messages="error"
          name="confirmPassword"
        ></v-text-field>
      </v-form>
    </div>
    <v-card-actions>
      <v-row justify="center">
        <v-col class="text-center">
          <v-btn :disabled="loading" @click="next(2)" outlined color="indigo" class="mx-4 ma-6">
            {{ $t('btn.next') }}
            <v-icon right>mdi-chevron-double-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getMnemonic, createWallet } from '@/corejs/accounts/creator';
import { passwordRules } from '@/ui/constants/valid-rules';

export default {
  name: 'CreateStepForm1',
  data() {
    return {
      loading: false,
      pwdHide: true,
      error: '',
      seeds: '',
      password: '',
      confirmPassword: '',
      rules: {
        password: [...passwordRules],
      },
    };
  },
  methods: {
    previous(id) {
      this.$emit('stepClick', id);
    },
    async next(id) {
      const pwd = this.password;
      const repwd = this.confirmPassword;

      if (this.$refs.passwordForm.validate() && pwd == repwd) {
        this.loading = true;
        this.$emit('setPassword', pwd);

        setTimeout(() => {
          this.loading = false;
          this.$emit('stepClick', 2);
        }, 100);
      } else {
        this.error = 'Inconsistent passwords';
      }
    },
    generateMnemonics() {
      const mnemonics = getMnemonic();
      console.log('mnemonics>', mnemonics);
      this.seeds = mnemonics;
    },
  },
  mounted() {
    const pwd = this.$emit('getPwd', this);
  },
  props: {
    saved: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    password: function (val, old) {
      this.error = '';
    },
    confirmPassword: function (val, old) {
      this.error = '';
    },
  },
};
</script>
<style></style>
