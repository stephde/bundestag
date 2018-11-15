<template>
  <div>
    <my-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'
import colors from 'vuetify/es5/util/colors'

export default {
  components: {
    MyFooter,
    MyHeader
  },
  created () {
    // ToDo: this theme declaration does not seem to work with current version of vuetify
    this.$vuetify.theme.primary = colors.blueGrey.darken1
    this.$vuetify.theme.secondary = colors.blueGrey.lighten2
    this.$vuetify.theme.accent = colors.red.lighten2
    this.$vuetify.theme.error = colors.red.darken4
  }
}
</script>

<style lang="stylus">
// ToDo: this theme declaration does not seem to work with current version of vuetify
@require '../node_modules/vuetify/src/stylus/settings/_colors.styl'
$theme := {
  primary: $blue-grey
  accent: $light-blue
  secondary: $red
  info: $grey
}
@require '../node_modules/vuetify/src/stylus/main.styl'
</style>

<style>
.page-container {
  margin: 0 5vw;
  padding: 100px 0;
  text-align: center;
}
@media only screen and (min-width: 850px) {
  .page-container {
    margin-left: 20vw;
    margin-right: 20vw;
  }
}
@media only screen and (min-width: 1400px) {
  .page-container {
    margin-left: 30vw;
    margin-right: 30vw;
  }
}

.button, .button:visited {
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus {
  color: #fff;
  background-color: #000;
}

.title {
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}

/* ToDo: remove this once the theme issue with vuetify is fixed */
.primary {
  background-color: #546E7A !important;
  color: white !important;
}
.secondary {
  background-color: #90A4AE !important;
  color: black !important;
}
</style>
