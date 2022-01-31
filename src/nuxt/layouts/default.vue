<template>
  <v-app>
    <navbar />
    <v-main>
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
import { mapActions } from 'vuex'
export default {
    async fetch () {
        await this.fetchMenu(this)
    },
    methods: {
        ...mapActions('menu', ['fetchMenu'])
    }
}
</script>

<style>

</style>
