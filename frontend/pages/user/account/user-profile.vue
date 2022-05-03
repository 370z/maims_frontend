<template>
  <v-card-title>
    <div class="haderpeng">
      <span>ข้อมูลของฉัน</span><br />
      <span class="subtitle"
        >จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</span
      >
    </div>
    <v-row class="edit">
      <v-col md="3" cols="12 haderlist">
        <label for="">ชื่อผู้ใช้งาน</label>
      </v-col>
      <v-col md="8" cols="12">
        <label for="">{{ $auth.user.CustomerProfile.displayName }}</label>
      </v-col>
      <v-col md="3" cols="12 haderlist">
        <label for="">ชื่อ</label>
      </v-col>
      <v-col md="8" cols="12">
        <v-text-field v-model="fullName"></v-text-field>
      </v-col>
      <v-col md="3" cols="12 haderlist">
        <label for="">อีเมล์</label>
      </v-col>
      <v-col md="8" cols="12">
        <v-text-field v-model="email"></v-text-field>
        <label for=""></label>
      </v-col>
      <v-col md="3" cols="12 haderlist">
        <label for="">หมายเลขโทรศัพท์</label>
      </v-col>
      <v-col md="8" cols="12">
        <v-text-field v-model="phoneNumber"></v-text-field>
        <label for=""></label>
      </v-col>
      <v-col md="3" cols="12 haderlist">
        <label for="">เพศ</label>
      </v-col>
      <v-col md="8" cols="12">
        {{select}}
        <v-radio-group v-model="select">
          <v-radio label="ชาย" value="1"></v-radio>
          <v-radio label="หญิง" value="2"></v-radio>
          <v-radio label="อื่นๆ" value="3"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col md="3" cols="12 haderlist"> </v-col>
      <v-col md="8" cols="12">
        <v-btn color="rgb(255, 187, 41)" class="mr-0" @click="updateProfile">
          บันทึก
        </v-btn>
      </v-col>
    </v-row>
  </v-card-title>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import materialCard from '~/components/material/AppCard'
import Axios from 'axios'

export default {
  layout: 'dashboard',
  components: {
    materialCard,
  },
  async asyncData({ $auth }) {
    await $auth.fetchUser()
  },
  methods: {
    async updateProfile() {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      try {
        let onUpdateProfile = await Axios.put(
          `http://maims.cmtc.ac.th:3000/api/customer/edit/profile`,
          {
            displayName: this.displayName,
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            sex: this.select,
          },
          config
        )
        await this.$auth.fetchUser()
        if (onUpdateProfile.data.success) {
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>' + onUpdateProfile.data.message + '</center>',
            text: `<center>กรุณารอสักครู่...</center>`,
          })
        }
      } catch (err) {
        if (err.response.data.success === false) {
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
  data() {
    return {
      username: this.$auth.user.userName,
      displayName: this.$auth.user.CustomerProfile.displayName,
      email: this.$auth.user.email,
      fullName: this.$auth.user.CustomerProfile.fullName,
      phoneNumber: this.$auth.user.CustomerProfile.phoneNumber,
      select: `${this.$auth.user.CustomerProfile.sex}`,
      genderItem: [
        { gender: 'ชาย', value: '1' },
        { gender: 'หญิง', value: '2' },
        { gender: 'อื่น ๆ', value: '3' },
      ],
    }
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

  .v-input[data-v-87d83d38] {
    margin: 0;
  }

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
