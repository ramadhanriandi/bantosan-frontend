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
        class="mb-4 mb-sm-4 mb-lg-0 col-12 col-sm-12 col-lg-4 d-flex"
        :class="{ 'offset-0 offset-sm-0 offset-lg-1': getUrl === 'user-list' }"
      >
        <img
          class="mr-4 user-detail-avatar"
          :src="require(`@/assets/img/${user.avatar ? user.avatar : 'big-avatar.png'}`)"
        />
        <label for="user-avatar" v-if="getUrl === 'profile'">
          <img class="user-profile-avatar-edit p-1" src="@/assets/img/edit-avatar.png" />
          <input type="file" class="user-profile-avatar-edit-button" id="user-avatar" />
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
          <div v-else-if="getUser.role === 'Admin'" class="user-detail-status text-green">
            Administrator
          </div>
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
            required
          />
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
          />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="user.phone"
            :readonly="getUrl === 'user-list'"
          />
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
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import utils from '@/assets/js/utils';

export default {
  computed: {
    getUrl() {
      return this.$route.path.split('/')[1];
    },
    ...mapGetters([
      'getUser',
    ]),
  },
  data() {
    return {
      user: {
        id: 'asfaslfaslfbasldas1',
        username: 'your_username',
        email: 'your_email@gmail.com',
        status: 'Rejected',
        fullname: 'Full name',
        phone: '231241241',
        avatar: 'big-avatar.png',
        updatedAt: '2020-09-14T01:00:00+01:00',
      },
      statuses: [
        { name: 'Verified', color: 'green' },
        { name: 'Pending', color: 'yellow' },
        { name: 'Rejected', color: 'red' },
        { name: 'Unverified', color: 'grey' },
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
    submitForm(e) {
      e.preventDefault();

      return false;
    },
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
