<template>
  <div>
    <transition v-if="thought.automatic_thought !== ''" class="pt-20">
      <ThoughtCard :thought="thought" />
    </transition>
    <transition v-else-if="clicked">
      <div class="flex flex-col pt-44 w-full">
        <IconSymbol name="spinner" class="m-auto w-10 animate-spin" />
        <h1 class="font-light text-4xl text-center">
          Processing your thoughts...
        </h1>
      </div>
    </transition>
    <transition v-else>
      <div class="flex flex-col h-[100vh]">
        <div class="flex flex-col mb-2 grow">
          <IconSymbol name="thought" class="flex mx-auto mb-10 pt-20 w-48" />

          <h1 class="font-light text-4xl text-center">What's on your mind?</h1>
        </div>

        <div class="flex-none w-full">
          <div class="m-auto w-[90%]">
            <textarea
              v-model="prompt"
              class="flex flex-col justify-end bg-slate-50 p-2 border-slate-800 border-b-2 focus-visible:outline-0 w-full font-normal text-xl autoresize"
              type="text"
              rows="1"
              ref="textarea"
              @input="adjustTextarea"
            ></textarea>
            <p v-if="error" class="mt-2 text-red-600 text-sm">{{ error }}</p>
            <button
              @click="sendPrompt"
              :disabled="clicked || !prompt.trim()"
              class="bg-purple-500 disabled:opacity-50 my-4 p-4 rounded-md w-full font-bold text-white"
            >
              Submit
            </button>
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
import ThoughtCard from './ThoughtCard.vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { v4 } from 'uuid'

const API_URL = 'https://cbt.gcoulby.workers.dev/'
// const API_URL = 'http://localhost:8787/'

const { thought, thoughts, saveThoughts, prompt } = useLocalStorage()

const clicked = ref(false)
const error = ref('')
const textarea = ref<HTMLTextAreaElement | null>(null)

const adjustTextarea = () => {
  if (!textarea.value) return
  textarea.value.style.height = 'auto'
  textarea.value.style.height = `${textarea.value.scrollHeight}px`
}

const sendPrompt = async () => {
  const text = prompt.value.trim()
  if (!text || clicked.value) return

  clicked.value = true
  error.value = ''

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Only needed if AUTH_TOKEN is still set on the Worker
        Authorization: '08698f09-1bdd-45e3-a357-c1f7a588a179',
      },
      body: JSON.stringify({ prompt: text }),
    })

    if (!res.ok) {
      throw new Error(`Worker error ${res.status}: ${await res.text()}`)
    }

    // The Worker now returns the thought object directly
    const data = (await res.json()) as Omit<Thought, 'id' | 'date' | 'prompt'>

    const t: Thought = {
      ...data,
      id: v4(),
      date: new Date(),
      prompt: text,
    } as Thought

    thought.value = t
    thoughts.value.push(t)
    saveThoughts()
  } catch (err) {
    console.error(err)
    error.value =
      'Something went wrong processing that thought. Please try again.'
  } finally {
    clicked.value = false
  }
}
</script>

<style scoped></style>
