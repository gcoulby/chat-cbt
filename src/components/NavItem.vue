<template>
  <div class="py-2 flex">
    <button class="text-xl grow text-left hover:bg-slate-200 flex flex-col p-2" @click="() => setThought(thought.id)">
      {{ thought.thirty_character_thought_title }}
      <span class="text-sm text-slate-500 italic">{{ computedDate }}</span>
    </button>
    <Popper>
      <button class="text-2xl text-right hover:bg-slate-200 p-3">⋯</button>
      <template #content>
        <button
          class="absolute right-0 -top-4 w-44 bg-slate-300 hover:bg-slate-200 p-2 rounded text-right flex flex-row"
          @click="() => deleteThought(thought.id)"
        >
          <span class="grow text-red-500 font-bold mt-1 mr-2">🗑️ Delete Thought</span>
        </button>
      </template>
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { Thought } from '@/types'
import { ref, defineProps, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useNav } from '@/composables/useNav'
import Popper from 'vue3-popper'
import IconSymbol from './IconSymbol.vue'

const { setActiveThought, deleteThought } = useLocalStorage()
const { showNav, toggleNav } = useNav()

let props = defineProps({
  thought: {
    type: Object as () => Thought,
    required: true,
  },
})

const setThought = (id: string) => {
  setActiveThought(id)
  toggleNav()
}

const computedDate = computed(() => new Date(props.thought.date).toLocaleString())
</script>

<style scoped></style>
