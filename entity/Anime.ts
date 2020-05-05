export type Anime = {
  id: number
  annictId: number
  title: string
  media: String
  season: string
  officialSiteUrl: string
  twitterUserName: string
  imageUrl: string
}

export type Episode = {
  annictId: number
  numberText: string
  title: string
}

export type Cast = {
  annictId: number
  name: string
  characterName: string
}
