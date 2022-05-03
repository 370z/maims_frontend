<template>
  <v-card-title>
    <div class="haderpeng">
      <span>ที่อยู่ของฉัน </span><br />
    </div>
    <v-row class="edit">
      <v-col cols="12" class="addbank">
        <v-btn medium color="primary" @click="dialog = true">
          <v-icon size="18px" color="#ffffff"> mdi-plus </v-icon>
          เพิ่มที่อยู่
        </v-btn>
      </v-col>
      <div class="haderpeng" v-for="serial in address" :key="serial.id">
        <v-card class="my-5 pa-3 showserial">
          <v-col cols="12" md="9">
            <div class="data">
              <label for="">ชื่อ: {{serial.fullName}}</label><br />
              <label for="">ที่อยู่: {{serial.streetAddress}}</label> <br/>
              <label for="">จังหวัด {{serial.province}}</label> <br/>
              <label for="">อำเภอ {{serial.district}} </label> <br/>
              <label for="">รหัสไปรษณีย์ {{serial.zipCode}}</label>
            </div>
          </v-col>
          <v-col cols="12" md="3" class="active">
            <v-icon @click="editItem(serial)" color="#FFBB29"
              >mdi-pencil</v-icon
            >
            <v-icon @click="del(serial)" color="#FF6347">mdi-delete</v-icon>
          </v-col>
        </v-card>
      </div>
      <v-dialog v-model="dialog" max-width="450">
        <v-card>
          <div class="add">
            <v-card-title class="headline">
              <span>{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" @submit.prevent="save">
                  <v-text-field
                    label="ชื่อ-นามสกุล"
                    :rules="[rules.name]"
                    required
                    prepend-icon="mdi-tree"
                    v-model="addressForm.fullName"
                  ></v-text-field>
                  <v-text-field
                    label="หมายเลขโทรศัพท์"
                    type="text"
                    :rules="[rules.serial]"
                    required
                    prepend-icon="mdi-cash"
                    v-model="addressForm.phoneNumber"
                    :disabled="this.editedIndex > -1 ? true : false"
                  ></v-text-field>
                  <v-text-field
                    label="จังหวัด"
                    :rules="[rules.name]"
                    required
                    prepend-icon="mdi-tree"
                    v-model="addressForm.province"
                  ></v-text-field>
                  <v-text-field
                    label="เขต/อำเภอ"
                    :rules="[rules.name]"
                    required
                    prepend-icon="mdi-tree"
                    v-model="addressForm.district"
                  ></v-text-field>
                  <v-text-field
                    label="รห้สไปรษณีย์"
                    :rules="[rules.name]"
                    required
                    prepend-icon="mdi-tree"
                    v-model="addressForm.zipCode"
                  ></v-text-field>
                  <v-text-field
                    label="อาคาร, ถนน และอื่นๆ"
                    :rules="[rules.name]"
                    required
                    prepend-icon="mdi-tree"
                    v-model="addressForm.streetAddress"
                  ></v-text-field>
                  <v-col cols="12" align="center">
                    <v-btn depressed color="success" type="submit">
                      บันทึกข้อมูล
                    </v-btn>

                    <v-btn depressed color="#cb6259" @click="closeDelete()">
                      ย้อนกลับ
                    </v-btn>
                  </v-col>
                </v-form>
              </v-container>
            </v-card-text>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card-title>
</template>

<script>
import Axios from 'axios'
export default {
  layout: 'dashboard',
  data: () => ({
    dialogDelete: false,
    rules: {
      name: (v) => !!v || 'กรุณาใส่ชื่อเครื่่อง',
      serial: (v) => !!v || 'กรุณาใส่รห้สซีเรียล',
    },
    AddEdit: '',
    addressForm: {
      fullName: '',
      district: '',
      province: '',
      zipCode: '',
      streetAddress: '',
      phoneNumber: '',
    },
    defaultAddressForm: {
      fullName: '',
      district: '',
      province: '',
      zipCode: '',
      streetAddress: '',
      phoneNumber: '',
    },

    expanded: [],
    singleExpand: false,
    dessertHeaders: [
      { text: 'ชื่อ-นามสกุล', value: 'fullName' },
      { text: 'ที่อยู่', value: 'streetAddress' },
      { text: 'อำเภอ', value: 'district' },
      { text: 'จังหวัด', value: 'province' },
      { text: 'รหัสไปรษณีย์', value: 'zipCode' },
      { text: 'เบอร์โทรศัพท์', value: 'phoneNumber' },
      { text: 'Actions', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' },
    ],
    loading: true,
    address: [],
    dialog: false,
    editedIndex: -1,
  }),
  async asyncData({ $axios, $auth }) {
    console.log('asyncdata')
    await $auth.fetchUser()
    try {
      const config = {
        headers: {
          Authorization: $auth.getToken('local'),
        },
      }
      // this.$axios.setHeader('Authorization', this.$auth.getToken('local'))
      let response = await $axios.get(
        'http://maims.cmtc.ac.th:3000/api/customer/address',
        config
      )
      const [addressResponse] = await Promise.all([response])
      console.log('datafrom order', addressResponse.data)
      if (addressResponse.data.success) {
        return { address: addressResponse.data.address }
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    reset() {
      this.$refs.formAddress.reset()
    },
    editItem(item) {
      this.editedIndex = this.address.indexOf(item)
      this.addressForm = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.address.indexOf(item)
      this.addressForm = Object.assign({}, item)
      this.dialogDelete = true
    },
    async setDefault(item) {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      try {
        let onSetDefault = await Axios.put(
          `http://maims.cmtc.ac.th:3000/api/customer/address/set/${item.id}/default`,
          '',
          config
        )
        if (onSetDefault.data.success) {
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>' + onSetDefault.data.message + '</center>',
            text: `<center>กรุณารอสักครู่...</center>`,
          })
        }
      } catch (err) {}
      console.log(item.id)
    },

    async deleteItemConfirm() {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      try {
        let deleteAddress = await Axios.delete(
          `http://maims.cmtc.ac.th:3000/api/customer/address/${this.addressForm.id}`,
          config
        )
        if (deleteAddress.data.success) {
          this.address.splice(this.editedIndex, 1)
          this.closeDelete()
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>ลบที่อยู่สำเร็จ</center>',
            text: `<center>กรุณารอสักครู่...</center>`,
          })
        }
      } catch (err) {
        if ((this.error = err.deleteAddress.data.success === false)) {
          const noti = this.$vs.notification({
            position: 'top-center',
            color: 'danger',
            width: '100%',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.deleteAddress.data.message + '</center>',
          })
        }
      }
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultAddressForm)
        this.editedIndex = -1
      })
    },
    async save() {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      if (this.editedIndex > -1) {
        try {
          let response = await Axios.put(
            `http://maims.cmtc.ac.th:3000/api/customer/address/${this.addressForm.id}`,
            {
              fullName: this.addressForm.fullName,
              district: this.addressForm.district,
              province: this.addressForm.province,
              zipCode: this.addressForm.zipCode,
              streetAddress: this.addressForm.streetAddress,
              phoneNumber: this.addressForm.phoneNumber,
            },
            config
          )
          if (response.data.success) {
            Object.assign(this.address[this.editedIndex], this.addressForm)
            this.$refs.formAddress.reset()
            this.dialog = false
            const noti = this.$vs.notification({
              position: 'top-center',
              icon: `<i class='bx bx-bell' ></i>`,
              color: 'success',
              width: '100%',
              title: '<center>แก้ไขที่อยู่สำเร็จ</center>',
              text: `<center>กรุณารอสักครู่...</center>`,
            })
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
      } else {
        try {
          let response = await Axios.post(
            'http://maims.cmtc.ac.th:3000/api/customer/address',
            this.addressForm,
            config
          )
          console.log('datafrom add address', response.data.success)
          if (response.data.success) {
            this.address.push(response.data.data)
            this.$refs.formAddress.reset()
            this.dialog = false
            const noti = this.$vs.notification({
              position: 'top-center',
              icon: `<i class='bx bx-bell' ></i>`,
              color: 'success',
              width: '100%',
              title: '<center>เพิ่มที่อยู่สำเร็จ</center>',
              text: `<center>กรุณารอสักครู่...</center>`,
            })
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
      }
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'ที่อยู่ของฉัน' : 'แก้ไขที่อยู่'
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
  .showserial {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .active {
      display: flex;
      align-content: center;
      justify-content: center;

      button {
        margin-left: 30px;
        font-size: 22px;
        opacity: 0.8;
      }
      button:hover {
        opacity: 1;
        margin-left: 30px;
        font-size: 22px;
      }
    }
  }
}

.edit {
  margin: 20px auto;
  font-size: 14px;

  .addbank {
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0px !important;
    }
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
    padding: 0px !important;
  }
}
  .v-form{
    width: 100% !important;
  }
</style>
