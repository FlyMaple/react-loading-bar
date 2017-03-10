import { createStore, applyMiddleware, combineReducers } from 'redux'

import promiseMiddleware from 'redux-promise-middleware'
import loadingBarMiddleware from '../components/LoadingBar/middleware'

import reducers from '../reducers'
import loadingBarReducers from '../components/LoadingBar/reducers'

export default createStore(
    combineReducers({
        reducers,
        loadingBarReducers
    }),
    applyMiddleware(
        promiseMiddleware(),
        loadingBarMiddleware()
    )
)