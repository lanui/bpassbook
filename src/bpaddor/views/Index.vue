<template>
  <v-card elevation="3" outlined class="text-center mx-0 my-0">
    <v-row justify="center">
      <v-col cols="10" v-if="isUnlocked">
        <v-btn dark rounded block color="primary" @click="gotoAddItemHandle">
          添加到BPassword保存
        </v-btn>
      </v-col>
      <v-col cols="10" v-if="!isUnlocked">
        <div>
          按下
          <span class="mx-1 xsmall">Ctrl+Shift+K</span>
          来解锁
        </div>
      </v-col>
    </v-row>
    <v-card-actions class="v-card-top-border">
      <bpass-icon />
      <v-spacer></v-spacer>
      <v-btn v-if="isUnlocked" text color="bpgray" small>
        管理账号
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import BpassIcon from './widgets/BpassIcon.vue';

export default {
  name: 'AddorIndex',
  components: {
    BpassIcon,
  },
  computed: {
    ...mapGetters(['isUnlocked']),
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
