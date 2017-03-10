import fetch from 'isomorphic-fetch'

import * as Constants from '../constants'

const PHOTOS_URL = 'https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/e5ffa6e7b8e160be478ef2d63b6212581930d2c1/photos.json'

export const fetchPhoto = () => {
    return {
        type: Constants.FETCH_PHOTOS,
        payload: fetch(PHOTOS_URL).then(res => res.json())
    }
}