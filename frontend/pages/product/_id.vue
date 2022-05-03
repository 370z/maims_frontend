<template>
  <div class="container">
    <div class="inner">
      <v-row class="item-contain">
        <v-col cols="12" md="5" class="img">
          <v-img
            :src="`http://maims.cmtc.ac.th:3000/product/${product.productimg}`"
            height="300"
          />
        </v-col>
        <v-col class="product-info">
          <h3>{{ product.productname }}</h3>
          <div class="price">฿{{ product.productprice }}</div>
          <div class="dlvl">
            <v-row>
              <v-col cols="2">
                <p class="color">จากร้าน</p>
              </v-col>
              <v-col>
                <p>{{product.tbl_userdetail.name}}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <p class="color">การจัดส่ง</p>
              </v-col>
              <v-col> ddsfdsfdsfsdfsdfsdf </v-col>
            </v-row>
            <v-row class="product-options">
              <v-col cols="2">
                <p class="color">จำนวน</p>
              </v-col>
              <v-col>
                <v-btn class="mx-0" x-small color="#269d25" @click="quantity--">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <input type="number" :max="product.productnumber" v-model="quantity" />
                <v-btn class="mx-0" x-small color="#269d25" @click="quantity++">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <span class="color"
                  >มีสินค้าทั้งหมด : {{ product.productnumber }} ชิ้น</span
                >
              </v-col>
            </v-row>
            <div class="at_button">
              <v-btn
                tile
                class="add"
                @click="!$auth.loggedIn ? (loginActive = !loginActive) : cartAdd()"
                >เพิ่มไปยังรถเข็น</v-btn
              >
              <v-btn
                tile
                class="buy"
                @click="!$auth.loggedIn ? (loginActive = !loginActive) : buy()"
              >
                ซื้อสินค้า
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="inner1">
      <h3 class="details">Details</h3>
      <span class="product-detail">{{ product.productdetail }}</span>
      <p>ทดสอบๆ</p>
    </div>

    <!-- <div class="inner2">
        <h3 class="reviews">Reviews</h3>

        <p>ทดสอบๆ</p>
    </div> -->

    <!-- <AppFeaturedProducts /> -->
    <vs-dialog prevent-close blur v-model="loginActive">
      <template #header>
        <h4 class="not-margin">
          <b>เข้าสู่ระบบ</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input
          v-model="email"
          placeholder="Email"
          :rules="emailRules"
          label-placeholder="Email"
        >
        </vs-input>

        <vs-input
          type="password"
          v-model="password"
          placeholder="Password"
          label-placeholder="Password"
          :visiblePassword="hasVisiblePassword"
          icon-after
          @click-icon="hasVisiblePassword = !hasVisiblePassword"
        >
          <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>
        </vs-input>
        <div class="flex">
          <vs-checkbox v-model="remember">จดจำฉันไว้</vs-checkbox>
          <a href="#">ลืมรหัสผ่าน?</a>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button ref="login" block @click="handleLoginClicked">
            Log in
          </vs-button>

          <div class="new">
            ยังไม่มีบัญชีผู้ใช้งาน?
            <a
              href="#"
              @click="
                ;(registerActive = !registerActive),
                  (loginActive = !loginActive)
              "
              >สร้างบัญชีผู้ใช้งานใหม่</a
            >
          </div>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog prevent-close v-model="registerActive">
      <template #header>
        <h4 class="not-margin">
          <b>สร้างบัญชีผู้ใช้งานใหม่</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input v-model="usernameRegister" placeholder="Username">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="emailRegister" placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="passwordRegister"
          placeholder="Password"
          label-placeholder="Password"
          :progress="getProgress"
          :visiblePassword="hasVisiblePasswordRegister"
          icon-after
          @click-icon="hasVisiblePasswordRegister = !hasVisiblePasswordRegister"
        >
          <template #icon>
            <i v-if="!hasVisiblePasswordRegister" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>
          <template v-if="getProgress >= 100" #message-success>
            รหัสผ่านมีความปลอดภัยสูงสุด
          </template>
          <template v-else-if="getProgress >= 80" #message-success>
            รหัสผ่านมีความปลอดภัยสูง
          </template>
          <template v-else-if="getProgress >= 60" #message-warn>
            รหัสผ่านมีความปลอดภัยปานกลาง
          </template>
          <template v-else-if="getProgress >= 40" #message-warn>
            รหัสผ่านมีความปลอดภัยปานกลาง
          </template>
          <template v-else-if="getProgress >= 20" #message-danger>
            รหัสผ่านมีความปลอดภัยต่ำ
          </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="passwordRegisterConfirm"
          placeholder="Password Confirm"
          :visiblePassword="hasVisiblePasswordRegisterConfirm"
          icon-after
          @click-icon="
            hasVisiblePasswordRegisterConfirm = !hasVisiblePasswordRegisterConfirm
          "
        >
          <template #icon>
            <i v-if="!hasVisiblePasswordRegister" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>

          <template
            v-if="
              passwordRegister == passwordRegisterConfirm && passwordRegister
            "
            #message-success
          >
            รหัสผ่านตรงกัน
          </template>

          <template
            v-else-if="passwordRegisterConfirm != passwordRegister"
            #message-danger
          >
            รหัสผ่านไม่ตรงกัน
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="handleRegisterClicked">
            สมัครสมาชิก
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import loginMixin from '~/mixins/login'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'

