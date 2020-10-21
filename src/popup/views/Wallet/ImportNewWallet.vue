<template>
  <v-container class="fill-height">
    <subnav-bar :gobackCall="gobackHandle" :title="$t('p.wallet.importTitle')" />

    <v-row justify="center">
      <v-col cols="10">
        <v-sheet color="white" elevation="0" width="100%">
          <div class="my-1">
            <label class="bp-label">
              {{ $t('l.jsonKeystore') }}
            </label>
          </div>
          <!-- <div class="keystore-tips">
          </div> -->
        </v-sheet>
        <v-form ref="importForm">
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
            placeholder="Please entry wallet keystore json string"
            name="v3json"
            rows="5"
            color="indigo"
            v-model="v3json"
            :value="v3json"
            :error="Boolean(jsonError)"
            :error-messages="jsonError"
            type="text"
            filled
            :rules="rules.json"
          ></v-textarea>
          <v-text-field
            dense
            outlined
            rounded
            clearable
            counter
            filled
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
        <v-btn @click="importHandle" rounded larage dark block color="primary" class="mx-0">
          导入钱包
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SubnavBar from '@/popup/widgets/SubnavBar.vue';

import { passwordRules } from '@/ui/constants/valid-rules';
import { APITYPE_IMPORT_BPWALLET } from '@/lib/cnst/api-cnst';
import { OpenWallet } from '@/bglib/account-creator';
import WhispererController from '@/lib/controllers/whisperer-controller';
export default {
  name: 'PopupImportWallet',
  components: {
    SubnavBar,
  },
  computed: {
    ...mapGetters(['env3']),
    ...mapState(['isUnlocked']),
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
    gotoIndex() {
      this.$resetForm();
      this.$router.push({ path: '/index' });
    },
    resetForm() {
      this.loading = false;
      this.$refs.importForm.reset();
    },
    gobackHandle() {
      this.resetForm();
      this.$router.go(-1);
    },
    async importHandle() {
      if (this.$refs.importForm.validate()) {
        try {
          this.loading = true;
          const keystore = this.v3json;
          const password = this.password;
          await this.$store.dispatch('importNewWalletFormKeyStore', { keystore, password });
        } catch (err) {
          this.loading = false;
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
    isUnlocked: function (val, old) {
      if (val === true) {
        this.gotoIndex();
      }
    },
  },
};
</script>
<style></style>
