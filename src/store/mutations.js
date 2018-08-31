import * as types from './mutation-types'

const mutations = {
    [types.SET_RIGHTNAVROOT](state, root) {
        state.rightNavRoot = root
    }
}
export default mutations