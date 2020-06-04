<template>
  <form class="border-wrapper w-50 p-5" @submit="submitForm" method="post">
    <h1 class="title mb-2">{{ isAdmin ? 'Admin Login' : 'Welcome Back' }}</h1>
    <p class="subtitle mb-4">Fill in the form below to sign into your account</p>
    <div class="form-group">
      <input
        type="text"
        v-model="username"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.username }"
        aria-describedby="usernameHelp"
        placeholder="Username"
        required
      />
      <small
        v-if="errors && errors.username"
        id="usernameHelp"
        class="form-text text-right"
      >
        {{ errors.username }}
      </small>
    </div>
    <div class="form-group">
      <input
        type="password"
        v-model="password"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.password }"
        name="password"
        aria-describedby="passwordHelp"
        placeholder="Password"
        required
      />
      <small
        v-if="errors && errors.password"
        id="passwordHelp"
        class="form-text text-right"
      >
        {{ errors.password }}
      </small>
    </div>
    <button class="btn my-2 w-100" type="submit">Login</button>
    <p v-if="!isAdmin" class="footer-note">
      Don't have an account ?
      <router-link class="footer-redirect" to="/register">Register here</router-link>
    </p>
  </form>
</template>

<script>
import _ from 'lodash';

export default {
  computed: {
    isAdmin() {
      return this.$route.path.split('/')[1] === 'admin';
    },
  },
  data: () => ({
    errors: {},
    username: null,
    password: null,
  }),
  methods: {
    submitForm(e) {
      this.errors = {};

      if (this.username === 'existed_username') {
        this.errors.username = 'Username already exists';
      }
      if (this.password.length !== 'password') {
        this.errors.password = 'Wrong password';
      }

      if (_.isEmpty(this.errors) && this.username && this.password) {
        return true;
      }

      e.preventDefault();

      return false;
    },
  },
};
</script>
