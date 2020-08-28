import Vue from 'vue'

import VueI18n from 'vue-i18n'

import zh from './zh_CN'
import en from './en_US'

import vuetify from './vuetify'

import { DEFAULT_LOCALE } from '@/corejs/settings'

Vue.use(VueI18n)

const messages = {
  en : {
    ...en,
    $vuetify:vuetify.en
  },
  zh : {
    ...zh,
    $vuetify:vuetify.zh
  }
}

export const i18n = new VueI18n({
  locale:'zh',
  fallbackLocale: DEFAULT_LOCALE,
  messages
})

/**
 *
 * @param {*} locale
 */
export async function setLocale(locale) {
  if(i18n.locale !== locale){
    i18n.locale = locale || DEFAULT_LOCALE
  }

  return i18n.locale
}

export const locales = [
  {
    title: "English",
    locale: "en",
    abbr: 'ENG',
  },
  {
    title: "中文",
    locale: "zh",
    abbr: 'CHN',
  },
]

export default i18n
