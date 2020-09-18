<template>
  <v-app>
    <v-main>
      <v-card elevation="3" outlined class="text-center mx-0 my-0">
        <v-card-subtitle class="text-center mx-0 px-0 py-0 mt-1">
          <v-row justify="center">
            <v-col cols="10" class="px-0 py-1">
              <div class="icon-bg"></div>
              <v-avatar size="22" @click.native="clickHandle" class="bp-img--pointer">
                <img :src="icon" alt="BPassword" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <v-row justify="center">
          <v-col cols="10" v-if="!isUnlocked">
            <div>
              按下
              <span class="mx-1 xsmall">Ctrl+Shift+K</span>
              来解锁
            </div>
          </v-col>

          <v-col cols="10" v-if="isUnlocked">
            <v-virtual-scroll :items="items" :item-height="26" height="50">
              <template v-slot="{ item }">
                <v-btn block text small @click="sendFillMessage(item)">{{ item.username }}</v-btn>
              </template>
            </v-virtual-scroll>
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/icons/icon_128.png';
import { postMsgToPage } from './helper';
export default {
  name: 'Inputor',
  computed: {
    ...mapGetters(['isUnlocked', 'items']),
  },
  data() {
    return {
      icon: icon,
    };
  },
  methods: {
    clickHandle() {
      console.log('>>>>>>>>>>>>sdfsdfsdf>');
    },
    sendFillMessage(item) {
      console.log('Send >> ', item, window.document.querySelector('#username'));
      console.log('Host>>', window.location.href);
      postMsgToPage(item);
      console.log('Host>>', window.location.host);
    },
  },
  beforeCreate() {
    console.log('Create App>>>>>>>>>', chrome.runtime);
  },
  mounted() {},
};
</script>
<style>
.icon-bg {
  width: 28px;
  height: 28px;
  display: block;
  float: left;
  left: 50%;
  top: 15px;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border: solid 10px rgba(172, 209, 104, 0.02);
  box-shadow: 0 0 0 1px rgba(21, 131, 235, 0.06);
  box-sizing: border-box;
  animation: outerRipple 5s linear infinite;
}
</style>
