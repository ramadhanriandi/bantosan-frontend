<template>
  <form class="border-wrapper w-50 p-5" @submit="submitForm" method="post">
    <h1 class="title mb-2">Let's Get Started</h1>
    <p class="subtitle mb-4">Fill in the form below to register your account</p>
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
        type="email"
        v-model="email"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.email }"
        aria-describedby="emailHelp"
        placeholder="Email"
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
        type="password"
        v-model="password"
        class="form-control p-3"
        name="password"
        aria-describedby="passwordHelp"
        placeholder="Password (min. 6 characters)"
        required
      />
      <small
        v-if="errors && errors.password"
        id="passwordHelp"
        class="form-text text-right"
      >
        {{ errors.password }}
      </small>
      <password
        v-model="password"
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
    <button class="btn my-2 w-100" type="submit">Sign up</button>
    <p class="footer-note">
      Already have an account ?
      <router-link class="footer-redirect" to="/login">Login here</router-link>
    </p>
  </form>
</template>

<script>
import _ from 'lodash';
import Password from 'vue-password-strength-meter';
import validEmail from '@/assets/js/utils';

export default {
  components: { Password },
  data: () => ({
    errors: {},
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  }),
  methods: {
    submitForm(e) {
      this.errors = {};

      if (this.username === 'existed_username') {
        this.errors.username = 'Username already exists';
      }
      if (!validEmail(this.email)) {
        this.errors.email = 'Invalid email format';
      }
      if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters';
      }
      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Password confirmation doesn\'t match';
      }

      if (_.isEmpty(this.errors) && this.username && this.age && this.password) {
        return true;
      }

      e.preventDefault();

      return false;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.border-wrapper {
  border-radius: 14px;
}

.border-wrapper, .form-control {
  border: 1px solid $LIGHT_GREY;
}

.btn {
  background: $PURPLE;
  color: $WHITE;
  font-size: 12px;
  font-weight: 500;
}

.btn, .form-control {
  height: 41px;
}

.footer-note, .subtitle {
  color: $GREY;
}

.footer-redirect {
  color: $PURPLE;
  font-weight: 500;
}

.footer-redirect:hover {
  text-decoration: none;
}

.form-control {
  font-size: 12px;
}

.form-control::placeholder {
  color: $LIGHT_GREY;
  font-size: 12px;
}

.form-text {
  color: $RED;
}

.strength-meter {
  margin: 0 0;
}

.subtitle {
  font-size: 10px;
}

.subtitle, .title {
  text-align: left;
}

.title {
  font-size: 24px;
  font-weight: 500;
}
</style>
