<template>
  <v-container class="fill-height">
    <v-row class="text-center">
      <v-col cols="12">
        <div class="text-h5">
          {{$t('l.options')}}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-1"></v-divider>
    </v-row>
    <v-row>
      <v-col cols="12">
      <v-card
        :elevation="0"
        class="mx-0">
        <v-list >
          <v-list-item class="px-0">
            <v-list-item-title>
              <v-row no-gutters style="flex-wrap: nowrap;">
                <v-col cols="auto"
                  class="flex-grow-1 flex-shrink-0">
                  Auto locked minutes
                </v-col>
                <v-col cols="auto"
                  class="body-2 flex-grow-0 flex-shrink-1">
                   {{lockedTimeSelected}}
                </v-col>
              </v-row>
            </v-list-item-title>

            <v-list-item-icon>
              <v-btn icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-btn>

            </v-list-item-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="px-0">
            <v-list-item-title>
              Help
            </v-list-item-title>
            <v-list-item-action>
              <v-btn icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-btn>

            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-card>
      </v-col>

    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          :elevation="0"
          class="mx-0 mt-2">
          <v-list class="px-0">
            <v-list-item class="px-0">
              <v-list-item-title>
                Version
              </v-list-item-title>
              <v-spacer></v-spacer>
              <v-list-item-action class="pr-8">
                  <v-btn rounded color="grey" small>
                    0.1.0
                    <v-icon right>mdi-chevron-right</v-icon>
                  </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="fill-height">
      <v-card :elevation="0">
        <v-card-title>
          <div class="h5-text">
            实时财报
          </div>
        </v-card-title>
        <v-card-text>
          0xFd30d2c32E6A22c2f026225f1cEeA72bFD9De865
        </v-card-text>
        <v-card-actions>
          <v-btn rounded color="primary" small>
            在区块链上显示
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>

      </v-card>
    </v-row>
    <goback-btn />
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

import GobackBtn from '@/widgets/GobackButton.vue'


export default {
  name: 'PopupConfigIndex',
  components:{
    GobackBtn,
  },
  computed: {
    ...mapGetters('settings',[
      'lockedTimeSelected'
    ])
  },
  data() {
    return {
      items:[
        {
          name:"timeout",
          text:"Auto locked minutes",
          path:""
        },
        {
          name:"help",
          text:"Help",
          path:""
        },
      ]
    }
  },
};
</script>
<style>
</style>
