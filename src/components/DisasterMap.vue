<template>
  <l-map
    class="map w-100"
    :center="center"
    :minZoom="minZoom"
    :options="{ zoomControl: false }"
    :padding="[100, 100]"
    :zoom="zoom"
  >
    <l-control-zoom position="bottomright"></l-control-zoom>
    <l-control position="topleft" >
      <router-link :to="loggedIn ? '/reported-disasters/create' : '/login'">
        <button class="btn-sm btn-red-reverse px-3">
          Create a disaster report
        </button>
      </router-link>
    </l-control>
    <div v-for="disaster in disasters" :key="disaster.id">
      <l-circle-marker :lat-lng="disaster.location.map.coordinates" :radius="6">
        <l-popup>
          <div :class="`disaster-category disaster-${disaster.category.toLowerCase()}`">
            {{ disaster.category }}
          </div>
          <div class="disaster-name">{{ disaster.name }}</div>
          <div class="disaster-location">{{ disaster.location.name }}</div>
        </l-popup>
      </l-circle-marker>
    </div>
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
  </l-map>
</template>

<script>
import {
  LCircleMarker, LControl, LControlZoom, LMap, LPopup, LTileLayer,
} from 'vue2-leaflet';

export default {
  name: 'DisasterMap',
  props: {
    disasters: Array,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  components: {
    LCircleMarker,
    LControl,
    LControlZoom,
    LMap,
    LPopup,
    LTileLayer,
  },
  data: () => ({
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    center: [-1.5, 120],
    minZoom: 4,
    url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    zoom: 5,
  }),
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.disaster-category {
  font-size: 10px;
  font-weight: bold;
}

.disaster-location {
  color: $GREY;
  font-size: 10px;
}

.disaster-name {
  font-size: 12px;
  font-weight: 500;
}

.disaster-flood {
  color: $BLUE;
}

.disaster-earthquake {
  color: $BROWN;
}

.disaster-tsunami {
  color: $PURPLE;
}

.disaster-wildfire {
  color: $RED;
}

.disaster-landslide {
  color: $GREEN;
}

.disaster-volcano {
  color: $YELLOW;
}

.map {
  border-radius: 26px;
  font-family: 'Rubik', sans-serif;
  height: 550px;
}
</style>
