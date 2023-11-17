import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupDirective } from './directive'

const app = createApp(App)

setupDirective(app)

app.use(router).mount('#app')
