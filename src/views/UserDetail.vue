<template>
  <div class="w-100">
    <div class="row">
      <div
        v-if="getUrl === 'user-list'"
        class="col-12 col-sm-12 col-lg-1 mb-4 mb-sm-4 mb-lg-0 text-left"
      >
        <router-link to="/user-list"><img src="@/assets/img/back.png" /></router-link>
      </div>
      <div
        class="col-12 col-sm-12 col-lg-11 mb-4 "
        :class="{ 'mb-sm-4 mb-lg-0': getUrl === 'user-list' }"
      >
        <h2 class="title mb-2">{{ getUrl === 'user-list' ? 'User Detail' : 'User Profile' }}</h2>
        <p v-if="getUrl === 'user-list'" class="subtitle">
          Latest Update : {{ convertDate(user.updatedAt) }}
        </p>
      </div>
    </div>
    <form class="row text-left" @submit.prevent="updateUser" method="post">
      <div
        class="mb-4 mb-sm-4 mb-lg-0 col-12 col-sm-12 col-lg-4"
        :class="{ 'offset-0 offset-sm-0 offset-lg-1': getUrl === 'user-list' }"
      >
        <div class="d-flex" :class="{ 'mb-4': getUrl === 'profile' && !isAdmin}">
          <div class="mr-4 user-detail-avatar">
            <img
              :src="`http://localhost:5000/images/${user.avatar ? user.avatar : 'big-avatar.png'}`"
            />
          </div>
          <input
            type="hidden"
            class="form-control"
            v-model="user.avatar"
          />
          <label for="user-avatar" v-if="getUrl === 'profile'">
            <img class="user-profile-avatar-edit p-1" src="@/assets/img/edit-avatar.png" />
            <input
              type="file"
              class="user-profile-avatar-edit-button"
              id="user-avatar"
              ref="avatar"
              @change="sendAvatar"
            />
          </label>
          <div>
            <div class="user-detail-username mt-3 mb-1">{{ user.username }}</div>
            <div class="user-detail-email mb-2">{{ user.email }}</div>
            <div
              v-if="getUrl === 'user-list'"
              :class="`user-detail-status text-${getColor(user.status)}`"
            >
              {{ user.status }}
            </div>
            <div v-else-if="isAdmin" class="user-detail-status text-green">
              Administrator
            </div>
            <div
              v-else
              :class="`user-detail-status text-${getColor(user.status)}`"
            >
              {{ getText(user.status) }}
            </div>
          </div>
        </div>
        <div v-if="showVerificationButton">
          <label>Complete your identity to enable this button</label>
          <div
            :class="`btn btn-${isEnableButton ? 'green' : 'light-grey'} my-2 w-100`"
            :data-toggle="isEnableButton ? 'modal' : ''"
            data-target="#verification-modal"
            aria-describedby="verifyButtonHelp"
          >
            VERIFY HERE
          </div>
          <small
            v-if="this.user.status === 'Rejected'"
            id="verifyButtonHelp"
            class="form-text text-right"
          >
            Your last verification wasn’t valid, please re-verify your account
          </small>
        </div>
      </div>
      <div :class="`col-12 col-sm-12 col-lg-${getUrl === 'user-list' ? '3' : '4'}`">
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="user.username"
            :readonly="getUrl === 'user-list'"
            aria-describedby="usernameHelp"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="user.email"
            :readonly="getUrl === 'user-list'"
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
      </div>
      <div class="col-12 col-sm-12 col-lg-4 d-flex flex-column">
        <div class="form-group">
          <label>Fullname</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="user.fullname"
            :readonly="getUrl === 'user-list'"
            aria-describedby="fullnameHelp"
            placeholder="Fullname"
          />
          <small
            v-if="errors && errors.fullname"
            id="fullnameHelp"
            class="form-text text-right"
          >
            {{ errors.fullname }}
          </small>
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="user.phone"
            :readonly="getUrl === 'user-list'"
            aria-describedby="phoneHelp"
            placeholder="Phone"
          />
          <small
            v-if="errors && errors.phone"
            id="phoneHelp"
            class="form-text text-right"
          >
            {{ errors.phone }}
          </small>
        </div>
        <button
          v-if="getUrl === 'profile'"
          type="submit"
          class="btn btn-purple my-2 align-self-end"
        >
          Save Changes
        </button>
      </div>
    </form>

    <!-- Modal -->
    <div
      class="modal fade"
      id="verification-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <form class="text-left mt-3" @submit.prevent="updateUser" method="post">
              <h2 class="title mb-2">Verify Your Account</h2>
              <p class="subtitle">
                Upload a photo of yourself holding your identity card
                (KTP or SIM or Passport) next to your face.
              </p>
              <img
                class="mb-4 w-100"
                :src="`http://localhost:5000/images/${user.identity ? user.identity : 'selfie.png'}`"
              />
              <div class="form-group">
                <div class="custom-file">
                  <input
                    type="hidden"
                    class="form-control"
                    v-model="user.identity"
                  />
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                    ref="identity"
                    @change="sendIdentity"
                  >
                  <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
              </div>
              <button type="submit" class="btn btn-green my-2 w-100">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import utils from '@/assets/js/utils';
