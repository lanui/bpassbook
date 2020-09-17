<template>
  <v-app>
    <v-main>
      <v-card elevation="0" class="text-center mx-0">
        <v-card-subtitle class="text-center mx-0 px-0 py-0">
          <v-row justify="center">
            <v-col cols="10" class="px-0 py-1">
              <div class="icon-bg"></div>
              <v-avatar size="22">
                <img :src="icon" alt="BPassword" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <v-row justify="center">
          <v-col cols="10">
            <div>
              按下
              <span class="mx-1 xsmall">
                Ctrl+Shift+K
              </span>
              来解锁
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import icon from '@/icons/icon_128.png';
export default {
  name: 'Inputor',
  data() {
    return {
      icon: icon,
    };
  },
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
  border: solid 10px rgba(0, 0, 0, 0.02);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  animation: outerRipple 5s linear infinite;
}
</style>
