import cartApi from '../../api/cart'
import * as types from '../mutation-types'

const state = {
  [types.PAYMENT_STEP]:0,
  [types.PAYMENT_LIST]:[],
  [types.CHECKOUT_REQUEST]:null,
  [types.CHECKOUT_SUCCESS]:null,
  [types.CHECKOUT_FAILURE]:null,
}
const actions = {
  [types.ADD_TO_CART] ({commit}, data) {
    console.log('vuex',data)
    // return new Promise((resolve, reject) => {
    //   babyApi.addChild({commit}, data, resolve, reject)
    // })
  },
  [types.PAYMENT_CHECKOUT] ({commit}, data) {
    return new Promise((resolve, reject) => {
      cartApi.checkout({commit}, data, resolve, reject)
    })
  },
  [types.PAYMENT_CHARGE] ({commit},data) {
    return new Promise((resolve, reject) => {
      cartApi.charge({commit},data, resolve, reject)
    })
  },
}
const mutations = {
  [types.CHECKOUT_REQUEST] (state,payload) {
    state[types.CHECKOUT_REQUEST] = payload
    state[types.CHECKOUT_FAILURE] = null
    state[types.CHECKOUT_SUCCESS] = null
  },
  [types.CHECKOUT_FAILURE] (state,payload) {
    state[types.CHECKOUT_REQUEST] = null
    state[types.CHECKOUT_FAILURE] = payload
    state[types.CHECKOUT_SUCCESS] = null
  },
  [types.CHECKOUT_SUCCESS] (state,payload) {
    state[types.CHECKOUT_SUCCESS] = true
    state[types.CHECKOUT_FAILURE] = null
    state[types.CHECKOUT_REQUEST] = null
  },
}
const getters = {
  [types.PAYMENT_STEP]: state => state[types.PAYMENT_STEP],
  [types.PAYMENT_LIST]: state => state[types.PAYMENT_LIST],
}
export default {
  state,
  getters,
  actions,
  mutations
}
