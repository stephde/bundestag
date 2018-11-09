<template>
    <nuxt-link :to="{ name: 'article', params: { id: article._id }}">
        <div class="wrapper">
            <h3>
                {{ article.title}}
            </h3>
            <div class="meta-info">
                <div>
                    {{ stringifyParties(article.parties) }}
                </div>
                <div>
                    {{ dateTimeString(article.date) }}
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
        width: 49%;
        float: left;
    }
</style>