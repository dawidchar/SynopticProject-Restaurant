<template>
  <v-card class="pa-8">
    <h3 class="text-center mb-5">
      Update Your Details
    </h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row no-gutters class="flex-column">
        <v-text-field
          v-model="name"
          label="Full Name"
          :rules="[rules.required(),rules.min(3), rules.max(30)]"
          required
        />

        <v-col cols="8">
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number"
            :rules="[rules.required(), rules.phone()]"
            required
          />
        </v-col>

        <v-col cols="12" class="d-flex align-center">
          <v-text-field
            v-model="email"
            label="Email"
            disabled
          />
          <v-tooltip left attach="">
            <template #activator="{ on, attrs }">
              <v-icon
                color="grey"
                v-bind="attrs"
                v-on="on"
              >
                mdi-information-outline
              </v-icon>
            </template>
            <span>Contact us to change your email</span>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-btn
        color="primary"
        class="ml-auto mt-5"
        style="display:block"
        :loading="loading"
        @click="updateProfile"
      >
        Update Profile
        <v-icon right>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import updateUserDetails from '~/services/updateUserDetails.service.js'
import validationRules from '~/utils/formValidationRules'
import friendlyError from '~/utils/friendlyErrorMessage'
export default {
    data: () => ({
        valid: true,
        name: '',
        phoneNumber: '',
        email: '',
        loading: false
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
    methods: {
        updateProfile () {
            if (this.$refs.form.validate()) {
                this.loading = true
                updateUserDetails(this,
                    { name: this.name, phoneNumber: this.phoneNumber })
                    .then(() => { this.$emit('success', { title: 'Updated your Details Successfully' }) })
                    .catch((e) => { this.$emit('error', { title: 'Error Updating your Details', subtitle: friendlyError(e), e }) })
                    .finally(() => { this.loading = false })
            }
        }
    }
}
</script>

<style>

</style>
