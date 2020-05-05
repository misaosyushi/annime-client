<template>
  <v-layout column>
    <h1>今期のアニメ</h1>
    <v-row>
      <v-col v-for="anime in animes" :key="anime.id" class="anime_card">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 16 : 2" class="mx-auto" max-width="600">
            <nuxt-link :to="`detail?id=${anime.id}&search=${anime.annictId}`">
              <v-img height="250px" :src="anime.imageUrl" />
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
  setup(_props, context) {
    const msg = ref<string>('こんにちは')
    const animes = ref<Anime[]>([])

    watchEffect(async () => {
      animes.value = await context.root.$axios.$get<Anime[]>('/annimes/2')
    })

    return {
      msg,
      animes
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
