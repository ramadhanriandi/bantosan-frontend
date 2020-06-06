<template>
  <div class="row w-100">
    <div class="col-9">
      <Map />
    </div>
    <div class="col-3 text-left">
      <h1 class="header">
        <span>{{ disasters.length }}</span> Disasters <br /> in Indonesia Currently
      </h1>
      <p class="subtitle">Latest Update : 04 May 2020</p>
      <div v-for="(count, title) in getSummary" :key="title">
        <SummaryItem
          :title="title"
          :count="count"
          :foreground="summary[title].foreground"
          :background="summary[title].background"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Map from '@/components/Map.vue';
import SummaryItem from '@/components/SummaryItem.vue';

export default {
  components: {
    Map,
    SummaryItem,
  },
  computed: {
    getSummary() {
      return _.countBy(this.disasters, 'category');
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
        { category: 'Flood' },
        { category: 'Flood' },
        { category: 'Earthquake' },
        { category: 'Tsunami' },
        { category: 'Wildfire' },
        { category: 'Wildfire' },
        { category: 'Wildfire' },
        { category: 'Wildfire' },
        { category: 'Landslide' },
        { category: 'Landslide' },
        { category: 'Volcano' },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  font-size: 24px;
  font-weight: 400;
}

.header span {
  font-weight: 700;
}
</style>
