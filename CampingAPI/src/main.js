

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Carousel from '@chenfengyuan/vue-carousel';

const app = createApp(App)

app.use(router)

app.mount('#app')
