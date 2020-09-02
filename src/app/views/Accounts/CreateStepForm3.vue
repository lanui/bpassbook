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
          name="Seeds"
        :value="eip39.seeds" label="Wallet Seed" type="text">
      </v-textarea>
      <v-text-field dense
          outlined clearable
          counter
          label="Password"
          prepend-inner-icon="mdi-key-outline"
          :append-icon="pwdHide ? 'mdi-eye-off' : 'mdi-eye'"
          :type="pwdHide ? 'password' : 'text'"
          @click:append="pwdHide = !pwdHide"
          :value="eip39.password"
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
          :value="eip39.confirmPassword"
          name="confirmPassword">
      </v-text-field>
    </v-form>
    <v-card-actions>
      <v-row justify="center">
        <v-col  class="text-center ">
          <v-btn  outlined  color="indigo" class="mx-4 ma-6">
            Generate
          </v-btn>
          <v-btn outlined  color="indigo" class="mx-4 ma-6">
            Next
            <v-icon right>
              mdi-chevron-double-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CreateStepForm1',
  data() {
    return {
      pwdHide:true,
      eip39:{
        seeds:"",
        password:"",
        confirmPassword:""
      }
    }
  },
};
</script>
<style>
</style>
