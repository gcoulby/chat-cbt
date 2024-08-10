<template>
  <div>
    <transition v-if="thought.automatic_thought !== ''" class="pt-20">
      <ThoughtCard :thought="thought" />
    </transition>
    <transition v-else-if="clicked">
      <div class="flex flex-col w-full pt-44">
        <IconSymbol name="spinner" class="w-10 m-auto animate-spin" />
        <h1 class="text-4xl font-light text-center">Processing your thoughts...</h1>
      </div>
    </transition>
    <transition v-else>
      <div class="flex flex-col h-[100vh]">
        <div class="flex flex-col grow mb-2">
          <IconSymbol name="thought" class="flex w-48 mx-auto pt-20 mb-10" />

          <h1 class="text-4xl font-light text-center">What's on your mind?</h1>
        </div>

        <div class="w-full flex-none">
          <div class="w-[90%] m-auto">
            <textarea
              v-model="prompt"
              class="w-full p-2 bg-slate-50 border-b-2 border-slate-800 text-xl flex flex-col justify-end autoresize focus-visible:outline-0 font-normal"
              type="text"
              rows="1"
              ref="textarea"
              @input="adjustTextarea"
            ></textarea>
            <button @click="sendPrompt" class="w-full p-4 my-4 bg-purple-500 text-white rounded-md font-bold">Submit</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Thought } from '@/types'
import { ref } from 'vue'
import IconSymbol from './IconSymbol.vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { v4 } from 'uuid'

const { thought, thoughts, saveThoughts, prompt } = useLocalStorage()

const clicked = ref(false)

import ThoughtCard from './ThoughtCard.vue'

const textarea = ref<HTMLTextAreaElement | null>(null)

const adjustTextarea = () => {
  if (!textarea.value) return
  textarea.value.style.height = 'auto'
  textarea.value.style.height = `${textarea.value.scrollHeight}px`
}

const sendPrompt = async () => {
  clicked.value = true
  // fetch('http://localhost:8787/', {
  fetch('https://cbt.gcoulby.workers.dev/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '08698f09-1bdd-45e3-a357-c1f7a588a179', // This is fine, it's only to prevent bots from using the API
    },
    body: JSON.stringify({ prompt: prompt.value }),
  })
    .then(async (res) => {
      res = await res.json()
      const t = JSON.parse((res as any).response) as Thought
      t.id = v4()
      t.date = new Date()
      t.prompt = prompt.value
      thought.value = t

      thoughts.value.push(t)

      saveThoughts()
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      clicked.value = false
    })
}
</script>

<style scoped></style>
