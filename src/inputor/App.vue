<template>
  <v-app style="background: transparent !important;">
    <v-main class="fill-height">
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
  name: 'Inputor',
};
</script>
<style></style>
