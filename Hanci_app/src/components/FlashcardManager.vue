<template>
    <div class="flashcard-manager">
        <div class="header">
        <div class="controls">
            <select v-model="currentSetName" @change="store.currentSetName = currentSetName">
            <optgroup label="HSK Levels">
                <option v-for="level in hskLevels" :key="level" :value="level">
                {{ level }} ({{ store.flashcardSets[level]?.length || 0 }})
                </option>
            </optgroup>
            <optgroup label="Custom Sets">
                <option v-for="(set, name) in customSets" :key="name" :value="name">
                {{ name }} ({{ set.length }})
                </option>
            </optgroup>
            </select>
            <button @click="showNewSetDialog = true" class="new-set-btn">
            + New Set
            </button>
        </div>
        </div>

        <div class="content">
        <div class="card-creator">
            <div class="input-group">
            <input v-model="newCard.simplified" placeholder="Simplified" @input="formatField('simplified')">
            <input v-model="newCard.traditional" placeholder="Traditional" @input="formatField('traditional')">
            <input v-model="newCard.pinyin" placeholder="Pinyin" @input="formatPinyin">
            <input v-model="newCard.english" placeholder="English" @input="formatEnglish">
            </div>
            <button @click="addCard" class="add-card-btn">
            Add Card
            </button>
        </div>

        <div class="card-list">
            <div v-for="(card, index) in store.currentSet" :key="index" class="card-item">
            <div class="card-info">
                <span class="characters">{{ card.simplified }}</span>
                <span class="pinyin">{{ card.pinyin }}</span>
                <span class="english">{{ card.english }}</span>
            </div>
            <button @click="store.removeCard(index)" class="delete-card-btn">
                ×
            </button>
            </div>
        </div>

        <div class="custom-sets">
            <h3>Your Custom Sets</h3>
            <div v-for="(set, name) in customSets" :key="name" class="set-item">
            <span>{{ name }}</span>
            <div class="set-actions">
                <button class="menu-btn" @click.stop="toggleMenu(name)">⋯</button>
                <div v-if="activeMenu === name" class="dropdown-menu">
                <button @click="deleteSet(name)" class="menu-item delete">
                    Delete Set
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>

        <dialog v-if="showNewSetDialog" class="set-dialog" open>
        <div class="dialog-content">
            <h3>Create New Set</h3>
            <input 
            v-model="newSetName" 
            placeholder="Set name"
            @keyup.enter="createNewSet"
            class="set-name-input"
            >
            <div class="dialog-actions">
            <button @click="showNewSetDialog = false" class="cancel-btn">
                Cancel
            </button>
            <button @click="createNewSet" class="confirm-btn">
                Create
            </button>
            </div>
        </div>
        </dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStudyStore } from '@/stores/useStudyStore'

const store = useStudyStore()
const currentSetName = ref(store.currentSetName)
const newCard = ref({ simplified: '', traditional: '', pinyin: '', english: '' })
const newSetName = ref('')
const showNewSetDialog = ref(false)
const activeMenu = ref(null)

const hskLevels = computed(() => 
    Object.keys(store.flashcardSets).filter(name => name.startsWith('HSK'))
)

const customSets = computed(() => 
    Object.entries(store.flashcardSets)
        .filter(([name]) => !name.startsWith('HSK'))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})
)

const addCard = () => {
    if (newCard.value.simplified.trim()) {
        store.addCard({ ...newCard.value })
        newCard.value = { simplified: '', traditional: '', pinyin: '', english: '' }
    }
}

const createNewSet = () => {
    const setName = newSetName.value.trim()
    if (setName && store.createNewSet(setName)) {
        currentSetName.value = setName
        newSetName.value = ''
        showNewSetDialog.value = false
    }
}

const deleteSet = (setName) => {
    if (!setName.startsWith('HSK')) {
        store.deleteSet(setName)
    }
}

const toggleMenu = (setName) => {
    activeMenu.value = activeMenu.value === setName ? null : setName
}

const clickHandler = (e) => {
    if (!e.target.closest('.set-actions')) {
        activeMenu.value = null
    }
}

// Formatting functions
const formatField = (field) => {
    newCard.value[field] = newCard.value[field]
        .replace(/ /g, '')
        .replace(/([a-zA-Z])/g, ' $1')
        .trim()
        .replace(/\s+/g, ' ')
}

const formatPinyin = (e) => {
    newCard.value.pinyin = e.target.value
        .toLowerCase()
        .replace(/(\d)(?=\D)/g, '$1 ')
        .replace(/\s+/g, ' ')
        .trim()
}

const formatEnglish = (e) => {
    newCard.value.english = e.target.value
        .replace(/,/g, ', ')
        .replace(/\s+/g, ' ')
        .trim()
}

// Event listeners
onMounted(() => document.addEventListener('click', clickHandler))
onBeforeUnmount(() => document.removeEventListener('click', clickHandler))
</script>

<style scoped>
.flashcard-manager {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.controls {
    display: flex;
    gap: 1rem;
    align-items: center;
}

select {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    background: var(--bg-surface);
    color: var(--text-primary);
}

.new-set-btn {
    padding: 0.75rem 1.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}

.card-creator {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.input-group {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
}

input {
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    background: var(--bg-surface);
    color: var(--text-primary);
}

.add-card-btn {
    padding: 0.75rem;
    background: var(--success);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}

.card-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.card-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--bg-surface);
    border-radius: 0.5rem;
}

.delete-card-btn {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}

.custom-sets {
    border-top: 1px solid var(--border);
    padding-top: 2rem;
}

.set-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin: 0.5rem 0;
    background: var(--bg-surface);
    border-radius: 0.5rem;
}

.set-actions {
    position: relative;
}

.menu-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0 0.5rem;
    font-size: 1.25rem;
    line-height: 1;
}

.dropdown-menu {
    position: absolute;
    right: 0;
    top: 100%;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    min-width: 120px;
}

.menu-item {
    padding: 0.75rem;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-primary);
}

.delete {
    color: #ef4444;
    padding: 0.5rem 0.5rem;
}

.set-dialog {
    border: none;
    border-radius: 0.75rem;
    padding: 2rem;
    background: var(--bg-surface);
    color: var(--text-primary);
}

.set-dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.set-name-input {
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
}

.dialog-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.cancel-btn {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.confirm-btn {
    background: var(--primary);
    color: white;
}

.card-info {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.characters {
    font-weight: 500;
    color: var(--primary);
}

.characters::after,
.pinyin::after {
    content: "|";
    margin-left: 1rem;
    color: var(--text-secondary);
    opacity: 0.6;
}

.english {
    color: var(--text-secondary);
    font-style: italic;
}

optgroup {
    font-style: normal;
}
</style>