//Others
import App from './App.vue'
import router from "./router"
import { createApp } from 'vue'
import store from './store'
import Antd from 'ant-design-vue'
import { initializeApp } from 'firebase/app';

//Css
import '../public/css/antd.css'
import '../public/css/main.css'

//Firebase
const firebase = {
    apiKey: "AIzaSyD8q9lueJWy2VwW5pwNYnA7zhVSRC-aVSU",
    authDomain: "tecla96-9070b.firebaseapp.com",
    projectId: "tecla96-9070b",
    storageBucket: "tecla96-9070b.appspot.com",
    messagingSenderId: "431731585529",
    appId: "1:431731585529:web:ed29a39a56a8157c550d28"
}

initializeApp(firebase)
const app = createApp(App)

app.use(store)
    .use(router)
    .use(Antd)
    .mount('#app')

