<template>
  <v-menu
    :offset-x="false"
    :offset-y="true"
    :nudge-left="30"
    :nudge-bottom="8"
    bottom right>
    <template v-slot:activator="{on,attrs}">
      <v-avatar
        tile size="32px"
        icon
        v-bind="attrs"
        v-on="on">
        <img :src="logo" alt="BPassbook">
      </v-avatar>
    </template>
    <v-list dense dark >
      <v-list-item dense @click="toggleLocked">
        <v-list-item-icon>
          <v-icon>
            {{ locked ? lockedIcon : unlockedIcon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ locked ? $t('nav.login.unlock') : $t('nav.login.locking') }}
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item dense>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple-plus-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          创建账号
        </v-list-item-title>
      </v-list-item>
      <v-list-item dense>
        <v-list-item-icon>
          <v-icon>mdi-import</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          导入账号
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import ExtLogo from '@/icons/icon_128.png'
import {LOCKED_MDI,UNLOCKED_MDI} from '@/ui/constants/icon-cnsts'

export default {
  name: 'MenuLogo',
  computed: {
    ...mapGetters('p3',['locked']),
  },
  data() {
    return {
      logo: ExtLogo,
      lockedIcon:LOCKED_MDI,
      unlockedIcon:UNLOCKED_MDI,
    }
  },
  methods: {
    async toggleLocked(){
      const _locked = this.locked
      if(_locked){
        await this.unlockedHandler()
      }else {
        await this.lockedHandler()
      }
    },
    async lockedHandler() {

      this.$store.dispatch('p3/lockedAccount')
    },
    async unlockedHandler() {
      this.$store.dispatch('p3/unlockedAccount')
    }
  },
};
</script>
<style>
</style>
