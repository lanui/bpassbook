<template>
  <v-card :elevation="0"
    class="mx-0 fill-height px-0" width="100%">
    <v-list two-list
      class="token-list-wrapper px-0">
      <v-divider></v-divider>
      <v-list-item
        v-for="(item,idx) in tokens"
        @click="tokenSelected"
        :key="idx">
        <v-list-item-avatar>
          <v-icon>{{item.mdi}}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{item.symbol}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{item.balance}}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-list-item-action class="py-1">
          <v-btn @click.stop="getBalance(item.hash)"
            outlined rounded x-small
            class="my-1">
            {{item.txbtn}}
          </v-btn>
          <v-btn @click.stop="getBalance(item.hash)"
            outlined rounded x-small
            class="my-1">
            Get Balance
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'TokenPannel',
  data() {
    return {
      tokens:[
        {
          hash:"eth",
          symbol:'ETH',
          mdi:"mdi-ethereum",
          balance:"12.3450",
          txbtn:"Send"
        },
        {
          hash:"bts",
          symbol:'BTs',
          mdi:"mdi-diamond-stone",
          balance:"2001",
          txbtn:"Buy"
        }
      ]
    }
  },
  methods: {
    tokenSelected(hash){

    },
    getBalance(hash){

    }
  },
};
</script>
<style>
</style>
