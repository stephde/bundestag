{{{{raw}}}}
<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>

    <nuxt-link class="button" to="/articles">
    Articles
  </nuxt-link>

    <nuxt-link class="button" to="/users">
      Users
    </nuxt-link>
  </section>
</template>
{{{{/raw}}}}

<script>

export default {
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
</style>
