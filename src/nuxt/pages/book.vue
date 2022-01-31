<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.book_title }}
    </h1>
    <v-divider class="mb-12 mt-1" />
    <v-responsive class="mx-auto pa-1" width="70vw" max-width="600px">
      <bookTableForm :loading="formLoading" @book="bookTable" />
    </v-responsive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bookTableForm from '~/components/book/bookTableForm.vue'
export default {
    components: {
        bookTableForm
    },
    data: () => ({
        formLoading: false
    }),
    computed: {
        ...mapState(['text'])
    },
    methods: {
        bookTable () {
            // TODO
            this.formLoading = true
            setTimeout(() => {
                this.formLoading = false
            }, 500)
        }
    }
}
</script>

<style>

</style>
