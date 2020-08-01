<template>
  <form class="border-wrapper w-50 p-5" @submit.prevent="handleLogin" method="post">
    <h1 class="title mb-2">{{ isAdmin ? 'Admin Login' : 'Welcome Back' }}</h1>
    <p class="subtitle mb-4">Fill in the form below to sign into your account</p>
    <div class="form-group">
      <input
        aria-describedby="usernameHelp"
        class="form-control mb-4 p-3"
        name="username"
        placeholder="Username"
        type="text"
        v-model="user.username"
        required
      />
    </div>
    <div class="form-group">
      <input
        aria-describedby="passwordHelp"
        class="form-control mb-4 p-3"
        name="password"
        placeholder="Password"
        type="password"
        v-model="user.password"
        required
      />
    </div>
    <button class="btn btn-purple my-2 w-100" type="submit" :disabled="loading">
      <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>
      <span>Login</span>
    </button>
    <p v-if="!isAdmin" class="footer-note">
      Don't have an account ?
      <router-link class="footer-redirect" to="/register">Register here</router-link>
    </p>
  </form>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  computed: {
    isAdmin() {
      return this.$route.path.split('/')[1] === 'admin';
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  data: () => ({
    errors: {},
    user: new User('', ''),
    loading: false,
    message: '',
  }),
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.loading = false;
            this.$router.go('/');
          },
          (error) => {
            this.message = error.response.data.errorMessage
              || error.response.data.status;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: this.message,
            });
          },
        );
      }
    },
  },
};
</script>
