{{{{raw}}}}
<template>
  <section class="page-container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Bundes-Feed
    </h1>

    <div class="container">
      <form v-if="!$store.state.authUser" @submit.prevent="login">
        <p v-if="formError" class="error">{{ formError }}</p>
        <p><i>To login, insert your <b>email</b> and <b>password</b>.</i></p>
        <p>Email: <input v-model="formEmail" type="text" name="email"></p>
        <p>Password: <input v-model="formPassword" type="password" name="password"></p>
        <button type="submit">Login</button>
        <p>Or sign up <nuxt-link to="/signup">here</nuxt-link> if you do not have an account yet</p>
      </form>
      <div v-else>
        <h3>Hello {{ $store.state.authUser.email }}!</h3>
        <p>
          Where do you want to go next?
        </p>
        <v-btn color="primary" to="/articles">Articles</v-btn>
        <v-btn color="primary" to="/users">Users</v-btn>
      </div>
    </div>
  </section>
</template>
{{{{/raw}}}}

<script>

export default {
  data () {
    return {
      formError: null,
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.formEmail,
          password: this.formPassword
        })
        this.formEmail = ''
        this.formPassword = ''
        this.formError = null
        this.$router.push('/articles')
      } catch (e) {
        this.formError = e.message
      }
    },
  },
  head () {
      return {
      title: 'Bundesfeed'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.error {
  color: red;
}
</style>
