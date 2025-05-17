<template>
  <div class="flashcards-view">
    <h1>Flashcards</h1>
    
    <div class="flashcard-container">
      <Flashcard 
        v-if="currentCard" 
        :card="currentCard" 
        :show-pinyin="showPinyin" 
        @next-card="nextCard"
      />
      <p v-else>No cards to study right now</p>
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
import { ref } from 'vue'
import Flashcard from '@/components/Flashcard.vue'

const showPinyin = ref(true)

// Mock data - replace with Supabase data later
const cards = ref([
  {
    simplified: '你好',
    traditional: '你好',
    pinyin: 'nǐ hǎo',
    english: 'hello'
  },
  {
    simplified: '谢谢',
    traditional: '謝謝',
    pinyin: 'xiè xie',
    english: 'thank you'
  },
  {
    simplified: '中国',
    traditional: '中國',
    pinyin: 'Zhōng guó',
    english: 'China'
  }
])

const currentIndex = ref(0)
const currentCard = ref(cards.value[0])

const nextCard = () => {
  currentIndex.value = (currentIndex.value + 1) % cards.value.length
  currentCard.value = cards.value[currentIndex.value]
}

const resetCards = () => {
  currentIndex.value = 0
  currentCard.value = cards.value[0]
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