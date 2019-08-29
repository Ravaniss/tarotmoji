import Vue from 'nativescript-vue';
import { ModalStack, overrideModalViewMethod, VueWindowedModal } from 'nativescript-windowed-modal';
import VueDevtools from 'nativescript-vue-devtools';
import MultiDrawer from 'nativescript-vue-multi-drawer';

import App from './views/App';
import store from './store/store';

const MapView = require('nativescript-google-maps-sdk').MapView;

overrideModalViewMethod();

Vue.registerElement('ModalStack', () => ModalStack);

Vue.use(VueWindowedModal);
Vue.use(MultiDrawer);

Vue.registerElement('MapView', () => require('nativescript-google-maps-sdk').MapView);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

new Vue({
  store,
  render: (h) => h(App),
}).$start();
