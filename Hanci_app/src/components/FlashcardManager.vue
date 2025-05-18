<template>
    <div class="flashcard-manager">
        <!-- Header Section -->
        <div class="header">
        <h1>Manage Your Study Sets</h1>
            <div class="header-controls">
                    <button class="primary-btn" @click="showSetCreator = true">
                    <span>+</span> Create New Set
                    </button>
            </div>
        </div>

        <!-- HSK Sets Section -->
        <div class="sets-section">
        <h2 class="section-title">HSK Official Sets</h2>
            <div class="cards-grid">
                <div class="set-card hsk-set" v-for="(set, name) in hskSets" :key="name" @click="viewSet(name)">
                    <div class="set-header">
                        <h3>{{ name }}</h3>
                        <div class="set-meta">
                        <span class="card-count">{{ set.length }} cards</span>
                        <span class="locked-badge">🔒 Read Only</span>
                        </div>
                    </div>
                    <div class="set-content">
                        <div class="card-preview">
                            <div v-for="(card, idx) in set.slice(0,3)" :key="idx" class="preview-card">
                                <span>{{ card.simplified }}</span>
                                <small>{{ card.pinyin }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- User Sets Section -->
        <div class="sets-section">
            <h2 class="section-title">Your Custom Sets</h2>
            <div class="cards-grid">
                <div class="set-card" v-for="(set, name) in customSets" :key="name" @click="viewSet(name)">
                    <div class="set-header">
                        <h3>{{ name }}</h3>
                        <div class="set-actions">
                        <button class="icon-btn" @click="editSet(name)" title="Edit">
                            ✏️
                        </button>
                        <button class="icon-btn danger" @click="confirmDelete(name)" title="Delete">
                            🗑️
                        </button>
                        </div>
                    </div>
                    <div class="set-content">
                        <div class="card-preview">
                        <div v-for="(card, idx) in set.slice(0,3)" :key="idx" class="preview-card">
                            <span>{{ card.simplified }}</span>
                            <small>{{ card.pinyin }}</small>
                        </div>
                        </div>
                        <p class="card-count">{{ set.length }} cards</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Add Card Panel -->
        <div v-if="activeTab === 'quick-add'" class="quick-add-panel">
            <div class="input-group">
                <div class="input-row">
                <input v-model="newCard.simplified" placeholder="Simplified" @input="formatField('simplified')">
                <input v-model="newCard.traditional" placeholder="Traditional" @input="formatField('traditional')">
                </div>
                <div class="input-row">
                <input v-model="newCard.pinyin" placeholder="Pinyin" @input="formatPinyin">
                <input v-model="newCard.english" placeholder="English" @input="formatEnglish">
                </div>
            </div>
            <button class="primary-btn full-width" @click="addCard">
                Add Card to Current Set
            </button>
        </div>

        <!-- Set Creator Modal -->
        <div v-if="showSetCreator" class="modal-overlay">
            <div class="modal-content">
                <h2>Create New Set</h2>
                <input 
                v-model="newSetName" 
                placeholder="Enter set name"
                class="set-name-input"
                @keyup.enter="createNewSet"
                >
                <div class="modal-actions">
                    <button class="secondary-btn" @click="showSetCreator = false">
                        Cancel
                    </button>
                    <button class="primary-btn" @click="createNewSet">
                        Create Set
                    </button>
                </div>
            </div>
        </div>

        <!-- Floating Action Button -->
        <button class="fab" @click="activeTab = 'quick-add'">
        ＋
        </button>

        <!-- Vocabulary Viewer Modal -->
        <div v-if="viewingSet" class="modal-overlay" @click.self="viewingSet = null">
            <div class="modal-content vocabulary-modal">
                <div class="modal-header">
                    <h2>{{ viewingSet }}</h2>
                    <p class="set-meta">
                        {{ store.flashcardSets[viewingSet].length }} cards in this set
                    </p>
                    <button class="close-btn" @click="viewingSet = null">×</button>
                </div>
                <div class="vocabulary-list">
                    <div class="vocabulary-header">
                        <span>Simplified</span>
                        <span>Traditional</span>
                        <span>Pinyin</span>
                        <span>English</span>
                    </div>
                    <div class="vocabulary-item" v-for="(card, index) in store.flashcardSets[viewingSet]" :key="index">
                        <span>{{ card.simplified }}</span>
                        <span>{{ card.traditional }}</span>
                        <span>{{ card.pinyin }}</span>
                        <span>{{ card.english }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStudyStore } from '@/stores/useStudyStore'

const store = useStudyStore()
const activeTab = ref('cards')
const showSetCreator = ref(false)
const newSetName = ref('')
const newCard = ref({ simplified: '', traditional: '', pinyin: '', english: '' })
const currentSetName = ref(store.currentSetName)
const viewingSet = ref(null);

const viewSet = (setName) => {
    viewingSet.value = setName;
};

const hskSets = computed(() => 
Object.entries(store.flashcardSets)
    .filter(([name]) => name.startsWith('HSK'))
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})
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
    showSetCreator.value = false
    activeTab.value = 'quick-add'
}
}

