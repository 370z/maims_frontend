import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
//import colors from "vuetify/es5/util/colors";
import '~/assets/style/vars.scss'
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    treeShake: false,
    //customVariables: ['~/assets/variables.scss'],
    defaultAssets:false,
    theme: {
      dark: false,
      },
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
