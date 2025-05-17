<template>
    <div class="flashcards-view">
        <div class="header-controls">
        <h1>Flashcards</h1>
        <select v-model="selectedHSKLevel" @change="changeHSKSet">
            <option value="HSK 1">HSK 1</option>
            <option value="HSK 2">HSK 2</option>
            <option value="HSK 3">HSK 3</option>
        </select>
        </div>
        
        <div class="flashcard-container">
        <Flashcard 
            v-if="currentCard" 
            :card="currentCard" 
            :show-pinyin="showPinyin"
        />
        <p v-else class="empty-message">No cards in this set</p>
        </div>

        <div class="navigation-controls">
        <button 
            @click="previousCard" 
            :disabled="currentIndex === 0"
            class="nav-button"
        >
            Previous
        </button>
        
        <span class="counter">
            {{ currentIndex + 1 }} / {{ store.currentSet.length }}
        </span>

        <button 
            @click="nextCard" 
            :disabled="currentIndex === store.currentSet.length - 1"
            class="nav-button"
        >
            Next
        </button>
        </div>

        <div class="flashcard-controls">
        <label class="pinyin-toggle">
            <input type="checkbox" v-model="showPinyin">
            Show Pinyin
        </label>
        <button @click="resetCards" class="reset-button">
            Reset Session
        </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Flashcard from '@/components/Flashcard.vue'
import { useStudyStore } from '@/stores/useStudyStore'

const store = useStudyStore()
const showPinyin = ref(true)
const currentIndex = ref(0)
const selectedHSKLevel = ref(store.currentSetName)

const currentCard = computed(() => {
    return store.currentSet[currentIndex.value]
})

const nextCard = () => {
    if (currentIndex.value < store.currentSet.length - 1) {
        currentIndex.value++
    }
}

const previousCard = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
    }
}

const resetCards = () => {
    currentIndex.value = 0
}

const changeHSKSet = () => {
    store.currentSetName = selectedHSKLevel.value
    resetCards()
}

watch(() => store.currentSetName, (newVal) => {
    selectedHSKLevel.value = newVal
})
</script>

<style scoped>
.flashcards-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.header-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 2rem;
}

select {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 2px solid var(--primary);
    background: var(--bg-surface);
    color: var(--text-primary);
    font-weight: 500;
}

.flashcard-container {
    min-height: 300px;
    display: flex;
    align-items: center;
}

.navigation-controls {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin: 1rem 0;
}

.nav-button {
    padding: 0.75rem 1.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: opacity 0.2s;
}

.nav-button:disabled {
    background: var(--text-secondary);
    opacity: 0.5;
    cursor: not-allowed;
}

.counter {
    font-weight: 500;
    color: var(--text-secondary);
}

.flashcard-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.pinyin-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
}

.reset-button {
    padding: 0.75rem 1.5rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}

.empty-message {
    color: var(--text-secondary);
    font-style: italic;
}
</style>