export default {
  mixins: [loginMixin],
  components: {
    AppFeaturedProducts,
  },
  data() {
    return {
      id: this.$route.params.id,
      quantity: 1,
      showSizeRequiredMessage: false,
      tempcart: [], // this object should be the same as the json store object, with additional params, quantity and size
      rules: {
        min: (v) => v.length >= 8 || 'รห้สอย่างน้อย 8 ตัวอักษร',
      },
    }
  },
  async fetch({ store, params }) {
    //return this.getProduct()
    await store.dispatch('loadAllProducts')
  },
  computed: {
    ...mapState(['products']),
    product() {
      return this.products.find((p) => p.id == this.$route.params.id)
      console.log(product)
    },
    //storedata: (state) => state.storedata,
  },
  methods: {
    // ...mapActions({
    //   getProduct: 'getProduct',

    // }),
    buy() {
      let item = this.product
      item = {
        ...item,
        quantity: this.quantity,
        size: this.size,
      }
      this.tempcart.push(item)
      this.$store.commit('addToCart', { ...item })
      this.$router.push({ name: 'cart' })
    },
    cartAdd() {
      let item = this.product
      item = {
        ...item,
        quantity: this.quantity,
        size: this.size,
      }
      this.tempcart.push(item)
      this.$store.commit('addToCart', { ...item })
    },
    // onlyNumber($event) {
    //   console.log(event.key);
    //   if (!/\d/.test(event.key)) 
    //   return event.preventDefault()
    // },
  },
}
</script>

<style lang="scss" scoped>
.v-image__image {
  background-size: contain !important;
}
.container {
  margin-top: 25px;
  display: contents;
  .inner {
    background-color: #fff;
    padding: 15px;
  }
  .item-contain {
    display: flex;

    .img {
      .v-image__image {
        background-size: contain !important;
      }
    }

    .product-info {
      margin-left: 25px;
      width: 100%;
      .price {
        background-color: #75757510;
        padding: 15px 15px;
        font-size: 30px;
        color: #629d25;
      }
      .dlvl {
        margin: 25px;
      }
      .color {
        color: #757575;
      }
      .product-options {
        p {
          margin: 0px;
          padding: 0px;
        }
        display: flex;
        align-content: center;
        align-items: center;

        input {
          margin: 0px 5px;
          width: 75px;
          padding: 5px;
          border: 1px solid#757575;
        }
      }
      .at_button {
        display: flex;

        .add {
          background-color: #c3e6a0;
          border: 1px solid #629d25;
          color: #629d25 !important;
          box-shadow: none;
        }

        .buy {
          margin-left: 10px;
          background-color: #629d25;
          box-shadow: none;
        }
      }
    }
  }
  .inner1 {
    background-color: #fff;
    margin: 25px 0px;
    padding: 15px;
    .details {
      background-color: #fafafa;
      padding: 5px;
    }
      .product-detail {
      white-space: pre-wrap;
      color: rgba(0,0,0,.8);
      font-size: .875rem;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.875rem;
    }
      
  }
  .inner2 {
    background-color: #fff;
    padding: 15px;
    margin-top: 25px;
  }
  .reviews {
    background-color: #fafafa;
    padding: 5px;
  }
}
</style>
