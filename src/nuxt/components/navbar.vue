<template>
  <v-app-bar
    app
    dense
    elevation="3"
    outlined
    color="blue"
    rounded="b-lg"
  >
    <v-row>
      <v-col>
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        signOut () {
            console.log('Sign Out')
        }
    }
}
</script>

<style>

</style>
