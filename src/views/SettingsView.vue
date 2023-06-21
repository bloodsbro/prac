<template>
  <div class="settings">
    <b-form-group
      label="Фото"
      label-for="article-edit-file"
      class="mb-0"
    >
      <b-form-file v-model="file" id="article-edit-file" accept="image/*"></b-form-file>
    </b-form-group>
    <b-form-group
      label="Відображуване ім'я"
      label-for="article-edit-name"
      class="mb-0"
    >
      <b-form-input v-model="displayName" id="article-edit-name" type="text"></b-form-input>
    </b-form-group>
    
    <b-btn @click="save">Зберігти</b-btn>
  </div>
</template>

<script>
import auth from "@/mixin/auth";
import { updateProfile, getAuth } from 'firebase/auth';

export default {
  name: "SettingsView",
  mixins: [auth],
  data() {
    return {
      file: null,
      displayName: ''
    }
  },
  mounted() {
    this.displayName = this.authData.displayName;
  },
  methods: {
    async save() {
      await this.$store.dispatch('user/uploadImage', {
        uid: this.authData.uid,
        file: this.file
      });
      
      await updateProfile(getAuth().currentUser, {
        displayName: this.displayName,
        photoURL: this.$store.getters["user/getPhoto"](this.authData.uid)
      });
      
      location.reload();
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
  max-width: 400px;
  display: inline-flex;
  flex-direction: column;
}
</style>