<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="10" class="text-center">
        <div class="text-h4">导入钱包</div>
      </v-col>
      <v-col cols="10">
        <v-form ref="importForm">
          <!-- <v-container fluid>
            <v-radio-group v-model="importType" row>
              <v-radio dense :label="$t('l.jsonKeystore')" value="json"></v-radio>
              <v-radio dense :label="$t('l.mnemonics')" value="v3"></v-radio>
            </v-radio-group>
          </v-container> -->

          <v-textarea
            v-if="importType !== 'json'"
            dense
            outlined
            clearable
            placeholder="Please entry mnemonic words..."
            name="mnemonics"
            rows="5"
            color="indigo"
            v-model="mnemonics"
            :value="mnemonics"
            :label="$t('l.mnemonics')"
            type="text"
          ></v-textarea>
          <v-textarea
            v-if="importType === 'json'"
            dense
            outlined
            clearable
            placeholder="Please entry wallet json string"
            name="v3json"
            rows="5"
            color="indigo"
            v-model="v3json"
            :value="v3json"
            :error="Boolean(jsonError)"
            :error-messages="jsonError"
            :label="$t('l.jsonKeystore')"
            type="text"
            :rules="rules.json"
          ></v-textarea>
          <v-text-field
            dense
            outlined
            clearable
            counter
            :label="$t('l.password')"
            prepend-inner-icon="mdi-key"
            :append-icon="pwdHide ? 'mdi-eye-off' : 'mdi-eye'"
            :type="pwdHide ? 'password' : 'text'"
            @click:append="pwdHide = !pwdHide"
            v-model="password"
            :value="password"
            :disabled="loading"
            :rules="rules.password"
            :error="Boolean(error)"
            :error-messages="error"
            name="password"
          ></v-text-field>

          <div v-if="Boolean(env3)" class="mt-4 text-center amber--text text--darken-1">
            导入将会覆盖现有钱包,建议先备份现有钱包.
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-btn @click="importHandle" block larage color="light-blue darken-1" dark>
          导入钱包
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { passwordRules } from '@/ui/constants/valid-rules';
import { APITYPE_IMPORT_BPWALLET } from '@/lib/cnst/api-cnst';
import { OpenWallet } from '@/bglib/account-creator';
import WhispererController from '@/lib/controllers/whisperer-controller';
export default {
  name: 'PopupImportWallet',
  computed: {
    ...mapGetters(['env3']),
  },
  data() {
    return {
      importType: 'json',
      pwdHide: true,
      mnemonics: '',
      v3json: '',
      password: '',
      error: '',
      jsonError: '',
      loading: false,
      rules: {
        password: [...passwordRules],
        json: [(v) => (v && typeof v === 'string') || 'please entry json string.'],
      },
    };
  },
  methods: {
    goback() {
      this.loading = false;
      this.password = '';
      this.v3json = '';
      this.$router.go(-1);
    },
    async importHandle() {
      if (this.$refs.importForm.validate()) {
        try {
          this.loading = true;
          const keystore = this.v3json;
          const password = this.password;
          await this.$store.dispatch('importWalletFormKeyStore', { keystore, password });
          this.loading = false;
          this.goback();
        } catch (err) {
          this.loading = false;
          console.log(err);
          if (err.type === 'password') {
            this.error = err.message;
          } else {
            this.jsonError = err.message;
          }
        }
      }
    },
  },
  watch: {
    v3json: function (val) {
      this.jsonError = '';
    },
    password: function (val) {
      this.error = '';
    },
  },
};
</script>
<style></style>