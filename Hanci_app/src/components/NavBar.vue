<template>
  <nav>
    <div class="nav-left">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/vocabulary">Vocabulary</router-link>
      <router-link to="/flashcards">Flashcards</router-link>
      <router-link to="/practice">Practice</router-link>
    </div>
    <ThemeToggle />
  </nav>
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.nav-left {
  display: flex;
  gap: 1rem;
}

nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

nav a:hover {
  color: var(--primary);
  background: var(--bg-surface);
}

nav a.router-link-exact-active {
  color: var(--text-primary);
  background: var(--primary);
}
</style>