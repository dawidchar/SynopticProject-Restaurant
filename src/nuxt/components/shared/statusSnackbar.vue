<template>
  <v-snackbar v-model="snackbar" :multi-line="true" :color="data.color" :timeout="data.timeout">
    <div class="subtitle-1 font-weight-medium">{{ data.title }}</div>
    <span class="body-2">{{ data.subtitle }}</span>
    <template #action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        snackbar: {
            get () {
                return this.visible
            },
            set (val) {
                if (!val) { this.$emit('close') }
            }
        }
    }
}
</script>

<style>

</style>
