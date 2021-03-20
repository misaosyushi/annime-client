const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'ap-northeast-1' })

exports.handler = async () => {
  const data = await s3
    .getObject({
      Bucket: process.env.BUCKET_NAME,
      Key: process.env.FILE_PATH
    })
    .promise()
  const seasonList = JSON.parse(data.Body)

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

    // 新シーズンの要素を追加
    const alreadyExists = seasonList.some((season) => season.seasonName === yearMonth)
    if (!alreadyExists) {
      seasonList.push({
        id: seasonList.slice(-1)[0].id + 1,
        seasonName: yearMonth,
        seasonNameText: yearMonthText
      })
    }

    // jsonを更新しておく
    s3.putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: process.env.FILE_PATH,
      Body: JSON.stringify(seasonList)
    }).promise()
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(seasonList)
  }
}
