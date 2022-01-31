<template>
  <v-col class="d-flex justify-space-between py-0">
    <v-btn
      v-for="item in items"
      :key="item.text"
      :to="item.path"
      :title="item.tooltip"
      text
      height="100%"
      color="white"
    >
      {{ item.text }}
    </v-btn>
  </v-col>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>
