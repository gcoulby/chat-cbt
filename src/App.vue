<template>
  <div class="w-full">
    <button @click="toggleNav" class="fixed"><IconSymbol name="menu" class="w-16 p-3 top-1 absolute" /></button>
    <SideBar />
    <AddThoughtForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddThoughtForm from './components/AddThoughtForm.vue'
import SideBar from './components/SideBar.vue'
import { useNav } from './composables/useNav'
import IconSymbol from './components/IconSymbol.vue'
import { useLocalStorage } from './composables/useLocalStorage'

const { showNav, toggleNav } = useNav()
const { openDB } = useLocalStorage()

export default defineComponent({
  name: 'App',
  components: {
    AddThoughtForm,
    SideBar,
    IconSymbol,
  },
  setup() {
    openDB()
    return {
      showNav,
      toggleNav,
    }
  },
})
</script>
