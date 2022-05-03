<template>
  <div class="appproduct">
    <div class="search" style="margin-top: 60px">
      <vs-row>
        <vs-col offset="2" w="6">
          <vs-input v-model="search" border placeholder="ค้นหา" />
        </vs-col>
      </vs-row>
    </div>
    <div class="product">
      <vs-row justify="center">
        <div
          :key="i"
          v-for="(item, i) in $vs.getSearch(products, search)"
          :data="item"
        >
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'AppProduct',
  data() {
    return {
      searchResult: '',
      item: '',
      search: '',
    }
  },
  components: {},
  computed: {
    ...mapState(['products']),
  },
}
</script>

<style lang="scss" scoped>
.product-item {
  padding: 20px;
  justify-self: center;
  align-self: center;
  text-align: center;
}
.product {
  margin: 25px;
  justify-self: center;
  align-self: center;
  text-align: center;
}
.search {
  width: 100%;
}
</style>

<style scoped>
h3 {
  word-wrap: break-word;
}
</style>
