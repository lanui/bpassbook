<template>
  <v-container class="px-0 py-0">
    <v-system-bar dark color="primary" :height="40" :lights-out="false" :window="true">
      <v-icon @click.stop="$router.go(-1)" larage>
        {{ icons.left }}
      </v-icon>
      <span>Add Password</span>
      <v-spacer></v-spacer>

      <v-icon>{{ icons.keystone }}</v-icon>
    </v-system-bar>

    <v-row justify="center">
      <v-col cols="10" class="mt-4">
        <v-form ref="passItemForm">
          <v-text-field
            v-model="data.url"
            :label="'URL'"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            v-model="data.tips"
            :label="'Tips'"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />

          <v-text-field
            v-model="data.username"
            :label="'Username'"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            v-model="data.password"
            :label="'Password'"
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
          Save
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
import { ARROW_LEFT_MDI, LOCKED_LINK_MDI } from '@/ui/constants/icon-cnsts.js';
export default {
  name: 'AddPassbookItem',
  data() {
    return {
      icons: {
        left: ARROW_LEFT_MDI,
        keystone: LOCKED_LINK_MDI,
      },
      data: {
        url: '',
        tips: '',
        username: '',
        password: '',
      },
      ctrl: {
        loading: false,
      },
      rules: {
        required: [(v) => !!v || 'required'],
      },
    };
  },
  methods: {
    saveHandle() {
      if (this.$refs.passItemForm.validate()) {
        const item = this.data;
        console.log('data>>>>', item);
        this.ctrl.loading = true;
        this.$store
          .dispatch('passbook/addItem', item)
          .then((ret) => {
            console.log('save success', ret);
            setTimeout(() => {
              this.ctrl.loading = false;
              this.$refs.passItemForm.reset();
              this.$store.dispatch('passbook/reloadItemsFromLocal');
            }, 1000);
          })
          .catch((err) => {
            this.ctrl.loading = false;
          });
      }
    },
  },
};
</script>
<style></style>
