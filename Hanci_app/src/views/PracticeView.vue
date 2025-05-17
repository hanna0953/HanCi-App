<template>
  <div class="practice-view">
    <h1>Practice</h1>
    
    <div class="practice-options">
      <router-link to="/practice/characters" class="practice-card">
        <h2>Characters</h2>
        <p>Practice writing Chinese characters</p>
      </router-link>
      
      <router-link to="/practice/pronunciation" class="practice-card">
        <h2>Pronunciation</h2>
        <p>Practice speaking and tones</p>
      </router-link>
      
      <router-link to="/practice/listening" class="practice-card">
        <h2>Listening</h2>
        <p>Practice comprehension</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.practice-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.practice-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  text-decoration: none;
  color: var(--text-dark);
  transition: transform 0.2s ease;
}

.practice-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.practice-card h2 {
  margin: 0 0 0.5rem 0;
  color: var(--primary);
}

.practice-card p {
  margin: 0;
  color: var(--text-tertiary);
}
</style>