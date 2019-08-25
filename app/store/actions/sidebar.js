import * as types from '../mutation-types'

export const toggleNavBar = (state, displayNavBar) => {
  state.commit(types.DISPLAY_NAVBAR, displayNavBar)
}
