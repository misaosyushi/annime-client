<template>
  <v-layout column>
    <h1>今期のアニメ</h1>
    <v-row>
      <v-col v-for="anime in animes" :key="anime.id" class="anime_card">
        <v-card class="mx-auto" max-width="600" :to="`detail?id=${anime.id}&search=${anime.annictId}`">
          <v-img height="250px" :src="anime.imageUrl" />
          <v-card-title>{{ anime.title }}</v-card-title>
          <v-card-subtitle
            >公式サイトURL：
            <a :href="anime.officialSiteUrl" target="_blank" rel="noopener noreferrer">
              {{ anime.officialSiteUrl }}
            </a>
          </v-card-subtitle>
          <v-card-text>
            <v-divider class="my-3" />
            <p>{{ anime.media }}</p>
          </v-card-text>
        </v-card>
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
      animes.value = await context.root.$axios.$get('http://localhost:8080/annimes/2')
    })

    return {
      msg,
      animes
    }
  }
})
</script>

<style lang="scss">
.anime_card {
  width: 450px;
}
</style>
