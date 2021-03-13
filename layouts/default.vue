<template>
  <v-app dark>
    <!-- header -->
    <v-card v-if="$vuetify.breakpoint.smAndUp" flat tile class="header">
      <v-app-bar height="65px" dark fixed flat color="#4d4d4d">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-img src="/aniweb_logo2.png" max-width="170" max-height="140" />
        <!-- TODO: 検索機能 -->
        <!--      <v-spacer />-->
        <!--      <v-col sm="4">-->
        <!--        <v-text-field outlined clearable label="Coming soon..." prepend-inner-icon="mdi-magnify" class="search_box" />-->
        <!--      </v-col>-->
      </v-app-bar>
    </v-card>
    <v-card v-else flat tile>
      <v-app-bar height="65px" dark fixed flat color="#4d4d4d">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-img src="/aniweb_logo2.png" max-width="110" max-height="80" />
      </v-app-bar>
    </v-card>
    <!-- side bar -->
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      :class="{ sidebar: $vuetify.breakpoint.lgAndUp, '': $vuetify.breakpoint.mdAndDown }"
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="my_font">Top</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-magnify">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="my_font">クール別一覧</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(season, i) in displaySeason"
            :key="i"
            :to="`/bySeason/${season.seasonText}`"
            @click="setDisplaySeason(season.displaySeason)"
          >
            <v-list-item-icon />
            <v-list-item-title class="my_font" v-text="season.displaySeason" />
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid :class="{ main_content: $vuetify.breakpoint.mdAndUp, '': $vuetify.breakpoint.smAndDown }">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="accent">
      <v-spacer />
      <span class="my_font footer__font">&copy; misaosyushi</span>
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
      season = await context.root.$axios.$get<Season[]>(
        'https://9n0j8g7loh.execute-api.ap-northeast-1.amazonaws.com/prod/season'
      )
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
            displaySeason.value.push({ id: val.id, displaySeason: year + '年 春' })
            break
          case 'summer':
            displaySeason.value.push({ id: val.id, displaySeason: year + '年 夏' })
            break
          case 'autumn':
            displaySeason.value.push({ id: val.id, displaySeason: year + '年 秋' })
            break
          case 'winter':
            displaySeason.value.push({ id: val.id, displaySeason: year + '年 冬' })
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

.header {
  margin-bottom: 75px;
}

.sidebar {
  margin-top: 65px;
}

.footer {
  margin-top: 30px;
  &__font {
    color: #ffffff;
    font-weight: bold;
  }
}
</style>
