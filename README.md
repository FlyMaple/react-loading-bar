# LoadingBar

create-react-app + React + Redux + redux-promise-middleware

Demo: http://flymaple.github.io/react-loading-bar/

## Install

* npm install -g create-react-app
* create-react-app demo
* cd demo
* npm i --save isomorphic-fetch es6-promise
* npm i --save redux-promise-middleware
* download components/LoadingBar into components/

## Dependency

* react
* redux
* react-redux
* redux-promise-middleware
  * https://github.com/pburtchaell/redux-promise-middleware
* isomorphic-fetch
  * https://github.com/matthew-andrews/isomorphic-fetch

## Using

### Store

``` JS
import { createStore, applyMiddleware, combineReducers } from 'redux'

import promiseMiddleware from 'redux-promise-middleware'
import loadingBarMiddleware from '../components/LoadingBar/middleware'

import loadingBarReducers from '../components/LoadingBar/reducers'

export default createStore(
    combineReducers({
        loadingBarReducers
    }),
    applyMiddleware(
        promiseMiddleware(),
        loadingBarMiddleware()
    )
)
```

### React Component
``` JS
import React, { Component } from 'react';
import { connect } from 'react-redux'
import $ from 'jquery'

import { fetchPhoto } from '../actions'

import * as LoadingBarAction from './LoadingBar/actions'
import LoadingBar from './LoadingBar'
import Photos from './Photos'

class App extends Component {
    /**
     * 監聽 jQuery Ajax 開始結束事件
     */
    componentDidMount() {
        $(document).on('ajaxStart', this.showLoading)
        $(document).on('ajaxStop', this.hideLoading)
    }

    /**
     * 執行 ActionCreate，跑 Redux 流程
     * fetchPhoto，會回傳 { type: 'FETCH_PHOTO', payload: promise }
     * 這種回傳格式中有 payload，是要符合 redux-promise-middleware 的定義
     * 有 payload，middleware 才會在 fetch 前呼叫 { type: 'FETCH_PHOTO_PENDING' }
     * fetch 完成後呼叫 { type: 'FETCH_PHOTO_FULFILLED' } 或是 { type: 'FETCH_PHOTO_REJECTED' }
     * middle會幫我們做額外的呼叫 ['_PENDING', '_FULFILLED', '_REJECTED']
     */
    fetchPhotos = () => {
        this.props.dispatch(fetchPhoto())
    }

    /**
     * 若是不使用 redux-promise-middle，可以於 Component 中自行呼叫
     * LoadingBar 提供兩個 action: showLoading、hideLoading
     */
    withMiddleware = () => {
        this.showLoading()

        setTimeout(() => {
            this.hideLoading()
        }, 1500)
    }

    /**
     * 若專案中有使用 jQuery ajax
     * 直接使用 jQuery.ajax 就可以，因為載 componentDidMount 有先行定義監聽
     */
    jqAjax = () => {
        $.ajax({
            url: ''
        })
    }

    /**
     * 包裝 Loadingbar showLoading action
     */
    showLoading = () => {
        this.props.dispatch(LoadingBarAction.showLoading())
    }

    /**
     * 包裝 Loadingbar hideLoading action
     */
    hideLoading = () => {
        this.props.dispatch(LoadingBarAction.hideLoading())
    }

    render() {
        return (
            <div id="app">
                <LoadingBar />
                <button onClick={ this.fetchPhotos }>Fetch Photos</button>
                <button onClick={ this.withMiddleware }>with Middleware</button>
                <button onClick={ this.jqAjax }>jQuery Ajax</button>

                <Photos />
            </div>
        );
    }
}

export default connect()(App);
```

## LoadingBarMiddleware

``` JS
import { showLoading, hideLoading } from './actions'

const PROMISE_STATE = ['_PENDING', '_FULFILLED', '_REJECTED']

export default function loadingBarMiddleware() {
    const [PENDING, FULFILLED, REJECTED] = PROMISE_STATE

    //  currying
    //  dispatch is new dispatch
    //  next is origial dispatch
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
```

## Refs

* react-redux-loading-bar
  * https://github.com/mironov/react-redux-loading-bar
  * https://mironov.github.io/react-redux-loading-bar/
  * Source code
    * https://github.com/mironov/react-redux-loading-bar/tree/gh-pages/src
