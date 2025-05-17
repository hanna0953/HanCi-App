<template>
  <div class="dashboard">
    <h1>Chinese Study Dashboard</h1>
    
    <div class="stats">
      <div class="stat-card">
        <h3>Words Learned</h3>
        <p>127</p>
      </div>
      <div class="stat-card">
        <h3>Today's Practice</h3>
        <p>15/20</p>
      </div>
      <div class="stat-card">
        <h3>Streak</h3>
        <p>7 days</p>
      </div>
    </div>
    
    <div class="quick-actions">
      <router-link to="/flashcards" class="action-button">
        Review Flashcards
      </router-link>
      <router-link to="/practice" class="action-button">
        Start Practice
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats {
  display: flex;
  gap: 1rem;
}

.stat-card {
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.stat-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
  font-size: 1rem;
}

.stat-card p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-tertiary);
}

.quick-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  flex: 1;
  background: var(--primary);
  color: white;
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: bold;
}

.action-button:hover {
  background: var(--primary-light);
}
</style>