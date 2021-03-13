export type Animes = {
  works: Anime[]
}

export type Anime = {
  id: number
  title: string
  media: string
  mediaText: string
  seasonName: string
  seasonNameText: string
  officialSiteUrl: string
  twitterUsername: string
  images: {
    recommendedUrl: string
  }
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

export type Season = {
  id: number
  seasonText: string
}
