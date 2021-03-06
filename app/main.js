import Vue from 'nativescript-vue';
import { ModalStack, overrideModalViewMethod, VueWindowedModal } from 'nativescript-windowed-modal';
import VueDevtools from 'nativescript-vue-devtools';
import MultiDrawer from 'nativescript-vue-multi-drawer';
const firebase = require("nativescript-plugin-firebase");

import App from './views/App';
import store from './store/store';

const MapView = require('nativescript-google-maps-sdk').MapView;

overrideModalViewMethod();

Vue.registerElement('ModalStack', () => ModalStack);
Vue.registerElement("MLKitTextRecognition", () => require("nativescript-plugin-firebase/mlkit/textrecognition").MLKitTextRecognition);

Vue.use(VueWindowedModal);
Vue.use(MultiDrawer);

firebase.init({
  onDynamicLinkCallback: result => {
    console.log("Dynamic Link received: " + result);
    console.log("Dynamic Link received, url: " + result.url);
    if (result.url.indexOf("/shit") > -1) {
      // note that you could deeplink/route the user now, but let's just show an alert
    }
  }
}).then(
  function () {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

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
