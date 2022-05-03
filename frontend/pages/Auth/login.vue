<template>
  <v-main v-if="!this.$auth.loggedIn">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-alert v-if="loginsuccess === true" type="success"
            >เข้าสู่ระบบสำเร็จ</v-alert
          >
          <v-alert v-if="!loginsuccess === false" type="error"
            >เข้าสู่ระบบไม่สำเร็จ : {{ error }}</v-alert
          >
          <material-card color="success" elevation="12" title="เข้าสู่ระบบ">
            <v-card-text>
              <v-form>
                <v-text-field
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="mdi-account"
                  name="email"
                  label="Login"
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center>
                <v-btn color="success" @click="handleLoginClicked">Login</v-btn>
              </v-layout>
            </v-card-actions>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import materialCard from '~/components/material/AppCard'
import Notification from '~/components/Notification'

export default {
  // middleware: 'loggedin',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  layout: 'auth',
  components: {
    materialCard,
    Notification,
  },

  data() {
    return {
      email: '',
      password: '',
      loginsuccess: '',
      error: null,
      passwordRules: [(v) => !!v || 'จำเป็นต้องใส่ Password'],
      emailRules: [
        (v) => !!v || 'จำเป็นต้องใส่ E-mail',
        (v) => /.+@.+\..+/.test(v) || 'รูปแบบบ E-mail ไม่ถูกต้อง',
      ],
    }
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        })
       // console.log(response)
        if (response.success) {
          this.loginsuccess = response.success
          //this.$router.push({ path: '/admin/dashboard' })
        }
      } catch (err) {
        this.loginsuccess = err
        if ((this.error = err.response.data.success === false)) {
          this.error = err.response.data.message
        } else {
          this.error = err.response.data
        }
        //console.log(err.response.data.success)
      }
    },
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push({ path: '/' })
    }
  },
}
</script>

