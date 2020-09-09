<template>
  <v-fab-transition>
    <v-btn
      @click="$router.go(-1)"
      v-show="!hide"
      color="primary"
      dark
      absolute
      bottom
      right
      small
      style="bottom:16px;"
    >
      <v-icon left>mdi-transfer-left</v-icon>
      goback
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: 'WidgetGobackBtn',
  methods: {
  },
  props:{
    hide:{
      default:false,
      type:Boolean,
      required:false
    }
  }
};
</script>
<style>
</style>
