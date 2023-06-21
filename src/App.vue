<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark" fixed="top">
        <b-navbar-brand href="/#/">Blog</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/#/">Головна</b-nav-item>
            <b-nav-item v-if="isAuth" href="/#/articles">Управління статтями</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
<!--            <b-nav-form>-->
<!--              <b-form-input size="sm" class="mr-sm-2" placeholder="Пошук"></b-form-input>-->
<!--              <b-button size="sm" class="my-2 my-sm-0" type="submit">Пошук</b-button>-->
<!--            </b-nav-form>-->
            <b-nav-item-dropdown v-if="isAuth" right>
              <template #button-content>
                <b-img v-if="authData.photoURL" width="32" height="32" rounded="circle" :src="authData.photoURL" alt="" class="mx-2"></b-img>
                <em>{{ authData.displayName || authData.email }}</em>
              </template>
              <b-dropdown-item href="/#/settings">Налаштування</b-dropdown-item>
              <b-dropdown-item @click="logout">Вихід</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-else right href="/#/login">Авторизація</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    
    <router-view class="page" />
    
    <section>
      <div class="bg-white border rounded-5">
        <section class="text-center">
          <footer class="bg-light text-center text-lg-start">
            <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
              © 2023 Copyright
            </div>
          </footer>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import auth from "@/mixin/auth";
import {getAuth} from "firebase/auth";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "App",
  mixins: [auth],
  async created() {
    await this.$store.dispatch('articles/loadArticles');
    console.log(this.getArticles);
  },
  computed: {
    ...mapActions('articles', ['loadArticles']),
    ...mapGetters('articles', ['getArticles']),
  },
  methods: {
    logout: function () {
      getAuth().signOut().then(() => {
        this.isAuth = false;
        this.authData = null;
        
        this.$router.push('/login');
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page {
  min-height: calc(100vh - 55px - 58px);
  justify-content: center;
  margin-top: 55px;
  padding: 15px;
}
</style>
<script setup>
</script>