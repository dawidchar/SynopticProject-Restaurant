<template>
  <div class="d-flex align-center">
    <v-btn x-small icon color="red" @click="$emit('removeItem')">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <span class="text-center mx-2 font-weight-bold">
      {{ quantity }}
    </span>
    <v-btn x-small icon color="green" @click="$emit('addItem')">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
    props: {
        quantity: {
            type: [String, Number],
            default: 0
        }
    }
}
</script>

<style>

</style>
