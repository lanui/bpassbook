<template>
  <v-row justify="center" class="fill-height justify-content-center">
    <v-col cols="8">
      <v-card class="d-flex justify-center" :elevation="0">
        <v-container class="align-stretch">
          <v-row justify="space-between">
            <v-col v-if="false" cols="1" class="text-center flex-grow-0 flex-shrink-1">
              <v-row justify="center" class="flex-column ma-0 fill-height">
                <v-col v-for="(step, idx) in stepnavs" color class="px-0" :key="idx">
                  <v-btn
                    icon
                    x-large
                    :disabled="step.id === 4 && (creator.precheck() || !completed)"
                    @click="stepHandler(step.id)"
                  >
                    <v-icon :color="stepid === step.id ? 'indigo ' : ''">{{ step.icon }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="7" class="flex-grow-1 flex-shrink-0">
              <step-form-one
                @stepClick="stepHandler"
                @setPassword="setPassword"
                @getPwd="getPwd"
                :saved="completed"
                v-if="stepid === 1"
              />
              <step-form-two
                @stepClick="stepHandler"
                @generateSeeds="generateSeeds"
                @initMnemonic="initMnemonic"
                :saved="completed"
                v-if="stepid === 2"
              />
              <step-form-three
                @stepClick="stepHandler"
                @initSeeds="initSeeds"
                :saved="completed"
                @saveWallet="saveWallet"
                ref="step3Comp"
                v-if="stepid === 3"
              />
              <step-form-four @stepClick="stepHandler" :address="firstAddress" v-if="stepid === 4" />
            </v-col>
            <v-col cols="4" class="flex-grow-0 flex-shrink-1">
              <p class="text-h5">帮助说明:</p>
              <p class style="max-width: 220px;">{{ comments }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import StepFormOne from './CreateStepForm1';
import StepFormTwo from './CreateStepForm2';
import StepFormThree from './CreateStepForm3';
import StepFormFour from './CreateStepForm4';

import { creator } from '@/corejs/accounts/creator.js';
global.creator = creator;

import WhispererController from '@/lib/controllers/whisperer-controller';

export default {
  name: 'AppCreateAccIndex',
  components: {
    StepFormOne,
    StepFormTwo,
    StepFormThree,
    StepFormFour,
  },
  computed: {
    ...mapGetters('app', ['stepid']),
  },
  data() {
    return {
      cardHeight: 400,
      cardWidth: 650,
      // stepid: 1,
      comments: '',
      stepnavs: [
        {
          id: 1,
          icon: 'mdi-account-key-outline',
          text: 'PIN',
          comments: '该密码用于解锁钱包账号,请牢记.', //The password is encrypt your wallet data,please remember it.
        },
        {
          id: 2,
          icon: 'mdi-keyboard-variant',
          text: 'EIP39 Words',
          comments:
            '助记词是区块链钱包生成的一组易于记住的密码词组,请勿泄露.当您钱包删除或丢失,需要通过这组助记词来找回.',
          //This BIP describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets.
        },
        {
          id: 3,
          icon: 'mdi-account-plus-outline',
          text: 'Create Account Address',
          comments: '确保记下了助记词，一旦它们丢失，就无法找回。',
        },
        {
          id: 4,
          icon: 'mdi-account-check-outline',
          text: 'Checked Account',
          comments: 'Address 为您当前钱包下的一个地址,你可以使用该地址接收ETH或其他Token',
        },
      ],
      pwdHide: true,
      creator,
      firstAddress: '',
      completed: false,
    };
  },
  methods: {
    stepHandler(id) {
      const curStep = this.stepnavs.find((s) => s.id === id);
      this.$store.dispatch('app/setCreateStepid', curStep.id);
      this.comments = curStep ? curStep.comments || '' : '';
    },
    setPassword(password) {
      creator.setPassword(password);
    },
    getPwd($this) {
      const pwd = creator.getPassword();
      if (pwd && typeof $this !== 'undefined') {
        $this.password = pwd;
        $this.confirmPassword = pwd;
      }
    },
    generateSeeds($this) {
      const mnemonics = creator.generateMnemonic();
      if (typeof $this !== 'undefined') {
        $this.mnemonics = mnemonics;
      }
    },
    initMnemonic($this) {
      if ($this !== undefined) {
        const mnemonics = creator.getMnemonic();
        $this.mnemonics = mnemonics;
      }
    },
    initSeeds($this) {
      if ($this !== undefined) {
        $this.originSeeds = creator.getSeeds();
        $this.seedStr = creator.getMnemonic();
        $this.pwd = creator.getPassword();
      }
    },
    async saveWallet() {
      const that = this;
      const step3Comp = this.$refs.step3Comp;
      //step3Comp.updateLoading(true);
      await this.$store.dispatch('app/setRemoteResponseState', { error: '', loading: true });
      creator
        .createWallet()
        .then(async function (wallet) {
          that.firstAddress = creator.getAddress();
          console.log('this.firstAddress>>', that.firstAddress, creator.getV3());
          const env3 = await creator.getEnv3();
          if (!env3 || creator.password === undefined || !creator.password.trim().length) {
            const errMsg = 'An unknown error occurred,please refresh this page and try again.';
            await that.$store.dispatch('app/setRemoteResponseState', { error: errMsg, loading: false });
          }
          const data = {
            selectedAddress: creator.getAddress(),
            password: creator.password,
            env3,
            v3: creator.getV3(),
          };

          // const whiperer = new WhispererController('App-create');

          // whiperer
          //   .sendCreateEnv3(data)
          //   .then(async (resp) => {
          //     step3Comp.updateLoading(false);
          //     that.completed = true;
          //     that.stepHandler(4);
          //   })
          //   .catch((err) => {
          //     step3Comp.updateLoading(false);
          //     that.stepHandler(4);
          //   });

          //
          $livedManager.sendNewWallet(data);
        })
        .catch(async (err) => {
          console.log('create>>>', err);
          await this.$store.dispatch('app/setRemoteResponseState', {
            error: typeof err === 'object' ? err.message : err,
            loading: false,
          });
          // step3Comp.updateLoading(false);
        });
    },
  },
  mounted() {
    this.stepHandler(1);
  },
};
</script>
<style></style>
