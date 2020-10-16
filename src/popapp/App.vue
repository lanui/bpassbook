<template>
  <v-app>
    <header id="AppHeader">
      <v-container>
        <v-row justify="center" class="text-center">
          <v-col>
            <ext-icon size="40" />
            <div class="title">
              BPassword
            </div>
          </v-col>
        </v-row>
      </v-container>
    </header>
    <router-view />
  </v-app>
</template>

<script>
import ExtIcon from '@/widgets/ExtLogo.vue';
export default {
  name: 'PopApp',
  components: {
    ExtIcon,
  },
  computed: {},
  methods: {},
};
</script>
<style>
html,
body {
  background-color: rgba(247, 248, 251, 1);
  font-size: 16px;
}
#AppHeader {
  height: 128px;
  background: rgba(243, 244, 246, 1);
}
</style>
