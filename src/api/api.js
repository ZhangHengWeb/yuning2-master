//live
export const API_ROOT = 'https://mp2.yuningwang.com'
// staging
// export const API_ROOT = 'http://192.168.16.178:8099/czb-server'

// export const API_ROOT_LIVE = 'http://mp1.yuningwang.com'
export const DEV_ROOT_PHP = 'http://192.168.16.160:9090' //奉慈本地服务器
export const DEV_ROOT_JAVA = 'http://192.168.16.140:8099' //宗主本地服务器

export const HTTP_PRIMARY_LIVE = 'http://mp.yuningwang.com' //  HTTP+PHP ?
export const HTTP_SECONDARY_LIVE = 'https://mp1.yuningwang.com' // HTTP JAVA?
export const HTTPS_LIVE = 'https://mp2.yuningwang.com' // HTTPS



// * : must
// @ : at least one
// | : optional

// 2.1 -> 2.19

// 2.2 mobile*
export const API_PATH_USER_GET_VERIFY_CODE = API_ROOT + 'czb/user/sendMsg'

// 2.3 mobile*|passWord*|verify_code*|register_from:'web'*
export const API_PATH_USER_REGIST = API_ROOT + '/czb/user/userRegist'

// 2.4 mobile*|passWord*|verify_code*
export const API_PATH_USER_MODIFY_PASSWORD = API_ROOT + '/czb/user/passWordModify'

// 2.5 mobile*|verify_code*
export const API_PATH_USER_CHK_VERIFY_CODE = API_ROOT + '/czb/user/msgCheck'

// 2.6 user_id*|mobile*
export const API_PATH_USER_CHK_MOBILE = API_ROOT + '/czb/user/mobileCheck'

// 2.7 user_id*|mobile*|verify_code*
export const API_PATH_USER_MODIFY_PHONE = API_ROOT + '/czb/user/mobileModify'

// 2.8 user_id*|gender@|region@|email@|nickname@
export const API_PATH_USER_MODIFY_INFO = API_ROOT + '/czb/user/userInfoModify'

// START TODO:....
// 2.9 user_id*|course_id*|status*
export const API_PATH_USER_ADD_COLLECT_COURSE = API_ROOT + '/czb/user/collectCourse'

// 2.10 user_id*|program_id*|status*
export const API_PATH_USER_ADD_COLLECT_PROGRAM = API_ROOT + '/czb/user/programCollect'

// 2.11 id*
export const API_PATH_USER_GET_FAVORITES_COURSE = API_ROOT + '/czb/user/favoritesCourse'

// 2.12 id*
export const API_PATH_USER_GET_FAVORITES_PROGRAM = API_ROOT + '/czb/user/favoritesProgram'
// END TODO:....

// 2.13 user_id*
export const API_PATH_USER_GET_CHILD = API_ROOT + '/czb/user/userChild'

// 2.14 user_id*|baby_name*|baby_gender*|baby_birth*
export const API_PATH_USER_ADD_CHILD = API_ROOT + '/czb/user/saveChild'

// 2.15 id*|baby_name@|baby_gender@|baby_birth@
export const API_PATH_USER_MODIFY_CHILD = API_ROOT + '/czb/user/editChild'

// 2.15 id*
export const API_PATH_USER_REMOVE_CHILD = API_ROOT + '/czb/user/deleteChild'

// 2.16 uid*|avatar*|type*
export const API_PATH_USER_UPLOAD_AVATAR = API_ROOT + '/czb/user/uploadAvatar'

// 2.19 username*|password*|from='web'*|type='1'
export const API_PATH_USER_LOGIN = API_ROOT + '/czb/user/login'

/* ACCOUNT SECTION */
// 2.40 user_id*|courseId*
export const API_PATH_ACCOUNT_COURSE_REMAIN_TIME = API_ROOT + '/czb/user/queryLeftHour'

// 2.43 user_id*
export const API_PATH_ACCOUNT_CARD_LIST = API_ROOT + '/czb/api/queryCardInfo'

// 2.45 card_no*|card_pwd*|user_id*
export const API_PATH_ACCOUNT_CARD_ACTIVE = API_ROOT + '/czb/api/activateCard'

// 2.48 use_id*
export const API_PATH_ACCOUNT_LEFT_COIN = API_ROOT + '/czb/api/queryLeftCoin'

/* PRODUCT SECTION */
// export const API_PATH_COURSE_LIST = 'http://mp.yuningwang.com/tczmall/itemList/desktop/0/1/10/1'

/* multi-intelligence-room */
// 3.0 get getSig
export const API_PATH_RL_YTX_GETSIG = API_ROOT + '/czb/api/getSig'

// 3.1 userId*|
export const API_PATH_GET_BOOKED_MI_COURSE_LIST = API_ROOT + '/czb/api/getTrainBooked'

/*  CART SECTION */
// 4.1 payment ping ++
export const API_PATH_CHARGE = API_ROOT + '/czb/api/charge'

// 4.2 get user history ship address (DATA IN FORM FORMAT): *user_id
export const API_PATH_GET_USER_DELIEVER_ADDRESS = 'http://mp.yuningwang.com/user/get_deliever_addr'

// 4.3 add/remove/modify ship address  (type = A|D|E): *id
export const API_PATH_USER_SHIP_ADDRESS = 'http://mp.yuningwang.com/user/deliever_addr'

/* BOOK COURSE SECTION */
// 5.0 null
export const API_PATH_GET_COURSE_INFO = API_ROOT + '/czb/api/trainCourse'

// 5.1 *user_id
export const API_PATH_USER_GET_BOOKED_TRAIN_COURSE = API_ROOT + '/czb/api/getTrainBooked'

// 5.2 *courseId|*userId|*year|*month|*day|*courseType(1正式:2体验)
export const API_PATH_GET_AVAIABLE_BOOKED_TIME = API_ROOT + '/czb/api/getTrainBook'

// 5.3 *courseId:|*year|*month|*day|*hour|*userId|*useTimeNum|*fieldOne|*fieldTwo|*courseType
export const API_PATH_USER_BOOKING_COURSE = API_ROOT + '/czb/api/trainBook'

// 5.4 *id
export const API_PATH_USER_CANCEL_BOOKED_COURSE = API_ROOT + '/czb/api/deleTrainBooked'
