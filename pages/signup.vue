{{{{raw}}}}
<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Bundes-Feed
    </h1>

    <div class="container">
      <form v-if="!$store.state.authUser" @submit.prevent="signup">
        <p v-if="formError" class="error">{{ formError }}</p>
        <p><i>To sign up, please insert your <b>email</b> and <b>password</b>.</i></p>
        <p>Email: <input v-model="formEmail" type="text" name="email"></p>
        <p>Password: <input v-model="formPassword" type="password" name="password"></p>
        <p>Password: <input v-model="formPasswordRepeat" type="password" name="passwordRepeat"></p>
        <button type="submit">Sign Up</button>
        <p>Or go back to the <nuxt-link to="/signup">login</nuxt-link>.</p>
      </form>
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
      formPassword: '',
      formPasswordRepeat: ''
    }
  },
  methods: {
    async signup () {
      try {
        if (this.formPassword !== this.formPasswordRepeat) {
          throw new Error('Passowords do not match')
        }
        await this.$store.dispatch('signUp', {
          email: this.formEmail,
          password: this.formPassword
        })
        this.formEmail = ''
        this.formPassword = ''
        this.formPasswordRepeat = ''
        this.formError = null

        this.$router.push('/')
      } catch (e) {
        this.formError = e.message
      }
    }
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
