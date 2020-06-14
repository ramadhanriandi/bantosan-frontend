<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12 col-sm-12 col-lg-6">
        <h2 class="title mb-2">Reported Disaster</h2>
        <p class="subtitle mb-4 mb-sm-4 mb-lg-0">
          List of reported disasters and their current status
        </p>
      </div>
      <div class="col-12 col-sm-12 col-lg-6">
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
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="disaster.status === 'Pending' ? 'btn-purple' : 'btn-light-grey'"
                  @click="handleRedirect('edit', disaster)"
                >
                  <img src="@/assets/img/edit.png" />
                </div>
                <div
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="disaster.status === 'Verified' ? 'btn-light-grey' : 'btn-purple'"
                >
                  <img src="@/assets/img/delete.png" />
                </div>
                <!-- <div
                  class="btn-xs cursor-pointer d-inline p-2 mr-1"
                  :class="disaster.status === 'Verified' ? 'btn-light-grey' : 'btn-green'"
                >
                  <img src="@/assets/img/verify.png" />
                </div>
                <div
                  class="btn-xs cursor-pointer d-inline p-2"
                  :class="disaster.status === 'Rejected' ? 'btn-light-grey' : 'btn-red'"
                >
                  <img src="@/assets/img/unverify.png" />
                </div> -->
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
    <div v-else class="empty-note">No current disaster</div>
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
    ...mapGetters([
      'getUser',
    ]),
  },
  data() {
    return {
      disasters: [
        {
          id: '1',
          name: 'Banjir A',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [-10, 125] },
          },
          status: 'Verified',
          category: 'Flood',
          createdAt: '2012-07-14T01:00:00+01:00',
          updatedAt: '2012-07-14T01:00:00+01:00',
        },
        {
          id: '2',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [-9, 120] },
          },
          status: 'Pending',
          category: 'Flood',
          createdAt: '2012-07-14T01:00:00+01:00',
          updatedAt: '2013-07-14T01:00:00+01:00',
        },
        {
          id: '3',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [-8, 110] },
          },
          status: 'Pending',
          category: 'Earthquake',
          createdAt: '2012-07-14T01:00:00+01:00',
          updatedAt: '2012-07-13T01:00:00+01:00',
        },
        {
          id: '4',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [-7, 115] },
          },
          status: 'Verified',
          category: 'Tsunami',
          createdAt: '2012-07-14T01:00:00+01:00',
          updatedAt: '2020-05-13T01:00:00+01:00',
        },
        {
          id: '5',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [-1, 135] },
          },
          status: 'Verified',
          category: 'Wildfire',
          createdAt: '2012-07-14T01:00:00+01:00',
          updatedAt: '2012-07-04T01:00:00+01:00',
        },
        {
          id: '6',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [1, 100] },
          },
          status: 'Pending',
          category:
           'Wildfire',
          createdAt:
           '2012-07-14T01:00:00+01:00',
          updatedAt:
           '2012-07-14T01:00:00+01:00',
        },
        {
          id: '7',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [3, 95] },
          },
          status: 'Rejected',
          category:
           'Wildfire',
          createdAt:
           '2012-07-14T01:00:00+01:00',
          updatedAt:
           '2012-07-14T01:00:00+01:00',
        },
        {
          id: '8',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [2, 97] },
          },
          status: 'Rejected',
          category:
           'Wildfire',
          createdAt:
           '2012-07-14T01:00:00+01:00',
          updatedAt:
           '2012-07-14T01:00:00+01:00',
        },
        {
          id: '9',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [0, 120] },
          },
          status: 'Rejected',
          category:
           'Landslide',
          createdAt:
           '2012-07-14T01:00:00+01:00',
          updatedAt:
           '2012-07-14T01:00:00+01:00',
        },
        {
          id: '10',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [1, 110] },
          },
          status: 'Rejected',
          category:
           'Landslide',
          createdAt:
           '2012-07-14T01:00:00+01:00',
          updatedAt:
           '2012-07-14T01:00:00+01:00',
        },
        {
          id: '11',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [2, 127] },
          },
          status: 'Pending',
          category:
           'Volcano',
          createdAt:
           '2012-07-14T01:00:00+01:00',
          updatedAt:
           '2012-07-14T01:00:00+01:00',
        },
      ],
      statuses: [
        { name: 'All Report', color: 'grey' },
        { name: 'Verified', color: 'green' },
        { name: 'Pending', color: 'yellow' },
        { name: 'Rejected', color: 'red' },
      ],
      limit: 10,
      searchName: '',
      page: 1,
    };
  },
  methods: {
    getColor(status) {
      return _.find(this.statuses, { name: status }).color;
    },
    getReportedDate(date) {
      return utils.convertDate(new Date(date));
    },
    handleRedirect(method, disaster) {
      if (method === 'view') {
        this.$router.push(`/reported-disaster/${disaster.id}`);
      } else if (method === 'edit' && disaster.status === 'Pending') {
        this.$router.push(`/reported-disaster/${disaster.id}/edit`);
      }
    },
  },
};
</script>
