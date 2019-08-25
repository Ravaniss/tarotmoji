import * as types from '../mutation-types'

const state = {
  displayNavBar: false
}

const mutations = {
  [types.DISPLAY_NAVBAR] (state, data) {
    state.displayNavBar = data
  }
}

export default {
  state, mutations
}
