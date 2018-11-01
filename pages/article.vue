{{{{raw}}}}
<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Article
    </h1>
    <h2 class="info">
      {{ article.title }}
    </h2>
    <p>{{article.content}}</p>
    <nuxt-link class="button" to="/articles">
      Articles
    </nuxt-link>
  </section>
</template>
{{{{/raw}}}}

<script>
import axios from '~/plugins/axios'

export default {
  name: 'article',
  asyncData ({ params, error }) {
    return axios.get('/api/articles/' + params.id)
      .then((res) => {
        return { article: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  head () {
    return {
      title: `${this.article.title}`
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
