<template>
  <v-main v-if="!this.$auth.loggedIn">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-alert v-if="registersuccess === true" type="success"
            >สมัครสมาชิกสำเร็จ</v-alert
          >
          <v-alert v-if="!registersuccess === false" type="error"
            >พบข้อผิดพลาด : {{ error }}</v-alert
          >
          <material-card color="success" elevation="12" title="สมัครสมาชิก">
            <v-card-text>
              <v-form ref="formRegister">
                <v-text-field
                  type="text"
                  v-model="username"
                  prepend-icon="mdi-account"
                  name="username"
                  :rules="usernameRules"
                  label="Username"
                ></v-text-field>
                <v-text-field
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  name="email"
                  label="E-mail"
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                ></v-text-field>
                <v-text-field
                  type="text"
                  v-model="id_card"
                  :rules="idcardRules"
                  prepend-icon="mdi-id-card"
                  name="id_card"
                  label="รหัสประจำตัว 13 หลัก"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center>
                <v-btn color="success" @click="handleRegisterClicked"
                  >สมัครสมาชิก</v-btn
                >
                <v-btn color="primary" @click="reset">ล้างข้อมูล</v-btn>
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
      username: '',
      email: '',
      password: '',
      id_card: '',
      usernameRules: [
        (v) => !!v || 'จำเป็นต้องใส่ Username',
        (v) => (v && v.length >= 8) || 'Username ควรมี 8 ตัวอักษรขึ้นไป',
      ],
      passwordRules: [
        (v) => !!v || 'จำเป็นต้องใส่ Password',
        (v) => (v && v.length >= 8) || 'Password ควรมี 8 ตัวอักษรขึ้นไป',
      ],
      idcardRules: [
        (v) => !!v || 'จำเป็นต้องใส่รหัสประจำตัว',
        (v) => (v && v.length >= 13) || 'รหัสประจำตัวไม่ถูกต้อง',
      ],
      emailRules: [
        (v) => !!v || 'จำเป็นต้องใส่ E-mail',
        (v) => /.+@.+\..+/.test(v) || 'รูปแบบบ E-mail ไม่ถูกต้อง',
      ],
      registersuccess: '',
      error: null,
    }
  },
  methods: {
    reset() {
      this.$refs.formRegister.reset()
    },
    async handleRegisterClicked() {
      try {
        const response = await this.$axios.post(
          'https://it-ifp-auth.herokuapp.com/api/user/register',
          {
            username: this.username,
            email: this.email,
            password: this.password,
            id_card: this.id_card,
          }
        )
        //console.log(response)
        await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        })
        this.$router.push({ path: '/' })
      } catch (err) {
        this.registersuccess = err
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

