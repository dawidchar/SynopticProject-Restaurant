<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.register_title }}
    </h1>
    <v-divider class="mb-10 mt-1" />
    <v-responsive class="mx-auto pa-1" width="70vw" max-width="600px">
      <registerForm />
    </v-responsive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import registerForm from '~/components/account/registerForm.vue'
export default {
    components: {
        registerForm
    },
    computed: {
        ...mapState(['text'])
    }
}
</script>

<style>

</style>
