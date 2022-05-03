<template>
  <div>
      <AppBanner />
      <AppSalesBoxes />
      <AppStoreGrid />
      <!-- <AppFeaturedProducts /> -->
    </div>
</template>

<script>
import AppBanner from '~/components/AppBanner.vue'
import AppStoreGrid from '~/components/AppStoreGrid.vue'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'
import AppSalesBoxes from '~/components/AppSalesBoxes.vue'
export default {
  layout: 'default',
  components: {
    AppBanner,
    AppStoreGrid,
    AppFeaturedProducts,
    AppSalesBoxes,
  },
  data() {
    return {}
  },
   created() {
     this.$store.dispatch('loadAllProducts')
  },
}
</script>

<style scoped>
.inner {
  background-color: white;
}
</style>
