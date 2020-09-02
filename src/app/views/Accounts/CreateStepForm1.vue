<template>
  <v-card class="mx-auto px-2"
    min-width="600"
    min-height="400"
    outlined>
    <v-card-title>
      Generator Wallet
    </v-card-title>
    <v-form ref="EIP39" class="mx-2">
      <v-textarea dense
          outlined clearable
          disabled
          placeholder="Click Generate Button get mnemonics"
          name="Seeds"
          rows="2"
          color="indigo"
          v-model="seeds"
          :value="seeds" label="Mnemonics" type="text">
      </v-textarea>
      <v-text-field dense
          outlined clearable
          counter
          label="Password"
          prepend-inner-icon="mdi-key-outline"
          :append-icon="pwdHide ? 'mdi-eye-off' : 'mdi-eye'"
          :type="pwdHide ? 'password' : 'text'"
          @click:append="pwdHide = !pwdHide"
          v-model="password"
          :value="password"
          name="Password">
      </v-text-field>
      <v-text-field dense
          outlined clearable
          counter
          label="Confirm"
          prepend-inner-icon="mdi-key-change"
          :append-icon="pwdHide ? 'mdi-eye-off' : 'mdi-eye'"
          :type="pwdHide ? 'password' : 'text'"
          @click:append="pwdHide = !pwdHide"
          v-model="confirmPassword"
          :value="confirmPassword"
          name="confirmPassword">
      </v-text-field>
      <div class="justify-center" v-if="Boolean(error)">
        <v-sheet
          outlined rounded tag="div" color="orange darken-1 align-center">
          <v-icon color="white--text">mdi-alert</v-icon>
          <span class="mx-4 text-subtitle-2 ">{{error}}</span>
        </v-sheet>
      </div>
    </v-form>
    <v-card-actions>
      <v-row justify="center">
        <v-col  class="text-center ">
          <v-btn
            @click="generateMnemonics"
            outlined  color="indigo" class="mx-4 ma-6">
            Generate
          </v-btn>
          <v-btn @click="next(2)"
            outlined  color="indigo" class="mx-4 ma-6">
            Next
            <v-icon right >
              mdi-chevron-double-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
const bip39 = require('bip39')

export default {
  name: 'CreateStepForm1',
  data() {
    return {
      pwdHide:true,
      error:'',
      seeds:"",
      password:"",
      confirmPassword:""
    }
  },
  methods: {
    previous(id) {
      this.$emit('stepClick',id)
    },
    next(id) {
      const pwd = this.password
      const repwd = this.confirmPassword
      const seeds = this.seeds
      console.log(">>>>>>",pwd,repwd,seeds)
      if(!pwd || !repwd || repwd != pwd ) {
        this.error = "password incorrect."
      }else if(!seeds || seeds.length < 9){
        this.error = "generate mnemonics first."
      }else {
        this.$emit('stepClick',id)
      }

    },
    generateMnemonics(){
      const mnemonics = bip39.generateMnemonic()
      console.log("mnemonics>",mnemonics)
      this.seeds = mnemonics
    }
  },
};
</script>
<style>
</style>
