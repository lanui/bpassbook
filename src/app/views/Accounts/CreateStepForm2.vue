<template>
  <v-card class="mx-auto px-2"
    outlined>
    <v-card-title>
      Generator Mnemonic Seeds
    </v-card-title>
    <v-form ref="EIP39" class="mx-2">
      <v-row class="d-flex" >
        <v-col class="flex-grow-1 flex-shrink-0">
          <v-textarea
            dense
            outlined
            clearable
            disabled
            placeholder="Click Generate Button get mnemonics"
            name="Seeds"
            rows="4"
            color="indigo"
            v-model="mnemonics"
            :value="mnemonics"
            label="Mnemonics"
            type="text"
            >
          </v-textarea>
        </v-col>
        <v-col class="flex-grow-0 flex-shrink-1 align-self-end pb-8">
          <v-btn @click.stop="clipboradSeeds"
            icon :disabled="!Boolean(mnemonics)">
            <v-icon>
              mdi-clipboard-text-multiple-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="">
      <v-row justify="center">
        <v-col class="text-center ">
          <v-btn @click="stepTo(1)"
            outlined  color="indigo" class="mx-4 ma-6">
            <v-icon left>
              mdi-chevron-double-left
            </v-icon>
            Previous
          </v-btn>
          <v-btn @click="generateSeeds"
            :disabled="saved"
            outlined  color="indigo" class="mx-4 ma-6">
            Generate
          </v-btn>
          <v-btn @click="stepTo(3)"
            outlined  color="indigo" class="mx-4 ma-6">
            Next
            <v-icon right>
              mdi-chevron-double-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-snackbar :timeout="4000"
      v-model="showNotifier"
      centered
      :elevation="1">

      {{ notifyMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          icon
          v-bind="attrs"
          @click="showNotifier = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: 'CreateStepFormTwo',
  data() {
    return {
      pwdHide:true,
      mnemonics:'',
      showNotifier:false,
      notifyMessage:'Mnemonic words Copied.'
    }
  },
  methods: {
    generateSeeds() {
      this.$emit('generateSeeds',this)
    },
    stepTo(n){
      this.$emit('stepClick',n)
    },
    clipboradSeeds() {
      console.log(">>>>>>>>>>>>>>>>")
      if(this.mnemonics){
        this.showNotifier = true
        // setTimeout(() => {
        //   this.showNotifier = false
        // }, 10000);
      }
    }
  },
  mounted() {
    this.$emit('initMnemonic',this)
  },
  props:{
    saved:{
      type:Boolean,
      required:true
    }
  },
};
</script>
<style>
</style>
