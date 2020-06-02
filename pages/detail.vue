<template>
  <v-layout column>
    <v-card flat class="mx-auto">
      <v-card-title>{{ anime.title }}</v-card-title>
      <v-img :src="anime.imageUrl" />
      <v-card-text>
        <p>
          公式サイトURL：
          <a :href="anime.officialSiteUrl" target="_blank" rel="noopener noreferrer" class="anime_link">
            {{ anime.officialSiteUrl }}
          </a>
        </p>
        <p>
          公式Twitter：<a
            :href="`http://twitter.com/${anime.twitterUserName}`"
            target="_blank"
            rel="noopener noreferrer"
            class="anime_link"
            >@{{ anime.twitterUserName }}</a
          >
        </p>
        <!-- TODO: コンポーネント化-->
        <p>
          <v-chip color="accent" outlined>
            <v-icon v-if="anime.media === 'TV'" left>mdi-television-classic</v-icon>
            <v-icon v-else-if="anime.media === 'OVA'" left>mdi-video</v-icon>
            <v-icon v-else-if="anime.media === '映画'" left>mdi-movie</v-icon>
            <v-icon v-else-if="anime.media === 'Web'" left>mdi-web</v-icon>
            <v-icon v-else-if="anime.media === 'その他'" left>mdi-television</v-icon>
            {{ anime.media }}
          </v-chip>
        </p>
      </v-card-text>
    </v-card>
    <v-row>
      <v-card flat :class="{ 'mx-auto': $vuetify.breakpoint.smAndUp, '': $vuetify.breakpoint.xsOnly }">
        <v-card-title>キャラクター / キャスト</v-card-title>
        <v-card-text v-for="cast in casts" :key="cast.name">
          <p class="detail_text">{{ cast.characterName }} : {{ cast.name }}</p>
        </v-card-text>
      </v-card>
      <v-card flat :class="{ 'mx-auto': $vuetify.breakpoint.smAndUp, '': $vuetify.breakpoint.xsOnly }">
        <v-card-title>エピソード</v-card-title>
        <v-card-text v-for="episode in episodes" :key="episode.numberText">
          <p v-if="episode.title !== undefined" class="detail_text">{{ episode.numberText }}</p>
          <p v-if="episode.title !== undefined">{{ episode.title }}</p>
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
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { Anime, Episode, Cast } from '@/entity/Anime'

export default defineComponent({
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
  },
  setup(_props, context) {
    const msg = ref<string>('こんにちは')
    const anime = ref<Anime>([])
    const episodes = ref<Episode[]>([])
    const casts = ref<Cast[]>([])

    const id = context.root.$route.query.id || 0
    const annictId = context.root.$route.query.search || 0

    watchEffect(async () => {
      anime.value = await context.root.$axios.$get<Anime>(`/annimes/detail/${id}`)
      episodes.value = await context.root.$axios.$get<Episode[]>(`/episodes/${annictId}`)
      casts.value = await context.root.$axios.$get<Cast[]>(`/casts/${annictId}`)
    })

    return {
      msg,
      anime,
      episodes,
      casts
    }
  }
})
</script>

<style lang="scss" scoped>
.detail_text {
  margin-bottom: 0px;
}
</style>
