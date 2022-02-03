<template>
  <v-card width="275" class="d-flex flex-column" :disabled="noStock">
    <v-card-title class="pb-0">
      {{ title }}
    </v-card-title>
    <v-card-text class="pb-2">
      <div class="text-body-2">
        {{ description }}
      </div>
    </v-card-text>
    <v-card-actions class="px-3 mt-auto justify-space-between">
      <div class="text-subtitle-1 pt-1">
        <span v-if="!noStock">{{ priceString }}</span>
        <span v-if="noStock" class="text-subtitle 2 error--text">No Stock</span>
        <span v-if="lowStock" class="text-body-2 warning--text"> (Low Stock - <b>{{ stock }}</b>)</span>
      </div>
      <v-tooltip bottom color="info" :disabled="!buttonTooltip" attach="">
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn
              color="secondary"
              class="white--text ml-auto"
              small
              :disabled="addButtonDisabled"
              @click="addToBasket"
            >
              Add <v-icon right>
                mdi-cart-plus
              </v-icon>
            </v-btn>
          </div>
        </template>
        <span class="body-2">{{ buttonTooltip }}</span>
      </v-tooltip>
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
        },
        stock: {
            type: Number,
            default: 0
        },
        lowStockWarning: {
            type: Number,
            default: 10
        },
        loggedIn: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // TODO - Move into mixin for other components to use
        noStock () {
            return this.stock === 0
        },
        lowStock () {
            return !this.noStock ? this.stock <= this.lowStockWarning : false
        },
        priceString () {
            return formatPrice(this.price)
        },
        addButtonDisabled () {
            return !this.loggedIn || this.noStock
        },
        buttonTooltip () {
            if (!this.addButtonDisabled) { return false }
            if (!this.loggedIn) { return 'Please Sign In To Add Items' }
            return false
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
