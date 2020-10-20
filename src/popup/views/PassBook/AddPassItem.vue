<template>
  <v-container class="px-0 py-0">
    <subnav-bar :gobackCall="gobackHandle" :title="$t('p.passbook.addItemTitle')" />

    <v-row justify="center">
      <v-col cols="10" class="mt-4">
        <div class="title-show text-center my-2">
          <span class="mr-2">{{ $t('l.title') }}:</span>{{ data.tips }}
        </div>
        <v-form ref="addSiteItemForm">
          <!-- <v-text-field
            v-model="data.tips"
            :label="$t('l.title')"
            outlined
            rounded
            :disabled="true"
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          /> -->

          <v-text-field
            v-model="data.hostname"
            :label="$t('l.domain')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.hostname"
            :error-messages="error"
            dense
          />
          <v-text-field
            v-model="data.suffix"
            :label="$t('l.tips')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.suffix"
            :error-messages="error"
            dense
          />
          <v-text-field
            v-model="data.username"
            :label="$t('l.username')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            v-model="data.password"
            :label="$t('l.password')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            :counter="true"
            dense
          />
        </v-form>
      </v-col>
      <v-col cols="10">
        <v-btn @click="saveHandle" block rounded :loading="ctrl.loading" color="primary" dark>
          {{ $t('btn.save') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" class="fill-height">
      <v-col cols="10">
        <v-sheet outlined elevation="2" class="px-4 py-4 rounded-lg">
          <div class="size-xsmall">
            温馨提示:为了你的数据安全,不建议在提示信息里出现账号或密码信息.
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_ADD_WEBSITE_ITEM } from '@/lib/cnst/api-cnst.js';
import { validItem, titleSuffixRules, hostnameRules, trimProps } from '@/ui/constants/valid-rules';

import SubnavBar from '@/popup/widgets/SubnavBar.vue';

// import { ARROW_LEFT_MDI, LOCKED_LINK_MDI } from '@/ui/constants/icon-cnsts.js';

export default {
  name: 'AddPassbookItem',
  components: {
    SubnavBar,
  },
  computed: {
    ...mapGetters('settings', ['icons']),
  },
  data() {
    return {
      data: {
        hostname: '',
        tips: '',
        username: '',
        password: '',
        suffix: '',
      },
      ctrl: {
        loading: false,
      },
      error: '',
      rules: {
        required: [(v) => (!!v && v.trim().length > 0) || 'required'],
        suffix: titleSuffixRules,
        hostname: hostnameRules,
      },
    };
  },
  methods: {
    resetForm() {
      this.data.tips = '';
      this.ctrl.loading = false;
      this.$refs.addSiteItemForm.reset();
    },
    gobackHandle() {
      this.resetForm();
      this.$router.go(-1);
    },
    saveHandle() {
      if (this.$refs.addSiteItemForm.validate()) {
        const item = trimProps(this.data);

        const whisperer = new WhispererController({ name: 'Website-whisperer', includeTlsChannelId: false });

        this.ctrl.loading = true;
        whisperer
          .sendSimpleMsg(APITYPE_ADD_WEBSITE_ITEM, item)
          .then(async (initState) => {
            await this.$store.dispatch('updateInitState', initState);
            this.ctrl.loading = false;
            this.gobackHandle();
          })
          .catch((err) => {
            this.ctrl.loading = false;
            this.error = typeof err === 'object' && err.message ? err.message : err.toString();
            setTimeout(() => {
              this.error = '';
            }, 6000);
          });
      }
    },
  },
  mounted() {
    this.data.tips = '';
  },
  watch: {
    'data.hostname': function (val) {
      const parts = [];
      if (val !== undefined && val !== null && (val + '').trim().length > 0) {
        parts.push((val + '').trim());
      }

      const suffix = this.data.suffix;
      if (suffix !== undefined && (suffix + '').trim().length > 0) {
        parts.push((suffix + '').trim());
      }

      if (parts.length) {
        this.data.tips = parts.join(';');
      }
    },
    'data.suffix': function (val) {
      const parts = [];
      const hostname = this.data.hostname;
      if (hostname !== undefined && (hostname + '').trim().length > 0) {
        parts.push((hostname + '').trim());
      }
      if (val !== undefined && val !== null && (val + '').trim().length > 0) {
        parts.push((val + '').trim());
      }

      if (parts.length) {
        this.data.tips = parts.join(';');
      }
    },
  },
};
</script>
<style></style>
