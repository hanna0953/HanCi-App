<template>
  <div class="vocabulary">
    <h1>Vocabulary</h1>
    
    <div class="controls">
      <input type="text" placeholder="Search vocabulary..." v-model="searchQuery">
      <select v-model="selectedCategory">
        <option value="all">All Categories</option>
        <option value="hsk1">HSK 1</option>
        <option value="hsk2">HSK 2</option>
        <option value="hsk3">HSK 3</option>
      </select>
    </div>
    
    <WordList :words="filteredWords" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WordList from '@/components/WordList.vue'

const searchQuery = ref('')
const selectedCategory = ref('all')

// Mock data - replace with Supabase data later
const words = ref([
  { id: 1, simplified: '你好', traditional: '你好', pinyin: 'nǐ hǎo', english: 'hello', category: 'hsk1' },
  { id: 2, simplified: '谢谢', traditional: '謝謝', pinyin: 'xiè xie', english: 'thank you', category: 'hsk1' },
  { id: 3, simplified: '中国', traditional: '中國', pinyin: 'Zhōng guó', english: 'China', category: 'hsk2' },
  { id: 4, simplified: '学习', traditional: '學習', pinyin: 'xué xí', english: 'to study', category: 'hsk2' },
  { id: 5, simplified: '电脑', traditional: '電腦', pinyin: 'diàn nǎo', english: 'computer', category: 'hsk3' },
])

const filteredWords = computed(() => {
  return words.value.filter(word => {
    const matchesSearch = word.simplified.includes(searchQuery.value) || 
                         word.pinyin.includes(searchQuery.value) || 
                         word.english.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || word.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<style scoped>
.vocabulary {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
}

input, select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-family: inherit;
}

input {
  flex: 1;
}
</style>