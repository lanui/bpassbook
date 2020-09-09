<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="10" class="text-center">
        <div class="text-h4">
          导出钱包
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-form ref="exportForm">
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
        </v-form>
      </v-col>
      <v-col cols="10">
        <v-btn
          block larage
          color="light-blue darken-1" dark>
          Export
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" >
      <v-col cols="10">
        <v-img :src="qrcode" width="120" class="mx-auto"></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-card outlined class="px-1">
          <div class="body-1">
            Hexp alste new former like love assets
            hello mins taiwan china usa
          </div>
          <v-card-actions>
            <v-btn tile text x-small class="my-1 float-right">
              <v-icon left>mdi-clipboard-text-multiple</v-icon>
              Copy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <goback-btn />
  </v-container>
</template>

<script>

import {passwordRules} from '@/ui/constants/valid-rules'
import DemoQrCode from '@/assets/icons/demo-qrcode.png';
import GobackBtn from '@/widgets/GobackButton.vue'

export default {
  name: 'PopupExportWallet',
  components:{
    GobackBtn,
  },
  data() {
    return {
      qrcode:DemoQrCode,
      mnemonics:"",
      hideMnemonic:true,
      v3json:"",
      pwdHide:true,
      password:"",
      error:"",
      loading:false,
      rules:{
        password: [
          ...passwordRules
        ]
      }
    }
  },
};
</script>
<style>
</style>
