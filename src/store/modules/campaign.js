import campaignApi from '../../api/campaign'
import * as types from '../mutation-types'

const state = {
  [types.CAMPAIGN_DATA]: {
    server:undefined,
    local:undefined,
  },
}

const actions = {
  [types.CAMPAIGN_GET_DATA]({ commit, state }, data) {
    return new Promise((resolve,reject)=>{
      campaignApi.getCampaign({ commit,state }, data, resolve, reject)
    })
  },
  [types.CAMPAIGN_POST_DATA]({ commit, state }, data) {
    return new Promise((resolve,reject)=>{
      campaignApi.postCampaign({ commit,state }, data, resolve, reject)
    })
  },
}
const mutations = {
  [types.CAMPAIGN_COMMIT_DATA] ( state , payload) {
    state[types.CAMPAIGN_DATA]['server'] = JSON.parse(payload)
  },
}

const getters = {
  [types.CAMPAIGN_DATA]: state => state[types.CAMPAIGN_DATA],
}

export default {
  state,
  actions,
  mutations,
  getters,
}
