<template>
  <animes seasonTitle="今期のアニメ" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'

export default defineComponent({
  components: {
    Animes
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
