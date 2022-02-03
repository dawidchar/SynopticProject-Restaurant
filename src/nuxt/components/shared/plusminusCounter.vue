<template>
  <div class="d-flex align-center">
    <v-btn x-small icon color="red" :disabled="disabled" @click="$emit('removeItem')">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <span :class="['text-center', 'mx-2', 'pt-1', 'font-weight-bold', {'grey--text': disabled}]">
      {{ quantity }}
    </span>
    <v-btn x-small icon color="green" :disabled="disabled" @click="$emit('addItem')">
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
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>
