<template>
  <v-app>
    <h1 class="my_font">存在しないページです。</h1>
    <NuxtLink to="/">
      トップページに戻る
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(_props, context: SetupContext) {
    onMounted(() => {
      const pathName: string = window.location.pathname
      context.root.$nuxt.$router.push('/redirect?p=' + encodeURI(pathName))
    })
  }
})
</script>
