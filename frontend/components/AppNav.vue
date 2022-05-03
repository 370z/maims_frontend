<template>
  <div data-app>
    <v-app-bar
      id="app-bar"
      elevate-on-scroll
      app
      fixed
      color="#629d25"
      height="60px"
      scroll-target="#scrolling-techniques-5"
    >
      <div class="container navshop">
        <div class="l">
          <NuxtLink to="/">
            <img src="~/assets/img/logo.png" />
          </NuxtLink>
        </div>
        <div class="r">
          <vs-avatar
            badge
            @click="!$auth.loggedIn ? (loginActive = !loginActive) : buy()"
            v-if="$auth.loggedIn"
          >
            <v-icon size="30">mdi-cart</v-icon>
            <template #badge>
              {{ cartCount }}
            </template>
          </vs-avatar>

          <!-- <template #items>
            <MiniCart />
          </template>
        </vs-navbar-group> -->
          <v-btn
            elevation="2"
            color="#ffffff"
            rounded
            @click="loginActive = !loginActive"
            v-if="!$auth.loggedIn"
            >เข้าสู่ระบบ</v-btn
          >
          <v-btn
            elevation="2"
            color="#ffffff"
            rounded
            @click="registerActive = !registerActive"
            v-if="!$auth.loggedIn"
            >สมัครสมาชิก</v-btn
          >
          <!-- <vs-navbar-group v-if="$auth.loggedIn">
            <vs-avatar v-if="$auth.loggedIn" style="margin-right: 70px">
              <v-icon size="30">mdi-cart</v-icon>
            </vs-avatar>
            <template #items>
              <vs-navbar-item id="MyAccount" to="/user/account/user-profile">
                บัญชีของฉัน
              </vs-navbar-item>
              <vs-navbar-item id="MyOrder" to="/user/purchase/myOrder">
                การสั่งซื้อของฉัน
              </vs-navbar-item>
              <vs-navbar-item
                id="Logout"
                @click="logoutHandle"
                v-if="$auth.loggedIn"
              >
                ออกจากระบบ
              </vs-navbar-item>
            </template>
          </vs-navbar-group> -->
          <v-menu offset-y v-if="$auth.loggedIn">
            <template v-slot:activator="{ on, attrs }">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                  v-bind="attrs"
                  v-on="on"
                />
              </v-avatar>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in btnmenu"
                :key="index"
                link
                :to="item.to"
              >                <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="logoutHandle()">
                <v-list-item-icon>
            <v-icon>far fa-sign-out</v-icon>
          </v-list-item-icon>
                <v-list-item-title>ออกจากระบบ</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <vs-dialog prevent-close blur v-model="loginActive">
      <template #header>
        <h4 class="not-margin">
          <b>เข้าสู่ระบบ</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input
          v-model="email"
          placeholder="Email"
          :rules="emailRules"
          label-placeholder="Email"
        >
        </vs-input>

        <vs-input
          type="password"
          v-model="password"
          placeholder="Password"
          label-placeholder="Password"
          :visiblePassword="hasVisiblePassword"
          icon-after
          @click-icon="hasVisiblePassword = !hasVisiblePassword"
        >
          <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>
        </vs-input>
        <div class="flex">
          <vs-checkbox v-model="remember">จดจำฉันไว้</vs-checkbox>
          <a href="#">ลืมรหัสผ่าน?</a>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button ref="login" block @click="handleLoginClicked">
            Log in
          </vs-button>
          <!-- <vs-button ref="login" block @click="handleFacebookLogin">
            Facebook Login
          </vs-button> -->

          <div class="new">
            ยังไม่มีบัญชีผู้ใช้งาน?
            <a
              href="#"
              @click="
                ;(registerActive = !registerActive),
                  (loginActive = !loginActive)
              "
              >สร้างบัญชีผู้ใช้งานใหม่</a
            >
          </div>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog prevent-close v-model="registerActive">
      <template #header>
        <h4 class="not-margin">
          <b>สร้างบัญชีผู้ใช้งานใหม่</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input v-model="usernameRegister" placeholder="Username">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="emailRegister" placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="passwordRegister"
          placeholder="Password"
          label-placeholder="Password"
          :progress="getProgress"
          :visiblePassword="hasVisiblePasswordRegister"
          icon-after
          @click-icon="hasVisiblePasswordRegister = !hasVisiblePasswordRegister"
        >
          <template #icon>
            <i v-if="!hasVisiblePasswordRegister" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>
          <template v-if="getProgress >= 100" #message-success>
            รหัสผ่านมีความปลอดภัยสูงสุด
          </template>
          <template v-else-if="getProgress >= 80" #message-success>
            รหัสผ่านมีความปลอดภัยสูง
          </template>
          <template v-else-if="getProgress >= 60" #message-warn>
            รหัสผ่านมีความปลอดภัยปานกลาง
          </template>
          <template v-else-if="getProgress >= 40" #message-warn>
            รหัสผ่านมีความปลอดภัยปานกลาง
          </template>
          <template v-else-if="getProgress >= 20" #message-danger>
            รหัสผ่านมีความปลอดภัยต่ำ
          </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="passwordRegisterConfirm"
          placeholder="Password Confirm"
          :visiblePassword="hasVisiblePasswordRegisterConfirm"
          icon-after
          @click-icon="
            hasVisiblePasswordRegisterConfirm = !hasVisiblePasswordRegisterConfirm
          "
        >
          <template #icon>
            <i v-if="!hasVisiblePasswordRegister" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>

          <template
            v-if="
              passwordRegister == passwordRegisterConfirm && passwordRegister
            "
            #message-success
          >
            รหัสผ่านตรงกัน
          </template>

          <template
            v-else-if="passwordRegisterConfirm != passwordRegister"
            #message-danger
          >
            รหัสผ่านไม่ตรงกัน
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="handleRegisterClicked">
            สมัครสมาชิก
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import loginMixin from '~/mixins/login'
//import MiniCart from '~/components/MiniCart'
import materialCard from '~/components/material/AppCard'
import Notification from '~/components/Notification'

