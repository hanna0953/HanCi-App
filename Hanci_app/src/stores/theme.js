import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)

  // Load saved theme from localStorage
  if (typeof localStorage !== 'undefined') {
    isDarkMode.value = localStorage.getItem('theme') === 'dark'
  }

  // Watch for changes and update DOM
  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  })

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
  }

  return { isDarkMode, toggleTheme }
})