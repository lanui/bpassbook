<template>
  <v-container>
    <v-row class="fill-height text-center">
      <v-col cols="10">
        <v-card class="mx-auto" light>
          <v-img height="220px" :src="bgline" class="align-center justify-content-center">
            <!-- <v-row class="text-center fill-height ">
              <v-col class="align-items-end pb-0"> -->
                <h1 class="mb-4">
                  BASChain Tilte
                </h1>
              <!-- </v-col>

            </v-row> -->
          </v-img>
          <v-stepper
            :non-linear="true"
            vertical v-model="step">
            <v-stepper-header>
              <v-stepper-step
                color="grey darken-2"
                editable
                edit-icon="mdi-account"
                complete-icon="mdi-account"
                :complete="step > 1" step="1">

              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                color="grey darken-2"
                editable
                edit-icon="mdi-airplane"
                complete-icon="mdi-airplane"
                :complete="step > 2" step="2">
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                color="grey darken-2"
                editable
                edit-icon="mdi-ethereum"
                complete-icon="mdi-ethereum"
                :complete="step > 3" step="3"></v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                color="grey darken-2"
                editable
                edit-icon="mdi-check"
                complete-icon="mdi-check"
                :complete="step > 4" step="4"></v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" min-height="120px">
                  <v-form>
                    <v-text-field label="From"
                       append-icon="mdi-check" color="green"/>
                    <v-text-field label="To"
                      append-icon="mdi-check" color="green" />
                    <v-text-field label="Travel Date"
                      append-icon="mdi-check" color="green"/>
                  </v-form>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card class="mb-12" min-height="120px">
                  <v-form>
                    <v-text-field label="Select your flight"
                      append-icon="mdi-check" color="green" />
                    <v-text-field label="Customize your policy"
                      append-icon="mdi-check" color="green" />
                  </v-form>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card class="mb-12" min-height="120px">
                  <v-form>
                    <v-text-field append-icon=""></v-text-field>
                    <v-text-field append-icon=""></v-text-field>
                    <v-text-field append-icon=""></v-text-field>
                  </v-form>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-card class="mb-12" min-height="120px">
                  <v-form>
                    <v-text-field append-icon=""></v-text-field>
                    <v-text-field append-icon=""></v-text-field>
                    <v-text-field append-icon=""></v-text-field>
                  </v-form>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="5">
                <v-card class="mb-12" min-height="120px">
                  <v-row class="fill-height">
                    <v-col class="mb-12">
                      <div>
                        Success
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row>
              <v-col class="justify-content-between">
                <v-btn rounded color="grey darken-1" dark>
                  <v-icon left>mdi-arrow-left-bold</v-icon>Previous
                </v-btn>
                <v-btn
                  @click="next"
                  rounded  color="grey darken-2" class="mx-6" dark>
                   Next<v-icon right>mdi-arrow-right-bold</v-icon>
                </v-btn>
              </v-col>
            </v-row>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bgline from '@/assets/img/airline.png'
export default {
  name:"AppHomeIndex",
  data() {
    return {
      bgline:bgline,
      step:1
    }
  },
  methods: {
    next(){
      const cur = this.step
      if(cur<=4){
        this.step = cur +1
      }else{
        this.step = cur
      }
    },
    previous(){
      const cur = this.step
      if(cur>=1){
        this.step = cur -1
      }else{
        this.step = cur
      }
    }
  },
}
</script>
<style>

</style>
