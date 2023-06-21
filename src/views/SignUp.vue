<template>
  <div class="sign-up">
    <h3>Давайте створимо новий обліковий запис!</h3>
    
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

    <b-button class="w-100" @click="signUp">Зареєструватися</b-button>
    
    <span>або поверніться до <router-link to="/login">входу</router-link>.</span>
  </div>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import auth from "@/mixin/auth";

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  mixins: [auth],
  methods: {
    signUp: function () {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password).then(
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

<style scoped>
.sign-up {
    width: 20%;
    flex-direction: column;
    display: inline-flex;
}

input {
    margin: 10px 0;
    padding: 15px;
}

button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>