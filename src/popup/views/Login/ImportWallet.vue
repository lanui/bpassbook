<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="10" class="text-center">
        <div class="text-h4">导入钱包</div>
      </v-col>
      <v-col cols="10">
        <v-form ref="importForm">
          <v-container fluid>
            <v-radio-group v-model="importType" row>
              <v-radio dense label="JSON String" value="json"></v-radio>
              <v-radio dense label="Mnemonic Words" value="v3"></v-radio>
            </v-radio-group>
          </v-container>

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
            label="Mnemonics"
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
            label="JSON String"
            type="text"
          ></v-textarea>
          <v-text-field
            dense
            outlined
            clearable
            counter
            label="Password"
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

          <div v-if="Boolean(env3)"
            class="mt-4 text-center amber--text text--darken-1"
          >import new wallet will recover current wallet.</div>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-btn block larage color="light-blue darken-1" dark>Import Wallet</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { passwordRules } from '@/ui/constants/valid-rules';
export default {
  name: 'PopupImportWallet',
  computed: {
    ...mapGetters(['env3'])
  },
  data() {
    return {
      importType: 'json',
      pwdHide: true,
      mnemonics: '',
      v3json: '',
      password: '',
      error: '',
      loading: false,
      rules: {
        password: [...passwordRules],
      },
    };
  },
  methods: {},
};
</script>
<style>
</style>
