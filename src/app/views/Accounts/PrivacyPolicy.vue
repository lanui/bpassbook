<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card elevation="0" class="mx-4 py-4">
          <v-card-title class="my-4">
            <logo size="60" />
            <span class="text-md-h2 mx-4">
              {{ $t('p.policy.title') }}
            </span>
          </v-card-title>
          <v-card-subtitle>
            <p class="text-md-h4">
              {{ $t('p.policy.subtitle') }}
            </p>
          </v-card-subtitle>
          <v-card-text>
            <div class="text-justify font-weight-medium">
              <p v-for="(text, idx) in advantage" class="secret" :key="idx">
                <v-icon small color="green">mdi-check</v-icon>
                <span class="ml-2 subtitle-1">
                  {{ text }}
                </span>
              </p>
              <v-divider class="my-2" />
              <p v-for="(text, id) in nevers" class="secret" :key="'nv_' + id">
                <v-icon small color="red darken-4">mdi-close</v-icon>
                <span class="ml-2 subtitle-1">
                  {{ text }}
                </span>
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="$router.push({ path: '/init/welcome' })"
              outlined
              x-large
              color="grey darken-1"
              class="mx-4 ma-6"
              min-width="160"
            >
              {{ $t('btn.noThanks') }}
            </v-btn>
            <v-btn @click="agreeHandler" outlined x-large color="indigo" class="mx-4 ma-6" min-width="160">
              {{ $t('btn.iAgree') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '@/widgets/ExtLogo.vue';

export default {
  name: 'AppAccountPrivacyPolicy',
  components: {
    Logo,
  },
  data() {
    return {
      advantage: [
        '密码已加密并存储在区块链上(当前测试版,本地存储)。',
        '台式机，移动设备多终端共享。',
        '将ECDSA算法与椭圆曲线secp256k1一起使用,加强账号安全',
      ],
      nevers: [
        '不会收集钥匙，地址，密码，天平，哈希或任何个人信息。',
        '不会收集您的IP地址。',
        '不会收集设备信息。',
        '永远不会为了盈利而出售数据。',
      ],
    };
  },
  methods: {
    agreeHandler() {
      this.$router.push({ path: '/creator/index' });
    },
  },
};
</script>
<style></style>
