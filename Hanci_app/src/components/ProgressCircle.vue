<template>
  <div class="progress-circle">
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle
        class="progress-background"
        cx="40"
        cy="40"
        r="35"
        stroke-width="6"
      />
      <circle
        class="progress-bar"
        cx="40"
        cy="40"
        r="35"
        stroke-width="6"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />
      <text x="50%" y="50%" text-anchor="middle" dy=".3em">
        {{ progress }}%
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    required: true,
    validator: value => value >= 0 && value <= 100
  }
})

const circumference = computed(() => 2 * Math.PI * 35)
const offset = computed(() => circumference.value * (1 - props.progress / 100))
</script>

<style scoped>
.progress-circle {
  display: inline-block;
}

.progress-background {
  fill: none;
  stroke: #e5e7eb;
}

.progress-bar {
  fill: none;
  stroke: var(--primary);
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease;
}

text {
  font-size: 14px;
  font-weight: bold;
  fill: var(--text-dark);
}
</style>