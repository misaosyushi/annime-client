<template>
  <v-app>
    <h1 class="my_font">存在しないページです。</h1>
    <NuxtLink to="/">
      トップページに戻る
    </NuxtLink>
  </v-app>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api'

export default defineComponent({
  setup() {
    onMounted(() => {
      const pathName = window.location.pathname
      this.$nuxt.$router.push('/redirect?p=' + encodeURI(pathName))
    })
  }
})
</script>
