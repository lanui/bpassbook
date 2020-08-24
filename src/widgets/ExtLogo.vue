<template>
  <v-avatar size="32px">
    <img :src="extIcon" alt="BPassword">
  </v-avatar>
</template>

<script>
import ExtLogo from '@/icons/icon_128.png'

export default {
  name: 'ExtensionLogo',
  data() {
    return {
      extIcon: ExtLogo
    }
  },

};
</script>
<style>
</style>
