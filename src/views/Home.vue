<template>
  <div class="row w-100">
    <div class="col-9">
      <Map />
    </div>
    <div class="col-3 text-left">
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
        Click here for details <span>>>></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import utils from '@/assets/js/utils';
import Map from '@/components/Map.vue';
import SummaryItem from '@/components/SummaryItem.vue';

export default {
  components: {
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
</style>
