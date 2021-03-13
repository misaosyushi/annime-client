export const state = () => ({
  displaySeason: null,
  season: null,
  thisSeasonId: null,
  thisSeason: null
})

export const mutations = {
  setSeason(state, value) {
    state.season = value
  }
}
