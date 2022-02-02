<template>
  <v-app>
    <navbar @drawerUpdate="drawer = !drawer" />
    <mobileMenuDrawer :show="drawer" @updateShow="(val) => drawer = val" />
    <v-main class="mainContainer">
      <v-container>
        <v-row justify="center">
          <v-col cols="11">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import mobileMenuDrawer from '~/components/navbar/mobile_menuDrawer.vue'
export default {
    components: { mobileMenuDrawer },
    middleware: 'adminAuth',
    data: () => ({ drawer: false })
}
</script>

<style lang="scss" scoped>

.mainContainer {
  background-color: $restaurant-white;
}

</style>