const editSet = (setName) => {
currentSetName.value = setName
activeTab.value = 'quick-add'
}

const confirmDelete = (setName) => {
if (confirm(`Delete "${setName}" and all its cards?`)) {
    store.deleteSet(setName)
}
}

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
</script>

<style scoped>

.sets-section {
margin-bottom: 3rem;
}

.section-title {
color: var(--text-secondary);
border-bottom: 2px solid var(--border);
padding-bottom: 0.5rem;
margin-bottom: 1.5rem;
cursor: default;
}

.hsk-set {
background: var(--bg-secondary);
border-color: var(--primary-light);
cursor: default;
}

.hsk-set .set-header h3 {
color: var(--primary);
}

.locked-badge {
color: var(--text-secondary);
font-size: 0.9rem;
display: flex;
align-items: center;
gap: 0.25rem;
}

.set-meta {
display: flex;
gap: 1rem;
align-items: center;
}

.example-set {
border: 2px dashed var(--border);
background: transparent;
}

.example-badge {
background: var(--accent);
color: white;
padding: 0.25rem 0.5rem;
border-radius: 0.25rem;
font-size: 0.8rem;
}

.flashcard-manager {
max-width: 1200px;
margin: 0 auto;
padding: 2rem;
}

.header {
margin-bottom: 2rem;
text-align: center;
}

.header h1 {
color: var(--text-primary);
margin-bottom: 1rem;
}

.header-controls {
display: flex;
gap: 1rem;
align-items: center;
justify-content: center;
margin-top: 1.5rem;
}

.set-selector {
display: flex;
align-items: center;
gap: 0.5rem;
}

.set-selector label {
color: var(--text-secondary);
}

select {
padding: 0.75rem;
border: 2px solid var(--primary);
border-radius: 0.5rem;
background: var(--bg-surface);
color: var(--text-primary);
font-size: 1rem;
}

.primary-btn {
background: var(--primary);
color: white;
padding: 0.75rem 1.5rem;
border: none;
border-radius: 0.5rem;
cursor: pointer;
transition: transform 0.2s, opacity 0.2s;
}

.primary-btn:hover {
transform: translateY(-1px);
opacity: 0.9;
}

.content-tabs {
display: flex;
gap: 0.5rem;
margin-bottom: 2rem;
}

.content-tabs button {
padding: 1rem 2rem;
border: none;
background: var(--bg-secondary);
color: var(--text-secondary);
border-radius: 0.5rem;
cursor: pointer;
transition: all 0.2s;
}

.active-tab {
background: var(--primary) !important;
color: white !important;
}

.cards-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 1.5rem;
}

.set-card {
background: var(--bg-surface);
border-radius: 1rem;
padding: 1.5rem;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transition: transform 0.2s;
border: 1px solid var(--border);
cursor: pointer;
}

.set-card:hover {
transform: translateY(-5px);
}

.set-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1rem;
}

.set-header h3 {
color: var(--text-primary);
margin: 0;
}

