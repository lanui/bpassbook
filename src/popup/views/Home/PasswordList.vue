<template>
  <v-virtual-scroll
    :items="datas"
    item-height="58"
    height="260">
    <template v-slot="{ item }">
      <v-list-item @click="selectItem"
        dense>
        <v-list-item-avatar outlined color="grey lighten-4">
          <v-img v-if="Boolean(item.logo)" :src="item.logo"/>
          <span class="deep-purple--text text--accent-2"
            v-if="!Boolean(item.logo) && item.title && item.title.length">
            {{item.title.length > 2 ? item.title.substr(0,2) : item.title}}
          </span>
        </v-list-item-avatar>

        <v-list-item-content class="text-left">
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon color="deep-purple accent-2">
            <v-icon>
              mdi-file-document-edit-outline
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-virtual-scroll>
</template>

<script>
/**
 * list-item 72px
 *
 */
export default {
  name: 'BPassword',

  data() {
    return {
      datas: [
        {
          logo:"https://www.baschain.cn/static/favicon.ico",
          title:"Gmail-lanbery",
          subtitle:"lanbery gmail.com",
          iconClass:"",
          syncIcon:"",
          edit:true,
          text:''
        },
        {
          logo:"",
          title:"QQ",
          subtitle:"lanbery qq.com",
          iconClass:"",
          syncIcon:"",
          edit:true,
          text:''
        },
        {
          logo:"",
          title:"Github",
          subtitle:"vni github.com",
          iconClass:"",
          syncIcon:"",
          edit:true,
          text:''
        },
        {
          logo:"",
          title:"weibo",
          subtitle:"你是谁",
          iconClass:"",
          syncIcon:"",
          edit:true,
          text:''
        },
        {
          logo:"",
          title:"哈哈哈",
          subtitle:"hshdfsad",
          iconClass:"",
          syncIcon:"",
          edit:true,
          text:''
        }
      ]
    }
  },
  methods: {
    selectItem(it) {

    }
  },
};
</script>
<style>
</style>
