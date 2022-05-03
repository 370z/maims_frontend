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
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="#00B3CA" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <img src="/contact-us.png" v-else />
        </v-btn>
      </template>
      <a fab small color="#00B3CA" href="https://line.me/th/" target="_blank">
        <img src="/line.png" height="55px" />
      </a>
      <a
        fab
        small
        color="#00B3CA"
        href="https://www.facebook.com/"
        target="_blank"
      >
        <img src="/facebook.png" height="55px" />
      </a>
    </v-speed-dial>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    direction: 'top',
    fab: false,
    fling: false,
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
  bottom: 15px;
}
</style>
