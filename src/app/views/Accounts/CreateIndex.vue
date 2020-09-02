<template>
  <v-row justify="center" class="fill-height">
    <v-col cols="auto">
      <v-card class="d-inline-block mx-auto" :elevation="0">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto" class="text-center">
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
            <v-col cols="auto">
              <step-form-one
                @stepClick="stepHandler"
                v-if="stepid === 1"/>
              <step-form-two
                @stepClick="stepHandler"
                v-if="stepid === 2"/>
              <step-form-three
                @stepClick="stepHandler"
                v-if="stepid === 3"/>
              <step-form-four
                @stepClick="stepHandler"
                v-if="stepid === 4"/>
            </v-col>
            <v-col cols="auto">
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


export default {
  name: 'AppCreateAccIndex',
  components:{
    StepFormOne,
    StepFormTwo,
    StepFormThree,
    StepFormFour
  },
  data() {
    return {
      stepid:1,
      eip39Words:'',
      comments:'',
      stepnavs:[
        {
          id:1,
          icon:"mdi-keyboard-variant",
          text:"EIP39 Words",
          comments:'This BIP describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets.'
        },
        {
          id:2,
          icon:"mdi-account-key-outline",
          text:"PIN",
          comments:'This BIP describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets.'
        },
        {
          id:3,
          icon:"mdi-account-plus-outline",
          text:"Create Account Address",
          comments:'This BIP describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets.'
        },
        {
          id:4,
          icon:"mdi-account-check-outline",
          text:"Checked Account",
          comments:'This BIP describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets.'
        }
      ],
      pwdHide:true,
      eip39:{
        seeds:"",
        password:"",
        confirmPassword:""
      },

    }
  },
  methods: {
    stepHandler(id) {
      const curStep = this.stepnavs.find( s => s.id === id)
      this.stepid = curStep ? curStep.id : 1
      this.comments = curStep ? (curStep.comments || '') : ''
    }
  },
  mounted() {
    this.stepHandler(1)
  },
};
</script>
<style>
</style>
