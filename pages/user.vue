{{{{raw}}}}
<template>
  <section class="page-container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      User
    </h1>
    <h2 class="info">
      {{ user.email }}
    </h2>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>
{{{{/raw}}}}

<script>
import userService from '~/plugins/service/userService'

export default {
  name: 'id',
  middleware: 'auth',
  async asyncData ({ params, error }) {
    let user = await userService.getUser(params.id)
    return { user }
  },
  head () {
    return {
      title: `User: ${this.user.email}`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
