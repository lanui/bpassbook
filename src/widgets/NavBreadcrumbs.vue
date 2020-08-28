<template>
  <v-breadcrumbs :items="breadcrumbs" >
    <template v-slot:item="{item}">
      <v-breadcrumbs-item ripple >{{$t("nav." + item.i18n)}}</v-breadcrumbs-item>
    </template>
    <template v-slot:divider>
      <v-icon>{{icon}}</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavBreadcrumbs',
  computed: {
    ...mapGetters('app', ['breadcrumbs']),
  },
  props: {
    icon: {
      type: String,
      default: 'mdi-chevron-right',
      required: false,
    },
  },
  methods: {

  },
};
</script>
<style>
</style>
