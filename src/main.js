import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"

//import "@/assets/scss/main.scss"; //自己新增的
import "bootstrap"

const app = createApp(App)

app.use(router)

app.mount('#app')
