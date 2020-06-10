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
            />
          </div>
          <router-link class="ml-3 d-flex align-items-center" to="/fundraisings">
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
          <tbody v-for="disaster in getDisasters" :key="disaster.id">
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
            Showing {{ getDisasters.length }}
            / {{ disasters.length }} result{{ disasters.length > 1 ? 's' : '' }}
          </div>
          <v-pagination v-model="page" :page-count="getMaxPage"></v-pagination>
        </div>
      </div>
    </div>
    <div v-else class="empty-note">No current disaster</div>
  </div>
</template>

<script>
import utils from '@/assets/js/utils';
import vPagination from 'vue-plain-pagination';

export default {
  components: { vPagination },
  computed: {
    getDisasters() {
      const firstBound = this.limit * (this.page - 1);
      const lastBound = firstBound + this.limit;
      return this.disasters.slice(firstBound, lastBound);
    },
    getLatestUpdate() {
      const latest = new Date(Math.max.apply(null, this.disasters.map(e => new Date(e.updatedAt))));

      return utils.convertDate(latest);
    },
    getMaxPage() {
      return Math.ceil(this.disasters.length / this.limit);
    },
  },
  data() {
    return {
      disasters: [
        {
          id: '1',
          name: 'Banjir Buahbatu',
          location: {
            name: 'Kec. Buahbatu, Bandung',
            map: { coordinates: [-10, 125] },
          },
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
          category:
           'Volcano',
          createdAt:
           '2012-07-14T01:00:00+01:00',
          updatedAt:
           '2012-07-14T01:00:00+01:00',
        },
      ],
      limit: 10,
      page: 1,
    };
  },
  methods: {
    getReportedDate(date) {
      return utils.convertDate(new Date(date));
    },
  },
};
</script>
