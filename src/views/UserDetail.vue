<template>
  <div class="w-100">
    <div class="row">
      <div class="col-12 col-sm-12 col-lg-1 mb-4 mb-sm-4 mb-lg-0 text-left">
        <router-link to="/user-list"><img src="@/assets/img/back.png" /></router-link>
      </div>
      <div class="col-12 col-sm-12 col-lg-11 mb-4 mb-sm-4 mb-lg-0">
        <h2 class="title mb-2">User Detail</h2>
        <p class="subtitle">Latest Update : {{ convertDate(user.updatedAt) }}</p>
      </div>
    </div>
    <div class="row text-left">
      <div class="mb-4 mb-sm-4 mb-lg-0 offset-0 offset-sm-0
        offset-lg-1 col-12 col-sm-12 col-lg-4 d-flex">
        <img
          class="mr-4 user-detail-avatar"
          :src="require(`@/assets/img/${user.avatar ? user.avatar : 'big-avatar.png'}`)"
        />
        <div>
          <div class="user-detail-username mt-3 mb-1">{{ user.username }}</div>
          <div class="user-detail-email mb-2">{{ user.email }}</div>
          <div :class="`user-detail-status text-${getColor(user.status)}`">{{ user.status }}</div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-3">
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            :value="user.username"
            class="form-control p-3"
            :readonly="getUrl === 'user-list'"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="text"
            :value="user.email"
            class="form-control p-3"
            :readonly="getUrl === 'user-list'"
          />
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-4">
        <div class="form-group">
          <label>Fullname</label>
          <input
            type="text"
            :value="user.fullname"
            class="form-control p-3"
            :readonly="getUrl === 'user-list'"
          />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input
            type="text"
            :value="user.phone"
            class="form-control p-3"
            :readonly="getUrl === 'user-list'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import utils from '@/assets/js/utils';

export default {
  computed: {
    getUrl() {
      return this.$route.path.split('/')[1];
    },
  },
  data() {
    return {
      user: {
        id: 'asfaslfaslfbasldas1',
        username: 'your_username',
        email: 'your_email@gmail.com',
        status: 'Verified',
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
</style>
