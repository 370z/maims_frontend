<template>
  <div aria-labelledby="triggerId" @click.stop>
    <v-card width="500" height="400">
      <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>สินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>รวม</th>
                  <th>ลบสินค้า</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  height="105"
                  v-for="item in detailsWithSubTotal"
                  :key="item.id"
                >
                  <td>
                    <div width="500" class="modal-img">
                      <v-avatar>
                        <img :src="`http://maims.cmtc.ac.th:3000/product/${item.productimg}`" alt="John" />
                      </v-avatar>
                    </div>
                    <div class="productname">{{ item.productname }}</div>
                  </td>
                  <td>{{ item.productprice }}</td>
                  <td>
                    <button
                      @click="removeOneFromCart(item)"
                      class="quantity-adjust"
                    >
                      -
                    </button>
                    {{ item.quantity }}
                    <button @click="addToCart(item)" class="quantity-adjust">
                      +
                    </button>
                  </td>
                  <td>{{ item.subtotal }}</td>
                  <td>
                    <div class="delete-product">
                      <v-btn
                        @click="removeAllFromCart(item)"
                        class="mx-2"
                        fab
                        dense
                        x-small
                        color="primary"
                      >
                        <v-icon dark> mdi-delete </v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p align="center"> ราคารวม {{cartTotal}} บาท</p>
        </v-col>
      </v-row>
    </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
    detailsWithSubTotal() {
      return this.cart.map((detail) => ({
        ...detail,
        subtotal: detail.quantity * detail.productprice,
        source: detail,
      }))
    },
    ...mapGetters(['cartCount', 'cartTotal']),
  },

  methods: {
    // Example 1: mapActions
    removeOneFromCart(item) {
      this.$store.commit('removeOneFromCart', item)
    },
    clearCart(item) {
      this.$store.commit('clearCart', item)
    },
    removeAllFromCart(item) {
      this.$store.commit('removeAllFromCart', item)
    },
    addToCart(item) {
      this.$store.commit('addOneToCart', item)
    },
  },
}
</script>

<style></style>
