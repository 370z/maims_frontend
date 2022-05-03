<template>
  <div class="main-app">
    <div class="flex justify-center">
    <div class="container">
        <AppNav />
        <div class="content">
          <Nuxt />
        </div>
        <!-- <MiniCartFab /> -->
        <AppSpeedDial />
      </div>
      <!-- <AppFooter /> -->
    </div>
  </div>
</template>

<script>
import AppNav from '~/components/AppNav'
import AppSpeedDial from '~/components/AppSpeedDial'
import MiniCartFab from '~/components/MiniCartFab'
import AppFooter from '~/components/AppFooter'

export default {
  name: 'default',
  components: {
    AppNav,
    AppSpeedDial,
    AppFooter,
    MiniCartFab,
  },
}
</script>

<style lang="scss" scope> 

.main-app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
html,body {
  height: 100%;
  font-family: 'prompt';
  background-color:#f5f5f5;
}

.content{
  margin-top: 125px;
  width: 100%;
}

@media screen and (min-width:1400px){
  .container{
  width: 60%;

  .content{
    .container{
      width: 100%;
    }
  }
}
}
</style>
