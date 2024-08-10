import { Thought } from '@/types'
import { ref } from 'vue'

const error = ref<string>('')
const db = ref<Storage | null>(null)
const prompt = ref("I have 2 interviews lined up for C++ roles, but I am not sure I'm good enough for the job")
const thoughts = ref<Thought[]>([])
const thought = ref<Thought>({
  id: '',
  date: new Date(),
  prompt: '',
  thirty_character_thought_title: '',
  challenge_thought: '',
  automatic_thought: '',
  thought_categories: [],
  clarification_of_thoughts: '',
  alternative_thought: '',
})

export const useLocalStorage = () => {
  const openDB = async () => {
    try {
      db.value = localStorage
      getThoughts()
    } catch (e: any) {
      error.value = e.message
    }
  }

  const saveThoughts = async () => {
    //reverse the order of thoughts
    thoughts.value = thoughts.value.reverse()
    try {
      db.value?.setItem('ChatCBT-thoughts', JSON.stringify(thoughts.value))
    } catch (e: any) {
      error.value = e.message
      console.log('ERROR:', e)
    }
  }

  const getThoughts = async () => {
    try {
      const t = db.value?.getItem('ChatCBT-thoughts')

      if (!t) {
        error.value = 'Error getting thoughts from the database'
        return
      }
      console.log('Thoughts retrieved from the database')

      thoughts.value = JSON.parse(t || '[]') as Thought[]

      console.log(thoughts.value)
    } catch (e: any) {
      error.value = e.message
      console.log('ERROR:', e)
    }
  }

  const resetActiveThought = () => {
    thought.value = {
      id: '',
      date: new Date(),
      prompt: '',
      thirty_character_thought_title: '',
      challenge_thought: '',
      automatic_thought: '',
      thought_categories: [],
      clarification_of_thoughts: '',
      alternative_thought: '',
    }
  }

  const setActiveThought = (id: string) => {
    const t = thoughts.value.find((t) => t.id === id)
    if (t) {
      thought.value = t
    }
  }

  const deleteThought = (id: string) => {
    const i = thoughts.value.findIndex((t) => t.id === id)
    if (i > -1) {
      thoughts.value.splice(i, 1)
      saveThoughts()
      resetActiveThought()
    }
  }

  return { openDB, thought, thoughts, saveThoughts, getThoughts, resetActiveThought, setActiveThought, deleteThought, prompt, error }
}
