<template>
  <div class="cartDisplay">
    <v-container>
        <v-row no-gutters>
          <v-col>
            <div class="haderpeng">
              <v-card v-for="(card, index) in detailsWithSubTotal" :key="card.id">
                <p>
                  ตะกร้า {{ index + 1 }}/{{ detailsWithSubTotal.length }}
                  จากร้าน
                  {{ card.nameseller }} {{ card.quantity }} ชิ้น ราคา {{card.productprice*card.quantity}}
                </p>
                <div>
                  <!-- <v-row v-for="item in card.item" :key="item.id">
                    <v-col>
                      {{ item.itemname }}
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <v-col cols="12" md="4" >
                      <img
                        class=""
                        :src="`http://maims.cmtc.ac.th:3000/product/${card.productimg}`"
                        alt="John"
                        height="155rem"
                      /><br />
                      {{ card.productname }}<br />
                      {{ card.nameseller }}<br />
                      ราคา {{ card.productprice }} บาท
                    </v-col>
                    <v-col cols="12" md="4" class="label1">
                            <v-btn class="mx-0" x-small color="#269d25" @click="removeOneFromCart(card),$nuxt.refresh()">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                        {{ card.quantity }}
                            <v-btn class="mx-0" x-small color="#269d25" @click="addToCart(card),$nuxt.refresh()">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                    </v-col>
                    <v-col cols="12" md="4" class="label1">
                      <v-icon @click="removeAllFromCart(card),$nuxt.refresh()" color="#FF6347"
                        >mdi-delete</v-icon
                      >
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <div v-show="cartTotal">
                ทั้งหมด {{ cartTotal }} บาท (ยังไม่รวมค่าจัดส่ง)
              </div>
            </div>

            <!-- <v-simple-table fixed-header>
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
                          <img
                            :src="`http://127.0.0.1:4000/product/${item.productimg}`"
                            alt="John"
                          />
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
            </v-simple-table> -->
          </v-col>

          <!-- cart table column -->
        </v-row>

      <section></section>
    </v-container>
  </div>
</template>

<script>
import orderMixin from '~/mixins/order'
import { mapState, mapGetters } from 'vuex'
export default {
  mixins: [orderMixin],
  data: () => ({
    test: [],
    cardData: [],
    sellerData: [],
    cardOrder: [
      {
        id: 1,
        name: 'ขนมไทย',
        item: [
          { id: 1, itemname: 'ขนม555' },
          { id: 2, itemname: 'ขนม666' },
        ],
      },
      { id: 2, name: 'อาหารไทย', item: [{ id: 1, itemname: 'อาหาร555' }] },
      { id: 3, name: 'ผักสด', item: [{ id: 1, itemname: 'ผัก555' }] },
      { id: 4, name: 'ผักสด', item: [{ id: 1, itemname: 'ผัก666' }] },
    ],
    cardItem: [],
  }),
  computed: {
    ...mapGetters(['cartItems']),
    ...mapState(['cart']),
  },
  mounted() {
    console.log('getter', this.cartItems('eiei'))
    this.cardItem.push({ id: 5, name: 'ขนม' }, { id: 5, name: 'ขนม' })
    this.cardData = this.$store.state.cart

    //console.log('getter', this.test)
  },
  // async asyncData({Axios,state}) {
  //   try {
  //     let response = await Axios.post('http://127.0.0.1:4000/api/shipment', {
  //       shipment: 'normal',
  //     })
  //     console.log('datafrom async',response.data)
  //     $store.commit('setShipping', {
  //       price: response.shipment.price,
  //       estimatedDelivery: response.shipment.estimated,
  //     })
  //     return {
  //       shippingPrice: response.shipment.price,
  //       estimatedDelivery: response.shipment.estimated,
  //     }
  //   } catch (err) {}
  // },
}
</script>

<style lang="scss" scoped>
.haderpeng {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  width: 100%;
  .productImg {
    margin-right: 200px;
  }
  .label1 {
    padding-top: 75px;
  }

  .subtitle {
    font-size: 1rem;
  }
}
.addressDetail {
  display: flex;
  align-items: center;
  justify-content: center;
}
.productname {
  margin-top: 5px;
  justify-content: 'center';
}
.modal-img {
  justify-content: 'center';
}
</style>

<style lang="stylus" scoped>
getColor(colorx, alpha = 1) {
  unquote('rgba(var(--vs-' + colorx + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.content-tooltip {
  .body {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .vs-avatar-content {
      margin-top: -30px;
      border: 3px solid getVar('theme-layout');
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 0.55rem;
      padding: 10px;
      font-weight: normal;

      span {
        font-weight: bold;
        font-size: 0.7rem;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    padding: 8px;
    margin: 0px;
    text-align: left;
  }

  p {
    text-align: left;
    padding: 0px;
    margin: 0px;
    line-height: 1rem;
    padding-bottom: 5px;
    padding-left: 8px;
  }
}
</style>
