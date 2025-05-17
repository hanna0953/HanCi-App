<!-- src/views/FlashcardsView.vue -->
<template>
  <div class="flashcards-view">
    <h1>Flashcards: {{ store.currentSetName }}</h1>
    
    <div class="flashcard-container">
      <Flashcard 
        v-if="currentCard" 
        :card="currentCard" 
        :show-pinyin="showPinyin" 
        @next-card="nextCard"
      />
      <p v-else>No cards in this set</p>
    </div>
    
    <div class="controls">
      <label>
        <input type="checkbox" v-model="showPinyin"> Show Pinyin
      </label>
      <button @click="resetCards" class="reset-button">Reset Cards</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Flashcard from '@/components/Flashcard.vue'
import { useStudyStore } from '@/stores/useStudyStore'

const store = useStudyStore()
const showPinyin = ref(true)
const currentIndex = ref(0)

const currentCard = computed(() => {
  return store.currentSet[currentIndex.value]
})

const nextCard = () => {
  currentIndex.value = (currentIndex.value + 1) % store.currentSet.length
}

const resetCards = () => {
  currentIndex.value = 0
}
</script>

<style scoped>
.flashcards-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.flashcard-container {
  min-height: 300px;
  display: flex;
  align-items: center;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.reset-button {
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.reset-button:hover {
  background: var(--primary-light);
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
</style>