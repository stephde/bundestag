{{{{raw}}}}
<template>
  <section class="page-container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'user', params: { id: user._id }}">
          {{ user.email }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
{{{{/raw}}}}

<script>
import userService from '~/plugins/service/userService'

export default {
  async asyncData () {
    let users = await userService.getUsers()
    return { users: users }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  middleware: 'auth'
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
