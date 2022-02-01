<template>
  <v-card class="pa-8">
    <h3 class="text-center mb-5">
      Update Your Password
    </h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row no-gutters class="flex-column">
        <v-text-field
          v-model="currentPassword"
          label="Your Current Password"
          :rules="[rules.required()]"
          :append-icon="showPassCurrent ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassCurrent ? 'text' : 'password'"
          required
          @click:append="showPassCurrent = !showPassCurrent"
        />

        <v-text-field
          v-model="newPassword"
          label="New Password"
          hint="At least 8 characters"
          :rules="[rules.required(), rules.min(8), rules.max(99)]"
          :append-icon="showPassNew ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassNew ? 'text' : 'password'"
          required
          @click:append="showPassNew = !showPassNew"
        />

        <v-text-field
          v-model="confirmNewPassword"
          label="Confirm New Password"
          hint="At least 8 characters"
          :rules="[rules.required(), rules.min(8), rules.max(99), rules.match(newPassword, 'Password')]"
          :append-icon="showPassNewConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassNewConfirm ? 'text' : 'password'"
          required
          @click:append="showPassNewConfirm = !showPassNewConfirm"
        />
      </v-row>

      <v-btn
        color="error"
        class="ml-auto mt-5"
        style="display:block"
        :loading="loading"
        @click="updateProfile"
      >
        Update Password
        <v-icon right>
          mdi-lock
        </v-icon>
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import validationRules from '~/utils/formValidationRules'
import updateUserPassword from '~/services/updateUserPassword.service'
import friendlyError from '~/utils/friendlyErrorMessage'
export default {
    data: () => ({
        valid: true,
        loading: false,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        showPassCurrent: false,
        showPassNew: false,
        showPassNewConfirm: false
    }),
    computed: {
        ...mapState('user', ['userData']),
        rules () { return validationRules }
    },
    created () {
        this.name = this.userData.name
        this.phoneNumber = this.userData.phoneNumber
        this.email = this.userData.email
    },
    errorCaptured (e) {
        this.loading = false
        this.$emit('error', { title: 'Error Updating Password', subtitle: friendlyError(e), e })
        return false
    },
    methods: {
        updateProfile () {
            if (this.$refs.form.validate() && !this.loading) {
                this.loading = true
                updateUserPassword(this, {
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword
                }).then(() => {
                    this.$refs.form.reset()
                    this.$emit('success', { title: 'Updated your Password Successfully' })
                })
                    .catch((e) => {
                        this.$emit('error',
                            { title: 'Error Updating Password', subtitle: friendlyError(e), e })
                    })
                    .finally(() => { this.loading = false })
            }
        }
    }
}
</script>

<style>

</style>
