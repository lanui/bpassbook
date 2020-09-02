<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card elevation="0" class="mx-4 py-4">
          <v-card-title class="my-4">
            <logo size="60" />
            <span class="text-md-h2 mx-4">
              BPassword Privacy Policy
            </span>
          </v-card-title>
          <v-card-subtitle>
            <p class="text-md-h4">
              Help Us Improve BPassword
            </p>
          </v-card-subtitle>
          <v-card-text>
            <div class="text-justify font-weight-medium">
              <p v-for="(text,idx) in advantage"
                class="secret" :key="idx">
                <v-icon small color="green">mdi-check</v-icon>
                <span class="ml-2 subtitle-1">
                  {{text}}
                </span>
              </p>
              <v-divider class="my-2"/>
              <p v-for="(text,id) in nevers"
                class="secret" :key="'nv_'+id">
                <v-icon small color="red darken-4">mdi-close</v-icon>
                <span class="ml-2 subtitle-1">
                  {{text}}
                </span>
              </p>
            </div>

          </v-card-text>
          <v-card-actions>

            <v-btn @click="$router.push({path:'/init/welcome'})"
              outlined x-large
              color="grey darken-1" class="mx-4 ma-6" min-width="160">
              No Thanks
            </v-btn>
            <v-btn @click="agreeHandler"
              outlined x-large
              color="indigo" class="mx-4 ma-6" min-width="160">
              I Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import Logo from '@/widgets/ExtLogo.vue'

export default {
  name: 'AppAccountPrivacyPolicy',
  components:{
    Logo,
  },
  data() {
    return {
      advantage:[
        'The password is encrypted and stored on the blockchain.',
        'Desktop, mobile device multi-terminal sharing.',
        'Uses the ECDSA algorithm with elliptic curve secp256k1'
      ],
      nevers:[
        'Never collect keys,address,password,balances,hashes,or any personal information.',
        'Never collect your IP address.',
        'Never collect your device information.',
        'Never sell data for profit.Ever.'
      ]
    }
  },
  methods: {
    agreeHandler(){
      this.$router.push({path:'/creator/index'})
    },

  },
};
</script>
<style>
</style>
