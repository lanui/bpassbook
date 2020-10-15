<template>
  <v-card elevation="3" outlined class="text-center mx-0 my-0">
    <v-row justify="center">
      <v-col cols="10">
        <v-btn dark rounded block color="primary" @click="gotoAddItemHandle">
          添加到BPassword保存
        </v-btn>
      </v-col>
    </v-row>
    <v-card-actions class="v-card-top-border">
      <bpass-icon />
      <v-spacer></v-spacer>
      <v-btn text color="bpgray" small>
        管理账号
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import BpassIcon from './widgets/BpassIcon.vue';

export default {
  name: 'AddorIndex',
  components: {
    BpassIcon,
  },
  data() {
    return {};
  },
  methods: {
    gotoAddItemHandle() {
      this.$router.push({ name: 'addItem', params: { a: 'adsadfafsd' } });
    },
  },
};
</script>
<style>
.v-card-top-border {
  border-top: 1px solid rgba(140, 144, 146, 0.15);
}

.v-btn:hover {
  color: rgba(69, 138, 249, 1);
}

.v-btn.bpgray--text:hover {
  color: rgba(69, 138, 249, 1) !important;
}
</style>
