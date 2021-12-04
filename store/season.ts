import { defineStore } from 'pinia'

export const useSeason = defineStore({
  id: 'season',
  state: () => ({
    seasonNameText: ''
  }),
  actions: {
    setSeasonNameText(val: string) {
      this.seasonNameText = val
    },
    reset() {
      this.seasonNameText = ''
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }
    ]
  }
})
