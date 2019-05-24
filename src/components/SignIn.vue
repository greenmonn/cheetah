<template>
  <div id="login">
    <h1>Login</h1>
    <v-form ref="loginform">
      <v-text-field type="text" name="username" v-model="input.username" label="Username" required></v-text-field>
      <v-text-field
        type="password"
        name="password"
        v-model="input.password"
        label="Password"
        required
      ></v-text-field>
      <p class="login-message" v-if="invalidInfo">Check your username and password again.</p>
      <v-btn color="brown darken-4 white--text" @click="login()">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
      invalidInfo: false,
    };
  },
  methods: {
    login() {
      if (this.$refs.loginform.validate()) {
        this.$Axios
          .post('http://127.0.0.1:3001/user/login', this.input)
          .then((res) => {
            console.log(res);
            if (res.data.authenticated) {
              const { user } = res.data;

              this.invalidInfo = false;
              this.$store.commit('logIn', user);
              this.$router.push('/');
            } else {
              this.invalidInfo = true;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}

button {
  margin-left: 0;
}

.login-message {
  color: red;
  margin-bottom: 5px;
}
</style>
