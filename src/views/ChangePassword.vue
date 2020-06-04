<template>
  <form class="border-wrapper w-50 p-5" @submit="submitForm" method="post">
    <h1 class="title mb-2">Change Password</h1>
    <p class="subtitle mb-4">Fill in the form below to change your password</p>
    <div class="form-group">
      <input
        type="password"
        v-model="password"
        class="form-control p-3"
        :class="{ 'mb-4': !errors.password }"
        name="password"
        aria-describedby="passwordHelp"
        placeholder="Current password"
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
    <div class="form-group">
      <input
        type="password"
        v-model="newPassword"
        class="form-control p-3"
        name="newPassword"
        aria-describedby="newPasswordHelp"
        placeholder="New password (min. 6 characters)"
        required
      />
      <small
        v-if="errors && errors.newPassword"
        id="newPasswordHelp"
        class="form-text text-right"
      >
        {{ errors.newPassword }}
      </small>
      <password
        v-model="newPassword"
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
    <button class="btn my-2 w-100" type="submit">Save Changes</button>
  </form>
</template>

<script>
import _ from 'lodash';
import Password from 'vue-password-strength-meter';

export default {
  components: { Password },
  data: () => ({
    errors: {},
    password: null,
    newPassword: null,
    confirmPassword: null,
  }),
  methods: {
    submitForm(e) {
      this.errors = {};

      if (this.password !== 'password') {
        this.errors.password = 'Wrong password';
      }
      if (this.newPassword.length < 6) {
        this.errors.newPassword = 'Password must be at least 6 characters';
      }
      if (this.newPassword !== this.confirmPassword) {
        this.errors.confirmPassword = 'Password confirmation doesn\'t match';
      }

      if (_.isEmpty(this.errors) && this.password && this.newPassword) {
        return true;
      }

      e.preventDefault();

      return false;
    },
  },
};
</script>
