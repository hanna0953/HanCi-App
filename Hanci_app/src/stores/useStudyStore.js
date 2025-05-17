// src/stores/useStudyStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStudyStore = defineStore('study', () => {
  // Load from localStorage or create default set
  const defaultSets = {
    'HSK 1': [
      { simplified: '你好 ', traditional: '你好 ', pinyin: 'nǐ hǎo ', english: 'hello ' },
      { simplified: '谢谢 ', traditional: '謝謝 ', pinyin: 'xiè xie ', english: 'thank you ' }
    ]
  }
  
  const flashcardSets = ref(JSON.parse(localStorage.getItem('flashcardSets')) || defaultSets)
  const currentSetName = ref(localStorage.getItem('currentSetName') || 'HSK 1')

  // Save to localStorage whenever sets change
  function saveToLocalStorage() {
    localStorage.setItem('flashcardSets', JSON.stringify(flashcardSets.value))
    localStorage.setItem('currentSetName', currentSetName.value)
  }

  const currentSet = computed(() => {
    return flashcardSets.value[currentSetName.value] || []
  })

  function addCard(card) {
    if (!flashcardSets.value[currentSetName.value]) {
      flashcardSets.value[currentSetName.value] = []
    }
    flashcardSets.value[currentSetName.value].push(card)
    saveToLocalStorage()
  }

  function removeCard(index) {
    flashcardSets.value[currentSetName.value].splice(index, 1)
    saveToLocalStorage()
  }

  function createNewSet(setName) {
    if (!flashcardSets.value[setName]) {
      flashcardSets.value[setName] = []
      currentSetName.value = setName
      saveToLocalStorage()
    }
  }

  function deleteSet(setName) {
    if (confirm(`Are you sure you want to delete "${setName}"?`)) {
      delete flashcardSets.value[setName]
      if (currentSetName.value === setName) {
        currentSetName.value = Object.keys(flashcardSets.value)[0] || ''
      }
      saveToLocalStorage()
    }
  }

  return {
    flashcardSets,
    currentSetName,
    currentSet,
    addCard,
    removeCard,
    createNewSet,
    deleteSet
  }
})