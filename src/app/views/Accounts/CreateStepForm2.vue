<template>
  <v-card class="mx-auto px-2"
    min-width="600"
    max-width="650"
    min-height="400"
    outlined>
    <v-card-title>
      Confirm Mnemonic Words
    </v-card-title>

    <v-card-text>
      <v-card class="my-2" min-height="80">
        <v-card-text>
          <v-chip close
            text-color="white"
            color="teal darken-1"
            v-for="(text,i) in mnemonics"
            @click:close="removeMnemonics(text)"
            class="ma-2" :key="'sel_'+i">
            {{ text }}
          </v-chip>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="my-2">
        <v-card-title>
          Select mnemonic in order
        </v-card-title>
        <v-card-text>
          <v-chip dense
            v-for="(text,i) in demos"
            @click="addMnemonics(text)"
            class="ma-2" color="grey" :key="i">
            {{ text }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-row justify="center">
        <v-col  class="text-center ">
          <v-btn @click="previous(1)"
            outlined  color="indigo" class="mx-4 ma-6">
            <v-icon left>
              mdi-chevron-double-left
            </v-icon>
            Previous
          </v-btn>
          <v-btn @click="next(3)"
            outlined  color="indigo" class="mx-4 ma-6">
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
const seeds = [
  'okex','live','love','bmw','lanbery'
]
export default {
  name: 'CreateStepForm1',
  data() {
    return {
      pwdHide:true,
      comments:'',
      eip39:{
        seeds:"",
        password:"",
        confirmPassword:""
      },
      demos:seeds.sort(),
      mnemonics: []
    }
  },
  methods: {
    previous(id) {
      this.$emit('stepClick',id)
    },
    next(id) {
      this.$emit('stepClick',id)
    },
    addMnemonics(text) {
      const index = this.demos.findIndex(v => v === text)
      if(index >=0) {
        this.demos.splice(index,1)
        this.mnemonics.push(text)
      }
    },
    removeMnemonics(text) {
      const idx = this.mnemonics.findIndex(v => v===text)
      if( idx >=0 ) {
        this.mnemonics.splice(idx,1)
        this.demos.push(text)
        this.demos.sort()
      }
    }
  },
};
</script>
<style>
</style>
