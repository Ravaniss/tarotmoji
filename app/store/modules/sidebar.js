import * as types from '../mutation-types'

const state = {
  displayNavBar: false
}

const mutations = {
  [types.DISPLAY_NAVBAR] (state, displayNavBar) {
    state.displayNavBar = displayNavBar
  }
}

export default {
  state, mutations
}
