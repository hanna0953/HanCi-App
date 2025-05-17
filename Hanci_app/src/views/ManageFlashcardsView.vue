<template>
  <div class="manage-view">
    <h1>Manage Flashcard Sets</h1>
    <FlashcardManager />
  </div>
</template>

<script setup>
import FlashcardManager from '@/components/FlashcardManager.vue'
</script>

<style scoped>
.manage-view {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>