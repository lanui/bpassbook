<template>
  <div class="v-application--wrap">
    <top-bar />
    <main-container />
  </div>
</template>

<script>
import TopBar from '@popup/widgets/TopBar.vue'
import MainContainer from '@popup/views/MainContainer.vue'
export default {
  name: 'PopupMainLayout',
  components:{
    TopBar,
    MainContainer
  },
  data() {
    return {

    }
  },
};
</script>
<style>
</style>
