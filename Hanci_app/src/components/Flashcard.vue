<template>
    <div class="flashcard" @click="isFlipped = !isFlipped">
        <div class="flashcard-inner" :class="{ flipped: isFlipped }">
        <div class="flashcard-front">
            <h2>{{ card.simplified }}</h2>
            <p v-if="showPinyin">{{ card.pinyin }}</p>
        </div>
        <div class="flashcard-back">
            <h2>{{ card.english }}</h2>
            <p>{{ card.traditional }}</p>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    card: {
        type: Object,
        required: true
    },
    showPinyin: {
        type: Boolean,
        default: true
    }
})

const isFlipped = ref(false)
</script>

<style scoped>
.flashcard {
    perspective: 1000px;
    width: 300px;
    height: 200px;
    cursor: pointer;
}

.flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flashcard-inner.flipped {
    transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.flashcard-front {
    background-color: var(--flashcard-bg);
    border: 2px solid var(--primary);
}

.flashcard-back {
    background-color: var(--primary);
    color: var(--flashcard-text);
    transform: rotateY(180deg);
}

h2 {
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.flashcard-front p {
    color: var(--text-primary);
}

.flashcard-back p {
    color: var(--text-primary);
    font-size: 1.2rem;
}
</style>