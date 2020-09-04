<template>
  <v-row justify="center" class="fill-height justify-content-center">
    <v-col cols="8">
      <v-card class="d-flex justify-center" :elevation="0">
        <v-container class="align-stretch">
          <v-row justify="space-between">
            <v-col cols="1" class="text-center flex-grow-0 flex-shrink-1">
              <v-row justify="center"
                class="flex-column ma-0 fill-height">
                <v-col v-for="(step,idx) in stepnavs"
                  color=""
                  class="px-0" :key="idx">
                  <v-btn icon
                    x-large
                    @click="stepHandler(step.id)" >
                    <v-icon
                      :color="stepid === step.id ? 'indigo ':''"
                      >
                      {{step.icon}}
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="7" class="flex-grow-1 flex-shrink-0">
              <step-form-one
                @stepClick="stepHandler"
                @setPassword="setPassword"
                @getPwd="getPwd"
                v-if="stepid === 1"/>
              <step-form-two
                @stepClick="stepHandler"
                @generateSeeds="generateSeeds"
                @initMnemonic="initMnemonic"
                v-if="stepid === 2"/>
              <step-form-three
                @stepClick="stepHandler"
                @initSeeds="initSeeds"
                v-if="stepid === 3"/>
              <step-form-four
                @stepClick="stepHandler"
                v-if="stepid === 4"/>
            </v-col>
            <v-col cols="4" class="flex-grow-0 flex-shrink-1">
              <p class="text-h5">
                Comments:
              </p>
              <p class="" style="max-width:220px;">
                {{comments}}
              </p>
            </v-col>

          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import StepFormOne from './CreateStepForm1'
import StepFormTwo from './CreateStepForm2'
import StepFormThree from './CreateStepForm3'
import StepFormFour from './CreateStepForm4'

import { creator } from '@/corejs/accounts/creator.js'

export default {
  name: 'AppCreateAccIndex',
  components:{
    StepFormOne,
    StepFormTwo,
    StepFormThree,
    StepFormFour
  },
  computed: {

  },
  data() {
    return {
      cardHeight:400,
      cardWidth:650,
      stepid:1,
      comments:'',
      stepnavs:[
        {
          id:1,
          icon:"mdi-account-key-outline",
          text:"PIN",
          comments:'The password is encrypt your wallet data,please remember it.'
        },
        {
          id:2,
          icon:"mdi-keyboard-variant",
          text:"EIP39 Words",
          comments:'This BIP describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets.'
        },
        {
          id:3,
          icon:"mdi-account-plus-outline",
          text:"Create Account Address",
          comments:'Make sure you have written down the mnemonic words, once they are lost, they cannot be retrieved.'
        },
        {
          id:4,
          icon:"mdi-account-check-outline",
          text:"Checked Account",
          comments:'This BIP describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets.'
        }
      ],
      pwdHide:true,
      creator,
      completed:false
    }
  },
  methods: {
    stepHandler(id) {
      const curStep = this.stepnavs.find( s => s.id === id)
      this.stepid = curStep ? curStep.id : 1
      this.comments = curStep ? (curStep.comments || '') : ''
    },
    setPassword(password) {
      creator.setPassword(password)
      console.log(">>>>>>",creator.getPassword())
    },
    getPwd($this){
      const pwd = creator.getPassword()
      if(pwd && typeof $this !== 'undefined'){
        $this.password = pwd
        $this.confirmPassword = pwd
      }
    },
    generateSeeds($this){
      const mnemonics = creator.generateMnemonic()
      if(typeof $this !== 'undefined'){
        $this.mnemonics = mnemonics
      }
    },
    initMnemonic($this){
      if($this !== undefined){
        const mnemonics = creator.getMnemonic()
        $this.mnemonics = mnemonics
      }
    },
    initSeeds($this) {
      if($this !== undefined) {
        $this.originSeeds = creator.getSeeds()
        $this.seedStr = creator.getMnemonic()
      }
    }

  },
  mounted() {
    this.stepHandler(1)
  },
};
</script>
<style>
</style>
