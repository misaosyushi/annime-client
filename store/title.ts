import { defineStore } from 'pinia'

export const useTitle = defineStore({
  id: 'title',
  state: () => ({
    title: ''
  }),
  actions: {
    setTitle(val: string) {
      this.title = val
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }
    ]
  }
})
