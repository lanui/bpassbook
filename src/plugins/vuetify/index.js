import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'

import Vuetify, { VLayout } from 'vuetify/lib'

/**
 * Vuetify
 */
const vuetifyOpts = {
  theme: {
    options: {

    },
    dark: false,
  },
  icons: {
    iconfont: 'mdi',
  },
}

Vue.use(Vuetify, {
  components: {
    VLayout
  }
})

export default new Vuetify(vuetifyOpts)
