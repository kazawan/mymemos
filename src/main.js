import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import kazaUI from 'kaza-ui'
import 'kaza-ui/lib/style.css'
import Axios from 'axios'
import './assets/main.css'
import counter from './stores/index.js'
// import token from './stores/index.js'
const app = createApp(App)
app.config.globalProperties.Axios = Axios
app.config.globalProperties.ApiUrl = 'http://192.168.3.123:3000'
app.use(createPinia())

app.use(counter)


app.use(router)
app.use(kazaUI)
app.mount('#app')
