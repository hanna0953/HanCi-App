<template>
  <div class="word-list">
    <div v-for="word in words" :key="word.id" class="word-card">
      <div class="word-characters">
        <span class="simplified">{{ word.simplified }}</span>
        <span class="traditional" v-if="word.simplified !== word.traditional">
          ({{ word.traditional }})
        </span>
      </div>
      <div class="word-details">
        <span class="pinyin">{{ word.pinyin }}</span>
        <span class="english">{{ word.english }}</span>
      </div>
      <button class="study-button" @click="$emit('study-word', word)">
        Study
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  words: {
    type: Array,
    required: true
  }
})

defineEmits(['study-word'])
</script>

<style scoped>
.word-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.word-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.word-characters {
  color: var(--text-tertiary);
  flex: 0 0 120px;
  font-size: 1.2rem;
}

.traditional {
  color: var(--text-secondary);
}

.word-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pinyin {
  color: var(--primary);
  font-size: 0.9rem;
}

.english {
  color: var(--text-tertiary);
  font-size: 0.9rem;
}

.study-button {
  padding: 0.5rem 1rem;
  background: var(--primary-light);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.study-button:hover {
  background: var(--primary);
}
</style>