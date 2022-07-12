//Others
import App from './App.vue'
import store from './store'
import router from "./router"
import { createApp } from 'vue'
import Antd from 'ant-design-vue'

//Css
import '../public/css/antd.css'
import '../public/css/main.css'

const app = createApp(App)

//Statement
app.use(store)
    .use(router)
    .use(Antd)
    .mount('#app')

