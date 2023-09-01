import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery';
import Player from '@vimeo/player';

//import "bootstrap/dist/css/bootstrap.min.css" // 一定要引入，編譯過後的css(若沒有自己的_variable.scss)
import "./assets/scss/all.scss";
import "bootstrap";  // 一定要引入，包含bootstrap的JS


window.Player = Player;

const app = createApp(App)

app.use(router)

app.mount('#app')
