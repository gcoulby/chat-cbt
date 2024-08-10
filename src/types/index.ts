export type Page = {
  name: string
  icon: string
  circle: boolean
}

export type Thought = {
  id: string
  date: Date
  prompt: string
  thirty_character_thought_title: string
  clarification_of_thoughts: string
  thought_categories: string[]
  automatic_thought: string
  challenge_thought: string
  alternative_thought: string
}
