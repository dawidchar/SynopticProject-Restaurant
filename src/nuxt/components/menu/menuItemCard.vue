<template>
  <v-card width="275" class="menu-card">
    <v-card-title class="pb-0">
      {{ title }}
    </v-card-title>
    <v-card-text class="pb-2">
      <div class="text-body-2">
        {{ description }}
      </div>
    </v-card-text>
    <v-card-actions class="px-3">
      <div class="text-subtitle-1 pt-1">
        {{ priceString }}
      </div>
      <v-btn
        color="secondary"
        class="white--text ml-auto"
        small
      >
        Add <v-icon right>
          mdi-cart-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        itemid: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    computed: {
        priceString () {
            return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(this.price / 100)
        }
    }
}
</script>

<style>

</style>
