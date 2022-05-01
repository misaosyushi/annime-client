<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="currentPage"
              class="my-4"
              :length="length"
              @input="$emit('clickPage', currentPage)"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'

const PER_PAGE = 25 // TODO: 全体で定数化

export default defineComponent({
  props: {
    page: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const currentPage = ref<number>(props.page)
    const length = ref<number>(1)

    watchEffect(() => {
      length.value = Math.ceil(props.totalCount / PER_PAGE)
    })

    return {
      currentPage,
      length
    }
  }
})
</script>

<style scoped>

</style>
