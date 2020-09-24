<template>
  <v-card class="mx-auto px-2" outlined>
    <v-card-title>
      {{ $t('p.creator.step2Title') }}
    </v-card-title>
    <v-form ref="EIP39" class="mx-2">
      <input type="hidden" v-model="mnemonics" ref="mnemonicsText" />
      <v-row class="d-flex">
        <v-col class="flex-grow-1 flex-shrink-0">
          <v-textarea
            dense
            outlined
            clearable
            disabled
            :placeholder="$t('l.mnemonicsPlaceHolder')"
            name="Seeds"
            rows="4"
            color="indigo"
            v-model="mnemonics"
            :value="mnemonics"
            :label="$t('l.mnemonics')"
            type="text"
          >
          </v-textarea>
        </v-col>
        <!-- @click="clipboradSeeds" -->
        <v-col class="flex-grow-0 flex-shrink-1 align-self-end pb-8">
          <v-btn ref="clipboardBtn" :data-clipboard-text="mnemonics" icon :disabled="!Boolean(mnemonics)">
            <v-icon>
              mdi-clipboard-text-multiple-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="">
      <v-row justify="center">
        <v-col class="text-center">
          <v-btn @click="stepTo(1)" outlined color="indigo" class="mx-4 ma-6">
            <v-icon left>
              mdi-chevron-double-left
            </v-icon>
            {{ $t('btn.previous') }}
          </v-btn>
          <v-btn @click="generateSeeds" :disabled="saved" outlined color="indigo" class="mx-4 ma-6">
            {{ $t('btn.generate') }}
          </v-btn>
          <v-btn @click="stepTo(3)" outlined color="indigo" class="mx-4 ma-6">
            {{ $t('btn.next') }}
            <v-icon right>
              mdi-chevron-double-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-snackbar :timeout="4000" v-model="showNotifier" centered :elevation="1">
      {{ notifyMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text icon v-bind="attrs" @click="showNotifier = false">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import Clipboard from 'clipboard';
export default {
  name: 'CreateStepFormTwo',
  data() {
    return {
      pwdHide: true,
      mnemonics: '',
      showNotifier: false,
      notifyMessage: 'Mnemonic words Copied.',
    };
  },
  methods: {
    generateSeeds() {
      this.$emit('generateSeeds', this);
    },
    stepTo(n) {
      this.$emit('stepClick', n);
    },
    clipboradSeeds() {
      console.log(this.$refs.mnemonicsText);
      const $el = this.$refs.mnemonicsText.$el.querySelector('textarea');

      if (this.mnemonics && $el) {
        $el.select();
        document.execCommand('copy');
        this.showNotifier = true;
      }
    },
    initClipboard() {
      const clip = new Clipboard(this.$refs.clipboardBtn.$el);

      clip.on('success', (e) => {
        this.showNotifier = true;
      });
    },
  },
  mounted() {
    this.initClipboard();
    this.$emit('initMnemonic', this);
  },
  props: {
    saved: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style></style>
