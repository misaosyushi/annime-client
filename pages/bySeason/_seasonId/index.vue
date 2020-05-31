<template>
  <animes :season-title="name + 'のアニメ'" :season-id="Number($route.params.seasonId)" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'

export default defineComponent({
  head() {
    return {
      title: 'クール別アニメ一覧',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'クール別のアニメ一覧です。'
        }
      ]
    }
  },
  components: {
    Animes
  },
  setup(_props, context) {
    const name = ref<string>(context.root.$store.state.season.displaySeason)

    return {
      name
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
