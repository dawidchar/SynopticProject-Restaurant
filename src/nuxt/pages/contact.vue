<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.contact_title }}
    </h1>
    <v-divider class="mb-8 mt-1" />
    <h3 class="text-center font-weight-regular">
      {{ text.contact_description }}
    </h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['text'])
    }
}
</script>

<style>

</style>
