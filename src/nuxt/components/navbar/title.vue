<template>
  <v-col class="d-flex align-center">
    <v-toolbar-title>
      <nuxt-link to="/" class="white--text">
        {{ text }}
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
