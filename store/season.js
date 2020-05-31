export const state = () => ({
  displaySeason: null
})

export const mutations = {
  setDisplaySeason(state, value) {
    state.displaySeason = value
  }
}
