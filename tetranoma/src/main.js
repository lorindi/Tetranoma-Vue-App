import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

const app = createApp(App)
const pinia = createPinia();

// Register PrimeVue globally
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
})

app.component("DataTable", DataTable)
app.component("Column", Column)
app.component("Button", Button)
app.component("Dialog", Dialog)
app.component("InputText", InputText)
app.component("Dropdown", Dropdown)

router.beforeEach((to, from, next) => {
  next()
})

app.use(router)
app.use(MotionPlugin);
app.use(Toast);
app.use(pinia);
app.mount('#app')