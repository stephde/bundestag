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
    <v-btn small absolute bottom left fixed fab color="red" @click="dislike">
      <v-icon medium color="white">block</v-icon>
    </v-btn>
    <v-btn small absolute bottom right fixed fab color="green" @click="like">
      <v-icon medium color="white">done</v-icon>
    </v-btn>

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
import api from '~/plugins/api'
import dateUtils from '~/plugins/dateUtil'

export default {
  name: 'barticle',
  asyncData ({ params, error }) {
    return api.axios.get('/api/articles/' + params.id)
      .then((res) => {
        return {
          article: res.data,
          pubDate: dateUtils.dateString(res.data.date),
          pubTime: dateUtils.timeString(res.data.date),
        }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  methods: {
    like () {
      this.$store.dispatch('likeArticle', {articleId: this.article._id, user: this.$store.getters.user})
      this.$router.push('/articles')
    },
    dislike () {
      this.$store.dispatch('dislikeArticle', {articleId: this.article._id, user: this.$store.getters.user})
      this.$router.push('/articles')
    }
  },
  head () {
    return {
      title: `${this.article.title}`
    }
  },
  async mounted () {
    await this.$store.dispatch('articleRead', {articleId: this.article._id, user: this.$store.getters.user})
  }
}
</script>

<style scoped>
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.pubdate {
  font-size: smaller;
}
.content {
  text-align: justify;
  padding: 30px;
  line-height: 1.3;
}
.meta > li {
  list-style: none;
  text-align: left;
  padding: 10px;
}
.button {
  margin-top: 30px;
}
button.v-btn {
  bottom: 20px !important;
}
</style>
