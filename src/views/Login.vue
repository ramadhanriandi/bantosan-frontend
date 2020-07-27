<template>
  <form class="border-wrapper w-50 p-5" @submit.prevent="handleLogin" method="post">
    <h1 class="title mb-2">{{ isAdmin ? 'Admin Login' : 'Welcome Back' }}</h1>
    <p class="subtitle mb-4">Fill in the form below to sign into your account</p>
    <div class="form-group">
      <input
        aria-describedby="usernameHelp"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.username }"
        name="username"
        placeholder="Username"
        type="text"
        v-model="user.username"
        required
      />
      <small
        class="form-text text-right"
        id="usernameHelp"
        v-if="errors && errors.username"
      >
        {{ errors.username }}
      </small>
    </div>
    <div class="form-group">
      <input
        aria-describedby="passwordHelp"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.password }"
        name="password"
        placeholder="Password"
        type="password"
        v-model="user.password"
        required
      />
      <small
        class="form-text text-right"
        id="passwordHelp"
        v-if="errors && errors.password"
      >
        {{ errors.password }}
      </small>
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
// import _ from 'lodash';
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
      this.$router.push('/profile');
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
            this.$router.push('/profile');
          },
          (error) => {
            this.loading = false;
            this.message = (error.response && error.response.data)
              || error.message
              || error.toString();
          },
        );
      }
    },
    // submitForm(e) {
    //   this.errors = {};

    //   if (this.username === 'existed_username') {
    //     this.errors.username = 'Username already exists';
    //   }
    //   if (this.password !== 'password') {
    //     this.errors.password = 'Wrong password';
    //   }

    //   if (_.isEmpty(this.errors) && this.username && this.password) {
    //     return true;
    //   }

    //   e.preventDefault();

    //   return false;
    // },
  },
};
</script>
