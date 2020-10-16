<template>
  <v-container class="fill-height">
    <v-row justify="center" class="fill-height">
      <v-col cols="10" class="fill-height bg-container px-0 py-0">
        <v-container>
          <v-row justify="center" class="text-center">
            <div>
              已保存的密码
            </div>
          </v-row>
          <v-row class="my-2 mb-4">
            <v-col cols="12">
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">
                      网站
                    </th>
                    <th class="text-left">
                      用户名
                    </th>
                    <th class="text-left">
                      密码
                    </th>
                    <th class="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in items" :key="item.tips" :ref="'bprow-' + idx">
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
  </v-container>
</template>

<script>
export default {
  name: 'HomeIndex',
  computed: {},
  data() {
    return {
      items: [],
    };
  },
  methods: {
    initTestItems() {
      const items = [];
      for (let i = 0; i < 10; i++) {
        items.push({
          tips: 'title-' + i,
          username: 'sfdsf' + i,
          password: '000024',
          hostname: i % 2 == 0 ? 'login.jd.com' : 'login.taobao.com',
          showpwd: false,
        });
      }
      this.items = items;
    },
    toggleShowPwd(item) {
      item.showpwd = !item.showpwd;
    },
    deleteItem(item) {},
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
</style>
