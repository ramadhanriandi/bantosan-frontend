<template>
  <div class="w-100">
    <div class="row">
      <div class="col-12 col-sm-12 col-lg-1 mb-4 mb-sm-4 mb-lg-0 text-left" >
        <router-link to="/reported-disasters"><img src="@/assets/img/back.png" /></router-link>
      </div>
      <div class="col-12 col-sm-12 col-lg-11 mb-4 mb-sm-4 mb-lg-0">
        <h2 class="title mb-2">{{ getTitle }}</h2>
        <p class="subtitle">{{ getSubtitle }}</p>
      </div>
    </div>
    <form class="row text-left" @submit.prevent="reportDisaster" method="post">
      <div class="col-12 col-sm-12 col-lg-4 offset-0 offset-sm-0 offset-lg-1">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="disaster.name"
            :readonly="isDetailPage"
            required
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control p-3"
            rows="15"
            v-model="disaster.description"
            :readonly="isDetailPage"
            required
          >
          </textarea>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-4">
        <div class="form-group">
          <label>Location</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="locationName"
            :readonly="isDetailPage"
            required
          />
        </div>
        <div class="form-group">
          <label>Pin the Location</label>
          <l-map
            class="map w-100"
            :center="locationCoordinates"
            :minZoom="minZoom"
            :options="{ zoomControl: false }"
            :padding="[100, 100]"
            :zoom="zoom"
            @click="setCoordinates"
          >
            <l-control-zoom position="bottomright"></l-control-zoom>
            <l-circle-marker :lat-lng="locationCoordinates" :radius="6"></l-circle-marker>
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          </l-map>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-3">
        <div class="form-group">
          <label>Category</label>
          <input
            type="text"
            class="form-control p-3"
            v-if="isDetailPage"
            v-model="disaster.category"
            :readonly="isDetailPage"
          />
          <select
            type="text"
            class="form-control"
            v-else
            v-model="disaster.category"
            required
          >
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
              :selected="category === disaster.category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Evidence (News URL or other)</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="disaster.evidence"
            :readonly="isDetailPage"
            required
          />
        </div>
      </div>
      <div class="col-12 d-flex justify-content-end" v-if="!isDetailPage">
        <button type="submit" class="btn btn-purple my-2">{{ getButtonText }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  LCircleMarker, LControlZoom, LMap, LTileLayer,
} from 'vue2-leaflet';
import _ from 'lodash';
import utils from '@/assets/js/utils';
import Disaster from '../models/disaster';
import DisasterService from '../services/disaster.service';

export default {
  components: {
    LCircleMarker,
    LControlZoom,
    LMap,
    LTileLayer,
  },
  computed: {
    getButtonText() {
      return this.getUrl === 'create' ? 'Submit' : 'Save Changes';
    },
    getTitle() {
      switch (this.getUrl) {
        case 'create':
          return 'Report a Disaster';
        case 'edit':
          return 'Edit a Disaster Report';
        default:
          return 'Disaster Report Detail';
      }
    },
    getSubtitle() {
      return this.getUrl === 'create'
        ? 'Fill in the form below to report a disaster' : `Latest Update : ${this.convertDate(this.disaster.updatedAt)}`;
    },
    getUrl() {
      const parsedUrl = this.$route.path.split('/');
      return parsedUrl[parsedUrl.length - 1];
    },
    isDetailPage() {
      return this.getUrl !== 'create' && this.getUrl !== 'edit';
    },
  },
  data: () => ({
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    categories: ['Flood', 'Earthquake', 'Tsunami', 'Wildfire', 'Landslide', 'Volcano'],
    disaster: new Disaster('', '', '', '', '', ''),
    locationCoordinates: [-1.5, 110],
    locationName: '',
    message: '',
    minZoom: 4,
    url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    zoom: 1,
  }),
  methods: {
    convertDate(date) {
      return utils.convertDate(new Date(date));
    },
    setCoordinates(event) {
      if (!this.isDetailPage) {
        this.locationCoordinates = _.values(event.latlng);
      }
    },
    reportDisaster() {
      this.message = '';
      this.disaster = {
        ...this.disaster,
        location: {
          name: this.locationName,
          map: {
            type: 'Point',
            coordinates: this.locationCoordinates,
          },
        },
        reporter: this.$store.state.auth.user.id,
      };

      DisasterService.postDisaster(this.disaster).then(
        () => {
          this.message = 'Your disaster report is success';
          this.$swal({
            icon: 'success',
            title: 'Success',
            text: this.message,
            timer: 2000,
            timerProgressBar: true,
            onClose: () => {
              this.$router.push('/reported-disasters');
            },
          });
        },
        (error) => {
          this.message = error.response.data.errorMessage
              || error.response.data.status;
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.message,
          });
        },
      );
    },
  },
  mounted() {
    if (this.isDetailPage || this.getUrl === 'edit') {
      DisasterService.getDisasterById(this.$route.path.split('/')[2]).then(
        (response) => {
          this.disaster = response.data.value;
          this.locationName = response.data.value.location.name;
          this.locationCoordinates = response.data.value.location.map.coordinates;
        },
        (error) => {
          this.message = error.response.data.errorMessage
              || error.response.data.status;
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.message,
          });
        },
      );
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.locationCoordinates = _.get(this.disaster, ['location', 'map', 'coordinates'], [latitude, longitude]);
      });
    } else {
      this.locationCoordinates = _.get(this.disaster, ['location', 'map', 'coordinates'], [-1.5, 110]);
    }
  },
};
</script>

<style scoped lang="scss">
.map {
  border-radius: 5px;
  height: 250px;
}
</style>
