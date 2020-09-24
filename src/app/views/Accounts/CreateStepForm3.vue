<template>
  <v-card class="mx-auto px-2" outlined>
    <v-card-title>
      {{ $t('p.creator.step3Title') }}
    </v-card-title>

    <v-card-text>
      <v-card class="my-2" min-height="80">
        <v-card-text>
          <v-chip
            close
            text-color="white"
            color="teal darken-1"
            v-for="(text, i) in mnemonics"
            @click:close="removeMnemonics(text)"
            class="ma-2"
            :key="'sel_' + i"
          >
            {{ text }}
          </v-chip>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="my-2">
        <v-card-title>
          {{ $t('p.creator.selectOrder') }}
        </v-card-title>
        <v-card-text>
          <v-chip
            dense
            v-for="(text, i) in sortableSeeds"
            @click="addMnemonics(text)"
            class="ma-2"
            color="grey"
            :key="i"
          >
            {{ text }}
          </v-chip>
        </v-card-text>
        <div class="mx-2 my-1 text-center" v-if="Boolean(remoteSaveError)">
          <p class="body-1 deep-orange--text">
            {{ remoteSaveError }}
          </p>
        </div>
        <div class="my-2 ml-4">
          <v-checkbox v-model="skipValid" :label="$t('p.creator.skipVerify')"> </v-checkbox>
        </div>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-row justify="center">
        <v-col class="text-center">
          <v-btn @click="previous(2)" :disabled="remoteSaving" outlined color="indigo" class="mx-4 ma-6">
            <v-icon left>
              mdi-chevron-double-left
            </v-icon>
            {{ $t('btn.previous') }}
          </v-btn>

          <v-btn @click="next(4)" :disabled="canStore" outlined color="indigo" class="mx-4 ma-6">
            <v-progress-circular
              v-if="remoteSaving"
              indeterminate
              :size="22"
              :width="2"
              color="primary"
            ></v-progress-circular>
            <span class="ml-1">{{ $t('btn.next') }}</span>
            <v-icon right>
              mdi-chevron-double-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CreateStepFormThree',
  computed: {
    ...mapGetters('app', ['remoteSaving', 'remoteSaveError']),
    sortableSeeds() {
      const dseeds = this.originSeeds || [];
      return dseeds.sort();
    },
    canStore() {
      if (!this.skipValid) {
        return !this.pwd || !this.seedStr || this.mnemonics.join(' ') !== this.seedStr;
      } else {
        return !this.pwd || !this.seedStr;
      }
    },
  },
  data() {
    return {
      pwdHide: true,
      comments: '',
      seedStr: '',
      pwd: '',
      mnemonics: [],
      originSeeds: [],
      skipValid: false,
      loading: false,
    };
  },
  methods: {
    previous(id) {
      this.$emit('stepClick', id);
    },
    async next(id) {
      await this.$emit('saveWallet');
    },
    addMnemonics(text) {
      const index = this.originSeeds.findIndex((v) => v === text);
      if (index >= 0) {
        this.originSeeds.splice(index, 1);
        this.mnemonics.push(text);
      }
    },
    removeMnemonics(text) {
      const idx = this.mnemonics.findIndex((v) => v === text);
      console.log('remove', text, idx);
      if (idx >= 0) {
        this.mnemonics.splice(idx, 1);
        if (!this.originSeeds.includes(text)) {
          this.originSeeds.push(text);
        }
        this.originSeeds.sort();
      }
    },
    updateLoading(loading) {
      this.loading = loading;
    },
  },
  mounted() {
    this.$emit('initSeeds', this);
    this.loading = false;
  },
  props: {
    creating: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
<style></style>
