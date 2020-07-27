<template>
  <form class="border-wrapper w-50 p-5" @submit.prevent="handleRegister" method="post">
    <h1 class="title mb-2">Let's Get Started</h1>
    <p class="subtitle mb-4">Fill in the form below to register your account</p>
    <div class="form-group">
      <input
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
        aria-describedby="emailHelp"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.email }"
        name="email"
        placeholder="Email"
        type="email"
        v-model="user.email"
        required
      />
      <small
        v-if="errors && errors.email"
        id="emailHelp"
        class="form-text text-right"
      >
        {{ errors.email }}
      </small>
    </div>
    <div class="form-group">
      <input
        aria-describedby="passwordHelp"
        class="form-control p-3"
        name="password"
        placeholder="Password (min. 6 characters)"
        type="password"
        required
        v-model="user.password"
      />
      <small
        v-if="errors && errors.password"
        id="passwordHelp"
        class="form-text text-right"
      >
        {{ errors.password }}
      </small>
      <password
        v-model="user.password"
        :secure-length="6"
        :strength-meter-only="true"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        v-model="confirmPassword"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.confirmPassword }"
        name="confirmPassword"
        aria-describedby="confirmPasswordHelp"
        placeholder="Re-type your password"
        required
      />
      <small
        v-if="errors && errors.confirmPassword"
        id="confirmPasswordHelp"
        class="form-text text-right"
      >
        {{ errors.confirmPassword }}
      </small>
    </div>
    <button class="btn btn-purple my-2 w-100" type="submit">Sign up</button>
    <p class="footer-note">
      Already have an account ?
      <router-link class="footer-redirect" to="/login">Login here</router-link>
    </p>
  </form>
</template>

<script>
import _ from 'lodash';
import Password from 'vue-password-strength-meter';
import utils from '@/assets/js/utils';
import User from '../models/user';

export default {
  name: 'Register',
  components: { Password },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  data: () => ({
    user: new User('', '', ''),
    message: '',
    confirmPassword: '',
    errors: {},
  }),
  mounted() {
    if (this.loggedIn) {
      this.$router.go('/');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.errors = {};

      if (this.user.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Password confirmation doesn\'t match';
      }
      if (!utils.validEmail(this.user.email)) {
        this.errors.email = 'Invalid email format';
      }
      if (this.user.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters';
      }

      if (_.isEmpty(this.errors)) {
        this.$store.dispatch('auth/register', this.user).then(
          () => {
            this.message = 'User registration is success';
            this.$swal({
              icon: 'success',
              title: 'Success',
              text: this.message,
              timer: 2000,
              timerProgressBar: true,
              onClose: () => {
                this.$router.go('/login');
              },
            });
          },
          (error) => {
            this.message = error.response.data.errorMessage;
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

<style scoped lang="scss">
.strength-meter {
  margin: 0 0;
}
</style>
