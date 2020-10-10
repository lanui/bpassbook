<template>
  <v-container class="px-0 py-0">
    <v-system-bar dark color="primary" :height="40" :lights-out="false" :window="true">
      <v-icon @click.stop="gobackHandle" larage>
        {{ icons.left }}
      </v-icon>
      <span>
        {{ $t('p.passbook.addItemTitle') }}
      </span>
      <v-spacer></v-spacer>

      <v-icon>{{ icons.keystone }}</v-icon>
    </v-system-bar>

    <v-row justify="center">
      <v-col cols="10" class="mt-4">
        <v-form ref="passItemForm">
          <v-text-field
            v-model="item.tips"
            :label="$t('l.tips')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            v-model="item.username"
            :label="$t('l.username')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            v-model="item.password"
            :label="$t('l.password')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            :counter="true"
            dense
          />
          <div v-if="Boolean(error)" class="red--text text-center font-xsmall">
            {{ error }}
          </div>
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
import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_INPUTOR_ADDITEM } from '@/lib/cnst/api-cnst.js';
import { validMobItem, trimProps } from '@/ui/constants/valid-rules';

import { ARROW_LEFT_MDI, LOCKED_LINK_MDI } from '@/ui/constants/icon-cnsts.js';
export default {
  name: 'AddMobileItem',
  data() {
    return {
      icons: {
        left: ARROW_LEFT_MDI,
        keystone: LOCKED_LINK_MDI,
      },
      item: {
        title: '',
        username: '',
        password: '',
      },
      ctrl: {
        loading: false,
      },
      error: '',
      rules: {
        required: [(v) => (!!v && v.trim().length > 0) || 'required'],
      },
    };
  },
  methods: {
    gobackHandle() {
      this.$refs.passItemForm.reset();
      this.$router.go(-1);
    },
    saveHandle() {
      if (this.$refs.passItemForm.validate()) {
        let item = this.item;
        try {
          item = trimProps(item);
          validMobItem(item);
          this.ctrl.loading = true;
        } catch (error) {
          setTimeout(() => {
            this.error = error;
          }, 5000);
        }
      }
    },
    resetForm() {
      this.item = Object.assign({
        tips: '',
        username: '',
        password: '',
      });
    },
  },
  mounted() {},
  watch: {
    'item.username': function (val) {},
  },
};
</script>
<style></style>
