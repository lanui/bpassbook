<template>
  <v-container class="fill-height">
    <v-row class="text-center">
      <v-col cols="12">
        <logo size="100" />
      </v-col>
      <v-col cols="12">
        <h1 class="text-h5">
          欢迎使用密码宝
          <br />BPassword
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="8">
        <v-btn block outlined @click="goSignUp" color="indigo" class="mx-4 ma-6">
          {{ $t('btn.createWallet') }}
        </v-btn>
        <v-btn block outlined @click="importWallet" color="indigo" class="mx-4 ma-6">
          {{ $t('btn.importWallet') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="fill-height">
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Logo from '@/widgets/ExtLogo.vue';
export default {
  name: 'PopupWelcome',
  components: {
    Logo,
  },
  computed: {
    ...mapState(['isUnlocked', 'env3']),
  },
  data() {
    return {};
  },
  methods: {
    getStarted() {
      const subpath = 'app/app.html';
      const url = this.$browser.extension.getURL(subpath);
      chrome.tabs.create({ active: true, url: url }, function (tab) {});
    },
    goSignUp() {
      this.$router.push({ path: '/signup' });
    },
    importWallet() {
      this.$router.push({ path: '/importornew' });
    },
    goIndex() {
      this.$router.push({ path: '/index' });
    },
  },
  watch: {
    isUnlocked: function (val, old) {
      const env3 = this.env3;
      if (val && env3) {
        this.goIndex();
      }
    },
  },
};
</script>
<style></style>
