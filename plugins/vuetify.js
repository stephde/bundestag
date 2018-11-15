import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  // ToDo: this theme declaration does not seem to work with current version of vuetify
  theme: {
    primary: colors.blueGrey.darken1,
    secondary: colors.blueGrey.lighten2,
    accent: colors.red.lighten2,
    error: colors.red.darken4,
  }
})
