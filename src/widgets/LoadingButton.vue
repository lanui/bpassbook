<template>
  <v-btn
    @click.stop="clickHandle"
    :outlined="outlined" :rounded="rounded"
    :color="color" :block="block"
    :x-small="xsmall" :small="small"
    :class="btnClass">
    <v-progress-circular v-if="loading"
      :size="loadingSize" :width="loadingWidth"
      indeterminate :color="loadingColor" class="mx-1">

    </v-progress-circular>
    {{text}}
  </v-btn>
</template>

<script>
export default {
  name: 'LoadingButton',
  computed: {
    loadingSize(){
      if(this.xsmall){
        return 14
      }
      if(this.small){
        return 16
      }
      if(this.large){
        return 22
      }
      return 18
    },
    loadingWidth(){
      if(this.small || this.xsmall ) return 1
      if(this.large ) return 4
      return 3
    }
  },
  methods: {
    clickHandle(){
      this.clickFn()
    }
  },
  props: {
    clickFn:{
      default:()=>{},
      type:Function,
    },
    loading:{
      default:false,type:[Boolean]
    },
    'xsmall':{
      default:false,type:[Boolean]
    },
    small:{
      default:false,type:[Boolean]
    },
    large:{
      default:false,type:[Boolean]
    },
    text: {
      type: [String,Number],
      default: '',
    },
    block:{
      default:false,type:[Boolean]
    },
    outlined:{
      default:false,type:[Boolean]
    },
    rounded:{
      default:false,type:[Boolean]
    },
    color:{
      default:'',
      type:[String]
    },
    btnClass:{
      default:'',
      type:[String]
    },
    loadingColor:{
      default:'green',
      type:[String]
    },
  },
};
</script>
<style>
</style>
