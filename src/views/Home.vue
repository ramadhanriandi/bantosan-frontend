<template>
  <div class="w-100">
    <div class="row mb-5">
      <div class="col-lg-9">
        <Map class="mb-4 mb-sm-4 mb-lg-0"/>
      </div>
      <div class="col-lg-3 text-left">
        <h1 class="header">
          <span>{{ disasters.length }}</span> Disasters <br /> in Indonesia Currently
        </h1>
        <p v-if="disasters.length > 0" class="subtitle">Latest Update : {{ getLatestUpdate }}</p>
        <div v-for="(count, title) in getSummary" :key="title">
          <SummaryItem
            :title="title"
            :count="count"
            :foreground="summary[title].foreground"
            :background="summary[title].background"
          />
        </div>
        <router-link to="/disasters" class="redirect">
          Click here for details <span class="ml-1">>>></span>
        </router-link>
      </div>
    </div>
    <div v-if="fundraisings.length > 0">
      <h2 class="title mb-4">Help Them by Donating</h2>
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
      <router-link class="question-redirect" to="/login">Create it now</router-link>
    </p>
  </div>
</template>

<script>
import _ from 'lodash';
import utils from '@/assets/js/utils';
import CardItem from '@/components/CardItem.vue';
import Map from '@/components/Map.vue';
import SummaryItem from '@/components/SummaryItem.vue';

export default {
  components: {
    CardItem,
    Map,
    SummaryItem,
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
        { category: 'Flood', updatedAt: '2012-07-14T01:00:00+01:00' },
        { category: 'Flood', updatedAt: '2013-07-14T01:00:00+01:00' },
        { category: 'Earthquake', updatedAt: '2012-07-13T01:00:00+01:00' },
        { category: 'Tsunami', updatedAt: '2020-05-13T01:00:00+01:00' },
        { category: 'Wildfire', updatedAt: '2012-07-04T01:00:00+01:00' },
        { category: 'Wildfire', updatedAt: '2012-07-14T01:00:00+01:00' },
        { category: 'Wildfire', updatedAt: '2012-07-14T01:00:00+01:00' },
        { category: 'Wildfire', updatedAt: '2012-07-14T01:00:00+01:00' },
        { category: 'Landslide', updatedAt: '2012-07-14T01:00:00+01:00' },
        { category: 'Landslide', updatedAt: '2012-07-14T01:00:00+01:00' },
        { category: 'Volcano', updatedAt: '2012-07-14T01:00:00+01:00' },
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
