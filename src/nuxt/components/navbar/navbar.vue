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
      <desktopMenu :items="navbar.menuButtons" />
      <v-col class="d-flex justify-end py-0">
        <desktopProfile :user="user" :items="navbar.profileButtons" />
        <basket />
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
    computed: {
        ...mapState('user', { user: 'userData' }),
        ...mapState(['navbar', 'restaurantName'])
    }
}
</script>

<style />
