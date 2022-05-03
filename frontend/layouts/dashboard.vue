<template>
  <div class="main-app">
    <AppNav />
    <div class="container content">
      <v-row>
        <v-col cols="12" md="2" >
          <core-drawer />
        </v-col>
        <v-col>
          <div class="view">
            <nuxt />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import AppNav from '~/components/AppNav'
import coreDrawer from '~/components/core/AppDrawer'
export default {
  name: 'dashboard',
  middleware: 'auth',
  components: {
    coreDrawer,
    AppNav,
  },
}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 100px;
  .view{
    background-color: #ffffff;
    padding: 25px;
  }
}

@media screen and (min-width: 1400px) {
  .container {
    width: 60%;
  }
}
</style>
