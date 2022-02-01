<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.login_title }}
    </h1>
    <v-divider class="mb-10 mt-1" />
    <v-responsive class="mx-auto pa-1" width="70vw" max-width="600px">
      <loginForm />
    </v-responsive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginForm from '~/components/account/loginForm.vue'
export default {
    components: {
        loginForm
    },
    computed: {
        ...mapState(['text'])
    }
}
</script>

<style>

</style>
