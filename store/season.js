import dayjs from 'dayjs'

export const state = () => ({
  displaySeason: null,
  season: null,
  thisSeasonId: null,
  thisSeason: null
})

export const mutations = {
  setDisplaySeason(state, value) {
    state.displaySeason = value
  },
  setSeason(state, value) {
    state.season = value
  },
  filterSeasonId(state, season) {
    dayjs.locale('ja')

    const splited = dayjs()
      .format('YYYY-MM')
      .split('-')

    let thisSeason = ''
    if (splited[1] === '04' || splited[1] === '05' || splited[1] === '06') {
      thisSeason = splited[0] + '-spring'
    } else if (splited[1] === '07' || splited[1] === '08' || splited[1] === '09') {
      thisSeason = splited[0] + '-summer'
    } else if (splited[1] === '10' || splited[1] === '11' || splited[1] === '12') {
      thisSeason = splited[0] + '-autumn'
    } else if (splited[1] === '01' || splited[1] === '02' || splited[1] === '03') {
      thisSeason = splited[0] + '-winter'
    }
    state.thisSeasonId = season.filter((val) => val.seasonText === thisSeason)[0].id
  },
  filterThisSeason(state, season) {
    dayjs.locale('ja')

    const splited = dayjs()
      .format('YYYY-MM')
      .split('-')

    let thisSeason = ''
    if (splited[1] === '04' || splited[1] === '05' || splited[1] === '06') {
      thisSeason = splited[0] + '-spring'
    } else if (splited[1] === '07' || splited[1] === '08' || splited[1] === '09') {
      thisSeason = splited[0] + '-summer'
    } else if (splited[1] === '10' || splited[1] === '11' || splited[1] === '12') {
      thisSeason = splited[0] + '-autumn'
    } else if (splited[1] === '01' || splited[1] === '02' || splited[1] === '03') {
      thisSeason = splited[0] + '-winter'
    }
    console.log('thisSeason', thisSeason)
    state.thisSeason = season.filter((val) => val.seasonText === thisSeason)[0].seasonText
  }
}
