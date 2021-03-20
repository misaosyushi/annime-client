exports.handler = async (event) => {
  const seasonList = [
    {
      id: 1,
      seasonName: '2019-winter',
      seasonNameText: '2019年冬'
    },
    {
      id: 2,
      seasonName: '2019-spring',
      seasonNameText: '2019年春'
    },
    {
      id: 3,
      seasonName: '2019-summer',
      seasonNameText: '2019年夏'
    },
    {
      id: 4,
      seasonName: '2019-autumn',
      seasonNameText: '2019年秋'
    },
    {
      id: 5,
      seasonName: '2020-winter',
      seasonNameText: '2020年冬'
    },
    {
      id: 6,
      seasonName: '2020-spring',
      seasonNameText: '2020年春'
    },
    {
      id: 7,
      seasonName: '2020-summer',
      seasonNameText: '2020年夏'
    },
    {
      id: 8,
      seasonName: '2020-autumn',
      seasonNameText: '2020年秋'
    },
    {
      id: 9,
      seasonName: '2021-winter',
      seasonNameText: '2021年冬'
    }
  ]

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  if (month === 4 || month === 7 || month === 10 || month === 1) {
    const yearMonth = `${year}-${month}`
    let yearMonthText = ''
    switch (month) {
      case 4:
        yearMonthText = `${year}年春`
        break
      case 7:
        yearMonthText = `${year}年夏`
        break
      case 10:
        yearMonthText = `${year}年秋`
        break
      case 1:
        yearMonthText = `${year}年冬`
        break
    }
    const alreadyExists = seasonList.some((season) => season.seasonName === yearMonth)
    if (!alreadyExists) {
      seasonList.push({
        id: seasonList.slice(-1)[0].id + 1,
        seasonName: yearMonth,
        seasonNameText: yearMonthText
      })
    }
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(seasonList)
  }
}
