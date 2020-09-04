<template>
  <v-card class="mx-auto px-2"
    outlined>
    <v-card-title class="flex-column">
      <div class="text-h1">
        {{congemoji}}
      </div>
      <p class="text-h2">
         Congratulations
      </p>

    </v-card-title>
    <v-card-text>

    </v-card-text>
    <v-card-actions>
      <v-row justify="center">
        <v-col  class="text-center ">
          <v-btn outlined  color="indigo" class="mx-4 ma-6">
            Completed
            <v-icon left>
             mdi-check-all
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CreateStepForm1',
  data() {
    return {
      pwdHide:true,
      congemoji:'🎉',
      eip39:{
        seeds:"",
        password:"",
        confirmPassword:""
      }
    }
  },
};
</script>
<style>
</style>
