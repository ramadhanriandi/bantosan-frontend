<template>
  <form class="border-wrapper w-50 p-5" @submit.prevent="updateUser" method="post">
    <h1 class="title mb-2">Change Password</h1>
    <p class="subtitle mb-4">Fill in the form below to change your password</p>
    <div class="form-group">
      <input
        type="password"
        v-model="password"
        class="form-control p-3 mb-4"
        placeholder="Current password"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        v-model="newPassword"
        class="form-control p-3"
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
    <button class="btn btn-purple my-2 w-100" type="submit">Save Changes</button>
  </form>
</template>

<script>
import _ from 'lodash';
import Password from 'vue-password-strength-meter';
import AuthService from '../services/auth.service';

export default {
  name: 'ChangePassword',
  components: { Password },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data: () => ({
    errors: {},
    password: null,
    newPassword: null,
    confirmPassword: null,
    message: '',
  }),
  methods: {
    updateUser() {
      this.message = '';
      this.errors = {};

      if (this.newPassword.length < 6) {
        this.errors.newPassword = 'Password must be at least 6 characters';
      }
      if (this.newPassword !== this.confirmPassword) {
        this.errors.confirmPassword = 'Password confirmation doesn\'t match';
      }

      if (_.isEmpty(this.errors)) {
        AuthService.updateUser(this.currentUser.id, { password: this.newPassword }).then(
          () => {
            this.message = 'The password is updated';
            this.$swal({
              icon: 'success',
              title: 'Success',
              text: this.message,
              timer: 2000,
              timerProgressBar: true,
              onClose: () => {
                this.$router.go();
              },
            });
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
