<template>
  <v-container class="fill-height">
    <v-row justify="center" class="fill-height">
      <v-col cols="10" class="fill-height bg-container px-0 py-0">
        <v-container>
          <v-row justify="center" class="text-center">
            <div v-if="isUnlocked">已保存的密码</div>
            <v-btn v-if="!isUnlocked" @click="showUnlockDialog" text color="bpgray" class="btn-unlock">
              请先解锁BPassword
            </v-btn>
          </v-row>
          <v-row class="my-2 mb-4">
            <v-col cols="12">
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">网站</th>
                    <th class="text-left">用户名</th>
                    <th class="text-left">密码</th>
                    <th class="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in webItems" :key="item.tips" :ref="'bprow-' + idx">
                    <td>
                      {{ item.hostname }}
                    </td>
                    <td>
                      {{ item.username }}
                    </td>
                    <td>
                      <input
                        :type="Boolean(item.showpwd) ? 'text' : 'password'"
                        :value="item.password"
                        class="input-pwd-show"
                      />
                    </td>
                    <td class="text-right">
                      <div class="cell-operation">
                        <v-icon small @click="toggleShowPwd(item)" class="mr-2">
                          {{ Boolean(item.showpwd) ? 'mdi-eye' : 'mdi-eye-off' }}
                        </v-icon>
                        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-snackbar :timeout="4000" v-model="showNotify" absolute centered :color="notifyColor" outlined>
      {{ notifyMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="notifyColor" text v-bind="attrs" @click="showNotify = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'Vuex';

import WhispererController from '@/lib/controllers/whisperer-controller';
import { APITYPE_DELETE_WEBSITE_ITEM } from '@/lib/cnst/api-cnst';

export default {
  name: 'P4HomeIndex',
  computed: {
    ...mapGetters('passbook', ['webItems']),
    ...mapGetters(['isUnlocked']),
  },
  data() {
    return {
      dialog: '',
      error: '',
      showNotify: false,
      processing: false,
      notifyColor: 'success',
      notifyMessage: '',
      items: [],
    };
  },
  methods: {
    initTestItems() {},
    toggleShowPwd(item) {
      this.$store.dispatch('passbook/toggleWebItemShowpwd', item);
    },
    deleteItem(item) {
      // this.showNotifier('osodfsd',true)
      // return ;
      try {
        if (!item || !item.tips) return;
        this.processing = true;
        const whisperer = new WhispererController({ name: 'Website-whisperer', includeTlsChannelId: true });
        whisperer
          .sendSimpleMsg(APITYPE_DELETE_WEBSITE_ITEM, item)
          .then(async (initState) => {
            await this.$store.dispatch('updateInitState', initState);
            this.showNotifier('删除成功.', false);
          })
          .catch(async (error) => {
            const errMsg = typeof error === 'object' && error.message ? error.message : '删除失败';
            this.error = errMsg;
            this.showNotifier(errMsg, true);
          });
      } catch (error) {
        this.processing = false;
      }
    },
    showNotifier(msg, failed) {
      this.showNotify = true;
      this.notifyMessage = msg;
      if (failed) {
        this.notifyColor = 'indigo accent-2';
      } else {
        this.notifyColor = 'success';
      }
    },
    showUnlockDialog() {},
    unlockBpassword() {},
  },
  mounted() {
    this.initTestItems();
  },
};
</script>
<style>
.bg-container {
  background: #ffffff;
  border-radius: 16px;
  margin-top: -28px;
}

thead {
  background-color: rgba(243, 243, 243, 1);
}

button.btn-unlock > span.v-btn__content {
  color: rgba(69, 138, 249, 0.95);
}

.v-btn:hover {
  color: rgba(69, 138, 249, 1);
}

.v-btn.bpgray--text:hover {
  color: rgba(69, 138, 249, 1) !important;
}
</style>
