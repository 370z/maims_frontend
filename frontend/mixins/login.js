import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data: () => ({
    activeTooltipProfile: false,
    emailRegister: '',
    passwordRegister: '',
    passwordRegisterConfirm: '',
    usernameRegister: '',
    hasVisiblePassword: false,
    hasVisiblePasswordRegister: false,
    hasVisiblePasswordRegisterConfirm: false,
    active: 'primary',
    loginActive: false,
    registerActive: false,
    email: '',
    password: '',
    passwordRules: [(v) => !!v || 'จำเป็นต้องใส่ Password'],
    emailRules: [
      (v) => !!v || 'จำเป็นต้องใส่ E-mail',
      (v) => /.+@.+\..+/.test(v) || 'รูปแบบบ E-mail ไม่ถูกต้อง',
    ],
    remember: false,
  }),
  methods: {
    async handleFacebookLogin(){
      try {
       await this.$auth.loginWith('facebook')
      }catch (err){
        console.log(err)
      }
    },
    async handleRegisterClicked() {
      try {
        const response = await this.$axios.post(
          'http://maims.cmtc.ac.th:3000/api/customer',
          {
            userName: this.usernameRegister,
            email: this.emailRegister,
            password: this.passwordRegister,
          }
        )
        //console.log(response)
        await this.$auth.loginWith('local', {
          data: { email: this.emailRegister, password: this.passwordRegister },
        })
        this.registerActive = false
        const noti = this.$vs.notification({
          position: 'top-center',
          icon: `<i class='bx bx-bell' ></i>`,
          color: 'success',
          width: '100%',
          title: '<center>สมัครสมาชิกสำเร็จ</center>',
          text: `<center>กำลังนำคุณไปสู่หน้าหลัก...</center>`,
        })
      } catch (err) {
        this.registersuccess = err
        if ((this.error = err.response.data.success === false)) {
          this.error = err.response.data.message
          const noti = this.$vs.notification({
            position: 'top-center',
            color: 'danger',
            width: '100%',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.response.data.message + '</center>',
          })
        } else {
          this.error = err.response.data
          const noti = this.$vs.notification({
            position: 'top-center',
            width: '100%',
            color: 'danger',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.response.data + '</center>',
          })
        }
        //console.log(err.response.data.success)
      }
    },
    async logoutHandle() {
      await this.$auth.logout()
      if (process.client) {
        localStorage.removeItem('refresh')
        localStorage.removeItem('auth-token')
        localStorage.removeItem('tokenExpiration')
        localStorage.removeItem('userData')
        if (!localStorage.getItem('auth-token')) {
          $nuxt.$router.push('/')
        }
      }
      const noti = this.$vs.notification({
        position: 'top-center',
        width: '100%',
        color: 'warn',
        title: '<center>ออกจากระบบสำเร็จ</center>',
        text: `<center>กำลังนำคุณไปสู่หน้าหลัก...</center>`,
      })
    },
    async handleLoginClicked() {
      console.log('before', this.loginActive)
      try {
        const response = await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        })
        console.log(response.data.success)
        if (response.data.success) {
          await this.$store.commit('setCustomerAddress',{
            CustomerAddress: this.$auth.$state.user.CustomerAddresses
          })
          this.loginActive = false
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>เข้าสู่ระบบสำเร็จ</center>',
            text: `<center>กำลังนำคุณไปสู่หน้าหลัก...</center>`,
          })
          console.log('after', this.loginActive)

          //this.$router.push({ path: '/admin/dashboard' })
        }
      } catch (err) {
        if ((this.error = err.response.data.success === false)) {
          this.error = err.response.data.message
          const noti = this.$vs.notification({
            position: 'top-center',
            color: 'danger',
            width: '100%',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.response.data.message + '</center>',
          })
        } else {
          this.error = err.response.data
          const noti = this.$vs.notification({
            position: 'top-center',
            width: '100%',
            color: 'danger',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.response.data + '</center>',
          })
        }
        //console.log(err.response.data.success)
      }
    },
  },
  computed: {
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.passwordRegister)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.passwordRegister)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.passwordRegister)) {
        progress += 20
      }

      // more than 5 digits

      if (this.passwordRegister.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.passwordRegister)) {
        progress += 20
      }

      return progress
    },
    ...mapGetters(['cartCount']),
  },
}
