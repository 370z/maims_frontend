<template>
  <v-card id="create">
    <v-speed-dial
      class="fixed"
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <vs-tooltip top>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <i v-else class='bx bxs-cart bx-md' ></i>
        </v-btn>
        <template #tooltip> ตะกร้า </template>
        </vs-tooltip>
      </template>
         <MiniCart />
    </v-speed-dial>
  </v-card>
</template>

<script>
import MiniCart from '~/components/MiniCart'

export default {
  components: {
    MiniCart
  },
  data: () => ({
    direction: 'left',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
  }),

  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    },
  },

}
</script>

<style scoped>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .fixed {
  position: fixed;
  right: 15px;
  bottom: 60%;
}
</style>
