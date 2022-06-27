//Others
import App from './App.vue'
import router from "./router"
import { createApp } from 'vue'
import store from './store'
import Antd from 'ant-design-vue'

//Css
import '../public/css/antd.css'
import '../public/css/main.css'

const app = createApp(App)

app.use(store)
    .use(router)
    .use(Antd)
    .mount('#app')

