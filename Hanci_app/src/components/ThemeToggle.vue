<template>
  <button class="theme-toggle" @click="toggleTheme">
    <span class="icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
    <span class="text">{{ isDarkMode ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDarkMode } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: var(--accent);
  transform: scale(1.05);
}

.icon {
  font-size: 1.2rem;
}

.text {
  font-weight: 500;
}
</style>