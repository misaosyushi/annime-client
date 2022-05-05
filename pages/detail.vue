<template>
  <v-layout column>
    <v-card flat class="mx-auto">
      <v-card-title class="my_font">
        {{ anime.title }}
      </v-card-title>
      <v-img :src="anime.images.recommendedUrl" />
      <v-card-text>
        <p class="my_font">
          公式サイトURL：
          <a :href="anime.officialSiteUrl" target="_blank" rel="noopener noreferrer" class="anime_link">
            {{ anime.officialSiteUrl }}
          </a>
        </p>
        <p class="my_font">
          公式Twitter：<a
            :href="`http://twitter.com/${anime.twitterUsername}`"
            target="_blank"
            rel="noopener noreferrer"
            class="anime_link"
          >@{{ anime.twitterUsername }}</a>
        </p>
        <!-- TODO: コンポーネント化-->
        <p>
          <v-chip color="accent" outlined class="my_font">
            <v-icon v-if="anime.mediaText === 'TV'" left>
              mdi-television-classic
            </v-icon>
            <v-icon v-else-if="anime.mediaText === 'OVA'" left>
              mdi-video
            </v-icon>
            <v-icon v-else-if="anime.mediaText === '映画'" left>
              mdi-movie
            </v-icon>
            <v-icon v-else-if="anime.mediaText === 'Web'" left>
              mdi-web
            </v-icon>
            <v-icon v-else-if="anime.mediaText === 'その他'" left>
              mdi-television
            </v-icon>
            {{ anime.mediaText }}
          </v-chip>
        </p>
      </v-card-text>
    </v-card>
    <v-row>
      <v-card flat :class="{ 'mx-auto': $vuetify.breakpoint.smAndUp, '': $vuetify.breakpoint.xsOnly }">
        <v-card-title class="my_font">
          キャラクター / キャスト
        </v-card-title>
        <v-card-text v-for="cast in casts" :key="cast.name">
          <p class="detail_text my_font">
            {{ cast.character.name }} : {{ cast.name }}
          </p>
        </v-card-text>
      </v-card>
      <v-card flat :class="{ 'mx-auto': $vuetify.breakpoint.smAndUp, '': $vuetify.breakpoint.xsOnly }">
        <v-card-title class="my_font">
          エピソード
        </v-card-title>
        <v-card-text v-for="episode in episodes" :key="episode.numberText">
          <p v-if="episode.title !== undefined" class="detail_text my_font">
            {{ episode.numberText }}
          </p>
          <p v-if="episode.title !== undefined" class="my_font">
            {{ episode.title }}
          </p>
        </v-card-text>
      </v-card>
    </v-row>
    <!--    <v-card class="mx-auto">-->
    <!--      &lt;!&ndash; TODO: 来たパスに戻るようにする &ndash;&gt;-->
    <!--      <v-btn to="/" color="accent" block><v-icon left>mdi-keyboard-backspace</v-icon>戻る</v-btn>-->
    <!--    </v-card>-->
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Animes, Episodes, Casts } from '@/entity/Anime'
import { SORT_ASC_PARAM } from '@/constants'

export default defineComponent({
  async asyncData({ $axios, query }): Promise<any> {
    const id = query.id || 0
    const [animeRes, episodesRes, castsRes] = await Promise.all([
      $axios.$get<Animes>('/works', {
        params: {
          access_token: process.env.NUXT_ENV_ACCESS_TOKEN,
          filter_ids: id
        }
      }),
      $axios.$get<Episodes>('/episodes', {
        params: {
          access_token: process.env.NUXT_ENV_ACCESS_TOKEN,
          filter_work_id: id,
          sort_sort_number: SORT_ASC_PARAM
        }
      }),
      $axios.$get<Casts>('/casts', {
        params: {
          access_token: process.env.NUXT_ENV_ACCESS_TOKEN,
          filter_work_id: id,
          sort_sort_number: SORT_ASC_PARAM
        }
      })
    ])

    return {
      anime: animeRes.works[0],
      episodes: episodesRes.episodes,
      casts: castsRes.casts
    }
  },
  head() {
    return {
      title: 'アニメ詳細',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'アニメの詳細です。エピソード、キャスト等の情報を掲載しています。'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
    }
  }
})
</script>

<style lang="scss" scoped>
.detail_text {
  margin-bottom: 0px;
}
</style>
