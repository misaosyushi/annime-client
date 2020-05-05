<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div>
        <h1>今期のアニメ</h1>
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            {{ animes }}
          </p>
          <hr class="my-3" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { Anime } from '@/entity/Anime'

export default defineComponent({
  setup(_props, context) {
    const msg = ref<string>('こんにちは')
    const animes = ref<Anime[]>([])

    watch(async () => {
      animes.value = await context.root.$axios.$get('http://localhost:8080/annimes/2')
    })

    return {
      msg,
      animes
    }
  }
})
</script>
