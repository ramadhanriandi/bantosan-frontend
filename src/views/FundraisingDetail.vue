<template>
  <div class="w-100">
    <div class="row mb-5">
      <div class="col-12 col-sm-12 col-lg-1 mb-4 mb-sm-4 mb-lg-0 text-left">
        <router-link
          :to="loggedIn ? '/fundraising-list' : '/fundraisings'"
        >
          <img src="@/assets/img/back.png" />
        </router-link>
      </div>
      <div class="col-12 col-sm-12 col-lg-4 mb-4 mb-sm-4 mb-lg-0">
        <img class="fundraising-img w-100" :src="require(`@/assets/img/rectangle.png`)" />
      </div>
      <div class="col-12 col-sm-12 col-lg-7 text-left">
        <h2 class="title mb-3">{{ fundraising.title }}</h2>
        <div class="fundraising-money">
          <span class="fundraising-donation">IDR {{ getDonation }}</span>
          raised of
          <span class="fundraising-target">IDR {{ getTarget }}</span>
        </div>
        <KProgress
          :active="true"
          class="my-2 w-100"
          bg-color="#F4C403"
          color="#7F51DF"
          :line-height="4"
          :percent="fundraising.totalDonation && fundraising.target ? getPercentage : 0"
          :show-text="false"
        />
        <div class="d-flex fundraising-count justify-content-between mb-2">
          <div class="m-0"><span>{{ fundraising.donaturs }}</span> Donators</div>
          <div class="m-0"><span>{{ getDaysLeft }}</span> Days Left</div>
        </div>
        <div class="row">
          <div
            class="fundraising-description text-justify mb-2"
            :class="getUrl === 'fundraisings' ? 'col-12' : 'col-7'"
          >
            {{ fundraising.description }}
          </div>
          <div v-if="getUrl === 'fundraising-list'" class="col-5 border-wrapper p-3 h-25">
            <div class="distribution-title">Account Distribution</div>
            <div
              v-for="donation in fundraising.donationByBank"
              :key="`donation${donation.bankId}`"
              class="bank-account pt-2 mt-2">
              <div class="bank-total">IDR {{ convertCurrency(donation.total) }}</div>
              <div class="bank-info">{{ getBankInfo(donation.bankId) }}</div>
            </div>
          </div>
        </div>
        <div v-if="getUrl === 'fundraisings'" class="d-flex justify-content-between">
          <div class="fundraising-user m-0">
            Organized by
            <img class="ml-1" :src="require(`@/assets/img/small-avatar.png`)" />
            <span class="ml-1">
              {{ getFullname }} <img class="ml-1" src="@/assets/img/verified.png" />
            </span>
          </div>
          <button
            v-if="!isAdmin"
            class="btn btn-green px-3"
            @click="handleModal"
            :data-toggle="loggedIn ? 'modal' : ''"
            data-target="#donation-modal"
          >
            DONATE NOW
          </button>
        </div>
      </div>
    </div>

    <!-- Donation Table -->
    <div
      class="row"
      v-if="getUrl === 'fundraising-list'
        && fundraising && fundraising.organizer
        && currentUser.id === fundraising.organizer.id"
    >
      <div class="col-11 offset-1 pr-0">
        <div class="d-flex align-items-center mb-4 row">
          <div class="col-12 col-sm-12 col-lg-6">
            <h2 class="title mb-2">Donation List</h2>
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
        <div v-if="donations.length > 0">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Username</th>
                  <th scope="col">Donation</th>
                  <th scope="col" v-if="!isAdmin">Proof</th>
                  <th scope="col">Status</th>
                  <th scope="col" v-if="!isAdmin">Action</th>
                </tr>
              </thead>
              <tbody v-for="donation in getDonations.data" :key="donation.id">
                <tr>
                  <td>{{ convertDate(donation.createdAt) }}</td>
                  <td>{{ donation.donatur.username }}</td>
                  <td>IDR {{ convertCurrency(donation.nominal) }}</td>
                  <td v-if="!isAdmin">
                    <a
                      :href="`/fundraising-list/${fundraising.id}/${donation.proof}`"
                      target="_blank"
                      class="btn-xs btn-grey py-2 px-3"
                    >
                      View File
                    </a>
                  </td>
                  <td>
                    <div :class="`btn-xs btn-${getColor(donation.status)} d-inline py-2 px-3`">
                      {{ donation.status }}
                    </div>
                  </td>
                  <td v-if="currentUser && currentUser.role !== 'Admin'">
                    <div
                      class="btn-xs cursor-pointer d-inline p-2 mr-1"
                      :class="donation.status === 'Verified' ? 'btn-light-grey' : 'btn-green'"
                      @click="donation.status !== 'Verified'
                        && putDonation(donation.id, 'Verified')"
                    >
                      <img src="@/assets/img/verify.png" />
                    </div>
                    <div
                      class="btn-xs cursor-pointer d-inline p-2"
                      :class="donation.status === 'Rejected' ? 'btn-light-grey' : 'btn-red'"
                      @click="donation.status !== 'Rejected'
                        && putDonation(donation.id, 'Rejected')"
                    >
                      <img src="@/assets/img/unverify.png" />
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
        <div v-else class="empty-note">Empty donation</div>
      </div>
    </div>

    <!-- Donation Modal -->
    <div
      class="modal fade"
      id="donation-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      v-if="getUrl === 'fundraisings'"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <form class="text-left mt-3" @submit.prevent="postDonation" method="post">
              <div class="form-group">
                <label>Nominal</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">IDR</div>
                  </div>
                  <input
                    type="number"
                    v-model="donation.nominal"
                    name="nominal"
                    class="form-control p-3"
                    placeholder="min : 10,000"
                    min="10000"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Select Bank Account</label>
                <div
                  class="form-check mb-2"
                  v-for="bank in fundraising.banks"
                  :key="bank.bankId"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="bank"
                    :id="`bank${bank.bankId}`"
                    v-model="donation.bank"
                    :value="bank.bankId"
                    required
                  >
                  <label class="form-check-label" :for="`bank${bank.bankId}`">
                    {{ bank.name }} - {{ bank.accountNumber }} - {{ bank.accountHolder }}
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label>Upload Transaction Proof</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile">
                  <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
              </div>
              <button type="submit" class="btn btn-green my-2 w-100">DONATE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KProgress from 'k-progress';
