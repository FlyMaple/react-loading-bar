import * as Constants from './constants'

export const showLoading = () => {
    return {
        type: Constants.SHOW_LOADING
    }
}

export const hideLoading = () => {
    return {
        type: Constants.HIDE_LOADING
    }
}