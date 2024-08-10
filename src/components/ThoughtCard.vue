<template>
  <div class="w-[90%] m-auto">
    <h1 class="text-4xl font-light text-center mb-6">{{ thought.thirty_character_thought_title }}</h1>
    <p class="text-center">{{ new Date(thought.date).toLocaleString() }}</p>

    <h2 class="text-2xl font-bold">My Thought</h2>
    <p class="text-xl mb-4">{{ thought.prompt }}</p>

    <h2 class="text-2xl font-bold">Clarification of Thought</h2>
    <p class="text-xl mb-4">{{ thought.clarification_of_thoughts }}</p>

    <h2 class="text-2xl font-bold">Thought Categories</h2>
    <ul>
      <li class="text-xl mb-4" v-for="category in thought.thought_categories" :key="category">{{ category }}</li>
    </ul>

    <h2 class="text-2xl font-bold">Automatic Thought</h2>
    <p class="text-xl mb-4">{{ thought.automatic_thought }}</p>

    <h2 class="text-2xl font-bold">Challenge Thought</h2>
    <p class="text-xl mb-4">{{ thought.challenge_thought }}</p>

    <h2 class="text-2xl font-bold">Alternative Thought</h2>
    <p class="text-xl mb-4">{{ thought.alternative_thought }}</p>
  </div>
</template>

<script setup lang="ts">
import { Thought } from '@/types'
import { defineProps } from 'vue'

defineProps({
  thought: {
    type: Object as () => Thought,
    required: true,
  },
})
</script>

<style scoped></style>
