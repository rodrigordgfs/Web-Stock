import { Quasar } from 'quasar'
import { createApp } from 'vue'
import App from './App.vue'
import quasarUserOptions from './quasar-user-options'
import './registerServiceWorker'
import router from './router'
import { key, store } from "./store"

createApp(App).use(Quasar, quasarUserOptions).use(store, key).use(router).mount('#app')
