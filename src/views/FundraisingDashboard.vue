<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12 col-sm-12 col-lg-6">
        <h2 class="title mb-2">
          {{ isAdmin ? 'Fundraising List' : 'Your Fundraising' }}
        </h2>
        <p class="subtitle mb-4 mb-sm-4 mb-lg-0">
          List of fundraisings and their current report
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
            to="/fundraising-list/create"
          >
            <button class="btn btn-purple col px-3">Create a fundraising</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="fundraisings && fundraisings.length > 0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col" v-if="!isAdmin">Donation</th>
              <th scope="col">Target</th>
              <th scope="col">Total Days</th>
              <th scope="col">End Date</th>
              <th scope="col" v-if="isAdmin">Username</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="fundraising in getFundraisings.data" :key="fundraising.id">
            <tr>
              <td>{{ cutString(fundraising.title) }}</td>
              <td v-if="!isAdmin">
                IDR {{ fundraising.totalDonation ?
                convertCurrency(fundraising.totalDonation) : '0' }}
              </td>
              <td>IDR {{ convertCurrency(fundraising.target) }}</td>
              <td>{{ fundraising.day }}</td>
              <td>{{ fundraising.endDate ? convertDate(fundraising.endDate) : '-' }}</td>
              <td v-if="isAdmin">
                {{ fundraising.organizer.username }}
              </td>
              <td>
                <div
                  :class="`btn-xs btn-${getColor(convertStatus(fundraising))} d-inline py-2 px-3`"
                >
                  {{ convertStatus(fundraising) }}
                </div>
              </td>
              <td>
                <div
                  class="btn-xs btn-purple cursor-pointer d-inline p-2 mr-1"
                  @click="handleRedirect('view', fundraising)"
                >
                  <img src="@/assets/img/view.png" />
                </div>
                <div
                  v-if="!isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="fundraising.status === 'Pending' ? 'btn-purple' : 'btn-light-grey'"
                  @click="handleRedirect('edit', fundraising)"
                >
                  <img src="@/assets/img/edit.png" />
                </div>
                <div
                  v-if="!isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2"
                  :class="fundraising.status === 'Ongoing' ? 'btn-light-grey' : 'btn-purple'"
                  @click="deleteFundraising(fundraising.id)"
                >
                  <img src="@/assets/img/delete.png" />
                </div>
                <div
                  v-if="isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="fundraising.status === 'Ongoing' ? 'btn-light-grey' : 'btn-green'"
                >
                  <img src="@/assets/img/verify.png" />
                </div>
                <div
                  v-if="isAdmin"
                  class="btn-xs cursor-pointer d-inline p-2"
                  :class="fundraising.status === 'Pending' ? 'btn-red' : 'btn-light-grey'"
                >
                  <img src="@/assets/img/unverify.png" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <div class="text-left">
            Showing {{ getFundraisings.data ? getFundraisings.data.length : '0' }}
            / {{ getFundraisings.count }} result{{ getFundraisings.count > 1 ? 's' : '' }}
          </div>
          <v-pagination v-model="page" :page-count="getMaxPage"></v-pagination>
        </div>
      </div>
    </div>
    <div v-else class="empty-note">Empty fundraising</div>
  </div>
</template>

<script>
import _ from 'lodash';
import vPagination from 'vue-plain-pagination';
import utils from '@/assets/js/utils';
import FundraisingService from '../services/fundraising.service';

export default {
  components: { vPagination },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    getFundraisings() {
      const filteredFundraisings = this.status === 'All Fundraising'
        ? this.fundraisings : _.filter(this.fundraisings,
          (fundraising) => {
            let convertedStatus = fundraising.status;

            if (convertedStatus === 'Ongoing' && new Date(fundraising.endDate) <= new Date()) {
              convertedStatus = 'Done';
            }

            return convertedStatus === this.status;
          });
      const firstBound = this.limit * (this.page - 1);
      const lastBound = firstBound + this.limit;

      return {
        count: filteredFundraisings ? filteredFundraisings.length : 0,
        data: filteredFundraisings.slice(firstBound, lastBound),
      };
    },
    getMaxPage() {
      return Math.ceil(this.getFundraisings.count / this.limit);
    },
    isAdmin() {
      return this.currentUser && this.currentUser.roles.includes('ROLE_ADMIN');
    },
  },
  data: () => ({
    fundraisings: [],
    statuses: [
      { name: 'All Fundraising', color: 'grey' },
      { name: 'Ongoing', color: 'green' },
      { name: 'Pending', color: 'yellow' },
      { name: 'Rejected', color: 'red' },
      { name: 'Done', color: 'light-grey' },
    ],
    limit: 10,
    page: 1,
    status: 'All Fundraising',
    message: '',
  }),
  methods: {
    convertCurrency(nominal) {
      return utils.convertCurrency(nominal);
    },
    convertDate(date) {
      return utils.convertDate(new Date(date));
    },
    convertStatus(fundraising) {
      if (fundraising.status === 'Ongoing') {
        return new Date(fundraising.endDate) > new Date() ? 'Ongoing' : 'Done';
      }
      return fundraising.status;
    },
    cutString(string) {
      return utils.cutString(string, 50);
    },
    getColor(status) {
      return _.find(this.statuses, { name: status }).color;
    },
    handleRedirect(method, fundraising) {
      if (method === 'view') {
        this.$router.push(`/fundraising-list/${fundraising.id}`);
      } else if (method === 'edit' && fundraising.status === 'Pending') {
        this.$router.push(`/fundraising-list/${fundraising.id}/edit`);
      }
    },
    setStatus(status) {
      this.status = status;
    },
    deleteFundraising(id) {
      FundraisingService.deleteFundraising(id).then(
        () => {
          this.message = 'The fundraising is deleted';
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
    FundraisingService.getAllFundraisings({ userId: this.currentUser.id }).then(
      (response) => {
        this.fundraisings = response.data.content;
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
