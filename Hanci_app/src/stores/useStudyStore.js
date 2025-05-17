import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStudyStore = defineStore('study', () => {
  // Default sets with all HSK levels
  const defaultSets = {
    'HSK 1': [
      { simplified: '你好', traditional: '你好', pinyin: 'nǐ hǎo', english: 'Hello' },
      { simplified: '谢谢', traditional: '謝謝', pinyin: 'xiè xie', english: 'Thank you' },
      { simplified: '再见', traditional: '再見', pinyin: 'zài jiàn', english: 'Goodbye' },
      { simplified: '妈妈', traditional: '媽媽', pinyin: 'mā ma', english: 'Mother' },
      { simplified: '爸爸', traditional: '爸爸', pinyin: 'bà ba', english: 'Father' }
    ],
    'HSK 2': [
      { simplified: '医院', traditional: '醫院', pinyin: 'yī yuàn', english: 'Hospital' },
      { simplified: '学校', traditional: '學校', pinyin: 'xué xiào', english: 'School' },
      { simplified: '电脑', traditional: '電腦', pinyin: 'diàn nǎo', english: 'Computer' },
      { simplified: '手机', traditional: '手機', pinyin: 'shǒu jī', english: 'Mobile phone' },
      { simplified: '天气', traditional: '天氣', pinyin: 'tiān qì', english: 'Weather' }
    ],
    'HSK 3': [
      { simplified: '办公室', traditional: '辦公室', pinyin: 'bàn gōng shì', english: 'Office' },
      { simplified: '电子邮件', traditional: '電子郵件', pinyin: 'diàn zǐ yóu jiàn', english: 'Email' },
      { simplified: '环境', traditional: '環境', pinyin: 'huán jìng', english: 'Environment' },
      { simplified: '护照', traditional: '護照', pinyin: 'hù zhào', english: 'Passport' },
      { simplified: '信用卡', traditional: '信用卡', pinyin: 'xìn yòng kǎ', english: 'Credit card' }
    ]
  }

  // Load or initialize flashcard sets
  const storedSets = JSON.parse(localStorage.getItem('flashcardSets')) || {}
  const flashcardSets = ref({ ...defaultSets, ...storedSets })
  
  // Initialize current set name
  const currentSetName = ref(localStorage.getItem('currentSetName') || 'HSK 1')

  // Save to localStorage whenever changes occur
  function saveToLocalStorage() {
    localStorage.setItem('flashcardSets', JSON.stringify(flashcardSets.value))
    localStorage.setItem('currentSetName', currentSetName.value)
  }

  // Current set computed property
  const currentSet = computed(() => {
    return flashcardSets.value[currentSetName.value] || []
  })

  // Card management functions
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

  // Set management functions
  function createNewSet(setName) {
    const cleanName = setName.trim()
    if (!cleanName) return false
    
    if (!flashcardSets.value[cleanName]) {
      flashcardSets.value[cleanName] = []
      currentSetName.value = cleanName
      saveToLocalStorage()
      return true
    }
    return false
  }

  function deleteSet(setName) {
    if (setName.startsWith('HSK')) {
      alert('Default HSK sets cannot be deleted!')
      return
    }
    
    if (confirm(`Delete "${setName}" permanently?`)) {
      delete flashcardSets.value[setName]
      
      // Switch to first available set if deleting current set
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