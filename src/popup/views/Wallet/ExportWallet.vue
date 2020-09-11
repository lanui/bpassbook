<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="10" class="text-center">
        <div class="text-h5">
          导出钱包
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="!unlocked">
      <v-col cols="10">
        <v-form ref="exportForm" >
          <v-text-field
            :loading="loading"
            dense outlined clearable
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
          @click="unlockedHandle"
          color="light-blue darken-1" dark>
         <v-progress-circular v-if="loading"
            indeterminate :size="22"
            :width="2"
            color="white"
          ></v-progress-circular>
          Unlocked
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" >
      <v-col cols="10" v-if="unlocked">
        <v-img :src="qrcode" width="150" class="mx-auto"></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="unlocked">
      <v-col cols="10">
        <v-textarea
          dense outlined readonly
          rows="5"
          :value="v3json"
          label="Keystore"
          class="body-2">
        </v-textarea>
        <v-btn tile text x-small
          @click="copyJson"
          class="my-1 float-right">
          <v-icon left>mdi-clipboard-text-multiple</v-icon>
          Copyed
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="fill-height"></v-row>
    <goback-btn />
  </v-container>
</template>

<script>
import QRCode from 'qrcode'

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
      qrcode:'',
      privKey:"",
      hideMnemonic:true,
      v3json:"",
      pwdHide:true,
      password:"",
      error:"",
      unlocked:false,
      loading:false,
      rules:{
        password: [
          ...passwordRules
        ]
      }
    }
  },
  methods: {
    unlockedHandle(){
      if(this.$refs.exportForm.validate()){
        const pwd = this.password
        this.loading = true
        this.$store.dispatch('decryptFromEnv3',pwd).then(ret => {
          this.v3json = ret.json
          this.unlocked = true
          this.loading = false
          return ret.json
        }).then(jsonText=>{
          console.log(jsonText)
          QRCode.toDataURL(jsonText)
          .then(url => {
            console.log(url)
            this.qrcode = url
          })
          .catch(err => {
            console.error(err)
          })
        }).catch(err=>{
          this.loading = false
          this.error = err.message
        })
      }
    },
    copyJson(){

    },
    resetstate(){
      this.loading = false
      this.unlocked = false
      this.password = ''
      this.v3json = ''
    }
  },
  mounted() {
    this.resetstate()
  },
  watch: {
    password:function(val,old) {
      this.error = ''
    }
  },
};
</script>
<style>
</style>
