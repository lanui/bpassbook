<template>
  <v-avatar tile :size="size">
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
  props:{
    size:{
      default:32,
      type:[String,Number],
      required:false
    }
  }

};
</script>
<style>
</style>
