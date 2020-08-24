<template>
  <v-app-bar app :dense="true" clipped-right light>
    <top-icon />
    <v-container align="center" class="networks-wrapper" dense>
      <v-select rounded outlined dense
        :height="24"
        v-model="chainId"
        light
        item-color="grey"
        :items="networks" >
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
  data() {
    return {
      chainId: 3,
      networks: [
        {
          text: 'Ropsten',value:3,
        },
        {
          text:"Mainnet",value:1,
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
}

.networks-wrapper div[role="button"].v-input__slot:focus,.networks-wrapper div[role="button"].v-input__slot:hover {
  border-color: #88c !important;
}

</style>