.set-actions {
display: flex;
gap: 0.5rem;
}

.icon-btn {
background: none;
border: none;
padding: 0.25rem;
cursor: pointer;
font-size: 1.2rem;
color: var(--text-secondary);
transition: color 0.2s;
}

.icon-btn:hover {
color: var(--text-primary);
}

.danger:hover {
color: #ef4444 !important;
}

.card-preview {
display: flex;
flex-direction: column;
gap: 0.5rem;
margin-bottom: 1rem;
}

.preview-card {
background: var(--bg-primary);
padding: 0.75rem;
border-radius: 0.5rem;
border: 1px solid var(--border);
}

.preview-card span {
color: var(--text-primary);
font-weight: 500;
}

.preview-card small {
color: var(--text-secondary);
font-size: 0.9rem;
}

.card-count {
color: var(--text-secondary);
text-align: center;
margin: 0;
}

.quick-add-panel {
background: var(--bg-surface);
padding: 2rem;
border-radius: 1rem;
max-width: 600px;
margin: 0 auto;
border: 1px solid var(--border);
}

.input-group {
display: flex;
flex-direction: column;
gap: 1rem;
margin-bottom: 1.5rem;
}

.input-row {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1rem;
}

input {
padding: 0.75rem;
border: 1px solid var(--border);
border-radius: 0.5rem;
background: var(--bg-primary);
color: var(--text-primary);
}

.full-width {
width: 100%;
}

.fab {
position: fixed;
bottom: 2rem;
right: 2rem;
width: 56px;
height: 56px;
border-radius: 50%;
background: var(--primary);
color: white;
border: none;
font-size: 1.5rem;
cursor: pointer;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
transition: transform 0.2s;
}

.fab:hover {
transform: scale(1.1);
}

.modal-overlay {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
display: grid;
place-items: center;
z-index: 100;
}

.modal-content {
background: var(--bg-surface);
padding: 2rem;
border-radius: 1rem;
width: 90%;
max-width: 500px;
border: 1px solid var(--border);
}

.set-name-input {
width: 100%;
padding: 1rem;
margin: 1rem 0;
border: 1px solid var(--border);
border-radius: 0.5rem;
}

.modal-actions {
display: flex;
gap: 1rem;
justify-content: flex-end;
}

.secondary-btn {
background: var(--bg-secondary);
color: var(--text-primary);
padding: 0.75rem 1rem;
border: 1px solid var(--border);
border-radius: 0.5rem;
cursor: pointer;
transition: transform 0.2s, opacity 0.2s;
}

.secondary-btn:hover {
transform: translateY(-1px);
opacity: 0.9;
}

.empty-state {
text-align: center;
padding: 2rem;
color: var(--text-secondary);
grid-column: 1 / -1;
}

.vocabulary-modal {
    max-width: 800px;
    padding: 2rem;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
}

.close-btn:hover {
    color: var(--text-primary);
}

.vocabulary-list {
    display: grid;
    gap: 0.5rem;
}

.vocabulary-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

.vocabulary-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-surface);
    border-radius: 0.5rem;
    border: 1px solid var(--border);
}

.vocabulary-item span {
    word-break: break-word;
}

@media (max-width: 768px) {
.header-controls {
    flex-direction: column;
}

.input-row {
    grid-template-columns: 1fr;
}

.content-tabs button {
    padding: 0.75rem 1rem;
}

.fab {
    bottom: 1rem;
    right: 1rem;
}
.vocabulary-header,
.vocabulary-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
}

.vocabulary-header {
    display: none;
}

.vocabulary-item span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.vocabulary-item span::before {
    content: attr(data-label);
    font-weight: 500;
    color: var(--text-secondary);
    font-size: 0.8rem;
}

.vocabulary-item span:nth-child(1)::before { content: "Simplified: "; }
.vocabulary-item span:nth-child(2)::before { content: "Traditional: "; }
.vocabulary-item span:nth-child(3)::before { content: "Pinyin: "; }
.vocabulary-item span:nth-child(4)::before { content: "English: "; }
}

</style>