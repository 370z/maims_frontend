<template>
  <section>
    <h2>
      <span>Featured Products</span>
    </h2>
    <div class="featureditems">
      <vs-row justify="center">
        <div :key="i" v-for="(item, i) in featuredProducts" :data="item">
          <vs-col class="product-item">
            <vs-card>
              <template #title>
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
                <h4 class="price">
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
      </vs-row>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data: () => {
    return {
      featuredProducts: [],
    }
  },

  async fetch() {
    await axios
      .get('http://maims.cmtc.ac.th:3000/api/sellproducts/show')
      .then((response) => {
        this.featuredProducts = response.data.data
        console.log(this.featuredProducts)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
.featureditems {
  margin: 20px 0 70px;
  display: flex;
}
h2 {
  color: #d96528;
  text-align: center;
  overflow: hidden;
}
h2 span {
  display: inline-block;
}
h2 span:after,
h2 span:before {
  content: ' ';
  height: 1px;
  width: 1000px;
  background: #e6baa4;
  top: 50%;
}
h2 span:before {
  left: -1010px;
}
h2 span:after {
  right: -1010px;
}
</style>

<style scoped>
.product-item {
  padding: 10px;
}
h3 {
  word-wrap: break-word;
}
</style>
