import * as Constants from './constants'

export default (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_LOADING:
            return true
        case Constants.HIDE_LOADING:
            return false
        default:
            return state
    }
}