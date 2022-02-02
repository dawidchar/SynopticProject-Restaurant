<template>
  <v-card width="275" class="d-flex flex-column">
    <v-card-title class="pb-0">
      {{ title }}
    </v-card-title>
    <v-card-text class="pb-2">
      <div class="text-body-2">
        {{ description }}
      </div>
    </v-card-text>
    <v-card-actions class="px-3 mt-auto">
      <div class="text-subtitle-1 pt-1">
        {{ priceString }}
      </div>
      <v-btn
        color="secondary"
        class="white--text ml-auto"
        small
        @click="addToBasket"
      >
        Add <v-icon right>
          mdi-cart-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import formatPrice from '~/utils/priceStringFormatter'
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
        itemId: {
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
            return formatPrice(this.price)
        }
    },
    methods: {
        ...mapActions('basket', ['updateItem']),
        addToBasket () {
            this.updateItem({ itemId: this.itemId, delta: 1 })
        }
    }
}
</script>

<style>

</style>
