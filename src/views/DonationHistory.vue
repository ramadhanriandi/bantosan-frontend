<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12">
        <h2 class="title mb-2">Donation History</h2>
        <p class="subtitle mb-4 mb-sm-4 mb-lg-0">
          List of your donations and their current status
        </p>
      </div>
    </div>
    <div v-if="donations.length > 0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Title</th>
              <th scope="col">Donation</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody v-for="donation in getDonations.data" :key="donation.id">
            <tr>
              <td>{{ convertDate(donation.createdAt) }}</td>
              <td>{{ cutString(donation.fundraising.title) }}</td>
              <td>IDR {{ convertCurrency(donation.nominal) }}</td>
              <td>
                <div :class="`btn-xs btn-${getColor(donation.status)} d-inline py-2 px-3`">
                  {{ donation.status }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <div class="text-left">
            Showing {{ getDonations.data.length }}
            / {{ getDonations.count }} result{{ getDonations.count > 1 ? 's' : '' }}
          </div>
          <v-pagination v-model="page" :page-count="getMaxPage"></v-pagination>
        </div>
      </div>
    </div>
    <div v-else class="empty-note">Empty donation history</div>
  </div>
</template>

<script>
import _ from 'lodash';
import vPagination from 'vue-plain-pagination';
import utils from '@/assets/js/utils';
import DonationService from '../services/donation.service';

export default {
  components: { vPagination },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    getDonations() {
      const firstBound = this.limit * (this.page - 1);
      const lastBound = firstBound + this.limit;

      return {
        count: this.donations.length,
        data: this.donations.slice(firstBound, lastBound),
      };
    },
    getMaxPage() {
      return Math.ceil(this.getDonations.count / this.limit);
    },
  },
  data: () => ({
    donations: [],
    statuses: [
      { name: 'Verified', color: 'green' },
      { name: 'Pending', color: 'yellow' },
      { name: 'Rejected', color: 'red' },
    ],
    limit: 10,
    page: 1,
  }),
  methods: {
    convertCurrency(nominal) {
      return utils.convertCurrency(nominal);
    },
    convertDate(date) {
      return utils.convertDate(new Date(date));
    },
    cutString(string) {
      return utils.cutString(string, 50);
    },
    getColor(status) {
      return _.find(this.statuses, { name: status }).color;
    },
  },
  mounted() {
    DonationService.getAllDonations({ userId: this.currentUser.id }).then(
      (response) => {
        this.donations = response.data.content;
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
