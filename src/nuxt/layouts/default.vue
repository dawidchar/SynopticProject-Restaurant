<template>
  <v-app>
    <navbar />
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
export default {
    middleware: 'adminAuth'
}
</script>

<style lang="scss" scoped>

.mainContainer {
  background-color: $restaurant-white;
}

</style>
