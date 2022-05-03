<template>
  <div class="storegrid">
    <v-row class="hader">
      <v-col cols="2">
        <h5>สินค้าทั้งหมด</h5>
      </v-col>
      <v-spacer />
      <v-col cols="3">
        <!-- <vs-input v-model="search" border placeholder="ค้นหาสินค้า" /> -->
      </v-col>
    </v-row>
    <v-row class="productAll">
      <v-col
        cols="12"
        sm="4"
        m="4"
        md="3"
        xl="3"
        :key="i"
        v-for="(item, i) in $vs.getSearch(products, search)"
        :data="item"
      >
        <nuxt-link :to="`product/${item.id}`">
          <v-card elevation="0" width="100%" class="product-card-item">
            <div class="overlay">
              <v-btn color="#629d25">ซื้อสินค้า</v-btn>
            </div>
            <div class="product-image">
              <v-img
                :src="`http://maims.cmtc.ac.th:3000/product/${item.productimg}`"
              ></v-img>
            </div>
            <div class="productdetail">
              <div class="product-name T-dot">
                {{ item.productname }}
              </div>
              <div class="product-info">
                <div class="product-price">฿ {{ item.productprice }}</div>
                <div class="product-stock">คลัง {{ item.productnumber }}</div>
              </div>
              <div class="product-detail T-dot">
                {{ item.productdetail }}
              </div>
            </div>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
    <!-- <vs-row justify="center">
      <div
        :key="i"
        v-for="(item, i) in $vs.getSearch(products, search)"
        :data="item"
      >
        <vs-col class="product-item">

            <vs-card>
              <template >
                <h3>{{ item.productname }}</h3>
              </template>
              <template #img>
                <nuxt-link :to="`product/${item.id}`">
                <img
                  :src="`http://maims.cmtc.ac.th:3000/product/${item.productimg}`"
                />
                </nuxt-link>
              </template>
              <template #text>
                <h4 class="price">{{ item.productprice }} บาท</h4>
                <h4 class="price">เหลือ {{ item.productnumber }} ชิ้น</h4>
                <!-- <h4 class="price">ประเภทสินค้า {{ item.category.type }}</h4> -->
    <!-- <h4 class="price">
                  โดย
                  <nuxt-link :to="`product/${item.id}`">
                    {{ item.nameseller }}
                  </nuxt-link>
                </h4>
              </template>
              <template #interactions>
                <vs-button danger icon>
                  <i class="bx bx-heart"></i>
                </vs-button>
                <vs-button class="btn-chat" shadow primary>
                  <i class="bx bx-chat"></i>
                  <span class="span"> 54 </span>
                </vs-button>
              </template>
            </vs-card>

        </vs-col>
      </div>
    </vs-row> -->
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'AppStoreGrid',
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState(['products']),
  },
}
</script>

<style lang="scss" scoped>
.T-dot {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
}
.storegrid {
  margin-top: 50px;
  justify-self: center;
  align-self: center;
  text-align: center;
  background-color: #ffffff;
}

.productAll {
  padding: 0px 50px 50px 50px;
  .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none !important;
  }
.product-card-item:hover{
  .overlay{
    display: flex;
  }
}
  .product-card-item {
    background-color: #fff;
    // border-radius: 15px;
    border: 1px solid #00000029;
    transition: 2s;

    .overlay {
    position: absolute;
    z-index: 2;
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.118);
    transition: 1s;
    
  }
    .product-image {
      display: flex;
      //   padding: 10px;
      height: 150px;
      background-size: cover;
    }
  }
  .productdetail {
    margin-top: 5px;
    padding: 15px;

    .product-name {
      font-weight: bold;
      font-size: 15px;
    }

    .product-info {
      margin: 10px 0px;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      .product-price {
        color: #ff6347;
      }
    }
  }
  .product-detail {
    text-align: left;
    margin-top: 10px;
    font-size: 12px;
  }
}
// h3 {
//   word-wrap: break-word;
// }
</style>
