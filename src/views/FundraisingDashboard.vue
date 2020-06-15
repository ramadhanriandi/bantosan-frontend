<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12 col-sm-12 col-lg-6">
        <h2 class="title mb-2">
          {{ getUser && getUser.role === 'Admin' ? 'Fundraising List' : 'Your Fundraising' }}
        </h2>
        <p class="subtitle mb-4 mb-sm-4 mb-lg-0">
          List of fundraisings and their current report
        </p>
      </div>
      <div
        class="col-12 col-sm-12 col-lg-6 d-flex justify-content-end"
        v-if="getUser && getUser.role === 'Admin'"
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
        v-else-if="getUser && getUser.role === 'User'"
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
    <div v-if="fundraisings.length > 0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col" v-if="getUser && getUser.role === 'User'">Donation</th>
              <th scope="col">Target</th>
              <th scope="col">Total Days</th>
              <th scope="col">End Date</th>
              <th scope="col" v-if="getUser && getUser.role === 'Admin'">Username</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="fundraising in getFundraisings.data" :key="fundraising.id">
            <tr>
              <td>{{ cutString(fundraising.title) }}</td>
              <td v-if="getUser && getUser.role === 'User'">
                IDR {{ fundraising.totalDonation ?
                convertCurrency(fundraising.totalDonation) : '0' }}
              </td>
              <td>IDR {{ convertCurrency(fundraising.target) }}</td>
              <td>{{ fundraising.day }}</td>
              <td>{{ fundraising.endDate ? convertDate(fundraising.endDate) : '-' }}</td>
              <td v-if="getUser && getUser.role === 'Admin'">
                {{ fundraising.createdBy.username }}
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
                  v-if="getUser && getUser.role === 'User'"
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="fundraising.status === 'Pending' ? 'btn-purple' : 'btn-light-grey'"
                  @click="handleRedirect('edit', fundraising)"
                >
                  <img src="@/assets/img/edit.png" />
                </div>
                <div
                  v-if="getUser && getUser.role === 'User'"
                  class="btn-xs cursor-pointer d-inline p-2"
                  :class="fundraising.status === 'Ongoing' ? 'btn-light-grey' : 'btn-purple'"
                >
                  <img src="@/assets/img/delete.png" />
                </div>
                <div
                  v-if="getUser && getUser.role === 'Admin'"
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="fundraising.status === 'Ongoing' ? 'btn-light-grey' : 'btn-green'"
                >
                  <img src="@/assets/img/verify.png" />
                </div>
                <div
                  v-if="getUser && getUser.role === 'Admin'"
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
            Showing {{ getFundraisings.data.length }}
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
import { mapGetters } from 'vuex';
import vPagination from 'vue-plain-pagination';
import utils from '@/assets/js/utils';

export default {
  components: { vPagination },
  computed: {
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
        count: filteredFundraisings.length,
        data: filteredFundraisings.slice(firstBound, lastBound),
      };
    },
    getMaxPage() {
      return Math.ceil(this.getFundraisings.count / this.limit);
    },
    ...mapGetters([
      'getUser',
    ]),
  },
  data() {
    return {
      fundraisings: [
        {
          id: 'abcdef1',
          title: 'Bantuan Kemanusiaan Tsunami Aceh',
          image: 'rectangle.png',
          target: 40000000000,
          endDate: '2020-09-14T01:00:00+01:00',
          status: 'Ongoing',
          day: 132,
          createdBy: {
            id: 'sdasfasdas',
            username: 'dwi_handayani',
            fullname: 'Dwi Handayani',
          },
          totalDonation: 26812345000,
        },
        {
          id: 'abcdef2',
          title: 'Korban Banjir Lengkeka Poso Butuh Bantuan',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-06-07T01:00:00+01:00',
          status: 'Ongoing',
          day: 132,
          createdBy: {
            id: 'sdasfasda1',
            username: 'act_sulteng',
            fullname: 'Aksi Cepat Tanggap Sulawesi Tengah',
          },
          totalDonation: 17295123,
        },
        {
          id: 'abcdef3',
          title: 'Bantu Korban Banjir Jawa Barat dan Banten',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-08-07T01:00:00+01:00',
          status: 'Pending',
          day: 132,
          createdBy: {
            id: 'sdasfasda2',
            username: 'act',
            fullname: 'Aksi Cepat Tanggap',
          },
          totalDonation: 20296131,
        },
        {
          id: 'abcdef4',
          title: 'Bantu Korban Bencana Indonesia',
          image: 'rectangle.png',
          target: 200000000,
          endDate: '2020-11-01T01:00:00+01:00',
          status: 'Pending',
          day: 132,
          createdBy: {
            id: 'sdasfasda3',
            username: 'baznas',
            fullname: 'Badan Amil Zakat Nasional',
          },
          totalDonation: 30158212,
        },
        {
          id: 'abcdef5',
          title: 'Korban Banjir Lengkeka Poso Butuh Bantuan',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-07-07T01:00:00+01:00',
          status: 'Pending',
          day: 132,
          createdBy: {
            id: 'sdasfasda1',
            username: 'act_sulteng',
            fullname: 'Aksi Cepat Tanggap Sulawesi Tengah',
          },
          totalDonation: 17295123,
        },
        {
          id: 'abcdef6',
          title: 'Bantu Korban Banjir Jawa Barat dan Banten',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-08-07T01:00:00+01:00',
          status: 'Rejected',
          day: 132,
          createdBy: {
            id: 'sdasfasda2',
            username: 'act',
            fullname: 'Aksi Cepat Tanggap',
          },
          totalDonation: 20296131,
        },
        {
          id: 'abcdef7',
          title: 'Bantu Korban Bencana Indonesia',
          image: 'rectangle.png',
          target: 200000000,
          endDate: '2020-11-01T01:00:00+01:00',
          status: 'Rejected',
          day: 132,
          createdBy: {
            id: 'sdasfasda3',
            username: 'baznas',
            fullname: 'Badan Amil Zakat Nasional',
          },
          totalDonation: 30158212,
        },
      ],
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
    };
  },
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
  },
};
</script>
