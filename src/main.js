/* eslint-disable global-require */
import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
