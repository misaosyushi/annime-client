import { defineStore } from 'pinia'

export const useSeason = defineStore({
  id: 'season',
  state: () => ({
    seasonNameText: ''
  }),
  actions: {
    setSeasonNameText(val: string) {
      this.seasonNameText = val
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }
    ]
  }
})
