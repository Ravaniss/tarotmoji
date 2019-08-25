import Vue from 'nativescript-vue'
import { ModalStack, overrideModalViewMethod, VueWindowedModal } from 'nativescript-windowed-modal'
import VueDevtools from 'nativescript-vue-devtools'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'

import Home from './views/Home'
import store from './store/store'

overrideModalViewMethod()

Vue.registerElement('ModalStack', () => ModalStack)
Vue.use(VueWindowedModal)
Vue.use(RadSideDrawer)

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(Home)])
}).$start()
