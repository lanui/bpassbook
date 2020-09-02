<template>
  <div class="v-application--wrap p3-single--layout">
    <top-bar :rightMenus="false"/>
    <main-container />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TopBar from '@popup/widgets/TopBar.vue';
import MainContainer from '@popup/views/MainContainer.vue';

export default {
  name: 'PopupSingleLayout',
  components:{
    TopBar,
    MainContainer,
  },
  computed: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
};
</script>
<style>
</style>
