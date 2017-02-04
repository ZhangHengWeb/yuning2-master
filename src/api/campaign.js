import Vue from 'vue'
import * as api from './api'
import * as types from '../store/mutation-types'

export default {
  getCampaign ({commit}, url, resolve, reject) {
    const success = res => {

      if (res.body) {

        commit([types.CAMPAIGN_COMMIT_DATA],res.body)
        resolve(res.body)

      } else {
        reject()
      }
    }
    const failure = err => {
      reject(err)
    }

    Vue.http
    .get(url,{headers: {Accept: "*/*"}})
    .then(success, failure)
  },
  postCampaign ({commit}, data, resolve, reject) {
    const success = res => {

      if (res.body) {

        // commit([types.CAMPAIGN_COMMIT_DATA],res.body)
        resolve(res.body)

      } else {
        reject()
      }
    }
    const failure = err => {
      reject(err)
    }

    Vue.http
    .post(data.url,data.payload,{headers: {'Content-Type': 'multipart/form-data'}})
    .then(success, failure)
  },
}
