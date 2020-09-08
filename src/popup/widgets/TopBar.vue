<template>
  <v-app-bar app :dense="dense" clipped-right light>
    <menu-logo />

    <v-container :dense="dense"
      align="center" class="networks-wrapper" >
      <v-select rounded outlined dense
        :height="24"
        :color="networkColor"
        v-model="chainId"
        light
        item-color="grey"
        @change="networkChanged"
        :items="networks" >
        <v-icon slot="prepend-inner"
          size="22px" :color="networkColor" dense
          >
          mdi-checkbox-blank-circle
        </v-icon>
      </v-select>
    </v-container>
    <v-spacer></v-spacer>
    <v-btn v-if="rightMenus"
      icon :dense="dense" @click="togglerDrawer">
      <v-icon size="20px" color="light-blue accent-4">
        mdi-dots-vertical
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

import TopIcon from '@/widgets/ExtLogo.vue'
import MenuLogo from '@/widgets/MenuLogo.vue'

export default {
  name: 'PopupTopBar',
  components: {
    TopIcon,
    MenuLogo,
  },
  computed: {
    ...mapState([
      'rdrawer',
      'dense',
      'networks',
      'chainId'
    ]),

    networkColor(){
      //233, 21, 80  rgba(3, 135, 137, 0.7)
      const nw = this.networks.find((n) => n.value === this.chainId)
      return nw ? nw.color : 'rgba(3, 135, 137, 0.7)'
    }
  },
  data() {
    return {

      // networks: [
      //   {
      //     text: 'Ropsten',value:3,color:'rgba(233, 21, 80, 0.7)'
      //   },
      //   {
      //     text:"Mainnet",value:1,color:'rgba(3, 135, 137, 0.7)'
      //   }
      // ]
    }
  },
  methods: {
    networkChanged(id) {
      console.log(id)
      //alert(id)

      this.$store.dispatch('setChainId',id)
    },
    togglerDrawer(){
      const rdrawer = this.rdrawer
      const drawerEl = this.$parent.$refs['rightDrawer']

      const flag = rdrawer && drawerEl.$el.classList.contains('v-navigation-drawer--close') ? true : !rdrawer
      console.log('>>>>',rdrawer,flag)
      this.$store.dispatch('changeRightDrawer',!rdrawer)
    }
  },
  props:{
    rightMenus:{
      default:true,
      type:Boolean,
      required:false
    }
  }
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
