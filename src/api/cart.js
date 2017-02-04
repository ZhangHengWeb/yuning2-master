import Vue from 'vue'
import * as api from './api'
import * as types from '../store/mutation-types'

export default {
  checkout ({commit}, data, resolve, reject) {
    const success = res => {
      // console.log(res)
      if (res.body!=null) {
        commit(types.CHECKOUT_REQUEST, res.body)
        resolve(res.body)
      } else {
        commit(types.CHECKOUT_FAILURE, res.body)
        reject(res.body)
      }
    }
    const failure = err => {
      commit(types.CHECKOUT_FAILURE, types.CONNECTION_ERROR)
      reject(err)
    }

    Vue.http
    // .post('http://192.168.16.140:8099/czb-server/czb/api/charge', data,{headers: {Accept: "*/*"}})
    .post(api.API_PATH_CHARGE, data,{headers: {Accept: "*/*"}})
    .then(success, failure)

  },
  charge ({commit}, data, resolve, reject) {

  }

}
