{{{{raw}}}}
<template>
  <section class="page-container">
    <h1 class="title">
      Articles
    </h1>
    <p class="results">
      Found {{articles.length}} articles
    </p>
    <ul class="articles">
      <li v-for="(article, index) in articles" :key="index" class="article">
        <tile :article="article"></tile>
      </li>
    </ul>
  </section>
</template>
{{{{/raw}}}}

<script>
import axios from '~/plugins/axios'
import Tile from "../components/tile";

export default {
    components: {Tile},
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
.title {
  margin: 30px 0;
}
.articles {
  list-style: none;
  margin: 0;
  padding: 0;
}
.article {
   border-bottom: solid lightgray 1px;
}
.article:hover {
  transition: background-color 1s;
  background-color: lightgray;
}
</style>
