<template>
  <v-app dark>
    <!-- header -->
    <v-card v-if="$vuetify.breakpoint.smAndUp" flat tile class="header">
      <v-app-bar height="65px" dark fixed flat color="#4d4d4d">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <router-link to="/">
          <v-img src="/aniweb_logo2.png" max-width="170" max-height="140" />
        </router-link>
        <v-spacer />
        <v-col sm="3" md="3">
          <v-text-field
            v-model="searchTitle"
            outlined
            clearable
            dense
            label="タイトルで検索"
            prepend-inner-icon="mdi-magnify"
            class="search_box"
            @keyup.enter="searchByTitle(searchTitle)"
          />
        </v-col>
      </v-app-bar>
    </v-card>
    <v-card v-else flat tile class="header_sp">
      <v-app-bar height="65px" dark fixed flat color="#4d4d4d">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <router-link to="/">
          <v-img src="/aniweb_logo2.png" max-width="110" max-height="80" />
        </router-link>
        <v-spacer />
        <v-col cols="7.5" sm="3" md="3">
          <v-text-field
            v-model="searchTitle"
            outlined
            clearable
            dense
            label="タイトルで検索"
            prepend-inner-icon="mdi-magnify"
            class="search_box_sp"
            @keyup.enter="searchByTitle(searchTitle)"
          />
        </v-col>
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
            v-for="(season, i) in seasonList"
            :key="i"
            :to="`/bySeason/${season.seasonName}`"
            @click="setSeasonNameText(season.seasonNameText)"
          >
            <v-list-item-icon />
            <v-list-item-title class="my_font" v-text="season.seasonNameText" />
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
import { defineComponent, ref, onMounted, SetupContext } from '@vue/composition-api'
import { Season } from '@/entity/Anime'

export default defineComponent({
  setup(_props, context: SetupContext) {
    const title = ref<string>('アニウェブ')
    const drawer = ref<boolean>(false)
    const seasonList = ref<Season[]>([])
    const searchTitle = ''

    onMounted(async () => {
      seasonList.value = await context.root.$axios.$get<Season[]>(
        'https://9n0j8g7loh.execute-api.ap-northeast-1.amazonaws.com/prod/season'
      )
      // idの降順にソート
      seasonList.value.sort((a, b) => {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
        return 0
      })
    })

    const searchByTitle = (searchTitle: string) => {
      if (searchTitle === '' || searchTitle == null) {
        context.root.$router.push('/')
        return
      }
      context.root.$router.push(`/searchResult?title=${searchTitle}`)
    }

    const setSeasonNameText = (seasonName: string) => {
      context.root.$nuxt.$store.commit('season/setSeasonNameText', seasonName)
    }

    return {
      title,
      drawer,
      seasonList,
      searchTitle,
      searchByTitle,
      setSeasonNameText
    }
  }
})
</script>

<style lang="scss" scoped>
.search_box {
  top: 15px;
  position: relative;
}

.search_box_sp {
  top: 15px;
  position: relative;
  // TODO: フォントサイズ
  .v-input .v-label {
    font-size: 12px !important;
  }
}

.main_content {
  padding: 10px 35px;
  max-width: 1800px;
}

.header {
  margin-bottom: 75px;
}

.header_sp {
  margin-bottom: 60px;
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
