<template>
  <div class="cartMain">
    <v-container class="main">
      <vs-row class="cartStep">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <AppCartSteps />
        </vs-col>
      </vs-row>
    </v-container>
    <div class="container">
      <!-- <AppFeaturedProducts /> -->
    </div>
  </div>
</template>

<script>
import AppCartSteps from '~/components/AppCartSteps.vue'
import AppCartDisplay from '~/components/AppCartDisplay.vue'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'
import orderMixin from '~/mixins/order'
import { mapState } from 'vuex'
export default {
  components: {
    AppCartDisplay,
    AppCartSteps,
    AppFeaturedProducts,
  },

  async asyncData({ $axios, store, $auth }) {
    await $auth.fetchUser()
    console.log('asyncdata')
    try {
      if ($auth.loggedIn === true) {
        await store.commit('setCustomerAddress', {
          CustomerAddress: $auth.$state.user.CustomerAddresses,
        })
        const config = {
          headers: {
            Authorization: $auth.getToken('local'),
          },
        }
        let response2 = await $axios.get(
          'http://maims.cmtc.ac.th:3000/api/customer/address',
          config
        )
      }

      let response = await $axios.post(
        'http://maims.cmtc.ac.th:3000/api/customer/shipment',
        {
          shipment: 'normal',
        }
      )

      const [shippingResponse] = await Promise.all([response])
      store.commit('setShipping', {
        price: shippingResponse.data.shipment.price,
        estimatedDelivery: shippingResponse.data.shipment.estimated,
      })
      return {
        Loaded: false,
        shippingPrice: shippingResponse.data.shipment.price,
        estimatedDelivery: shippingResponse.data.shipment.estimated,
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapState(['cartUIStatus']),
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding-top: 10px;
  background-color: white;
}
.cartStep {
  margin-top: 10px;
}
.loader {
  display: flex;
  justify-content: center;
}

.success {
  text-align: center;
}
.center {
  text-align: center;
}

@media screen and (min-width: 700px) {
  .cartMain {
    margin-top: 45px;
    justify-self: center;
    align-self: center;
    text-align: center;
  }
}

@media screen and (max-width: 699px) {
  .cartMain {
    margin-top: 45px;
    width: 100%;
    justify-self: center;
    align-self: center;
    text-align: center;

    justify-content: center;
  }
  .cardstep {
    margin-top: 50px;
  }
}
</style>
