import { acceptHMRUpdate, defineStore } from 'pinia'

export const searchHistory = defineStore('history', () => {
  /**
   * Current input
   */
  const input = ref('')
  const lastInput = ref(new Set<string>())

  const allInputs = computed(() => Array.from(lastInput.value))
  const previousInputs = computed(() => allInputs.value.filter(name => name !== input.value))

  /**
   * save last input
   *
   * @param input - new input to set
   */
  function addInput(name: string) {
    if (input.value)
      lastInput.value.add(input.value)

    input.value = name
  }

  return {
    addInput,
    previousInputs,
    input,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(searchHistory as any, import.meta.hot))
