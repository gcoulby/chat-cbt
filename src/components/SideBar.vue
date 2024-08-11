<template>
  <div :class="['sidebar', { 'is-active': showNav }, 'p-4']">
    <!-- Sidebar content goes here -->
    <button @click="toggleNav" class="hover:bg-slate-200">
      <IconSymbol name="cross" class="w-16 p-3 top-1 stroke-black absolute right-0" />
    </button>

    <h1 class="text-4xl font-light text-center">ChatCBT</h1>

    <button @click="startNewThought" class="w-full p-4 my-4 bg-purple-500 hover:bg-purple-400 text-white rounded-md font-bold">💭 New Thought</button>

    <h2 class="text-2xl font-normal my-4">Previous Thoughts</h2>
    <div class="flex flex-col">
      <p v-if="thoughts.length === 0" class="text-xl">No thoughts yet</p>
      <NavItem v-else v-for="thought in thoughts" :key="thought.id" :thought="thought" />
    </div>

    <button @click="downloadData" class="p-2 my-4 font-bold flex flex-row gap-2 hover:bg-slate-200 rounded">
      <IconSymbol name="arrow-down-tray" class="w-5" /> <span>Export Data</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useNav } from '../composables/useNav'
import { useLocalStorage } from '@/composables/useLocalStorage'
import NavItem from './NavItem.vue'

const { thoughts, resetActiveThought } = useLocalStorage()

import IconSymbol from './IconSymbol.vue'

const { showNav, toggleNav } = useNav()

const startNewThought = () => {
  resetActiveThought()
  toggleNav()
}

const downloadData = () => {
  const data = JSON.stringify(thoughts.value)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'thoughts.json'
  a.click()
}
</script>

<style scoped>
.sidebar {
  width: 90vw;
  position: fixed;
  left: -90vw;
  top: 0;
  bottom: 0;
  background: #f4f4f4;
  transition: left 0.3s ease;
}

.sidebar.is-active {
  left: 0;
}
</style>
