import { createApp } from 'vue'
import App from './App.vue'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

//axios
import axios from './utils/http'
const app = createApp(App)

app.config.globalProperties.$http = axios



app.mount('#app')
