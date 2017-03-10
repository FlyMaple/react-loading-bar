import { showLoading, hideLoading } from './actions'

const PROMISE_STATE = ['_PENDING', '_FULFILLED', '_REJECTED']

export default function loadingBarMiddleware() {
    const [PENDING, FULFILLED, REJECTED] = PROMISE_STATE

    return ({dispatch}) => (next) => (action) => {
        const isPending = new RegExp(`${ PENDING }`, 'g')
        const isFulfilled = new RegExp(`${ FULFILLED }`, 'g')
        const isRejected = new RegExp(`${ REJECTED }`, 'g')
        
        if (action.type.match(isPending)) {
            dispatch(showLoading())
        } else if (action.type.match(isFulfilled) ||
                   action.type.match(isRejected)) {
            dispatch(hideLoading())
        }

        next(action)
    }
    
}