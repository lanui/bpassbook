<template>
  <v-app style="background: transparent !important;">
    <v-main>
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
const LOG_PREFFIX = 'BP-inputor-APP';
export default {
  name: 'bpAddor',
};
</script>
<style></style>
