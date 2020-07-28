<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12 col-sm-12 col-lg-6">
        <h2 class="title mb-2">Reported Disaster</h2>
        <p class="subtitle mb-4 mb-sm-4 mb-lg-0">
          List of reported disasters and their current status
        </p>
      </div>
      <div
        class="col-12 col-sm-12 col-lg-6 d-flex justify-content-end"
        v-if="isAdmin"
      >
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
      <div
        class="col-12 col-sm-12 col-lg-6"
        v-else-if="!isAdmin"
      >
        <div class="row px-3 d-flex justify-content-end">
          <router-link
            class="ml-3 d-flex align-items-center"
            to="/reported-disasters/create"
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
              <th scope="col" v-if="isAdmin">Username</th>
              <th scope="col" v-if="isAdmin">Display</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="disaster in getDisasters.data" :key="disaster.id">
            <tr>
              <td>{{ getReportedDate(disaster.createdAt) }}</td>
              <td>{{ disaster.name }}</td>
              <td>{{ disaster.location.name }}</td>
              <td>{{ disaster.category }}</td>
              <td v-if="isAdmin">{{ disaster.createdBy.username }}</td>
              <td v-if="isAdmin">
                <div
                  v-if="disaster.status === 'Verified'"
                  class="btn-xs d-inline p-2 mr-1"
                  :class="`btn-${getDisplayColor(disaster.display, 'Show')}-reverse
                  btn-${getDisplayColor(disaster.display, 'Show')}-outline`"
                >
                  Show
                </div>
                <div
                  v-if="disaster.status === 'Verified'"
                  class="btn-xs d-inline p-2"
                  :class="`btn-${getDisplayColor(disaster.display, 'Hidden')}-reverse
                  btn-${getDisplayColor(disaster.display, 'Hidden')}-outline`"
                >
                  Hidden
                </div>
                <div v-if="disaster.status !== 'Verified'">-</div>
              </td>
              <td>
                <div :class="`btn-xs btn-${getColor(disaster.status)} d-inline py-2 px-3`">
                  {{ disaster.status }}
                </div>
              </td>
              <td>
                <div
                  class="btn-xs btn-purple cursor-pointer d-inline p-2 mr-1"
                  @click="handleRedirect('view', disaster)"
                >
                  <img src="@/assets/img/view.png" />
                </div>
                <div
                  v-if="!isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="disaster.status === 'Pending' ? 'btn-purple' : 'btn-light-grey'"
                  @click="handleRedirect('edit', disaster)"
                >
                  <img src="@/assets/img/edit.png" />
                </div>
                <div
                  v-if="!isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2"
                  :class="disaster.status === 'Verified' ? 'btn-light-grey' : 'btn-purple'"
                  @click="deleteDisaster(disaster.id)"
                >
                  <img src="@/assets/img/delete.png" />
                </div>
                <div
                  v-if="isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="disaster.status === 'Verified' ? 'btn-light-grey' : 'btn-green'"
                >
                  <img src="@/assets/img/verify.png" />
                </div>
                <div
                  v-if="isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2"
                  :class="disaster.status === 'Rejected' ? 'btn-light-grey' : 'btn-red'"
                >
                  <img src="@/assets/img/unverify.png" />
                </div>
              </td>
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
    <div v-else class="empty-note">Empty report</div>
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
      const filteredDisasters = this.status === 'All Report'
        ? this.disasters
        : _.filter(this.disasters, disaster => disaster.status === this.status);
      const firstBound = this.limit * (this.page - 1);
      const lastBound = firstBound + this.limit;

      return {
        count: filteredDisasters.length,
        data: filteredDisasters.slice(firstBound, lastBound),
      };
    },
    getMaxPage() {
      return Math.ceil(this.getDisasters.count / this.limit);
    },
    isAdmin() {
      return this.currentUser && this.currentUser.roles.includes('ROLE_ADMIN');
    },
  },
  data: () => ({
    disasters: [],
    statuses: [
      { name: 'All Report', color: 'grey' },
      { name: 'Verified', color: 'green' },
      { name: 'Pending', color: 'yellow' },
      { name: 'Rejected', color: 'red' },
    ],
    limit: 10,
    message: '',
    page: 1,
    status: 'All Report',
  }),
  methods: {
    getColor(status) {
      return _.find(this.statuses, { name: status }).color;
    },
    getDisplayColor(disasterDisplay, display) {
      return disasterDisplay === display ? 'purple' : 'grey';
    },
    getReportedDate(date) {
      return utils.convertDate(new Date(date));
    },
    handleRedirect(method, disaster) {
      if (method === 'view') {
        this.$router.push(`/reported-disasters/${disaster.id}`);
      } else if (method === 'edit' && disaster.status === 'Pending') {
        this.$router.push(`/reported-disasters/${disaster.id}/edit`);
      }
    },
    setStatus(status) {
      this.status = status;
    },
    deleteDisaster(id) {
      DisasterService.deleteDisaster(id).then(
        () => {
          this.message = 'The disaster report is deleted';
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
    DisasterService.getAllDisasters({ userId: this.currentUser.id }).then(
      (response) => {
        this.disasters = response.data.content;
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
