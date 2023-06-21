<template>
  <div>
    <h3>Управління статтями</h3>
    
    <b-button class="mb-2" v-b-modal.addArticle>Додати нову статтю</b-button>
    <b-table striped hover responsive :fields="fields" :items="articles" role="button" @row-clicked="editArticle"></b-table>

      <b-modal id="addArticle" title="Додати нову статтю" @ok="addArticle" @cancel="clearInputs">
          <div>
              <b-form-group
                      label="Заголовок"
                      label-for="article-edit-title"
                      class="mb-0"
              >
                  <b-form-input v-model="title" id="article-edit-title" type="text" placeholder="Введіть заголовок"></b-form-input>
              </b-form-group>
              <b-form-group
                      label="Короткий опис"
                      label-for="article-edit-short"
                      class="mb-0"
              >
                  <b-form-input v-model="short" id="article-edit-short" type="text" placeholder="Введіть короткий опис"></b-form-input>
              </b-form-group>
              <b-form-group
                      label="Текст"
                      label-for="article-edit-text"
                      class="mb-0"
              >
                  <b-form-textarea v-model="text" id="article-edit-text" type="text" placeholder="Введіть текст"></b-form-textarea>
              </b-form-group>
              <b-form-group
                      label="Фото"
                      label-for="article-edit-file"
                      class="mb-0"
              >
                  <b-form-file v-model="file" id="article-edit-file" accept="image/*"></b-form-file>
              </b-form-group>
          </div>
      </b-modal>

      <b-modal id="editArticle" title="Редагування статті" @ok="doEditArticle" @cancel="clearInputs">
          <input type="hidden" v-model="id" />
          <div>
              <b-form-group
                label="Заголовок"
                label-for="article-edit-title"
                class="mb-0"
              >
                <b-form-input v-model="title" id="article-edit-title" type="text" placeholder="Введіть заголовок"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Короткий опис"
                label-for="article-edit-short"
                class="mb-0"
              >
                <b-form-input v-model="short" id="article-edit-short" type="text" placeholder="Введіть короткий опис"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Текст"
                label-for="article-edit-text"
                class="mb-0"
              >
                  <b-form-textarea v-model="text" id="article-edit-text" type="text" placeholder="Введіть текст"></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Фото"
                label-for="article-edit-file"
                class="mb-0"
              >
                  <b-form-file v-model="file" id="article-edit-file" accept="image/*"></b-form-file>
              </b-form-group>
          </div>
      </b-modal>
  </div>
</template>

<script>
import auth from "@/mixin/auth";

export default {
  name: "ArticlesView",
  mixins: [auth],
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: 'Ідентифікатор'
        },
        {
          key: 'title',
          label: 'Заголовок'
        },
        {
          key: 'short',
          label: 'Короткий опис'
        },
        {
          key: 'text',
          label: 'Текст'
        },
        {
          key: '_date',
          label: 'Дата створення'
        },
        {
          key: '_edit',
          label: 'Дата редагування'
        }
      ],
      articles: [],
      id: '',
      title: '',
      short: '',
      text: '',
      date: '',
      edit: '',
      file: null,
    }
  },
  methods: {
    async reload() {
      this.articles = [];
      
      await this.$store.dispatch('articles/loadArticles');
      const articles = Object.entries(this.$store.getters["articles/getArticles"]);

      articles.forEach((article) => {
        article.shift();

        const data = article[0];
        if(data.date !== data.edit) {
          data._edit = this.$moment(data.edit).fromNow();
        } else {
          data._edit = 'Не редагувався';
        }
        data._date = this.$moment(data.date).fromNow();
        this.articles.push(data);
      })
    },
    async addArticle() {
      this.$store.dispatch('articles/addArticle', {
        title: this.title,
        short: this.short,
        text: this.text,
        date: Date.now(),
        edit: Date.now(),
        author: this.authData.uid,
        authorName: this.authData.displayName || this.authData.email,
        file: this.file
      });

      await this.reload();
      this.clearInputs();
    },
    editArticle(article) {
      this.id = article.id;
      this.title = article.title;
      this.short = article.short;
      this.text = article.text;
      this.date = article.date;
      this.edit = article.edit;
      this.file = article.file;

      this.$bvModal.show('editArticle');
    },
    async doEditArticle() {
      await this.$store.dispatch('articles/editArticle', {
        id: this.id,
        title: this.title,
        short: this.short,
        text: this.text,
        date: this.edit,
        edit: Date.now(),
        author: this.authData.uid,
        authorName: this.authData.displayName || this.authData.email,
        file: this.file
      });

      await this.reload();
      this.clearInputs();
    },
    clearInputs() {
      this.title = '';
      this.short = '';
      this.text = '';
      this.date = '';
      this.edit = '';
      this.file = null;
    }
  },
  async mounted() {
    await this.reload();
  }
}
</script>
