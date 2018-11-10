<template>
  <header>
    <v-toolbar dark color="primary">
      <nuxt-link to="/">
        <v-btn icon>
            <v-icon class="home">home</v-icon>
        </v-btn>
      </nuxt-link>

      <v-toolbar-title class="white--text">Bundes-Feed</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="$store.state.authUser" v-on:click="logout" class="logout">
          <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar>
  </header>
</template>

<script>
  import fontawesome from '~/plugins/fontawesome'
  export default {
    methods: {
      async logout () {
        console.log('Logout handler called')
        await this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  header {
    background: rgba(25, 100, 25, 0.4);
    color: rgba(25, 70, 25, 1);
  }
  header > h1 {
    margin: 0;
    padding: 25px;
    text-align: center;
  }
  .home {
    text-decoration: none;
  }
  .logout {
    position: absolute;
    top: 0;
    right: 0;
    height: 55px;
    line-height: 55px;
    padding: 15px;
    border: solid rgba(256, 256, 256, 0.3) 1px;
  }
  .logout:hover {
    transition: background-color 1s;
    background: white;
    color: black;
    cursor: pointer;
  }
</style>