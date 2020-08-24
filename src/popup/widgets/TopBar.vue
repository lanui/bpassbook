<template>
  <v-app-bar app :dense="true" clipped-right light>
    <top-icon />

    <v-container align="center" class="networks-wrapper" dense>
      <v-select rounded outlined dense
        :height="24"
        :color="networkColor"
        v-model="chainId"
        light
        item-color="grey"
        :items="networks" >
        <v-icon slot="prepend-inner"
          size="22px" :color="networkColor" dense
          >
          mdi-checkbox-blank-circle
        </v-icon>
      </v-select>
    </v-container>
    <v-spacer></v-spacer>
    <v-btn icon dense>
      <v-icon>
        mdi-dots-vertical
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import TopIcon from '@/widgets/ExtLogo.vue'

export default {
  name: 'PopupTopBar',
  components: {
    TopIcon
  },
  computed: {
    networkColor(){
      //233, 21, 80  rgba(3, 135, 137, 0.7)
      const nw = this.networks.find((n) => n.value === this.chainId)
      return nw ? nw.color : 'rgba(3, 135, 137, 0.7)'
    }
  },
  data() {
    return {
      chainId: 3,
      networks: [
        {
          text: 'Ropsten',value:3,color:'rgba(233, 21, 80, 0.7)'
        },
        {
          text:"Mainnet",value:1,color:'rgba(3, 135, 137, 0.7)'
        }
      ]
    }
  },

};
</script>
<style>
.networks-wrapper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  padding: .25rem .5rem !important;
}

.networks-wrapper .v-text-field--outlined fieldset {
  border: .25px solid #88c !important;
}

.networks-wrapper div[role="button"].v-input__slot {
  height: 26px !important;
  padding-right: 12px !important;
  padding-left: 12px !important;
}

.networks-wrapper div[role="button"].v-input__slot:focus,.networks-wrapper div[role="button"].v-input__slot:hover {
  border-color: #88c !important;
}

</style>
