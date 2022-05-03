<template>
  <v-card height="65">
    <v-footer
      id="footer"
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Intelligent Farming Platform</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<style>
  #footer {

    z-index: 0;
  }
</style>
