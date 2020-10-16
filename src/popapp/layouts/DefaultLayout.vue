<template>
  <v-main class="html-backcolor">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </v-main>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>
<style>
.html-backcolor {
  background-color: rgba(247, 248, 251, 1);
}
</style>
