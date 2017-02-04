import Vue from 'vue'
import * as api from './api'
import * as types from '../store/mutation-types'

export default {
  getHistoryAddressList ({commit}, data, resolve, reject) {
    const success = res => {
      if (res.body!=null) {
        resolve(res)
      } else {
        reject(res)
      }
    }
    const failure = err => {
      reject(err)
    }

    Vue.http
    .post(api.API_PATH_GET_USER_DELIEVER_ADDRESS, {user_id:data}, {emulateJSON: true})
    .then(success, failure)

  },
  addNewShipInfo ({commit}, data, resolve, reject) {
    const success = res => {
      if (res.body!=null) {
        resolve(res)
      } else {
        reject(res)
      }
    }
    const failure = err => {
      reject(err)
    }

    Vue.http
    .post(api.API_PATH_USER_SHIP_ADDRESS, data, {emulateJSON: true})
    .then(success, failure)
  },
  setDefaultAddress ({commit}, data, resolve, reject) {
    const success = res => {
      if (res.body!=null) {
        resolve(res)
      } else {
        reject(res)
      }
    }
    const failure = err => {
      reject(err)
    }

    Vue.http
    .post(api.API_PATH_USER_SHIP_ADDRESS, data, {emulateJSON: true})
    .then(success, failure)
  },
  modifyShipInfo ({commit}, data, resolve, reject) {
    const success = res => {
      if (res.body!=null) {
        resolve(res)
      } else {
        reject(res)
      }
    }
    const failure = err => {
      reject(err)
    }

    Vue.http
    .post(api.API_PATH_USER_SHIP_ADDRESS, data, {emulateJSON: true})
    .then(success, failure)
  },
  removeShipInfo ({commit}, data, resolve, reject) {
    const success = res => {
      if (res.body!=null) {
        resolve(res)
      } else {
        reject(res)
      }
    }
    const failure = err => {
      reject(err)
    }

    Vue.http
    .post(api.API_PATH_USER_SHIP_ADDRESS, data, {emulateJSON: true})
    .then(success, failure)
  }
}
