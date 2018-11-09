{{{{raw}}}}
<template>
  <section class="page-container">
    <h2 class="info">
      {{ article.title }}
    </h2>
    <p class="pubdate">Published on {{pubDate}} at {{pubTime}}</p>
    <p class="content">{{article.content}}</p>
    <ul class="meta">
      <li>Related Parties: {{article.parties.join(', ')}}</li>
      <li>Related People: {{article.people.join(', ')}}</li>
      <li></li>
    </ul>
    <a class="button" :href="article.link">
      Original Post
    </a>
    <nuxt-link class="button" to="/articles">
      Articles
    </nuxt-link>
  </section>
</template>
{{{{/raw}}}}

<script>
import axios from '~/plugins/axios'
import dateUtils from '~/plugins/dateUtil'

export default {
  name: 'article',
  asyncData ({ params, error }) {
    return axios.get('/api/articles/' + params.id)
      .then((res) => {
        return {
          article: res.data,
          pubDate: dateUtils.dateString(res.data.date),
          pubTime: dateUtils.timeString(res.data.date)
        }
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
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.pubdate
{
  font-size: smaller;
}
.content
{
  text-align: justify;
  padding: 30px;
  line-height: 1.3;
}
.meta > li
{
  list-style: none;
  text-align: left;
  padding: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
