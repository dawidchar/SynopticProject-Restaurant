<template>
  <v-card class="pa-6">
    <h3 class="text-center mb-5">
      {{ text.book_form_title }}
    </h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row no-gutters class="flex-column">
        <v-text-field
          v-model="name"
          :rules="[rules.required(), rules.max(30)]"
          label="Full Name*"
          required
        />

        <v-col cols="8" md="6">
          <v-text-field
            v-model="phoneNumber"
            :rules="[rules.required(), rules.phone()]"
            label="Phone Number*"
            required
          />
        </v-col>

        <v-text-field
          v-model="email"
          :rules="[rules.required(), rules.email(), rules.max(99)]"
          label="Email*"
          required
        />

        <v-col cols="8" md="6">
          <v-select
            v-model="numberOfPeople"
            :rules="[rules.required()]"
            :items="numOfPeopleList"
            item-text="text"
            item-value="value"
            label="Number of People*"
            required
          />
        </v-col>

        <v-col cols="8" md="6">
          <v-text-field
            v-model="date"
            label="Date*"
            append-icon="mdi-calendar"
            readonly
            :rules="[rules.required()]"
            required
            @click.end="showDatePicker = true"
          />
          <v-dialog
            ref="datePicker"
            v-model="showDatePicker"
            :return-value.sync="date"
            transition="scale-transition"
            width="290px"
          >
            <v-date-picker
              v-model="date"
              no-title
              scrollable
              :min="dateToday"
              :max="dateMonthFromNow"
              @change="$refs.datePicker.save(date)"
            />
          </v-dialog>
        </v-col>

        <v-col cols="8" md="6">
          <v-select
            v-model="time"
            :rules="[rules.required()]"
            :items="timeSlots"
            label="Time*"
            required
          />
        </v-col>
      </v-row>

      <v-btn
        color="primary"
        class="ml-auto mt-5"
        style="display:block"
        :loading="loading"
        @click="bookTable"
      >
        Book a Table
        <v-icon right>
          mdi-silverware-fork-knife
        </v-icon>
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import timeSlots from '~/utils/timeSlots'
import validationRules from '~/utils/formValidationRules'
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        valid: true,
        name: '',
        phoneNumber: '',
        email: '',
        numberOfPeople: 1,
        date: new Date().toISOString().substr(0, 10),
        showDatePicker: false,
        time: ''
    }),
    computed: {
        ...mapState(['text', 'bookings']),
        rules () {
            return validationRules
        },
        numOfPeopleList () {
            return Array(this.bookings.maxNumberOfPeople).fill().map(
                (_, i) => ({ text: `${i + 1} ${i === 0 ? 'Person' : 'People'}`, value: i + 1 }))
        },
        dateToday () {
            return new Date().toISOString().substr(0, 10)
        },
        dateMonthFromNow () {
            // TODO - More to using Moment.js
            const now = new Date()
            return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toISOString().substr(0, 10)
        },
        timeSlots () {
            return timeSlots(this.bookings.openingTime, this.bookings.closingTime, this.bookings.bookingTimeInterval)
        }
    },
    methods: {
        bookTable () {
            if (this.$refs.form.validate()) {
                this.$emit('book', {
                    name: this.name,
                    phoneNumber: this.phoneNumber,
                    email: this.email,
                    numberOfPeople: this.numberOfPeople,
                    date: this.date,
                    time: this.time

                })
            }
        }
    }
}
</script>

<style>

</style>
