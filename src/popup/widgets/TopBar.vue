<template>
  <v-app-bar app :dense="dense" clipped-right light>
    <menu-logo />
    <v-container :dense="dense" align="center" class="networks-wrapper">
      <v-row class="fill-height my-auto py-auto">
        <v-spacer></v-spacer>
        <!-- <v-select
          rounded
          outlined
          dense
          :height="20"
          :color="networkColor"
          v-model="chainId"
          light
          item-color="grey"
          @change="networkChanged"
          :items="networks"
          class="network-selector"
        >
          <v-icon slot="prepend-inner" size="22px" :color="networkColor" dense>
            mdi-checkbox-blank-circle
          </v-icon>
        </v-select> -->

        <v-menu offset-y content-class="network-pop-menu">
          <template v-slot:activator="{ attrs, on }">
            <v-chip v-bind="attrs" v-on="on" small filter pill class="network-chiper">
              <v-icon size="8" :color="networkColor">
                mdi-checkbox-blank-circle
              </v-icon>
              <span class="ms-2">Ropsten</span>
            </v-chip>
          </template>
          <v-list item-height="16" v-for="(nw, idx) in networks" :key="idx" class="py-0">
            <v-list-item dense @click="networkChanged(nw.value)" class="network-item py-0 my-0">
              <!-- <v-list-item-title>
                <v-icon size="18" :color="nw.color">
                  mdi-checkbox-blank-circle
                </v-icon>
                <span>{{nw.text}}</span>
              </v-list-item-title> -->
              <v-list-item-content>
                <div>
                  <v-icon size="14" :color="nw.color">
                    mdi-checkbox-blank-circle
                  </v-icon>
                  <span class="ms-1">{{ nw.text }}</span>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
    <v-btn v-if="rightMenus" icon :dense="dense" @click="togglerDrawer" class="ms-2" small>
      <v-icon color="light-blue accent-4" dense>
        mdi-menu
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import TopIcon from '@/widgets/ExtLogo.vue';
import MenuLogo from '@/widgets/MenuLogo.vue';

export default {
  name: 'PopupTopBar',
  components: {
    TopIcon,
    MenuLogo,
  },
  computed: {
    ...mapGetters('p3', ['drawer']),
    ...mapState(['rdrawer', 'dense', 'networks', 'chainId']),

    networkColor() {
      //233, 21, 80  rgba(3, 135, 137, 0.7)
      const nw = this.networks.find((n) => n.value === this.chainId);
      return nw ? nw.color : 'rgba(3, 135, 137, 0.7)';
    },
  },
  data() {
    return {};
  },
  methods: {
    networkChanged(id) {
      console.log(id);
      //alert(id)

      this.$store.dispatch('setChainId', id);
      this.$store.dispatch('p3/toggleRightDrawer', false);
    },
    togglerDrawer() {
      const rdrawer = this.$store.getters['p3/drawer'];
      const drawerEl = this.$parent.$refs['rightDrawer'];

      const flag = rdrawer && drawerEl.$el.classList.contains('v-navigation-drawer--close') ? true : !rdrawer;
      console.log('>>>>', rdrawer, flag);
      this.$store.dispatch('p3/toggleRightDrawer', !rdrawer);
    },
  },
  props: {
    rightMenus: {
      default: true,
      type: Boolean,
      required: false,
    },
  },
};
</script>
<style>
.network-chiper {
  font-size: 14px;
  border-radius: 10px;
  background-color: rgba(243, 244, 246, 1);
  border: 2px solid #c8cccf;
}

.network-pop-menu {
}

.network-item > div.v-list-item__content {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}

.network-item > div.v-list-item__content > div {
  display: flex;
}
/* .networks-wrapper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  padding: 0.25rem 0.5rem !important;
}

.networks-wrapper .v-text-field--outlined fieldset {
  border: 0.25px solid #88c !important;
}

.networks-wrapper div[role='button'].v-input__slot {
  height: 28px !important;
  padding-right: 12px !important;
  padding-left: 12px !important;
}

.networks-wrapper div[role='button'].v-input__slot:focus,
.networks-wrapper div[role='button'].v-input__slot:hover {
  border-color: #88c !important;
}

.network-selector {
  width: 160px;
  height: 28px;
} */
</style>
