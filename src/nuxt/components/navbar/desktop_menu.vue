<template>
  <v-col class="d-flex justify-space-between py-0">
    <v-btn
      v-for="item in menuButtons"
      :key="item.text"
      :to="item.path"
      :title="item.tooltip"
      text
      height="95%"
      color="white"
    >
      {{ item.text }}
    </v-btn>
  </v-col>
</template>

<script>
import navbarMenuButtonsMixin from '~/mixins/navbarMenuButtons.mixin'
export default {
    mixins: [navbarMenuButtonsMixin]
}
</script>

<style>

</style>
