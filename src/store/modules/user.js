import { getStorage, getBlob, uploadBytes, ref as sref } from "firebase/storage";

export default {
  namespaced: true,
  state: {

  },
  getters: {
    getPhoto: (state) => (uid) => {
      return `https://firebasestorage.googleapis.com/v0/b/prac-622aa.appspot.com/o/users%2F${uid}.jpg?alt=media`;
    }
  },
  mutations: {
    UPDATE_IMAGE(state, data) {

    }
  },
  actions: {
    async uploadImage({commit}, data) {
      const storage = sref(getStorage(), `users/${data.uid}.jpg`);
      await uploadBytes(storage, data.file);

      commit('UPDATE_IMAGE', data);
    }
  }
}