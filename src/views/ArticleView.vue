<template>
  <diV class="article">
    <b-card :key="article.id" :title="article.title" :img-src="article.file" img-alt="Image" img-top :footer="`Створено ${$moment(article.date).fromNow()}`" footer-tag="footer">
      <b-card-sub-title class="mb-4 small text-muted">{{ article.short }}</b-card-sub-title>
      <b-card-text>
        {{ article.text }}
      </b-card-text>
      <b-card-text v-if="article.edit !== article.date" class="small text-muted">Останнє оновлення: {{ article.edit | moment('from', 'now') }}</b-card-text>
      <b-card-text @click="$router.push(`/user/${article.author}`)">
        Автор:
        <b-img rounded="circle" width="32" height="32" :src="$store.getters['user/getPhoto'](article.author)"></b-img>
        {{ article.authorName }}
      </b-card-text>
    </b-card>
  </diV>
</template>

<script>
export default {
  name: "ArticleView",
  data() {
    return {
      articles: []
    }
  },
  async mounted() {
    await this.$store.dispatch('articles/loadArticles');
    const articles = Object.entries(this.$store.getters["articles/getArticles"]);

    for (const article of articles) {
      article.shift();

      const data = article[0];
      if(data.date !== data.edit) {
        data._edit = this.$moment(data.edit).fromNow();
      } else {
        data._edit = 'Не редагувався';
      }
      data._date = this.$moment(data.date).fromNow();

      if(data.hasPhoto) {
        const img = await this.$store.getters['articles/getImage'](data.id);
        data.file = img;
      } else {
        data.file = 'https://www.plslwd.org/wp-content/plugins/lightbox/images/No-image-found.jpg';
      }

      this.articles.push(data);
    }
  },
  computed: {
    article() {
      return this.articles.find((el) => el.id === this.$route.params.id);
    }
  }
}
</script>

<style scoped lang="scss">
.article {
    max-width: 400px;
  display: inline-flex;
}
</style>