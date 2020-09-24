<template>
  <v-virtual-scroll :items="datas" item-height="58" height="260">
    <template v-slot="{ item }">
      <v-list-item @click="selectItem" dense>
        <v-list-item-content dense class="text-left">
          <v-list-item-title>
            <template>
              <div>
                {{ shortAddress(item.tx) }}
              </div>
            </template>
          </v-list-item-title>
          <v-list-item-subtitle :class="transStatusColor(item.status)">
            <template>
              <span>{{ item.status }}</span>
              <v-icon small :color="transStatusIconCls(item.status)">
                {{ transStatusIcon(item.status) }}
              </v-icon>
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon color="deep-purple accent-2" @click="etherscanView(item.tx)">
            <v-icon>
              mdi-comment-eye-outline
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-virtual-scroll>
</template>

<script>
import { compressAddress, etherscanUrl } from '@/utils';
export default {
  name: 'ActivityList',
  data() {
    return {
      datas: [
        // {
        //   logo:"https://www.baschain.cn/static/favicon.ico",
        //   tx:"0x685f6ad5a8e5de4d6a06e10574621f8b5c0ecd5965074702cdc8a197330cf9c0",
        //   from:"0xc0E6a6F90D4Cd02F13447565171Fea4bf91D73A8",
        //   iconClass:"",
        //   syncIcon:"",
        //   edit:true,
        //   text:'',
        //   status:'pending',
        // },
        // {
        //   logo:"",
        //   tx:"0xb843d77add8c51b41534de2a385f5207ff971a536ed3772dcd0fbf9d8b239a45",
        //   from:"0xc0E6a6F90D4Cd02F13447565171Fea4bf91D73A8",
        //   iconClass:"",
        //   syncIcon:"",
        //   edit:true,
        //   text:'',
        //   status:'success',
        // },
        // {
        //   logo:"",
        //   tx:"0xf3696d8f5f735374a04a66f6aa3a8699a25be68776501ded6abd501c34fbf47d",
        //   from:"0xc3892fe74b7466869e87e077a41e651ec8175d3e",
        //   iconClass:"",
        //   syncIcon:"",
        //   edit:true,
        //   text:'',
        //   status:'success',
        // },
        // {
        //   logo:"",
        //   tx:"0x685f6ad5a8e5de4d6a06e10574621f8b5c0ecd5965074702cdc8a197330cf9c0",
        //   from:"0xc0E6a6F90D4Cd02F13447565171Fea4bf91D73A8",
        //   iconClass:"",
        //   syncIcon:"",
        //   edit:true,
        //   text:'',
        //   status:'success',
        // },
        // {
        //   logo:"",
        //   tx:"0x3eee56ed12d7370399623375586bd17d95f3dd4cff619c4b50e6bf2a2dca29ce",
        //   from:"0xc0E6a6F90D4Cd02F13447565171Fea4bf91D73A8",
        //   iconClass:"",
        //   syncIcon:"",
        //   edit:true,
        //   text:'',
        //   status:'fail',
        // }
      ],
    };
  },
  methods: {
    selectItem(it) {
      console.log(it);
    },
    shortAddress(addr) {
      console.log(addr, compressAddress(addr));
      return compressAddress(addr);
    },
    transStatusIcon(status) {
      //mdi-shield-link-variant-outline
      //mdi-check-circle-outline
      //mdi-set-merge
      switch (status) {
        case 'pending':
          return 'mdi-set-merge';
        case 'success':
          return 'mdi-shield-link-variant-outline';
        case 'fail':
          return 'mdi-close-octagon-outline';
        default:
          return 'mdi-set-merge';
      }
    },
    transStatusIconCls(status) {
      //mdi-shield-link-variant-outline
      //mdi-check-circle-outline
      //mdi-set-merge
      switch (status) {
        case 'pending':
          return 'orange accent-3';
        case 'success':
          return 'green accent-4';
        case 'fail':
          return 'red darken-3';
        default:
          return 'orange accent-3';
      }
    },
    transStatusColor(status) {
      switch (status) {
        case 'pending':
          return 'orange--text text--accent-3';
        case 'success':
          return 'green--text text--accent-4';
        case 'fail':
          return 'red--text text--darken-3';
        default:
          return 'orange--text text--accent-3';
      }
    },
    etherscanView(tx) {
      const url = etherscanUrl({
        hex: tx,
        chainId: 3,
        type: 'tx',
      });
      if (chrome) {
        chrome.tabs.create({ active: true, url: url }, function (tab) {});
      }
    },
  },
};
</script>
<style></style>
