<template>
  <div>
    <v-row class="haedersidebar">
      <v-col cols="4" >
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-col>
      <v-col>
        <v-list-item-title>การซื้อของฉัน</v-list-item-title>
      </v-col>
    </v-row>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.link"
          :key="child.title"
          link
          :to="child.to"
        >
                  <v-list-item-icon>
            <v-icon>{{child.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item link to="/user/purchase/myOrder" >
                <v-list-item-icon>
            <v-icon>far fa-shopping-cart</v-icon>
          </v-list-item-icon>
        <v-list-item-title>การซื้อของฉัน</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
// Utilities
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      logo: '/engine.png',
      items: [
        {
          title: 'บัญชีของฉัน',
          icon: 'fas fa-user-circle',
          to: '/user/account/user-profile',
          link: [
            {
              icon: 'fas fa-user-cog',
              title: 'ข้อมูลส่วนตัว',
              to: '/user/account/user-profile',
            },
            {
              icon: 'fal fa-address-card',
              title: 'บัญชีธนาคาร&บัตร',
              to: '/user/account/bank-card',
            },
            {
              icon: 'far fa-home-alt',
              title: 'ที่อยู่',
              to: '/user/account/user-address',
            },
            {
              icon: 'fal fa-key',
              title: 'เปลี่ยนรห้สผ่าน',
              to: '/user/account/passwordSet',
            },
          ],
        },
      ],
      responsive: true,
    }
  },
  computed: {
    ...mapGetters({
      textcolor: 'app/gettextColor',
      color: 'app/getColor',
      drawer: 'app/getDrawer',
    }),

    inputValue: {
      get() {
        return this.drawer
      },
      set(val) {
        this.setDrawer(val)
      },
    },
  },
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapActions({
      setDrawer: 'app/setDrawer',
    }),

    onResponsiveInverted() {
      this.responsive = window.innerWidth < 991
    },
  },
}
</script>

<style lang="scss" scoped>

.haedersidebar{
  align-items: center;
  
}

.theme--light.v-sheet {
  background: none;
}

.v-list-item__title{
  font-size: 0.9rem !important;
}

svg:not(:root).svg-inline--fa{
  font-size: 12px;
}

.v-list-group
  .v-list-group__header
  .v-list-item__icon.v-list-group__header__append-icon {
  display: none !important;
}

.v-list-group__items .v-list-group__items,
.v-list-group__items .v-list-item {
  padding-left: 35px;
  border-radius: 25px;
  background: none;
}

.v-list .v-list-item--active,
.v-list .v-list-item--active .v-icon {
  color: #629d25;
}
.v-list-item--link:before {
  border-radius: 25px !important;
}
.v-list-item--link:after {
  border-radius: 25px !important;
}
.v-list-item--link {
  border-radius: 25px !important;
}

.v-ripple__container {
  border-radius: 25px;
}
</style>
