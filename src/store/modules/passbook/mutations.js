import * as types from './mutation-types'

export default {
  [types.UPDATE_ITEMS] (state,items) {
    state.items = items
  }
}
