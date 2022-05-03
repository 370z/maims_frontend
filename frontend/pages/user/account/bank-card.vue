<template>
<v-card-title class="box">
        <div class="haderpeng">
            <span>บัญชีธนาคารของฉัน</span><br>
        </div>
        <v-row class="edit">
            <v-col
            cols="12"
            class="addbank"
            >
                <v-btn
                medium
                color="primary"
                @click="dialog = true"
                >
                <v-icon
                    size="18px"
                    color="#ffffff"
                >
                    mdi-plus
                </v-icon>
                เพิ่มบัญชีธนาคาร
                </v-btn>
            </v-col> 
            <v-row class="boxaccountbank">
                <v-col cols="12" md="6" v-for="accountbank in lkl" :key="accountbank.id" >
                    <v-card class="my-5  pa-3 showaccountbank ">
                        <v-col cols="12" md="9">
                            <div class="data">
                                <label for="">ธนาคาร: {{accountbank.namebank}}</label><br>
                                <label for="">ชื่อบัญชี(ภาษาไทย): {{accountbank.nameaccountTH}}</label><br>
                                <label for="">ชื่อบัญชี(ภาษาอังกฤษ): {{accountbank.nameaccountEN}}</label><br>
                                <label for="">เลขบัญชี: {{accountbank.numberaccount}}</label>
                            </div>
                        </v-col>
                        <v-col cols="12" md="3" class="active">
                            <v-icon @click="editItem(accountbank)" color="#FFBB29" >mdi-pencil</v-icon>
                            <v-icon @click="del(accountbank)" color="#FF6347" >mdi-delete</v-icon>
                        </v-col>
                    </v-card>
            </v-col>
            </v-row>
            <v-dialog
                v-model="dialog"
                max-width="450"
            >
            <v-card>
                <div class="add">
                    <v-card-title class="headline">
                        <span>{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form
                                ref="form"
                                @submit.prevent="save"
                            >  
                            <v-row>
                                   
                                <v-col
                                    cols="12"
                                    md="4"
                                >
                                    <v-select
                                        :items="namebank"
                                        menu-props="auto"
                                        label="ธนาคาร"
                                        hide-details
                                        single-line
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="8"
                                >
                                <v-text-field
                                    label="เลขบัญชี"
                                    required
                                ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                    cols="12"
                                >
                                <v-text-field
                                    label="ชื่อบัญชี(ภาษาไทย)"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    label="ชื่อบัญชี(ภาษาอังกฤษ)"
                                    required
                                ></v-text-field>
                                </v-col>
                            </v-row>
                                <v-col
                                    cols="12"
                                    align="center"
                                >
                                    <v-btn
                                        depressed
                                        color="success"
                                        type="submit"
                                    >
                                        บันทึกข้อมูล
                                    </v-btn>

                                    <v-btn
                                        depressed
                                        color="error"
                                        @click="close"
                                    >
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
import Payment from '~/components/payment.vue'

export default {
  layout: 'dashboard',
  data: () => ({
    dialog: false,
          rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      accountbank:{
          namebank:'',
          nameaccountTH:'',
          nameaccountEN:'',
          numberaccount:''
      },
      namebank:[
        'กรุงเทพ',
        'กรุงไทย',
        'กรุงศรีอยุธยา',
        'กสิกรไทย',
        'ไทยพาณิชย์',
        'เกียรตินาคินภัทร',
        'ทหารไทย',
        'ซีไอเอ็มบี',
        'ยูโอบี',
        'พร้อมเพย์',
      ],

  }),
}
</script>
<style lang="scss" scoped>
.boxaccountbank{
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
    
    
        .showaccountbank{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: auto 10px;

            .active{
                display: flex;
                align-content: center;
                justify-content: center;

                button{
                    margin-left: 30px;
                    font-size: 22px;
                    opacity: 0.8;
                }
                button:hover{
                    opacity: 1;
                    margin-left: 30px;
                    font-size: 22px;
                }
            }
        }
}
.haderpeng{
      padding: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.11);
      width: 100%;

        .subtitle{
          font-size: 1rem;
        }

    }

    .edit{
      margin: 20px auto;
      font-size: 14px;

      .addbank{
            display: flex;
            justify-content: flex-end;

            button{
                margin: 0px !important;
            }
        }

      .col-12 {
         text-align: left;
         padding: 0px 12px !important;
      } 

      .col-md-3{
        text-align: right;
      }
      .haderlist{
        color: #868686;
        font-size: 14px;
      }

      .v-input{
        height: 100%;
        font-size: 14px;
      }

      .v-text-field {
        padding: 0;
        margin: 0;
      }

    .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1{
      padding: 0px !important;
    }
    }

</style>
