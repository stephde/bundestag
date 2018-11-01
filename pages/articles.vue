{{{{raw}}}}
<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Articles
    </h1>
    <ul class="users">
      <li v-for="(article, index) in articles" :key="index" class="user">
        <nuxt-link :to="{ name: 'article', params: { id: article._id }}">
          {{ article.title}}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
{{{{/raw}}}}

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/articles')
    return { articles: data }
  },
  head () {
    return {
      title: 'Articles'
    }
  }
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
