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
      <desktopProfile :user="user" :items="navbar.profileButtons" />
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import navbarTitle from '~/components/navbar/title.vue'
import desktopMenu from '~/components/navbar/desktop_menu.vue'
import desktopProfile from '~/components/navbar/desktop_profile.vue'
export default {
    components: {
        navbarTitle,
        desktopMenu,
        desktopProfile
    },
    computed: {
        ...mapState('user', { user: 'userData' }),
        ...mapState(['navbar', 'restaurantName'])
    },
    methods: {
        signOut () {
            console.log('Sign Out')
        }
    }
}
</script>

<style />
