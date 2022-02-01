<template>
  <!-- TODO - Make the title a shared component -->
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.home_title }}
    </h1>
    <h3 class="text-center font-weight-regular">
      {{ text.home_description }}
    </h3>
    <v-divider class="mb-5 mt-1" />
    <v-responsive class="mx-auto pa-1" :aspect-ratio="16/9" max-width="800px">
      <v-carousel height="400" cycle class="rounded-xl">
        <v-carousel-item
          v-for="(item,i) in images.home_carousel"
          :key="i"
          :src="item"
        />
      </v-carousel>
    </v-responsive>
    <v-row justify="center" class="mt-8">
      <v-col cols="12" md="8" class="d-flex justify-space-around">
        <v-btn
          v-for="item in home_buttons"
          :key="item.text"
          :color="item.color"
          :to="item.path"
          :outlined="item.outlined"
          :title="item.tooltip"
        >
          {{ item.text }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['text', 'images', 'home_buttons']),
        ...mapState('user', { user: 'userData' }),
        ...mapState('menu', { menu: 'items' })
    }
}
</script>

<style>

</style>
