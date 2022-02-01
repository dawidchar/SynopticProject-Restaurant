<template>
  <v-card rounded="lg" class="pt-8 px-8 pb-2">
    <v-alert v-show="showErrorMessage" type="error">
      {{ errorText }}
    </v-alert>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row no-gutters class="flex-column">
        <v-text-field
          v-model="name"
          :rules="[rules.required(), rules.min(3), rules.max(99)]"
          label="Full Name*"
          required
        />

        <v-text-field
          v-model="email"
          :rules="[rules.required(), rules.email(), rules.max(99)]"
          label="E-mail*"
          required
        />

        <v-col cols="8" md="6">
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number*"
            :rules="[rules.required(), rules.phone()]"
            required
          />
        </v-col>

        <v-text-field
          v-model="password"
          label="New Password"
          hint="At least 8 characters"
          :rules="[rules.required(), rules.min(8), rules.max(99)]"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          required
          @click:append="showPass = !showPass"
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirm New Password"
          hint="At least 8 characters"
          :rules="[rules.required(), rules.min(8), rules.max(99), rules.match(password, 'Password')]"
          :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassConfirm ? 'text' : 'password'"
          required
          @click:append="showPassConfirm = !showPassConfirm"
        />

        <v-btn
          color="primary"
          class="ml-auto mt-5"
          style="display:block"
          :loading="loading"
          @click="login"
        >
          Login
        </v-btn>
      </v-row>
    </v-form>
    <v-divider class="mt-6 mb-2" />
    <span class="body-2 grey--text text--darken-1">Already have an account?
      <NuxtLink class="text-decoration-none grey--text" to="/login">
        Click Here
      </NuxtLink>
    </span>
  </v-card>
</template>

<script>
import validationRules from '~/utils/formValidationRules'
import accountRegister from '~/services/accountRegister.service'
import friendlyError from '~/utils/friendlyErrorMessage'
export default {
    data: () => ({
        valid: true,
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        showPass: false,
        showPassConfirm: false,
        loading: false,
        errorText: '',
        showErrorMessage: false
    }),
    computed: {
        rules () {
            return validationRules
        }
    },
    methods: {
        login () {
            if (this.$refs.form.validate() && !this.loading) {
                this.loading = true
                this.showErrorMessage = false
                accountRegister(this,
                    {
                        name: this.name,
                        email: this.email,
                        phoneNumber: this.phoneNumber,
                        password: this.password
                    })
                    .then(() => { this.$router.push('/') })
                    .catch((e) => { this.showError(e) })
                    .finally(() => { this.loading = false })
            }
        },
        showError (e) {
            this.errorText = `Error Logging In - ${friendlyError(e)}`
            this.showErrorMessage = true
        }
    }
}
</script>

<style>

</style>
