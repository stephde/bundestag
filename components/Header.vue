<template>
  <header>
    <nuxt-link to="/">
      <div class="home">
        <font-awesome-icon icon="home"></font-awesome-icon>
      </div>
    </nuxt-link>
    <h1>
      Bundes-Feed
    </h1>
    <div v-if="$store.state.authUser" v-on:click="logout" class="logout">
      Log Out
    </div>
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
    height: 55px;
    width: 55px;
    padding: 10px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .home > svg {
    width: 100%;
    height: 100%;
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