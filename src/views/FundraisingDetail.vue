<template>
  <div class="w-100">
    <div class="row">
      <div class="col-1">
        <router-link
          :to="getUser && getUser.username ? '/fundraising-list' : '/fundraisings'"
        >
          <img src="@/assets/img/back.png" />
        </router-link>
      </div>
      <div class="col-4">
        <img class="fundraising-img w-100" :src="require(`@/assets/img/${fundraising.image}`)" />
      </div>
      <div class="col-7 text-left">
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
import utils from '@/assets/js/utils';

export default {
  components: {
    KProgress,
  },
  computed: {
    getDaysLeft() {
      return utils.getDaysLeft(new Date(this.fundraising.endDate));
    },
    getDonation() {
      return utils.convertCurrency(this.fundraising.totalDonation);
    },
    getFullname() {
      return utils.cutString(this.fundraising.createdBy.fullname, 31);
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
        id: 'asfaslfaslfbasldas',
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
        id: 'asfaslfaslfbasldas',
        nominal: 10000,
        proof: 'donation2',
        status: 'Pending',
        createdAt: '2020-09-14T01:00:00+01:00',
        createdBy: {
          id: 'asdasfasfqwafw2',
          username: 'your_username',
        },
        fundraising: {
          title: 'Bantuan Banjir Palu',
        },
      }],
      errors: {},
      nominal: null,
      bankId: null,
      proof: null,
    };
  },
  methods: {
    convertCurrency(nominal) {
      return utils.convertCurrency(nominal);
    },
    getBankInfo(bankId) {
      const bank = _.find(this.fundraising.banks, { bankId });
      return `${bank.name} - ${bank.accountNumber} - ${bank.accountHolder}`;
    },
    handleModal() {
      if (this.getUser && !this.getUser.username) {
        this.$router.push({ name: 'login' });
      }
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
