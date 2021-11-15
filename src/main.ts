import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import  'ant-design-vue/dist/antd.css'

import "@/assets/css/common.css"
import "github-markdown-css/github-markdown-light.css"

import "leaflet/dist/leaflet.css"

createApp(App).use(router).use(Antd).mount('#app')
