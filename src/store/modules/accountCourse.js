import courseApi from '../../api/course'
import * as types from '../mutation-types'

const state = {
  [types.COURSE_INFO]:[],
  [types.COURSE_INFO_REF]:{
    fieldOne:["身体运动", "观察能力", "数学逻辑", "空间思维", "语言表达", "人际交往", "自我知觉", "艺术与创造","视觉注意","听觉注意","问题解决能力"],
    fieldTwo: [
    	["平衡能力", "力量和耐力", "动作灵敏", "手眼协调"],
    	["自然观察", "主动探索", "特征识别", "体系化思维"],
    	["策略性思维", "财商训练", "实验性思维", "数字记忆"],
    	["形状与空间", "空间构想", "空间与平面的转换", "意识空间"],
    	["倾听", "阅读", "书写", "演说"],
    	["品性修养", "团队融入", "领导力", "自我保护"],
    	["规则感", "目标管理", "情绪管理", "内省反思"],
    	["艺术与表达", "审美与应用", "领悟与再创造", "联想与改造"],
    	["视觉分辨", "视觉记忆", "视觉理解", "物体恒长"],
    	["听觉分辨", "听觉记忆", "听觉理解", "听动协调"],
    	["策略性思维", "语言逻辑", "情绪管理", "目标管理"]
    ],
  },
  [types.ACCOUNT_COURSE_INFO]: [],
  [types.ACCOUNT_BOOKED_COURSE_INFO]: [],
}

const actions = {
  [types.GET_COURSE_INFO] ({commit}, data) {
    return new Promise((resolve, reject) => {
      courseApi.getCourseInfo( {commit}, data, resolve, reject )
    })
  },
  [types.ACCOUNT_GET_COURSE_INFO_ACTION] ({commit}, data) {
    return new Promise((resolve, reject) => {
      courseApi.getCourseRemainTime( {commit}, data, resolve, reject )
    })
  },
  [types.ACCOUNT_GET_BOOKED_COURSE_INFO_ACTION] ({commit}, data) {
    return new Promise((resolve, reject) => {
      courseApi.getUserBookedCourse( {commit}, data, resolve, reject )
    })
  },
  [types.GET_AVAIABLE_COURSE_TIME] ({commit}, data) {
    return new Promise((resolve, reject) => {
      courseApi.getAvaiableBookedTime( {commit}, data, resolve, reject )
    })
  },
  [types.USER_BOOKING_COURSE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      courseApi.bookingCourse( {commit}, data, resolve, reject )
    })
  },
  [types.USER_CANCEL_COURSE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      courseApi.cancelEvent( {commit}, data, resolve, reject )
    })
  },
}

const mutations = {
  [types.GET_COURSE_INFO_SUCCESS] (state, payload) {
    state[types.COURSE_INFO] = payload
  },
  [types.GET_COURSE_INFO_FAILURE] (state, payload) {
    state[types.COURSE_INFO] = payload
  },
  [types.ACCOUNT_GET_COURSE_INFO_SUCCESS] (state, payload) {
    state[types.ACCOUNT_COURSE_INFO] = payload
  },
  [types.ACCOUNT_GET_COURSE_INFO_FAILURE] (state, payload) {
    state[types.ACCOUNT_COURSE_INFO] = payload
  },
  [types.ACCOUNT_GET_BOOKED_COURSE_INFO_SUCCESS] (state, payload) {
    state[types.ACCOUNT_BOOKED_COURSE_INFO] = payload
  },
  [types.ACCOUNT_GET_BOOKED_COURSE_INFO_FAILURE] (state, payload) {
    state[types.ACCOUNT_BOOKED_COURSE_INFO] = payload
  },
}

const getters = {
  [types.COURSE_INFO]: state => state[types.COURSE_INFO],
  [types.COURSE_INFO_REF]: state => state[types.COURSE_INFO_REF],
  [types.ACCOUNT_COURSE_INFO]: state => state[types.ACCOUNT_COURSE_INFO],
  [types.ACCOUNT_BOOKED_COURSE_INFO] (state) {

    let bookedCourseData = state[types.ACCOUNT_BOOKED_COURSE_INFO].map((item) => {

      let cancelStatus = item.cancelStatus == 1 ? 'el-icon-time':'el-icon-check'
      let progress = item.statu == 1 ? 'is-finished':''
      let eventItemCss = cancelStatus + ' '+ progress
      let month = item.month<10?'0'+item.month:item.month
      let day = item.day<10?'0'+item.day:item.day
      let date = item.year+'-'+month+'-'+day

      let itemData = {
        title:item.courseName,
        start: date,
        end: date,
        cssClass: eventItemCss,
        courseData:item,
      }

      return itemData
    })
    return bookedCourseData
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
