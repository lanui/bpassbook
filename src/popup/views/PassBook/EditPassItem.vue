<template>
  <v-container class="px-0 py-0">
    <v-system-bar dark color="primary" :height="40" :lights-out="false" :window="true">
      <v-icon @click.stop="$router.go(-1)" larage>
        {{ icons.left }}
      </v-icon>
      <span>{{ $t('p.passbook.editItemTitle') }}</span>
      <v-spacer></v-spacer>

      <v-icon>{{ icons.keystone }}</v-icon>
    </v-system-bar>

    <v-row justify="center">
      <v-col cols="10" class="mt-4">
        <v-form ref="passItemForm">
          <v-text-field
            v-model="passbook.hostname"
            :label="$t('l.domain')"
            outlined
            rounded
            disabled
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            v-model="passbook.tips"
            :label="$t('l.tips')"
            disabled
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />

          <v-text-field
            v-model="passbook.username"
            :label="$t('l.username')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            dense
          />
          <v-text-field
            v-model="passbook.password"
            :label="$t('l.password')"
            outlined
            rounded
            :clearable="true"
            :loading="ctrl.loading"
            :rules="rules.required"
            :counter="true"
            :type="ctrl.showpwd ? 'text' : 'password'"
            :append-icon="ctrl.showpwd ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="togglePwd"
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
import { ARROW_LEFT_MDI, LOCKED_LINK_MDI } from '@/ui/constants/icon-cnsts.js';
import MessageController from '@/popup/controllers/message-controller';
export default {
  name: 'EditPassbookItem',
  computed: {
    ...mapGetters('p3', ['passbook']),
  },
  data() {
    return {
      icons: {
        left: ARROW_LEFT_MDI,
        keystone: LOCKED_LINK_MDI,
      },
      item: {
        hostname: '',
        origin: '',
        tips: '',
        username: '',
        password: '',
      },
      ctrl: {
        loading: false,
        showpwd: false,
      },
      rules: {
        required: [(v) => !!v || 'required'],
      },
    };
  },
  methods: {
    togglePwd() {
      this.ctrl.showpwd = !this.ctrl.showpwd;
    },
    saveHandle() {
      if (!this.$refs.passItemForm.validate()) {
        return;
      }
      const item = this.passbook;
      const controller = new MessageController();
      this.ctrl.loading = true;
      controller
        .updatePassbookItem(item)
        .then(async (initState) => {
          await this.$store.dispatch('updateInitState', initState);
          await this.$store.dispatch('p3/updateTransferPassbook', {});
          this.ctrl.loading = false;
          this.$router.go(-1);
        })
        .catch(async (initState) => {
          await this.$store.dispatch('updateInitState', initState);
          this.ctrl.loading = false;
        });
    },
  },
  mounted() {
    const params = this.$store.getters['passbook'];
    console.log('>>>>>>>addPassbook>>>>>>>', params);
    this.item = Object.assign({}, this.item, params);
  },
};
</script>
<style></style>
