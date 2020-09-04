<template>
  <v-card class="mx-auto px-2"
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
            v-for="(text,i) in sortableSeeds"
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
          <v-btn @click="previous(2)"
            outlined  color="indigo" class="mx-4 ma-6">
            <v-icon left>
              mdi-chevron-double-left
            </v-icon>
            Previous
          </v-btn>
          <v-btn @click="next(4)"
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
  name: 'CreateStepFormThree',
  computed: {
    sortableSeeds(){
      const dseeds = this.originSeeds || []
      return dseeds.sort()
    }
  },
  data() {
    return {
      pwdHide:true,
      comments:'',
      seedStr:'',
      mnemonics: [],
      originSeeds:[]
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
      const index = this.originSeeds.findIndex(v => v === text)
      if(index >=0 ) {
        this.originSeeds.splice(index,1)
        this.mnemonics.push(text)
      }
    },
    removeMnemonics(text) {
      const idx = this.mnemonics.findIndex(v => v===text)
      console.log("remove",text,idx)
      if( idx >=0) {
        this.mnemonics.splice(idx,1)
        if(!this.originSeeds.includes(text)){
          this.originSeeds.push(text)
        }
        this.originSeeds.sort()
      }
    },
  },
  mounted() {
    this.$emit('initSeeds',this)
  },
};
</script>
<style>
</style>
