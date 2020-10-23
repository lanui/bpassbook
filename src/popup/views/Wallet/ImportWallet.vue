<template>
  <v-container class="fill-height">
    <subnav-bar :gobackCall="goback" :title="$t('p.wallet.importTitle')" />

    <v-row justify="center" class="px-0 mx-0">
      <v-col cols="10">
        <v-form ref="importForm">
          <!-- <v-textarea
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
          ></v-textarea> -->
          <v-sheet color="white" elevation="0" width="100%">
            <div class="my-0">
              <label class="bp-label">
                {{ $t('l.jsonKeystore') }}
              </label>
            </div>
            <div class="keystore-tips mb-1">
              <span class="my-1">
                {{ $t('p.wallet.replaceImportTip') }}
              </span>
            </div>
          </v-sheet>
          <v-textarea
            v-if="importType === 'json'"
            dense
            filled
            outlined
            clearable
            placeholder="Please entry wallet json string"
            name="v3json"
            rows="5"
            color="bpgray"
            v-model="v3json"
            :value="v3json"
            :error="Boolean(jsonError)"
            :error-messages="jsonError"
            type="text"
            :rules="rules.json"
          ></v-textarea>
          <v-text-field
            dense
            filled
            outlined
            rounded
            clearable
            counter
            :label="$t('l.password')"
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
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-btn @click="importHandle" rounded block larage color="primary" dark>
          {{ $t('btn.importWallet') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SubnavBar from '@/popup/widgets/SubnavBar.vue';

import { passwordRules } from '@/ui/constants/valid-rules';
import { APITYPE_IMPORT_BPWALLET } from '@/lib/cnst/api-cnst';
import WhispererController from '@/lib/controllers/whisperer-controller';
export default {
  name: 'PopupImportWallet',
  components: {
    SubnavBar,
  },
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
      this.resetForm();
      this.$router.go(-1);
    },
    resetForm() {
      this.$refs.importForm.reset();
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
