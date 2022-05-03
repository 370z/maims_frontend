<template>
  <v-card-title>
    <div class="haderpeng">
      <span>เปลี่ยนรห้สผ่าน</span><br />
      <span class="subtitle"
        >กรุณาอย่าเปิดเผยรหัสผ่านแก่คนอื่นๆ
        เพื่อความปลอดภัยของบัญชีผู้ใช้คุณเอง</span
      >
    </div>
    <v-form ref="form" width="100%" @submit.prevent="changePassword">
      <v-row class="edit">
        <v-col md="3" cols="12 haderlist">
          <label for="">รห้สผ่านเดิม</label>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field
            v-model="changepassword.password"
            :rules="[rules.password]"
            required
          ></v-text-field>
        </v-col>
        <v-col md="3" cols="12 haderlist">
          <label for="">รห้สผ่านใหม่</label>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field
            v-model="changepassword.newpassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            counter
            required
          ></v-text-field>
        </v-col>
        <v-col md="3" cols="12 haderlist">
          <label for="">ยืนยันรห้สผ่าน</label>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field
            v-model="changepassword.confirmpassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required1, rules.min, rules.confirm]"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            counter
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn color="rgb(255, 187, 41)" class="mr-0" type="submit">
            บันทึก
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card-title>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      show1: '',
      show2: '',
      changepassword: {
        password: '',
        newpassword: '',
        confirmpassword: '',
      },
      rules: {
        password: (value) => !!value || 'กรุณากรอกรห้สผ่านเดิม',
        required: (value) => !!value || 'กรุณากรอกรห้สผ่านใหม่',
        required1: (value) => !!value || 'กรุณากรอกยืนยันรห้สผ่านใหม่',
        min: (v) => v.length >= 8 || 'รห้สต้องมีความยาวเกิน 8 ตัว',
        confirm: (value) =>
          value === this.changepassword.newpassword ||
          'กรุณากรอกรห้สผ่านให้ตรงกัน',
      },
    }
  },
  methods: {
    async changePassword() {
      try {
        const config = {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        }
        // this.$axios.setHeader('Authorization', this.$auth.getToken('local'))
        let response = await this.$axios.put(
          'http://maims.cmtc.ac.th:3000/api/customer',
          { password: this.changepassword.confirmpassword },
          config
        )
        if (response.data.success) {
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>เปลี่ยนรหัสผ่านสำเร็จ</center>',
            text: `<center>กรุณาเข้าสู่ระบบใหม่อีกครั้ง...</center>`,
          })
          ;(this.passwordSet = ''), (this.passwordSetConfirm = '')
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
        }
      } catch (err) {
        if ((this.error = err.response.data.success === false)) {
          const noti = this.$vs.notification({
            position: 'top-center',
            color: 'danger',
            width: '100%',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.response.data.message + '</center>',
          })
        }
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      if (
        this.changepassword.newpassword ===
          this.changepassword.confirmpassword &&
        this.changepassword.newpassword
      ) {
        this.isMatchPassword = true
      } else {
        this.isMatchPassword = false
      }
      return () =>
        this.changepassword.newpassword ===
          this.changepassword.confirmpassword || ''
    },
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.passwordSet)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.passwordSet)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.passwordSet)) {
        progress += 20
      }

      // more than 5 digits

      if (this.passwordSet.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.passwordSet)) {
        progress += 20
      }

      return progress
    },
  },
}
</script>
<style lang="scss" scoped>
.haderpeng {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  width: 100%;

  .subtitle {
    font-size: 1rem;
  }
}

.edit {
  margin: 20px auto;
  font-size: 14px;

  .col-12 {
    text-align: left;
  }

  .col-md-3 {
    text-align: right;
  }
  .haderlist {
    color: #868686;
    font-size: 14px;
  }

  .v-input {
    height: 100%;
    font-size: 14px;
  }

  .v-text-field {
    padding: 0;
    margin: 0;
  }

  .col-xl,
  .col-xl-auto,
  .col-xl-12,
  .col-xl-11,
  .col-xl-10,
  .col-xl-9,
  .col-xl-8,
  .col-xl-7,
  .col-xl-6,
  .col-xl-5,
  .col-xl-4,
  .col-xl-3,
  .col-xl-2,
  .col-xl-1,
  .col-lg,
  .col-lg-auto,
  .col-lg-12,
  .col-lg-11,
  .col-lg-10,
  .col-lg-9,
  .col-lg-8,
  .col-lg-7,
  .col-lg-6,
  .col-lg-5,
  .col-lg-4,
  .col-lg-3,
  .col-lg-2,
  .col-lg-1,
  .col-md,
  .col-md-auto,
  .col-md-12,
  .col-md-11,
  .col-md-10,
  .col-md-9,
  .col-md-8,
  .col-md-7,
  .col-md-6,
  .col-md-5,
  .col-md-4,
  .col-md-3,
  .col-md-2,
  .col-md-1,
  .col-sm,
  .col-sm-auto,
  .col-sm-12,
  .col-sm-11,
  .col-sm-10,
  .col-sm-9,
  .col-sm-8,
  .col-sm-7,
  .col-sm-6,
  .col-sm-5,
  .col-sm-4,
  .col-sm-3,
  .col-sm-2,
  .col-sm-1,
  .col,
  .col-auto,
  .col-12,
  .col-11,
  .col-10,
  .col-9,
  .col-8,
  .col-7,
  .col-6,
  .col-5,
  .col-4,
  .col-3,
  .col-2,
  .col-1 {
    padding: 5px 10px !important;
  }
}
</style>
