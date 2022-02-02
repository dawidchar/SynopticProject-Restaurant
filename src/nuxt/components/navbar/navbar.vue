<template>
  <v-app-bar
    app
    dense
    elevation="3"
    outlined
    color="primary"
  >
    <v-row>
      <navbarTitle :text="restaurantName" />
      <!-- TODO - Move into Component -->
      <desktopMenu class="hidden-mobile" :items="navbar.menuButtons" />
      <v-col class="d-flex justify-end py-0">
        <desktopProfile class="hidden-mobile" />
        <basket />
        <div class="d-flex align-center pb-1 pl-4 hidden-desktop">
          <v-app-bar-nav-icon class="pb-1" color="white" @click="$emit('drawerUpdate')" />
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import navbarTitle from '~/components/navbar/title.vue'
import desktopMenu from '~/components/navbar/desktop_menu.vue'
import desktopProfile from '~/components/navbar/desktop_profile.vue'
import basket from '~/components/navbar/basket.vue'
export default {
    components: {
        navbarTitle,
        desktopMenu,
        desktopProfile,
        basket
    },
    data: () => ({
        drawer: false
    }),
    computed: {
        ...mapState(['navbar', 'restaurantName'])
    }
}
</script>

<style lang="scss" scoped>

@media (max-width: $navbarMobileBreakpoint + 0px) {
  .hidden-mobile {
    display: none !important;
  }
}

@media (min-width: $navbarMobileBreakpoint + 1px) {
  .hidden-desktop {
    display: none !important;
  }
}

</style>
