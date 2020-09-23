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
            v-model="data.origin"
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
import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_INPUTOR_ADDITEM } from '@/lib/cnst/api-cnst.js';
import { validItem } from '@/ui/constants/valid-rules';

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
        hostname: '',
        origin: '',
        tips: '',
        username: '',
        password: '',
      },
      ctrl: {
        loading: false,
      },
      error: '',
      rules: {
        required: [(v) => !!v || 'required'],
      },
    };
  },
  methods: {
    saveHandle() {
      if (this.$refs.passItemForm.validate()) {
        const item = Object.assign(
          {
            hostname: '',
          },
          this.data
        );
        console.log('data>>>>', item);

        try {
          validItem(item);
        } catch (e) {
          this.error = e;
          setTimeout(() => {
            this.error = '';
          }, 6000);
          return;
        }
        this.ctrl.loading = true;
        const whisperer = new WhispererController({ name: 'Inputor-whisperer', includeTlsChannelId: true });

        whisperer
          .sendSimpleMsg(APITYPE_INPUTOR_ADDITEM, item)
          .then(async (initstate) => {
            await this.$store.dispatch('updateInitState', initstate);
            this.ctrl.loading = false;
            this.$router.go(-1);
          })
          .catch((err) => {
            this.ctrl.loading = false;
            this.error = err;
            setTimeout(() => {
              this.error = '';
            }, 6000);
          });
        // this.$store
        //   .dispatch('passbook/addItem', item)
        //   .then((ret) => {
        //     console.log('save success', ret);
        //     setTimeout(() => {
        //       this.ctrl.loading = false;
        //       this.$refs.passItemForm.reset();
        //       //this.$store.dispatch('passbook/reloadItemsFromLocal');
        //     }, 1000);
        //   })
        //   .catch((err) => {
        //     this.ctrl.loading = false;
        //   });
      }
    },
  },
};
</script>
<style></style>
