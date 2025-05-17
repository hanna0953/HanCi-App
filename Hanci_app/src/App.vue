<template>
  <NavBar />
  <router-view />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style>
:root {
  /* Light theme */
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --accent: #f59e0b;
  --success: #10b981;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #475569;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-surface: #f1f5f9;
  --border: #e2e8f0;

  /* Dark theme */
  &[data-theme="dark"] {
    --primary: #60a5fa;
    --primary-light: #3b82f6;
    --accent: #fbbf24;
    --success: #34d399;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --text-tertiary: #323436;
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-surface: #334155;
    --border: #475569;
  }
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

/* Component-specific styles */
.stat-card,
.word-card,
.practice-card,
.flashcard-front {
  background: var(--bg-surface);
  border: 1px solid var(--border);
}

.flashcard-back {
  background: var(--primary);
}

.nav a.router-link-exact-active {
  background: var(--primary);
}

.action-button {
  background: var(--primary);
}

.study-button {
  background: var(--primary-light);
}
</style>