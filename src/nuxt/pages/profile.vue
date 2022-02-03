<template>
  <div class="pt-2">
    <h1 class="text-center">
      {{ text.profile_title }}
    </h1>
    <v-divider class="mb-8 mt-1" />
    <div class="d-flex flex-wrap mx-auto pa-1 justify-space-around">
      <updateDetailsForm class="ma-4 profileDetailsForm" @success="updateSuccess" @error="updateError" />
      <updatePasswordForm class="ma-4 passwordForm" @success="updateSuccess" @error="updateError" />
    </div>
    <statusSnackbar :data="snackbarData" :visible.sync="snackbarVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import updateDetailsForm from '~/components/profile/updateDetailsForm.vue'
import updatePasswordForm from '~/components/profile/updatePasswordForm.vue'
import statusSnackbarMixin from '~/mixins/statusSnackbar.mixin'
export default {
    components: {
        updateDetailsForm,
        updatePasswordForm
    },
    mixins: [statusSnackbarMixin],
    computed: {
        ...mapState(['text'])
    },
    methods: {
        updateSuccess (payload) {
            this.openSnackbar({ ...payload, color: 'success' })
        },
        updateError (payload) {
            this.openSnackbar({ ...payload, color: 'error', timeout: 9000 })
        }
    }
}
</script>

<style lang="scss" scoped>
.profileDetailsForm {
  width: 70vw;
  max-width: 600px;
}

.passwordForm {
  width: 70vw;
  max-width: 600px;
}
</style>
