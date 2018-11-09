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

export default {
  components: {
    MyFooter,
    MyHeader
  }
}
</script>

<style>
.container {
  margin: 0 5vw;
  padding: 100px 0;
  text-align: center;
}
@media only screen and (min-width: 850px) {
  .container {
    margin-left: 20vw;
    margin-right: 20vw;
  }
}
@media only screen and (min-width: 1400px) {
  .container {
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
</style>
