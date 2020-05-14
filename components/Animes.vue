<template>
  <v-layout column>
    <h1>{{ seasonTitle }}</h1>
    <v-row>
      <v-col v-for="anime in animes" :key="anime.id" class="anime_card">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 16 : 2" class="mx-auto" max-width="600">
            <nuxt-link :to="`detail?id=${anime.id}&search=${anime.annictId}`">
              <!-- TODO: NO IMAGEの表示のさせ方をもう少し考える -->
              <v-img v-if="$vuetify.breakpoint.smAndUp" height="250px" :src="anime.imageUrl" lazy-src="/no_image2.png">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out v-card--reveal display-1 white--text"
                    style="height: 100%;"
                  >
                    詳細を見る
                  </div>
                </v-expand-transition>
              </v-img>
              <v-img v-else :src="anime.imageUrl" lazy-src="/no_image2.png" />
            </nuxt-link>
            <nuxt-link :to="`detail?id=${anime.id}&search=${anime.annictId}`" class="anime_link">
              <v-card-title>{{ anime.title }}</v-card-title>
            </nuxt-link>
            <v-divider />
            <v-card-subtitle
              >公式サイトURL：
              <a :href="anime.officialSiteUrl" target="_blank" rel="noopener noreferrer" class="anime_link">
                {{ anime.officialSiteUrl }}
              </a>
            </v-card-subtitle>
            <v-card-text>
              <!-- TODO: コンポーネント化-->
              <v-chip color="accent" outlined>
                <v-icon v-if="anime.media === 'TV'" left>mdi-television-classic</v-icon>
                <v-icon v-else-if="anime.media === 'OVA'" left>mdi-video</v-icon>
                <v-icon v-else-if="anime.media === '映画'" left>mdi-movie</v-icon>
                <v-icon v-else-if="anime.media === 'Web'" left>mdi-web</v-icon>
                <v-icon v-else-if="anime.media === 'その他'" left>mdi-television</v-icon>
                {{ anime.media }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { Anime } from '@/entity/Anime'

export default defineComponent({
  props: {
    seasonTitle: {
      type: String,
      default: ''
    },
    seasonId: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const animes = ref<Anime[]>([])
    const seasonTitle = ref<string>(props.seasonTitle)

    watchEffect(async () => {
      animes.value = await context.root.$axios.$get<Anime[]>(`/annimes/${props.seasonId}`)
    })

    return {
      animes,
      seasonTitle
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
</style>
