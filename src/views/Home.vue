<template>
  <div class="w-100">
    <div class="row mb-5">
      <div class="col-lg-9">
        <DisasterMap class="mb-4 mb-sm-4 mb-lg-0" :disasters="disasters" />
      </div>
      <div class="col-lg-3 text-left">
        <h1 class="header">
          <span>
            {{ disasters ? disasters.length : '0' }}
          </span> Disasters <br /> in Indonesia Currently
        </h1>
        <p v-if="disasters && disasters.length > 0" class="subtitle">
          Latest Update : {{ getLatestUpdate }}
        </p>
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
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="title">Help Them by Donating</h2>
        <router-link to="/fundraisings">
          <button class="btn-sm btn-purple-reverse px-3">Show More</button>
        </router-link>
      </div>
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
      <router-link
        class="question-redirect"
        :to="currentUser && currentUser.username ? '/fundraising-list/create' : '/login'"
      >
        Create it now
      </router-link>
    </p>
  </div>
</template>

<script>
import _ from 'lodash';
import utils from '@/assets/js/utils';
import CardItem from '@/components/CardItem.vue';
import DisasterMap from '@/components/DisasterMap.vue';
import SummaryItem from '@/components/SummaryItem.vue';
import DisasterService from '../services/disaster.service';
import FundraisingService from '../services/fundraising.service';

export default {
  components: {
    CardItem,
    DisasterMap,
    SummaryItem,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
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
  data: () => ({
    summary: {
      Flood: { foreground: 'blue', background: 'light-blue' },
      Earthquake: { foreground: 'brown', background: 'light-brown' },
      Tsunami: { foreground: 'purple', background: 'light-purple' },
      Wildfire: { foreground: 'red', background: 'light-red' },
      Landslide: { foreground: 'green', background: 'light-green' },
      Volcano: { foreground: 'yellow', background: 'light-yellow' },
    },
    disasters: [],
    fundraisings: [],
    errorMessage: '',
  }),
  mounted() {
    DisasterService.getAllDisasters({ display: 'Show' }).then(
      (response) => {
        this.disasters = response.data.content;
      },
      (error) => {
        this.errorMessage = error.response.data.errorMessage
              || (error.response && error.response.data)
              || error.message
              || error.toString();
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.errorMessage,
        });
      },
    );

    FundraisingService.getAllFundraisings({ limit: 4, status: 'Ongoing' }).then(
      (response) => {
        this.fundraisings = response.data.content;
      },
      (error) => {
        this.errorMessage = error.response.data.errorMessage
              || (error.response && error.response.data)
              || error.message
              || error.toString();
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.errorMessage,
        });
      },
    );
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