import _ from 'lodash';
import vPagination from 'vue-plain-pagination';
import utils from '@/assets/js/utils';
import Donation from '../models/donation';
import DonationService from '../services/donation.service';
import Fundraising from '../models/fundraising';
import FundraisingService from '../services/fundraising.service';

export default {
  components: {
    KProgress,
    vPagination,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    getDaysLeft() {
      return utils.getDaysLeft(new Date(this.fundraising.endDate));
    },
    getDonation() {
      return utils.convertCurrency(_.get(this.fundraising, 'totalDonation', 0));
    },
    getDonations() {
      const filteredDonations = this.status === 'All Donation'
        ? this.donations
        : _.filter(this.donations, donation => donation.status === this.status);
      const firstBound = this.limit * (this.page - 1);
      const lastBound = firstBound + this.limit;

      return {
        count: filteredDonations.length,
        data: filteredDonations.slice(firstBound, lastBound),
      };
    },
    getFullname() {
      return utils.cutString(_.get(this.fundraising, ['organizer', 'fullname'], ''), 31);
    },
    getMaxPage() {
      return Math.ceil(this.getDonations.count / this.limit);
    },
    getPercentage() {
      const { totalDonation = 0, target = 0 } = this.fundraising;

      return utils.getPercentage(totalDonation, target);
    },
    getTarget() {
      return utils.convertCurrency(this.fundraising.target ? this.fundraising.target : 0);
    },
    getUrl() {
      return this.$route.path.split('/')[1];
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      return this.currentUser && this.currentUser.roles.includes('ROLE_ADMIN');
    },
  },
  data: () => ({
    donation: new Donation('', '', '', ''),
    proof: null,
    donations: [],
    fundraising: new Fundraising(),
    statuses: [
      { name: 'All Donation', color: 'grey' },
      { name: 'Verified', color: 'green' },
      { name: 'Pending', color: 'yellow' },
      { name: 'Rejected', color: 'red' },
    ],
    status: 'All Donation',
    errors: {},
    message: '',
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
    getBankInfo(bankId) {
      const bank = _.find(this.fundraising.banks, { bankId });
      return `${bank.name} - ${bank.accountNumber} - ${bank.accountHolder}`;
    },
    getColor(status) {
      return _.find(this.statuses, { name: status }).color;
    },
    handleModal() {
      if (!this.loggedIn) {
        this.$router.push('/login');
      }
    },
    setStatus(status) {
      this.status = status;
    },
    postDonation() {
      this.message = '';
      this.errors = {};

      if (_.isNil(this.donation.bank)) {
        this.errors.bank = 'Choose a bank';
      }

      if (_.isEmpty(this.errors)) {
        this.donation = {
          ...this.donation,
          donatur: this.currentUser.id,
          fundraising: this.fundraising.id,
        };

        DonationService.postDonation(this.donation).then(
          () => {
            this.message = 'Your donation is success';
            this.$swal({
              icon: 'success',
              title: 'Success',
              text: this.message,
              timer: 2000,
              timerProgressBar: true,
              onClose: () => {
                this.$router.go(`/fundraisings/${this.fundraising.id}`);
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
    putDonation(donationId, status) {
      this.message = '';

      DonationService.putDonation(donationId, status).then(
        () => {
          this.message = status === 'Verified'
            ? 'The donation is verified'
            : 'The donation is rejected';
          this.$swal({
            icon: 'success',
            title: 'Success',
            text: this.message,
            timer: 2000,
            timerProgressBar: true,
            onClose: () => {
              this.$router.go(`/fundraisings/${this.fundraising.id}`);
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
    FundraisingService.getFundraisingById(this.$route.path.split('/')[2]).then(
      (fundraisingResponse) => {
        this.fundraising = fundraisingResponse.data.value;
        DonationService.getAllDonations({ fundraisingId: this.fundraising.id }).then(
          (donationResponse) => {
            this.donations = donationResponse.data.content;
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

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.bank-account {
  border-top: 1px solid $GREY;
}

.bank-info {
  font-size: 10px;
}

.bank-total {
  font-size: 14px;
  font-weight: 500;
}

.distribution-title {
  color: $GREY;
  font-size: 14px;
}

.fundraising-count, .fundraising-money {
  font-size: 14px;
}

.fundraising-count div span {
  font-size: 18px;
  font-weight: 500;
}

.fundraising-description {
  line-height: 2;
}

.fundraising-donation {
  color: $PURPLE;
  font-size: 18px;
}

.fundraising-donation, .fundraising-target {
  font-weight: 500;
}

.fundraising-img {
  border-radius: 22px;
}

.fundraising-user {
  color: $GREY;
}

.fundraising-user span {
  color: $BLACK;
  font-size: 14px;
}

/deep/ .k-progress-outer {
  margin-right: 0px;
  padding-right: 0px;
}
</style>
