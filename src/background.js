import store from './store';

global.browser = require('webextension-polyfill');

global.$store = store

// alert(`Hello ${store.getters.foo}!`);
