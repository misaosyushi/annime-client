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

export type Episodes = {
  episodes: Episode[]
}

export type Episode = {
  id: number
  numberText: string
  title: string
}

export type Casts = {
  casts: Cast[]
}

export type Cast = {
  id: number
  name: string
  character: {
    name: string
  }
}

export type Season = {
  id: number
  seasonName: string
  seasonNameText: string
}
