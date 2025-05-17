<template>
    <div class="flashcard-manager">
        <div class="set-selector">
        <select v-model="currentSetName" @change="store.currentSetName = currentSetName">
            <option v-for="(set, name) in store.flashcardSets" :key="name" :value="name">
            {{ name }} ({{ set.length }} cards)
            </option>
        </select>
        <button @click="showNewSetDialog = true">+ New Set</button>
        </div>

        <div class="card-form">
            <input v-model="newCard.simplified" placeholder="Simplified" @input="formatSimplified" />
            <input v-model="newCard.traditional" placeholder="Traditional" @input="formatTraditional" />
            <input v-model="newCard.pinyin" placeholder="Pinyin" @input="formatPinyin" />
            <input v-model="newCard.english" placeholder="English" @input="formatEnglish" />
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

        <dialog v-if="showNewSetDialog" class="set-dialog">
        <h3>Create New Set</h3>
        <input v-model="newSetName" placeholder="Set name" />
        <div class="dialog-actions">
            <button @click="showNewSetDialog = false">Cancel</button>
            <button @click="createNewSet">Create</button>
        </div>
        </dialog>
    </div>
</template>

<script setup>
import { useStudyStore } from '@/stores/useStudyStore'
import { ref, computed } from 'vue'

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
    if (newSetName.value.trim() === '') return
    
    store.createNewSet(newSetName.value)
    currentSetName.value = newSetName.value
    store.currentSetName = newSetName.value
    newSetName.value = ''
    showNewSetDialog.value = false
}

const formatSimplified = (e) => {
    newCard.value.simplified = e.target.value
        .replace(/ /g, '') // Remove existing spaces
        .replace(/([a-zA-Z])/g, ' $1').trim() // Add space before letters
        .replace(/ +/g, ' '); // Clean up multiple spaces
}

const formatTraditional = (e) => {
     newCard.value.traditional = e.target.value
        .replace(/ /g, '')
        .replace(/([a-zA-Z])/g, ' $1').trim()
        .replace(/ +/g, ' ');
}

const formatPinyin = (e) => {
    newCard.value.pinyin = e.target.value
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between syllable boundaries
        .replace(/(\d)(?=\D)/g, '$1 ') // Add space after tone numbers
        .replace(/ +/g, ' ')
        .trim()
        .toLowerCase();
}

const formatEnglish = (e) => {
    newCard.value.english = e.target.value
        .replace(/,/g, ', ') // Ensure space after commas
        .replace(/ +/g, ' ')
        .trim();
}
</script>

<style scoped>
.flashcard-manager {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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
    text-align: center;
    background: #ef4444;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
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
.card-content {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.characters::after {
    content: "|";
    margin-left: 0.5rem;
    color: var(--text-secondary);
}

.pinyin::after {
    content: "|";
    margin-left: 0.5rem;
    color: var(--text-secondary);
}

</style>