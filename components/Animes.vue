<template>
  <v-layout column>
    <h1 v-if="$props.targetAnimeTitle !== ''" class="my_font">
      検索結果: {{ $props.targetAnimeTitle }}
    </h1>
    <h1 v-else-if="title !== ''" class="my_font">
      {{ title }}
    </h1>
    <h1 v-else class="my_font">
      {{ season.seasonNameText }}のアニメ
    </h1>
    <v-row>
      <v-col v-for="anime in animes" :key="anime.id" class="anime_card">
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" class="mx-auto" max-width="600">
            <nuxt-link :to="`/detail?id=${anime.id}`">
              <!-- TODO: NO IMAGEの表示のさせ方をもう少し考える -->
              <v-img
                v-if="$vuetify.breakpoint.smAndUp"
                height="250px"
                :src="anime.images.recommendedUrl"
                lazy-src="/no_image2.png"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out v-card--reveal display-1 white--text"
                    style="height: 100%"
                  >
                    <span class="my_font">詳細を見る</span>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-img v-else :src="anime.images.recommendedUrl" lazy-src="/no_image2.png" />
            </nuxt-link>
            <nuxt-link :to="`/detail?id=${anime.id}`" class="anime_link">
              <v-card-title class="my_font">
                {{ anime.title }}
              </v-card-title>
            </nuxt-link>
            <v-divider />
            <v-card-subtitle class="my_font">
              公式サイトURL：
              <a :href="anime.officialSiteUrl" target="_blank" rel="noopener noreferrer" class="anime_link">
                {{ anime.officialSiteUrl }}
              </a>
            </v-card-subtitle>
            <v-card-text class="my_font">
              <!-- TODO: コンポーネント化-->
              <v-chip color="accent" outlined>
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
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!-- TODO: デザイン調整 -->
    <span v-if="isNoResultsMessage" class="message">{{ noResultsMessage }}</span>
    <pagination :page="1" :total-count="totalCount" @clickPage="clickPage" />
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext, watchEffect } from '@vue/composition-api'
import { Anime, Animes } from '@/entity/Anime'
import { useSeason } from '@/store/season'
import Pagination from '@/components/Pagination.vue'
import { PER_PAGE, SORT_DESC_PARAM } from '@/constants'

export default defineComponent({
  components: {
    Pagination
  },
  props: {
    pageTitle: {
      type: String,
      default: ''
    },
    targetSeason: {
      type: String,
      default: ''
    },
    targetAnimeTitle: {
      type: String,
      default: ''
    }
  },
  setup(props, context: SetupContext) {
    const animes = ref<Anime[]>([])
    const totalCount = ref<number>()
    const title = ref<string>(props.pageTitle)
    const noResultsMessage = '一致するアニメはありませんでした。'
    const isNoResultsMessage = ref<boolean>(false)
    const season = useSeason()

    watchEffect(async () => {
      // TODO: リファクタ
      if (props.targetSeason !== '') {
        const res = await context.root.$axios.$get<Animes>('/works', {
          params: {
            access_token: process.env.NUXT_ENV_ACCESS_TOKEN,
            filter_season: props.targetSeason,
            sort_watchers_count: SORT_DESC_PARAM,
            per_page: PER_PAGE
          }
        })
        animes.value = res.works
        totalCount.value = res.totalCount
      }

      if (props.targetAnimeTitle !== '') {
        const res = await context.root.$axios.$get<Animes>('/works', {
          params: {
            access_token: process.env.NUXT_ENV_ACCESS_TOKEN,
            filter_title: props.targetAnimeTitle,
            sort_watchers_count: SORT_DESC_PARAM,
            per_page: PER_PAGE
          }
        })
        animes.value = res.works
      }

      isNoResultsMessage.value = animes.value.length === 0
    })

    const clickPage = async (targetPage: number) => {
      // TODO: リファクタ
      const res = await context.root.$axios.$get<Animes>('/works', {
        params: {
          access_token: process.env.NUXT_ENV_ACCESS_TOKEN,
          filter_season: props.targetSeason,
          sort_watchers_count: SORT_DESC_PARAM,
          per_page: PER_PAGE,
          page: targetPage
        }
      })
      animes.value = res.works
      totalCount.value = res.totalCount
      window.scrollTo(0, 0)
    }

    return {
      animes,
      totalCount,
      title,
      noResultsMessage,
      isNoResultsMessage,
      season,
      clickPage
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
.v-card--reveal {
  background-color: #99a8ff;
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.4;
  position: absolute;
  width: 100%;
}

.message {
  margin-top: 50px;
}
</style>
