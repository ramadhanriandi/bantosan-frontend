<template>
  <div class="w-100">
    <div class="row mb-5">
      <div class="col-12 col-sm-12 col-lg-1 mb-4 mb-sm-4 mb-lg-0 text-left">
        <router-link
          :to="getUser && getUser.username ? '/fundraising-list' : '/fundraisings'"
        >
          <img src="@/assets/img/back.png" />
        </router-link>
      </div>
      <div class="col-12 col-sm-12 col-lg-4 mb-4 mb-sm-4 mb-lg-0">
        <img class="fundraising-img w-100" :src="require(`@/assets/img/${fundraising.image}`)" />
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
          :percent="getPercentage"
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
            <img class="ml-1" :src="require(`@/assets/img/${fundraising.createdBy.avatar}`)" />
            <span class="ml-1">
              {{ getFullname }} <img class="ml-1" src="@/assets/img/verified.png" />
            </span>
          </div>
          <button
            v-if="getUser && getUser.role != 'Admin'"
            class="btn btn-green px-3"
            @click="handleModal"
            :data-toggle="getUser && getUser.username ? 'modal' : ''"
            data-target="#donation-modal"
          >
            DONATE NOW
          </button>
        </div>
      </div>
    </div>

    <div class="row" v-if="getUrl === 'fundraising-list'">
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
                  <th scope="col" v-if="getUser && getUser.role !== 'Admin'">Proof</th>
                  <th scope="col">Status</th>
                  <th scope="col" v-if="getUser && getUser.role !== 'Admin'">Action</th>
                </tr>
              </thead>
              <tbody v-for="donation in getDonations.data" :key="donation.id">
                <tr>
                  <td>{{ convertDate(donation.createdAt) }}</td>
                  <td>{{ donation.createdBy.username }}</td>
                  <td>IDR {{ convertCurrency(donation.nominal) }}</td>
                  <td v-if="getUser && getUser.role !== 'Admin'">
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
                  <td v-if="getUser && getUser.role !== 'Admin'">
                    <div
                      class="btn-xs cursor-pointer d-inline p-2 mr-1"
                      :class="donation.status === 'Verified' ? 'btn-light-grey' : 'btn-green'"
                    >
                      <img src="@/assets/img/verify.png" />
                    </div>
                    <div
                      class="btn-xs cursor-pointer d-inline p-2"
                      :class="donation.status === 'Rejected' ? 'btn-light-grey' : 'btn-red'"
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
            <form class="text-left mt-3" @submit="submitForm" method="post">
              <div class="form-group">
                <label>Nominal</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">IDR</div>
                  </div>
                  <input
                    type="number"
                    v-model="nominal"
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
                  aria-describedby="bankHelp"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :id="`bank${bank.bankId}`"
                    v-model="bankId"
                    :value="bank.bankId"
                    required
                  >
                  <label class="form-check-label" :for="`bank${bank.bankId}`">
                    {{ bank.name }} - {{ bank.accountNumber }} - {{ bank.accountHolder }}
                  </label>
                </div>
                <small
                  v-if="errors && errors.bank"
                  id="bankHelp"
                  class="form-text"
                >
                  {{ errors.bank }}
                </small>
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
import { mapGetters } from 'vuex';
import vPagination from 'vue-plain-pagination';
import utils from '@/assets/js/utils';

export default {
  components: {
    KProgress,
    vPagination,
  },
  computed: {
    getDaysLeft() {
      return utils.getDaysLeft(new Date(this.fundraising.endDate));
    },
    getDonation() {
      return utils.convertCurrency(this.fundraising.totalDonation);
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
      return utils.cutString(this.fundraising.createdBy.fullname, 31);
    },
    getMaxPage() {
      return Math.ceil(this.getDonations.count / this.limit);
    },
    getPercentage() {
      const { totalDonation, target } = this.fundraising;

      return utils.getPercentage(totalDonation, target);
    },
    getTarget() {
      return utils.convertCurrency(this.fundraising.target);
    },
    getUrl() {
      return this.$route.path.split('/')[1];
    },
    ...mapGetters([
      'getUser',
    ]),
  },
  data() {
    return {
      fundraising: {
        id: 'abcdef1',
        title: 'Bantuan Kemanusiaan Tsunami Aceh',
        image: 'rectangle.png',
        description: 'Pengungsi Masih Terlunta, Ayo Bangun Lebak Kembali! Sebanyak 6 kecamatan yang meliputi 30 desa di Kabupaten Lebak terdampak banjir. Qadarullah, kejadian itu juga menyebabkan 10 orang meninggal dunia dan 67 orang luka-luka. Selain korban jiwa, sebanyak 16 sekolah juga mengalami kerusakan serta 1.253 siswa terdampak. Banjir itu juga menerjang 18 pesantren, 28 jembatan, 5 jaringan irigasi, dan hampir seribu hektar sawah warga. Dan, sebanyak 3.041 unit rumah mengalami kerusakan yang menyebabkan ribuan warga harus mengungsi karena banyak dari mereka yang rumahnya tak layak dihuni lagi.',
        target: 40000000000,
        endDate: '2020-09-14T01:00:00+01:00',
        createdBy: {
          id: 'sdasfasdas',
          username: 'dwi_handayani',
          fullname: 'Dwi Handayani',
          avatar: 'small-avatar.png',
        },
        banks: [{
          bankId: 0,
          name: 'BNI',
          accountNumber: '1241241241',
          accountHolder: 'Any Name Here',
        }, {
          bankId: 1,
          name: 'BRI',
          accountNumber: '1241241241',
          accountHolder: 'Any Name Here',
        }],
        totalDonation: 26812345000,
        donationByBank: [{
          bankId: 0,
          total: 241241231,
        }, {
          bankId: 1,
          total: 225124141,
        }],
        donaturs: 403,
      },
      donations: [{
        id: 'donation1',
        nominal: 10000,
        proof: 'donation1',
        status: 'Pending',
        createdAt: '2020-09-14T01:00:00+01:00',
        createdBy: {
          id: 'asdasfasfqwafw2',
          username: 'your_username',
        },
        fundraising: {
          title: 'Bantuan Banjir Palu',
        },
      }, {
        id: 'donation2',
        nominal: 10000,
        proof: 'donation2',
        status: 'Rejected',
        createdAt: '2020-09-14T01:00:00+01:00',
        createdBy: {
          id: 'asdasfasfqwafw2',
          username: 'your_username',
        },
        fundraising: {
          title: 'Bantuan Banjir Palu',
        },
      }],
      statuses: [
        { name: 'All Donation', color: 'grey' },
        { name: 'Verified', color: 'green' },
        { name: 'Pending', color: 'yellow' },
        { name: 'Rejected', color: 'red' },
      ],
      status: 'All Donation',
      errors: {},
      nominal: null,
      bankId: null,
      proof: null,
      limit: 10,
      page: 1,
    };
  },
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
      if (this.getUser && !this.getUser.username) {
        this.$router.push({ name: 'login' });
      }
    },
    setStatus(status) {
      this.status = status;
    },
    submitForm(e) {
      this.errors = {};

      if (!this.bankId) {
        this.errors.bank = 'Choose a bank';
      }

      if (_.isEmpty(this.errors) && this.nominal) {
        return true;
      }

      e.preventDefault();

      return false;
    },
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
