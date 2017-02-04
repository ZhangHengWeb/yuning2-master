import orderApi from '../../api/order'
import * as types from '../mutation-types'

const actions = {
  [types.USER_GET_HISTORY_RECEIVE_ADDRESS]({ commit }, data) {
    return new Promise((resolve,reject)=>{
      orderApi.getHistoryAddressList({ commit }, data, resolve, reject)
    })
  },
  [types.USER_ADD_SHIP_ADDRESS]({ commit }, data) {
    return new Promise((resolve,reject)=>{
      orderApi.addNewShipInfo({ commit }, data, resolve, reject)
    })
  },
  [types.USER_REMOVE_SHIP_ADDRESS]({ commit }, data) {
    return new Promise((resolve,reject)=>{
      orderApi.removeShipInfo({ commit }, data, resolve, reject)
    })
  },
  [types.USER_SET_DEFAULT_SHIP_ADDRESS]({ commit }, data) {
    return new Promise((resolve,reject)=>{
      orderApi.setDefaultAddress({ commit }, data, resolve, reject)
    })
  },
}

export default {
  actions,
}
