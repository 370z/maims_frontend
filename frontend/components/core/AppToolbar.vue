<template>
  <v-toolbar
    id="core-toolbar"
    flat
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          aria-label="Left Align"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 red-input"
          label="Search..."
          hide-details
          color="red"
        />
        <!-- <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/dashboard"
          title="Dashboard"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </nuxt-link> -->
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
        >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
        </v-btn>
      </template>
          <v-card>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-item-title
                  v-text="notification"
                />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/dashboard/user-profile"
          title="User profile"
        >
          <v-icon color="tertiary">mdi-account</v-icon>
        </nuxt-link>
        <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/"
          title="Logout"
          @click.native="logout"
        >
          <v-icon color="tertiary">mdi-logout</v-icon>
        </nuxt-link>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
      title: 'Dashboard',
      responsive: true,
      responsiveInput: true
    }),
    watch: {
      '$route' (val) {
        this.title = val.name
      }
    },
    computed: {
      ...mapGetters({
        drawer: 'app/getDrawer'
      })
    },
    methods: {
      ...mapActions({
        setUsername: 'user/setUsername',
        setDrawer: 'app/setDrawer'
      }),

      onClickBtn () {
        this.setDrawer(!this.drawer)
      },
      onClick () {
        // Do something
      },
      onResponsiveInverted () {
        if (window.innerWidth < 991) {
          this.responsive = true
          this.responsiveInput = false
        } else {
          this.responsive = false
          this.responsiveInput = true
        }
      },
      async logout() {
        await this.$auth.logout()
        this.$router.push({ path: '/' });
      }
    },
    mounted () {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    }
  }
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