import Configs from '../constants/config';
import User from '../models/user';
import AuthService from '../services/auth.service';

export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    getUrl() {
      return this.$route.path.split('/')[1];
    },
    isEnableButton() {
      const {
        username, email, fullname, phone,
      } = this.user;

      return username && email && fullname && phone;
    },
    isAdmin() {
      return this.currentUser && this.currentUser.roles.includes('ROLE_ADMIN');
    },
    showVerificationButton() {
      return this.getUrl === 'profile' && !this.isAdmin
        && (this.user.status === 'Rejected' || this.user.status === 'Unverified');
    },
  },
  data: () => ({
    errors: {},
    user: new User(),
    statuses: [
      { name: 'Verified', color: 'green', text: 'Your account has been verified' },
      { name: 'Pending', color: 'yellow', text: 'Your verification is still waiting' },
      { name: 'Rejected', color: 'red', text: 'Your account hasn’t been verified' },
      { name: 'Unverified', color: 'grey', text: 'Your account hasn’t been verified' },
    ],
    message: '',

  }),
  methods: {
    convertDate(date) {
      return utils.convertDate(new Date(date));
    },
    getColor(status) {
      return _.get(_.find(this.statuses, { name: status }), 'color');
    },
    getText(status) {
      return _.get(_.find(this.statuses, { name: status }), 'text');
    },
    updateUser() {
      this.message = '';
      this.errors = {};

      const {
        id, email, fullname, phone, identity,
      } = this.user;

      if (!utils.validEmail(email)) {
        this.errors.email = 'Invalid email format';
      }
      if (fullname.length > 0 && !utils.validName(fullname)) {
        this.errors.fullname = 'No special character allowed';
      }
      if (phone.length > 0) {
        if (phone.length < 8 || phone.length > 12) {
          this.errors.phone = 'At least 8-12 digits and contains only numbers';
        } else if (!utils.isNumberOnly(phone)) {
          this.errors.phone = 'At least 8-12 digits and contains only numbers';
        }
      }

      if (!_.isNil(identity)) {
        this.user.status = 'Pending';
      }

      if (_.isEmpty(this.errors)) {
        AuthService.updateUser(id, this.user).then(
          () => {
            this.message = 'The user profile is updated';
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
    async sendAvatar() {
      this.message = '';

      const image = this.$refs.avatar.files[0];
      const formData = new FormData();
      formData.append('file', image);

      try {
        const response = await axios.post(`${Configs.STATIC_SERVER_URL}/upload`, formData);
        this.user.avatar = response.data.file;
        this.message = 'Image file uploaded';
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: this.message,
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (err) {
        this.message = 'Failed to upload image file';
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.message,
        });
      }
    },
    async sendIdentity() {
      this.message = '';

      const image = this.$refs.identity.files[0];
      const formData = new FormData();
      formData.append('file', image);

      try {
        const response = await axios.post(`${Configs.STATIC_SERVER_URL}/upload`, formData);
        this.user.identity = response.data.file;
        this.message = 'Image file uploaded';
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: this.message,
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (err) {
        this.message = 'Failed to upload image file';
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.message,
        });
      }
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

    const id = this.getUrl === 'user-list' ? this.$route.path.split('/')[2] : this.currentUser.id;
    AuthService.getUserById(id).then(
      (response) => {
        this.user = response.data.value;
      },
      (error) => {
        this.errorMessage = error.response.data.errorMessage
              || error.response.data.status;
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.errorMessage,
        });
      },
    );
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.user-detail-avatar {
  border-radius: 50%;
  display: inline-block;
  max-height: 105px;
  max-width: 105px;
  overflow: hidden;
  position: relative;
}

.user-detail-avatar img {
  height: 100%;
  width: auto;
}

.user-detail-email {
  color: $GREY;
  font-size: 14px;
}

.user-detail-status {
  font-size: 10px;
}

.user-detail-username {
  font-size: 18px;
}

.user-profile-avatar-edit, .user-detail-avatar-edit:hover {
  background: $PURPLE;
  border-radius: 100px;
  cursor: pointer;
}

.user-profile-avatar-edit, .user-profile-avatar-edit-button {
  height: 22px;
  position: absolute;
  top: 70px;
  left: 100px;
}

.user-profile-avatar-edit-button {
  display: none;
}
</style>
