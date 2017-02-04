import Vue from 'vue'
import * as api from './api'
import * as types from '../store/mutation-types'

export default {
  getCourseInfo ({commit}, data, resolve, reject) {
    const success = res => {
      if (res.body) {
        commit([types.GET_COURSE_INFO_SUCCESS],res.body)
        resolve(res.body)
      } else {
        commit([types.GET_COURSE_INFO_FAILURE],res.body)
        reject(res.body)
      }
    }
    // connection failure
    const failure = err => {
      reject(err.body)
    }

    Vue.http
    .get(api.API_PATH_GET_COURSE_INFO)
    .then(success, failure)
  },
  getCourseRemainTime ({commit}, data , resolve, reject) {
    const success = res => {
      if (res.body.isSuccess) {
        commit([types.ACCOUNT_GET_COURSE_INFO_SUCCESS],res.body)
        resolve(res.body)
      } else {
        commit([types.ACCOUNT_GET_COURSE_INFO_FAILURE],res.body)
        reject(res.body)
      }

    }
    // connection failure
    const failure = err => {
      reject(err.body)
    }
    Vue.http
    .post(api.API_PATH_ACCOUNT_COURSE_REMAIN_TIME, data)
    .then(success, failure)
  },
  getUserBookedCourse ({commit}, data , resolve, reject) {
    const success = res => {

      if (res.body) {
        commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_SUCCESS],res.body)
        resolve(res.body)
      } else {
        commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_FAILURE],res.body)
        reject(res.body)
      }

    }
    // connection failure
    const failure = err => {
      reject(err.body)
    }
    Vue.http
    .post(api.API_PATH_USER_GET_BOOKED_TRAIN_COURSE, data)
    .then(success, failure)
  },
  getAvaiableBookedTime ({commit}, data , resolve, reject) {
    const success = res => {

      if (res.body) {
        // commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_SUCCESS],res.body)
        resolve(res.body)
      } else {
        // commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_FAILURE],res.body)
        reject(res.body)
      }

    }
    // connection failure
    const failure = err => {
      reject(err.body)
    }
    Vue.http
    .post(api.API_PATH_GET_AVAIABLE_BOOKED_TIME, data)
    .then(success, failure)
  },
  bookingCourse ({commit}, data , resolve, reject) {
    const success = res => {

      if (res.body) {
        // commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_SUCCESS],res.body)
        resolve(res.body)
      } else {
        // commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_FAILURE],res.body)
        reject(res.body)
      }

    }
    // connection failure
    const failure = err => {
      reject(err.body)
    }

    // .post('http://192.168.16.178:8099/czb-server/czb/api/trainBook', data)

    Vue.http
    .post(api.API_PATH_USER_BOOKING_COURSE, data)
    .then(success, failure)
  },
  cancelEvent ({commit}, data , resolve, reject) {
    const success = res => {

      if (res.body) {
        // commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_SUCCESS],res.body)
        resolve(res.body)
      } else {
        // commit([types.ACCOUNT_GET_BOOKED_COURSE_INFO_FAILURE],res.body)
        reject(res.body)
      }

    }
    // connection failure
    const failure = err => {
      reject(err.body)
    }

    Vue.http
    .post(api.API_PATH_USER_CANCEL_BOOKED_COURSE, data)
    .then(success, failure)

  }
}
