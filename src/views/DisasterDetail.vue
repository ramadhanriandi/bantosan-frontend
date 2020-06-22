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
    <form class="row text-left" @submit="submitForm" method="post">
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
            rows="5"
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
            v-model="disaster.location.name"
            :readonly="isDetailPage"
            required
          />
        </div>
        <div class="form-group">
          <label>Pin the Location</label>
          <l-map
            class="map w-100"
            :center="getCoordinates"
            :minZoom="minZoom"
            :options="{ zoomControl: false }"
            :padding="[100, 100]"
            :zoom="zoom"
            @click="setCoordinates"
          >
            <l-control-zoom position="bottomright"></l-control-zoom>
            <l-circle-marker :lat-lng="getCoordinates" :radius="6"></l-circle-marker>
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
import utils from '@/assets/js/utils';

export default {
  computed: {
    getButtonText() {
      return this.getUrl === 'create' ? 'Submit' : 'Save Changes';
    },
    getCoordinates() {
      return this.disaster.location.map.coordinates
        ? this.disaster.location.map.coordinates : this.defaultLocation;
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
  components: {
    LCircleMarker,
    LControlZoom,
    LMap,
    LTileLayer,
  },
  data() {
    return {
      categories: ['Flood', 'Earthquake', 'Tsunami', 'Wildfire', 'Landslide', 'Volcano'],
      disaster: {
        id: '1',
        name: 'Banjir A',
        location: {
          name: 'Kec. Buahbatu, Bandung',
          map: { coordinates: [0, 100] },
        },
        description: 'Description',
        status: 'Verified',
        display: 'Show',
        category: 'Flood',
        evidence: 'www.google.com',
        createdAt: '2012-07-14T01:00:00+01:00',
        createdBy: {
          id: 'asdasfasfqwafw2',
          username: 'your_username',
        },
        updatedAt: '2012-07-14T01:00:00+01:00',
      },
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      defaultLocation: [-1.5, 110],
      minZoom: 4,
      url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      zoom: 1,
    };
  },
  methods: {
    convertDate(date) {
      return utils.convertDate(new Date(date));
    },
    setCoordinates(event) {
      if (!this.isDetailPage) {
        this.disaster.location.map.coordinates = event.latlng;
      }
    },
    submitForm(e) {
      const {
        name, description, location, category, evidence,
      } = this.disaster;

      if (name && description && category && evidence && location.name) {
        location.map.coordinates = location.map.coordinates
          ? location.map.coordinates : this.defaultLocation;

        return true;
      }

      e.preventDefault();

      return false;
    },
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.defaultLocation = [latitude, longitude];
      });
    } else {
      this.defaultLocation = [-1.5, 110];
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
