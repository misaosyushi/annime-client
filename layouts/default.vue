<template>
  <v-app dark>
    <!-- side bar -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Top</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-magnify">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>クール別一覧</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(season, i) in displaySeason"
            :key="i"
            :to="`/bySeason/${season.id}`"
            @click="setDisplaySeason(season.displaySeason)"
          >
            <v-list-item-icon />
            <v-list-item-title v-text="season.displaySeason" />
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- header -->
    <v-app-bar fixed app height="65px">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-card flat color="#f1f1f1">
        <v-img v-if="$vuetify.breakpoint.smAndUp" src="/aniweb_logo.png" max-width="170" max-height="140" />
        <v-img v-else src="/aniweb_logo.png" max-width="110" max-height="80" />
      </v-card>
      <!-- TODO: 検索機能 -->
      <!--      <v-spacer />-->
      <!--      <v-col sm="4">-->
      <!--        <v-text-field outlined clearable label="Coming soon..." prepend-inner-icon="mdi-magnify" class="search_box" />-->
      <!--      </v-col>-->
    </v-app-bar>
    <v-content>
      <v-container fluid :class="{ main_content: $vuetify.breakpoint.mdAndUp, '': $vuetify.breakpoint.smAndDown }">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="false" app>
      <span>&copy; misaosyushi</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { Season } from '@/entity/Anime'

type DisplaySeason = {
  id: number
  displaySeason: string
}

export default defineComponent({
  setup(_props, context) {
    const title = ref<string>('アニウェブ')
    const drawer = ref<boolean>(false)
    const displaySeason = ref<DisplaySeason[]>([])
    let season: Season[] = []

    watchEffect(async () => {
      season = await context.root.$axios.$get<Season[]>('/season')
      // idの降順にソート
      season.sort((a, b) => {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
        return 0
      })
      context.root.$nuxt.$store.commit('season/setSeason', season)

      season.forEach((val) => {
        const year = val.seasonText.split('-')[0]
        switch (val.seasonText.split('-')[1]) {
          case 'spring':
            displaySeason.value.push({ id: val.id, displaySeason: year + '年春' })
            break
          case 'summer':
            displaySeason.value.push({ id: val.id, displaySeason: year + '年夏' })
            break
          case 'autumn':
            displaySeason.value.push({ id: val.id, displaySeason: year + '年秋' })
            break
          case 'winter':
            displaySeason.value.push({ id: val.id, displaySeason: year + '年冬' })
            break
        }
      })
    })

    function setDisplaySeason(displaySeason: string) {
      context.root.$nuxt.$store.commit('season/setDisplaySeason', displaySeason)
    }

    return {
      title,
      drawer,
      displaySeason,
      setDisplaySeason
    }
  }
})
</script>

<style lang="scss" scoped>
.search_box {
  top: 15px;
  position: relative;
}

.main_content {
  padding: 10px 35px;
  max-width: 1800px;
}
</style>
