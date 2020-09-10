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
            {{ isUnlocked ?  unlockedIcon :lockedIcon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ isUnlocked ?  $t('nav.login.locking') : $t('nav.login.unlock') }}
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <!-- <v-list-item dense>
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
      </v-list-item> -->
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
    ...mapGetters(['isUnlocked']),
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
      const _locked = this.isUnlocked
      if(_locked){
        await this.lockedHandler()
      }else {
        //await this.lockedHandler()
      }
    },
    async lockedHandler() {
      await this.$store.dispatch('unlockWallet',false)
      $conn.clientRedirect(this.$router,{path:'/signin'})
    }
  },
};
</script>
<style>
</style>