export default {
  mixins: [loginMixin],
  components: { materialCard, Notification },
  data: () => ({
    btnmenu: [
      { title: 'ข้อมูลส่วนตัว', to: '/user/account/user-profile',icon: 'fas fa-user-cog', },
      { title: 'คำสั่งซื้อ', to: '/user/purchase/myOrder', icon:'far fa-shopping-cart' },
      { title: 'เปลี่ยนรห้สผ่าน', to: '/user/account/passwordSet',icon: 'fal fa-key', },
    ],
  }),
  methods: {
    buy() {
      this.$router.push({ name: 'cart' })
    },
  },
}
</script>

<style lang="stylus" scope>
getColor(vsColor, alpha = 1) {
  unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

svg:not(:root).svg-inline--fa{
  font-size: 12px;
}
.v-toolbar{
   min-height: 0px !important ;

  .v-toolbar__content{
    margin: auto  !important;
    min-height: 0px !important ;
}
}

.container{
  padding: 0px;
  display : flex;
  justify-content: space-between;
  align-items: center;
}


.navshop{
  height: 100%;

    .l{
    height: 100%;

    img{
      height:100%;
    }
  }
}

.vs-avatar-content{
  margin-right: 20px;

}


.r{
  float: right;
  display: flex;
  align-items: center;

.v-btn{
 border-radius: 25px;
 margin-left 10px;

 .v-btn__content{
   color:#629d25;
 }
}
}

.v-menu__content{
  margin-top: 20px !important ;

  .v-list-item__title{
    color: #629d25 !important;
  }
}

.vs-navbar__group__items{
  background-color: #629d25;
  color: #fff
}


.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}

.con-form {
  width: 100%;

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      font-size: 0.8rem;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }

  .vs-checkbox-label {
    font-size: 0.8rem;
  }

  .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);

    .vs-input {
      width: 100%;
    }
  }
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);

  .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;

    a {
      color: getColor('primary') !important;
      margin-left: 6px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .vs-button {
    margin: 0px;
  }
}
</style>
