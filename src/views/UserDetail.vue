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
    <form class="row text-left" @submit="submitForm" method="post">
      <div
        class="mb-4 mb-sm-4 mb-lg-0 col-12 col-sm-12 col-lg-4"
        :class="{ 'offset-0 offset-sm-0 offset-lg-1': getUrl === 'user-list' }"
      >
        <div class="d-flex" :class="{ 'mb-4': getUrl === 'profile' && getUser.role === 'User'}">
          <img
            class="mr-4 user-detail-avatar"
            :src="require(`@/assets/img/${user.avatar ? user.avatar : 'big-avatar.png'}`)"
          />
          <label for="user-avatar" v-if="getUrl === 'profile'">
            <img class="user-profile-avatar-edit p-1" src="@/assets/img/edit-avatar.png" />
            <input type="file" class="user-profile-avatar-edit-button" id="user-avatar" />
          </label>
          <div>
            <div class="user-detail-username mt-3 mb-1">{{ currentUser.username }}</div>
            <div class="user-detail-email mb-2">{{ user.email }}</div>
            <div
              v-if="getUrl === 'user-list'"
              :class="`user-detail-status text-${getColor(user.status)}`"
            >
              {{ user.status }}
            </div>
            <div v-else-if="getUser.role === 'Admin'" class="user-detail-status text-green">
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
          <small
            v-if="errors && errors.username"
            id="usernameHelp"
            class="form-text text-right"
          >
            {{ errors.username }}
          </small>
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
            <form class="text-left mt-3" @submit="submitModalForm" method="post">
              <h2 class="title mb-2">Verify Your Account</h2>
              <p class="subtitle">
                Upload a photo of yourself holding your identity card
                (KTP or SIM or Passport) next to your face.
              </p>
              <img class="mb-4 w-100" src="@/assets/img/selfie.png" />
              <div class="form-group">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile">
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
import _ from 'lodash';
import { mapGetters } from 'vuex';
import utils from '@/assets/js/utils';

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
    showVerificationButton() {
      return this.getUrl === 'profile' && this.getUser.role === 'User'
        && (this.user.status === 'Rejected' || this.user.status === 'Unverified');
    },
    ...mapGetters([
      'getUser',
    ]),
  },
  data() {
    return {
      errors: {},
      user: {
        id: 'asfaslfaslfbasldas1',
        username: 'your_username',
        email: 'your_email@gmail.com',
        status: 'Unverified',
        fullname: 'Full name',
        phone: '231241241',
        avatar: 'big-avatar.png',
        updatedAt: '2020-09-14T01:00:00+01:00',
      },
      statuses: [
        { name: 'Verified', color: 'green', text: 'Your account has been verified' },
        { name: 'Pending', color: 'yellow', text: 'Your verification is still waiting' },
        { name: 'Rejected', color: 'red', text: 'Your account hasn’t been verified' },
        { name: 'Unverified', color: 'grey', text: 'Your account hasn’t been verified' },
      ],
    };
  },
  methods: {
    convertDate(date) {
      return utils.convertDate(new Date(date));
    },
    getColor(status) {
      return _.find(this.statuses, { name: status }).color;
    },
    getText(status) {
      return _.find(this.statuses, { name: status }).text;
    },
    submitForm(e) {
      const {
        username, email, fullname, phone,
      } = this.user;

      this.errors = {};

      if (username === 'existed_username') {
        this.errors.username = 'Username already exists';
      }
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

      if (_.isEmpty(this.errors) && username && email) {
        return true;
      }

      e.preventDefault();

      return false;
    },
    submitModalForm(e) {
      e.preventDefault();

      return false;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.user-detail-avatar {
  max-height: 105px;
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
