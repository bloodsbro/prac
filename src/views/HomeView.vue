<template>
  <div class="home">
    <b-card-group columns>
      <b-card v-for="article in articles" :key="article.id" :title="article.title" :img-src="article.file" img-alt="Image" img-top @click="openArticle(article.id)" style="cursor:pointer; max-width: 400px" body-class="px-0 py-0 pt-2">
        <b-card-sub-title class="mb-4 small text-muted">{{ article.short }}</b-card-sub-title>
        <b-card-sub-title class="mb-4">
            <div>
                <b-badge href="#" variant="dark" class="mx-1">Vue</b-badge>
                <b-badge href="#" variant="dark" class="mx-1">Router</b-badge>
                <b-badge href="#" variant="dark" class="mx-1">Vuex</b-badge>
            </div>
        </b-card-sub-title>
        <b-card-text v-if="article.edit !== article.date" class="small text-muted">Останнє оновлення: {{ article.edit | moment('from', 'now') }}</b-card-text>
        <b-card-text @click="$router.push(`/user/${article.author}`)">
            Автор:
            <b-img rounded="circle" width="32" height="32" :src="$store.getters['user/getPhoto'](article.author)"></b-img>
            {{ article.authorName }}
        </b-card-text>
        <b-card-footer footer-tag="footer">
            <b-badge v-if="article.date > Date.now() - 1000 * 60 * 60 * 24">Нове</b-badge>
            Створено {{ $moment(article.date).fromNow() }}
        </b-card-footer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import auth from "@/mixin/auth";

export default {
  name: 'home',
  mixins: [auth],
  data() {
    return {
      articles: []
    }
  },
  methods: {
    async reload() {
      this.articles = [];

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
    openArticle(id) {
      this.$router.push(`/article/${id}`);
    }
  },
  async mounted() {
    await this.reload();
  }
}
</script>
