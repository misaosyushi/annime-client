<template>
  <v-layout>
    <div>
      <h1>詳細</h1>
      <a href="https://kaguya.love/" class="anime_link">hogehoge</a>
    </div>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { Anime, Episode, Cast } from '@/entity/Anime'

export default defineComponent({
  setup(_props, context) {
    const msg = ref<string>('こんにちは')
    const anime = ref<Anime>([])
    const episodes = ref<Episode[]>([])
    const casts = ref<Cast[]>([])

    const id = context.root.$route.query.id
    const annictId = context.root.$route.query.search

    watchEffect(async () => {
      anime.value = await context.root.$axios.$get<Anime>(`http://localhost:8080/annimes/detail/${id}`)
      episodes.value = await context.root.$axios.$get<Episode[]>(`http://localhost:8080/episodes/${annictId}`)
      casts.value = await context.root.$axios.$get<Cast[]>(`http://localhost:8080/casts/${annictId}`)
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

<style lang="scss"></style>
