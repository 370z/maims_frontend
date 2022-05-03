<template>
  <v-container fluid grid-list-xl fill-height>
    <v-data-table :items="listOrders" :items-per-page="5" class="elevation-1">
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th
              v-for="headers in header"
              :key="headers.id"
              :colspan="headers.length"
            >
              {{ headers.name }}
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item, index) in listOrders" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.CustomerTransactions[0].orderNo }}</td>
            <td>{{ item.totalQuantity }}</td>
            <td>{{ item.totalPrice }}</td>
            <td>{{ item.CustomerDeliveries[0].orderStatus }}</td>
            <td>
              <v-btn
                v-if="item.CustomerDeliveries[0].orderStatus === 'Pending'"
                color="primary"
                >รอชำระเงิน</v-btn
              ><v-btn
                v-if="item.CustomerDeliveries[0].orderStatus === 'Order'"
                disabled
                color="primary"
                >ชำระเงินแล้ว</v-btn>
              <v-btn
                v-if="item.CustomerDeliveries[0].orderStatus === 'Delivry'"
                disabled
                color="primary"
                >อยู่ระหว่างขนส่ง</v-btn>
              <v-btn
                v-if="item.CustomerDeliveries[0].orderStatus === 'Success'"
                disabled
                color="primary"
                >ชำระเงินแล้ว</v-btn>
            </td>
          </tr>
        </tbody>
      </template>

      <template v-slot:no-data> NO DATA HERE! </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    listOrders: [],
    listOrderItems: {},
     
    isHasData: false,
    header: [
      { name: 'ลำดับ',value:'id'},
      { name: 'รห้สสั่งซื้อ', value:'id' },
      { name: 'จำนวนสินค้า' , value:'totalQuantity'},
      { name: 'ราคา' ,value:'totalQuantity'},
      { name: 'สถานะ', value:'totalQuantity' },
      { name: 'การชำระเงิน', value:'totalQuantity' },
    ],
  }),
  methods: {
    view(item) {
      this.listOrderItems = Object.assign({}, item)
      this.dialog = true
    },
  },
  async asyncData({ $axios, $auth }) {
    await $auth.fetchUser()
    try {
      const config = {
        headers: {
          Authorization: $auth.getToken('local'),
        },
      }
      // this.$axios.setHeader('Authorization', this.$auth.getToken('local'))
      let response = await $axios.get(
        'http://maims.cmtc.ac.th:3000/api/customer/orders',
        config
      )

      console.log('datafrom order', response.data.order)
      if (response.data.success) {
        return {
          listOrders: response.data.order,
          listOrderItems: response.data.order,
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  layout: 'dashboard',
}
</script>
<style lang="scss" scoped>
.v-data-table {
  width: 100%;
}
tbody{
  text-align: center !important;
}
</style>
