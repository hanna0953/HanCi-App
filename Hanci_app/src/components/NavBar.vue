<template>
  <nav>
    <div class="nav-left">
    <div class="app-name">HAN词</div>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/vocabulary">Vocabulary</router-link>
      <router-link to="/flashcards">Flashcards</router-link>
      <router-link to="/practice">Practice</router-link>
      <router-link to="/manage-flashcards">Manage Flashcards</router-link>
    </div>
    <ThemeToggle />
  </nav>
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<style scoped>

.app-name {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--primary);
  margin-right: 2rem;
  letter-spacing: -0.5px;
}

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
  color: white;
  background: var(--primary);
}
</style>