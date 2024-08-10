import { Page } from '@/types'
import { ref } from 'vue'

const showNav = ref<boolean>(false)
const page = ref<string>('Home')
const pages = ref<Page[]>([
  { name: 'Home', icon: 'home-filled', circle: false },
  { name: 'AddThought', icon: 'thought', circle: true },
  { name: 'Calendar', icon: 'calendar', circle: false },
])

export const useNav = () => {
  const setPage = (name: string) => {
    page.value = name
  }

  const toggleNav = () => {
    showNav.value = !showNav.value
  }
  return { pages, page, setPage, showNav, toggleNav }
}
