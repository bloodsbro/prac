import {getAuth} from "firebase/auth";

export default {
  data() {
    return {
      isAuth: false,
    }
  },
  mounted() {
    this.isAuth = !!this.authData;
  },
  computed: {
    authData() {
      console.log(getAuth().currentUser)
      return getAuth().currentUser;
    }
  }
}