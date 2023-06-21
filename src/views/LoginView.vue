<template>
  <div class="login">
    <h3>Авторизація</h3>

      <b-alert show v-if="error" variant="danger">{{ error }}</b-alert>
      
      <b-form-group
        label="EMail"
        label-for="login-email"
        class="mb-0"
      >
        <b-form-input v-model="email" id="login-email" placeholder="Введіть EMail"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Пароль"
        label-for="login-password"
        class="mb-0"
      >
        <b-form-input v-model="password" id="login-password" type="password" placeholder="Введіть пароль"></b-form-input>
      </b-form-group>

      <b-button class="w-100" @click="login">Вхід</b-button>

      <span>У вас немає облікового запису? Ви можете <router-link to="/sign-up">створити його</router-link>.</span>
  </div>
</template>

<script>
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default {
  name: 'loginView',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login: function () {
      signInWithEmailAndPassword(getAuth(), this.email, this.password).then(
        (user) => {
          this.$router.replace('/')
          location.reload();
        },
        (err) => {
          this.error = err.message;
        }
      );
    }
  }
}
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
.login {
    width: 20%;
    flex-direction: column;
    display: inline-flex;
}

input {
    margin: 10px 0;
    padding: 15px;
}

button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>