//Import All
import App from './App.vue'
import store from './store'
import router from "./router"
import Antd from 'ant-design-vue'

//Import Css
import '../public/css/antd.css'
import '../public/css/main.css'

//Import Function
import { createApp } from 'vue'
import { initializeApp } from 'firebase/app';

//Firebase
const firebase = {
    apiKey: "AIzaSyAYv3sRY1Jq0PfQxW47XWApevKHP6d-Du8",
    authDomain: "tecla-528dd.firebaseapp.com",
    projectId: "tecla-528dd",
    storageBucket: "tecla-528dd.appspot.com",
    messagingSenderId: "698447747389",
    appId: "1:698447747389:web:f950fa7a82b234f77b0d54"
}

//Initialize
const app = createApp(App)
initializeApp(firebase)

//App
app.use(store)
    .use(router)
    .use(Antd)
    .mount('#app')
