import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';

const app = createApp(App)
const pinia = createPinia();


app.use(router)
app.use(MotionPlugin);
app.use(Toast);
app.use(pinia);
app.mount('#app')
