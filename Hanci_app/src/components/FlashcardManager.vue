<template>
    <div class="flashcard-manager">
        <div class="set-selector">
        <select v-model="currentSetName" @change="store.currentSetName = currentSetName">
            <optgroup label="HSK Levels">
            <option v-for="level in hskLevels" :key="level" :value="level">
                {{ level }} ({{ store.flashcardSets[level]?.length || 0 }} cards)
            </option>
            </optgroup>
            <optgroup label="Custom Sets">
            <option 
                v-for="(set, name) in customSets" 
                :key="name" 
                :value="name"
            >
                {{ name }} ({{ set.length }} cards)
            </option>
            </optgroup>
        </select>
        <button @click="showNewSetDialog = true">+ New Set</button>
        </div>

        <div class="custom-sets">
        <h3>Your Custom Sets</h3>
        <div v-for="(set, name) in customSets" :key="name" class="set-item">
            <span>{{ name }} ({{ set.length }} cards)</span>
            <button @click="deleteSet(name)" class="delete-set">
            Delete Set
            </button>
        </div>
        </div>

        <div class="card-form">
        <input 
            v-model="newCard.simplified" 
            placeholder="Simplified" 
            @input="formatSimplified"
        >
        <input 
            v-model="newCard.traditional" 
            placeholder="Traditional" 
            @input="formatTraditional"
        >
        <input 
            v-model="newCard.pinyin" 
            placeholder="Pinyin" 
            @input="formatPinyin"
        >
        <input 
            v-model="newCard.english" 
            placeholder="English" 
            @input="formatEnglish"
        >
        <button @click="addCard">Add Card</button>
        </div>

        <div class="card-list">
        <div v-for="(card, index) in store.currentSet" :key="index" class="card-item">
            <div class="card-content">
            <span class="characters">{{ card.simplified }}</span>
            <span class="pinyin">{{ card.pinyin }}</span>
            <span class="english">{{ card.english }}</span>
            </div>
            <button @click="store.removeCard(index)" class="delete-btn">×</button>
        </div>
        </div>

        <dialog v-if="showNewSetDialog" class="set-dialog" open>
        <h3>Create New Set</h3>
        <input 
            v-model="newSetName" 
            placeholder="Set name"
            @keyup.enter="createNewSet"
        >
        <div class="dialog-actions">
            <button @click="showNewSetDialog = false">Cancel</button>
            <button @click="createNewSet">Create</button>
        </div>
        </dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStudyStore } from '@/stores/useStudyStore'

const store = useStudyStore()
const currentSetName = ref(store.currentSetName)
const newCard = ref({
    simplified: '',
    traditional: '',
    pinyin: '',
    english: ''
})
const newSetName = ref('')
const showNewSetDialog = ref(false)

const hskLevels = computed(() => 
    Object.keys(store.flashcardSets).filter(name => name.startsWith('HSK'))
)

const customSets = computed(() => 
    Object.entries(store.flashcardSets)
        .filter(([name]) => !name.startsWith('HSK'))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})
)

function addCard() {
    if (newCard.value.simplified.trim() === '') return
    
    store.addCard({ ...newCard.value })
    newCard.value = {
        simplified: '',
        traditional: '',
        pinyin: '',
        english: ''
    }
}

function createNewSet() {
    const setName = newSetName.value.trim()
    if (!setName) return
    
    if (store.createNewSet(setName)) {
        currentSetName.value = setName
        newSetName.value = ''
        showNewSetDialog.value = false
    } else {
        alert(`Set "${setName}" already exists!`)
    }
}

function deleteSet(setName) {
    if (setName.startsWith('HSK')) {
        alert('Cannot delete default HSK sets!')
        return
    }
    store.deleteSet(setName)
}

// Formatting functions
const formatSimplified = (e) => {
    newCard.value.simplified = e.target.value
        .replace(/ /g, '')
        .replace(/([a-zA-Z])/g, ' $1').trim()
        .replace(/ +/g, ' ')
}

const formatTraditional = (e) => {
    newCard.value.traditional = e.target.value
        .replace(/ /g, '')
        .replace(/([a-zA-Z])/g, ' $1').trim()
        .replace(/ +/g, ' ')
}

const formatPinyin = (e) => {
    newCard.value.pinyin = e.target.value
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/(\d)(?=\D)/g, '$1 ')
        .replace(/ +/g, ' ')
        .trim()
        .toLowerCase()
}

const formatEnglish = (e) => {
    newCard.value.english = e.target.value
        .replace(/,/g, ', ')
        .replace(/ +/g, ' ')
        .trim()
}
</script>

<style scoped>
/* Include all previous styles from earlier answer */
.flashcard-manager {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.set-selector {
    display: flex;
    gap: 1rem;
    align-items: center;
}

select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-primary);
    flex-grow: 1;
}

.card-form {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
}

input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-primary);
}

button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background: var(--primary);
    color: white;
    cursor: pointer;
    transition: opacity 0.2s;
}

.card-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.card-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--bg-surface);
    border-radius: 0.5rem;
}

.delete-btn {
    background: #ef4444;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 0.5rem 0.5rem;
}

.set-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    border-radius: 0.5rem;
    border: none;
    background: var(--bg-surface);
    color: var(--text-primary);
}

.set-dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

.dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
}

.custom-sets {
    margin-top: 2rem;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
}

.set-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    margin: 0.5rem 0;
    background: var(--bg-surface);
    border-radius: 0.5rem;
}

.delete-set {
    padding: 0.25rem 0.75rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    padding: 0.5rem 0.5rem;
}

.delete-set:hover {
    opacity: 0.8;
}

h3 {
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.card-content {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.characters::after,
.pinyin::after {
    content: "|";
    margin-left: 0.5rem;
    color: var(--text-secondary);
}
</style>