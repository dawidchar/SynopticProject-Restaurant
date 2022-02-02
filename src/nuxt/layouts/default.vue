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
import { mapActions, mapState } from 'vuex'
export default {
    middleware: 'adminAuth',
    async fetch () {
        await this.fetchMenu(this)
        if (this.isAdmin) {
            await this.fetchAdminData(this)
        }
    },
    computed: {
        ...mapState('user', { isAdmin: 'admin' })
    },
    methods: {
        ...mapActions('menu', ['fetchMenu']),
        ...mapActions('admin', ['fetchAdminData'])
    }
}
</script>

<style>

</style>
