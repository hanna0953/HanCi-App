import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import VocabularyView from '@/views/VocabularyView.vue'
import FlashcardsView from '@/views/FlashcardsView.vue'
import PracticeView from '@/views/PracticeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/vocabulary',
      name: 'vocabulary',
      component: VocabularyView
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      component: FlashcardsView.vue
    },
    {
      path: '/practice',
      name: 'practice',
      component: PracticeView
    }
  ]
})

export default router