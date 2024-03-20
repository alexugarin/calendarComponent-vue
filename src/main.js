import { createApp } from 'vue'
import App from './App.vue'
import {state, dispatch} from './store/store.js'

createApp(App).provide('store', {state, dispatch}).mount('#app')
