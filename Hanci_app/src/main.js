import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

// Load theme after app creation
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
themeStore.isDarkMode = localStorage.getItem('theme') === 'dark'