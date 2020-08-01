<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12 col-sm-12 col-lg-6">
        <h2 class="title mb-2">User List</h2>
        <p class="subtitle mb-4 mb-sm-4 mb-lg-0">
          List of users and their current status
        </p>
      </div>
      <div class="col-12 col-sm-12 col-lg-6 d-flex justify-content-end">
        <div
          v-for="data in statuses"
          :key="data.name"
          @click="setStatus(data.name)"
          :class="{ 'filter-active': status === data.name }"
          class="filter d-flex align-items-center ml-2 px-3"
        >
          {{ data.name }}
        </div>
      </div>
    </div>
    <div v-if="users.length > 0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Identity File</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="user in getUsers.data" :key="user.id">
            <tr>
              <td>{{ user.username }}</td>
              <td v-if="user.identity">
                <a
                  :href="`http://localhost:5000/images/${user.identity}`"
                  target="_blank"
                  class="btn-xs btn-grey py-2 px-3"
                >
                  View File
                </a>
              </td>
              <td v-else>-</td>
              <td>
                <div :class="`btn-xs btn-${getColor(user.status)} d-inline py-2 px-3`">
                  {{ user.status }}
                </div>
              </td>
              <td>
                <div
                  class="btn-xs btn-purple cursor-pointer d-inline p-2 mr-1"
                  @click="handleRedirect(user.id)"
                >
                  <img src="@/assets/img/view.png" />
                </div>
                <div
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="user.status === 'Pending' || user.status === 'Rejected' ?
                  'btn-green' : 'btn-light-grey'"
                  @click="(user.status === 'Pending' || user.status === 'Rejected')
                    && updateUser(user, 'Verified')"
                >
                  <img src="@/assets/img/verify.png" />
                </div>
                <div
                  class="btn-xs cursor-pointer d-inline p-2"
                  :class="user.status === 'Verified' || user.status === 'Pending' ?
                  'btn-red' : 'btn-light-grey'"
                  @click="(user.status === 'Verified' || user.status === 'Pending')
                    && updateUser(user, 'Rejected')"
                >
                  <img src="@/assets/img/unverify.png" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <div class="text-left">
            Showing {{ getUsers.data.length }}
            / {{ getUsers.count }} result{{ getUsers.count > 1 ? 's' : '' }}
          </div>
          <v-pagination v-model="page" :page-count="getMaxPage"></v-pagination>
        </div>
      </div>
    </div>
    <div v-else class="empty-note">No user</div>
  </div>
</template>

<script>
import _ from 'lodash';
import vPagination from 'vue-plain-pagination';
import AuthService from '../services/auth.service';

export default {
  components: { vPagination },
  computed: {
    getUsers() {
      const filteredUsers = this.status === 'All User'
        ? this.users : _.filter(this.users, user => user.status === this.status);
      const firstBound = this.limit * (this.page - 1);
      const lastBound = firstBound + this.limit;

      return {
        count: filteredUsers.length,
        data: filteredUsers.slice(firstBound, lastBound),
      };
    },
    getMaxPage() {
      return Math.ceil(this.getUsers.count / this.limit);
    },
  },
  data: () => ({
    users: [],
    statuses: [
      { name: 'All User', color: 'grey' },
      { name: 'Verified', color: 'green' },
      { name: 'Pending', color: 'yellow' },
      { name: 'Rejected', color: 'red' },
      { name: 'Unverified', color: 'light-grey' },
    ],
    limit: 10,
    page: 1,
    status: 'All User',
    message: '',
  }),
  methods: {
    getColor(status) {
      return _.get(_.find(this.statuses, { name: status }), 'color');
    },
    handleRedirect(userId) {
      this.$router.push(`/user-list/${userId}`);
    },
    setStatus(status) {
      this.status = status;
    },
    updateUser(user, status) {
      const updatedUser = {
        ...user,
        status: status || user.status,
      };

      AuthService.updateUser(updatedUser.id, updatedUser).then(
        () => {
          this.message = status === 'Verified'
            ? 'The user is verified'
            : 'The user is rejected';
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
    },
  },
  mounted() {
    AuthService.getAllUsers().then(
      (response) => {
        this.users = response.data.content;
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
