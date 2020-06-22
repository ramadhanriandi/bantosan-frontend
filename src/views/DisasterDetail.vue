<template>
  <div class="w-100">
    <div class="row">
      <div class="col-12 col-sm-12 col-lg-1 mb-4 mb-sm-4 mb-lg-0 text-left" >
        <router-link to="/reported-disasters"><img src="@/assets/img/back.png" /></router-link>
      </div>
      <div class="col-12 col-sm-12 col-lg-11 mb-4 mb-sm-4 mb-lg-0">
        <h2 class="title mb-2">Reported Disaster</h2>
        <p class="subtitle">Fill in the form below to report a disaster</p>
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
            required
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control p-3"
            rows="5"
            v-model="disaster.description"
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
            required
          />
        </div>
        <div class="form-group">
          <label>Pin the Location</label>
          <l-map
            class="map w-100"
            :center="center"
            :minZoom="minZoom"
            :options="{ zoomControl: false }"
            :padding="[100, 100]"
            :zoom="zoom"
          >
            <l-control-zoom position="bottomright"></l-control-zoom>
            <l-circle-marker :lat-lng="disaster.location.map.coordinates" :radius="6">
            </l-circle-marker>
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          </l-map>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-3">
        <div class="form-group">
          <label>Category</label>
          <select type="text" class="form-control" v-model="disaster.category" required>
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
            required
          />
        </div>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-purple my-2">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  LCircleMarker, LControlZoom, LMap, LTileLayer,
} from 'vue2-leaflet';

export default {
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
          map: { coordinates: [-10, 125] },
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
      center: [-1.5, 110],
      minZoom: 4,
      url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      zoom: 1,
    };
  },
  methods: {
    submitForm(e) {
      const {
        name, description, location, category, evidence,
      } = this.disaster;

      if (name && description && location && category && evidence) {
        return true;
      }

      e.preventDefault();

      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.map {
  border-radius: 5px;
  height: 250px;
}
</style>
