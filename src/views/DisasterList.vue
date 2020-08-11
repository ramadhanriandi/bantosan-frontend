<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12 col-sm-12 col-lg-6">
        <h2 class="title mb-2">Current Disasters in Indonesia</h2>
        <p v-if="disasters.length > 0" class="subtitle mb-4 mb-sm-4 mb-lg-0">
          Latest Update : {{ getLatestUpdate }}
        </p>
      </div>
      <div class="col-12 col-sm-12 col-lg-6">
        <div class="row px-3">
          <div class="col form-group mb-0 p-0">
            <input
              type="text"
              class="form-control p-3"
              placeholder="Search"
              v-model="searchName"
            />
          </div>
          <router-link
            class="ml-3 d-flex align-items-center"
            :to="loggedIn ? '/reported-disasters/create' : '/login'"
            v-if="!isAdmin"
          >
            <button class="btn btn-red-reverse col px-3">Create a disaster report</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="disasters.length > 0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Reported Date</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody v-for="disaster in getDisasters.data" :key="disaster.id">
            <tr>
              <td>{{ getReportedDate(disaster.createdAt) }}</td>
              <td>{{ disaster.name }}</td>
              <td>{{ disaster.location.name }}</td>
              <td>{{ disaster.category }}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <div class="text-left">
            Showing {{ getDisasters.data.length }}
            / {{ getDisasters.count }} result{{ getDisasters.count > 1 ? 's' : '' }}
          </div>
          <v-pagination v-model="page" :page-count="getMaxPage"></v-pagination>
        </div>
      </div>
    </div>
    <div v-else class="empty-note">No current disaster</div>
  </div>
</template>

<script>
import _ from 'lodash';
import vPagination from 'vue-plain-pagination';
import utils from '@/assets/js/utils';
import DisasterService from '../services/disaster.service';

export default {
  components: { vPagination },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    getDisasters() {
      const filteredDisasters = this.searchName === ''
        ? this.disasters
        : _.filter(this.disasters, (disaster) => {
          const result = disaster.name.match(new RegExp(this.searchName, 'i'));

          return result && result.length > 0;
        });
      const firstBound = this.limit * (this.page - 1);
      const lastBound = firstBound + this.limit;

      return {
        count: filteredDisasters.length,
        data: filteredDisasters.slice(firstBound, lastBound),
      };
    },
    getLatestUpdate() {
      const latest = new Date(Math.max.apply(null, this.disasters.map(e => new Date(e.updatedAt))));

      return utils.convertDate(latest);
    },
    getMaxPage() {
      return Math.ceil(this.getDisasters.count / this.limit);
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      return this.currentUser && this.currentUser.roles.includes('ROLE_ADMIN');
    },
  },
  data: () => ({
    disasters: [],
    limit: 10,
    searchName: '',
    page: 1,
    message: '',
  }),
  methods: {
    getReportedDate(date) {
      return utils.convertDate(new Date(date));
    },
  },
  mounted() {
    DisasterService.getAllDisasters({ display: 'Show' }).then(
      (response) => {
        this.disasters = _.filter(response.data.content, ['status', 'Verified']);
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
};
</script>
