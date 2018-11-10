<template>
    <nuxt-link :to="{ name: 'article', params: { id: article._id }}">
        <div class="wrapper" :class="{ 'read': isRead() }">
            <h3>
                {{ article.title}}
            </h3>
            <div class="meta-info">
                <div class="parties">
                    {{ stringifyParties(article.parties) }}
                </div>
                <div class="date">
                    {{ dateTimeString(article.date) }}
                </div>
                <div v-if="isLiked()">
                    <v-icon medium color="green">thumb_up</v-icon>
                </div>
                <div v-if="isDisliked()">
                    <v-icon medium color="red">thumb_down</v-icon>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
    import dateUtil from '~/plugins/dateUtil'
    export default {
      props: ['article'],
      methods: {
        dateTimeString: dateUtil.dateTimeString,
        stringifyParties: parties => {
          return parties ? parties.join(', ') : ''
        },
        isRead() {
            return this.$store.getters.user.readArticles.includes(this.article._id)
        },
        isLiked() {
            return this.$store.getters.user.likedArticles.includes(this.article._id)
        },
        isDisliked() {
            return this.$store.getters.user.dislikedArticles.includes(this.article._id)
        }
      }
    }
</script>

<style scoped>
a {
    text-decoration: none;
}
.wrapper {
    padding: 20px;
}
.meta-info {
    width: 100%;
    display: flex;
}
.meta-info > div {
    flex: 1;
    padding: 20px 5px;
}
.meta-info .date, .meta-info .parties {
    flex: 2;
}
.read {
    color: lightgray;
}
</style>