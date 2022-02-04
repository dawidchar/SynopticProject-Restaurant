<template>
  <v-col class="d-flex align-center">
    <v-toolbar-title>
      <nuxt-link to="/" class="white--text">
        <img height="50px" class="pt-2" src="/logo.png">
      </nuxt-link>
    </v-toolbar-title>
  </v-col>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>
