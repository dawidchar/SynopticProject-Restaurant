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
      <v-text-field
        v-model="email"
        :rules="[rules.required(), rules.email(), rules.max(99)]"
        label="E-mail"
        required
      />

      <v-text-field
        v-model="password"
        :rules="[rules.required(), rules.max(99)]"
        label="Password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        required
        @click:append="showPass = !showPass"
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
    </v-form>
    <v-divider class="mt-6 mb-2" />
    <span class="body-2 grey--text text--darken-1">Dont have an Account?
      <NuxtLink class="text-decoration-none grey--text" to="/register">
        Click Here
      </NuxtLink>
    </span>
  </v-card>
</template>

<script>
import validationRules from '~/utils/formValidationRules'
import accountLogin from '~/services/accountLogin.service'
import friendlyError from '~/utils/friendlyErrorMessage'
export default {
    data: () => ({
        valid: true,
        email: '',
        password: '',
        showPass: false,
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
                accountLogin(this,
                    { email: this.email, password: this.password })
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
