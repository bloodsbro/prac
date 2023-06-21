import { getDatabase, ref, child, push, update, get } from "firebase/database";
import { getStorage, getBlob, uploadBytes, ref as sref } from "firebase/storage";

const collName = 'articles';
export default {
  namespaced: true,
  state: {
    articles: [],
  },
  getters: {
    getArticles: (state) => {
      return state.articles;
    },
    getImage: (state) => async (id) => {
      return `https://firebasestorage.googleapis.com/v0/b/prac-622aa.appspot.com/o/articles%2F${id}.jpg?alt=media`;
    }
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    ADD_ARTICLE(state, article) {
      if(!state.articles) {
        state.articles = [];
      }
      state.articles[article.id] = article;
    },
  },
  actions: {
    async addArticle({commit}, article) {
      const db = ref(getDatabase());
      article.id = push(child(db, collName)).key;
      const storage = sref(getStorage(), `articles/${article.id}.jpg`);

      if(article.file) {
        await uploadBytes(storage, article.file);
      }

      const updates = {};

      article.hasPhoto = !!article.file;
      delete article.file;

      updates[`/${collName}/` + article.id] = article;
      await update(db, updates);

      commit('ADD_ARTICLE', article);
    },
    async loadArticles({commit}) {
      const db = ref(getDatabase());

      const querySnapshot = await get(child(db, `${collName}`));
      let articles = querySnapshot.val();

      commit('SET_ARTICLES', articles);
    },
    async editArticle({commit}, article) {
      const db = ref(getDatabase());
      const storage = sref(getStorage(), `articles/${article.id}.jpg`);

      if(article.file) {
        await uploadBytes(storage, article.file);
      }

      const updates = {};

      article.hasPhoto = !!article.file;
      delete article.file;

      updates[`/${collName}/` + article.id] = article;
      await update(db, updates);

      commit('ADD_ARTICLE', article);
    },
  }
}