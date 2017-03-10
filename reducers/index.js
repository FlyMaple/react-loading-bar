import initState from '../initState'

import * as Constants from '../constants'

export default (state = initState, action) => {
    switch (action.type) {
        case `${ Constants.FETCH_PHOTOS }_FULFILLED`:
            const index = Math.floor(Math.random() * 1000)
            
            return {
                ...state,
                photos: action.payload.splice(index, 5)
            }
        default:
            return state
    }
}