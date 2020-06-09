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
    <div v-if="fundraisings.length > 0">
      <div class="row">
        <div
          class="col-6 col-sm-6 col-lg-3 mb-4 mb-sm-4 mb-lg-0"
          v-for="fundraising in fundraisings"
          :key="fundraising.id"
        >
          <CardItem :fundraising="fundraising" />
        </div>
      </div>
    </div>
    <p class="question mt-5">
      Want to raise a fund ?
      <router-link class="question-redirect" to="/your-fundraising/create">
        Create it now
      </router-link>
    </p>
  </div>
</template>

<script>
import _ from 'lodash';
import utils from '@/assets/js/utils';
import CardItem from '@/components/CardItem.vue';

export default {
  components: {
    CardItem,
  },
  computed: {
    getLatestUpdate() {
      const latest = new Date(Math.max.apply(null, this.disasters.map(e => new Date(e.updatedAt))));

      return utils.convertDate(latest);
    },
    getSummary() {
      const counters = _.countBy(this.disasters, 'category');

      _.map(this.summary, (value, key) => {
        if (!_.has(counters, key)) {
          counters[key] = 0;
        }
      });

      return counters;
    },
  },
  data() {
    return {
      summary: {
        Flood: { foreground: 'blue', background: 'light-blue' },
        Earthquake: { foreground: 'brown', background: 'light-brown' },
        Tsunami: { foreground: 'purple', background: 'light-purple' },
        Wildfire: { foreground: 'red', background: 'light-red' },
        Landslide: { foreground: 'green', background: 'light-green' },
        Volcano: { foreground: 'yellow', background: 'light-yellow' },
      },
      disasters: [
        {
          id: '1', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [-10, 125] } }, category: 'Flood', updatedAt: '2012-07-14T01:00:00+01:00',
        },
        {
          id: '2', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [-9, 120] } }, category: 'Flood', updatedAt: '2013-07-14T01:00:00+01:00',
        },
        {
          id: '3', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [-8, 110] } }, category: 'Earthquake', updatedAt: '2012-07-13T01:00:00+01:00',
        },
        {
          id: '4', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [-7, 115] } }, category: 'Tsunami', updatedAt: '2020-05-13T01:00:00+01:00',
        },
        {
          id: '5', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [-1, 135] } }, category: 'Wildfire', updatedAt: '2012-07-04T01:00:00+01:00',
        },
        {
          id: '6', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [1, 100] } }, category: 'Wildfire', updatedAt: '2012-07-14T01:00:00+01:00',
        },
        {
          id: '7', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [3, 95] } }, category: 'Wildfire', updatedAt: '2012-07-14T01:00:00+01:00',
        },
        {
          id: '8', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [2, 97] } }, category: 'Wildfire', updatedAt: '2012-07-14T01:00:00+01:00',
        },
        {
          id: '9', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [0, 120] } }, category: 'Landslide', updatedAt: '2012-07-14T01:00:00+01:00',
        },
        {
          id: '10', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [1, 110] } }, category: 'Landslide', updatedAt: '2012-07-14T01:00:00+01:00',
        },
        {
          id: '11', name: 'Banjir Buahbatu', location: { name: 'Kec. Buahbatu, Bandung', map: { coordinates: [2, 127] } }, category: 'Volcano', updatedAt: '2012-07-14T01:00:00+01:00',
        },
      ],
      fundraisings: [
        {
          id: 'abcdef1',
          title: 'Bantuan Kemanusiaan Tsunami Aceh',
          image: 'rectangle.png',
          target: 40000000000,
          endDate: '2020-09-14T01:00:00+01:00',
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
          endDate: '2020-07-07T01:00:00+01:00',
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
          createdBy: {
            id: 'sdasfasda3',
            username: 'baznas',
            fullname: 'Badan Amil Zakat Nasional',
          },
          totalDonation: 30158212,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.header {
  font-size: 24px;
  font-weight: 400;
}

.header span {
  font-weight: 700;
}

.redirect, .redirect:focus, .redirect:hover {
  color: $BLACK;
  font-size: 10px;
  text-decoration: none;
}

.redirect span {
  font-weight: 500;
}

.question {
  font-size: 24px;
  font-weight: 400;
}

.question-redirect, .question-redirect:hover {
  color: $PURPLE;
  font-weight: 700;
  text-decoration: none;
}
</style>
