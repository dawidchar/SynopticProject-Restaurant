<template>
  <v-dialog
    v-model="showDialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="_item.itemId"
                :rules="[rules.required(), rules.min(3), rules.max(99), rules.noSpaces('Item Id')]"
                label="Item Id"
                hint="Unique Id"
                :disabled="!newItem"
                required
              />
            </v-col>
            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-model="_item.name"
                :rules="[rules.required(), rules.min(3), rules.max(99)]"
                label="Item Name"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="_item.description"
                :rules="[rules.max(99)]"
                label="Item Description"
                required
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="_item.price"
                :rules="[rules.required(), rules.minNum(0), rules.onlyIntegers()]"
                label="Item Price"
                hint="Amount In Pence"
                type="number"
                required
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="_item.stock"
                :rules="[rules.required(), rules.minNum(0), rules.onlyIntegers()]"
                label="Stock Level"
                type="number"
                required
              />
            </v-col>
          </v-row>
          <v-btn
            color="primary"
            class="ml-auto mt-5"
            style="display:block"
            @click="saveItem"
          >
            Save
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import validationRules from '~/utils/formValidationRules'
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: 'Item'
        },
        newItem: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        valid: true
    }),
    computed: {
        rules () {
            return validationRules
        },
        showDialog: {
            get () {
                return this.show
            },
            set (val) {
                this.$emit('update:show', val)
            }
        },
        _item: {
            get () {
                return this.item
            },
            set (val) {
                this.$emit('update:item', val)
            }
        }
    },
    methods: {
        saveItem () {
            if (this.$refs.form.validate()) {
                const menuItemDTO = {
                    id: this._item.id || false,
                    itemId: this._item.itemId.toLowerCase(),
                    name: this._item.name.trim(),
                    description: (this._item.description || '').trim(),
                    price: parseInt(this._item.price),
                    stock: parseInt(this._item.stock)
                }
                this.$emit('updateItem', menuItemDTO)
            }
        }
    }
}
</script>

<style>

</style>
