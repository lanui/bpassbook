<template>
  <v-menu offset-y origin="center center"
    :nudge-bottom="10"
    transition="scale-transition">
    <template v-slot:activator="{on}">
      <v-btn icon text v-on="on">
        <v-icon>
          mdi-google-translate
        </v-icon>
      </v-btn>
    </template>
    <v-list class="pa-0" dense>
      <v-list-item dense
        v-for="(item,index) in locales"
        ripple="ripple"
        :target="item.target"
        rel="noopener"
        @click="setLocale(item.locale)"
        :key="index">
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {locales} from '@/locale'
export default {
  name: 'AppLocalization',
  components:{},
  computed: {

  },
  data() {
    return {
      locales,
    }
  },
  methods: {
    async setLocale(locale) {

    }
  },
};
</script>
<style>
</style>
