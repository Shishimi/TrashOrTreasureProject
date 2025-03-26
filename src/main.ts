// import './assets/main.css'

import { createApp } from '../node_modules/vue'
import Home from './HomePage.vue'
import router from './router'

const app = createApp(Home)

app.use(router)

app.mount('#app')
