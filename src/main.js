import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//import semantic ui js
import '../semantic/dist/semantic.css'
import '../semantic/dist/semantic'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

//import components
import App from './App'
import Home from './components/Homepage'
import BookStore from './components/BookStore'

//import store
import store from './store'



const router = new VueRouter({
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    { path: '/home', name: 'home', component: Home },
    {
      path: '/user/:id',
      name: 'userDashboard',
      redirect: '/user/:id/profile',
      component: resolve => require(['./components/UserDashboard.vue'], resolve),
      children:[{
        path: 'profile',
        name: 'profile',
        redirect: '/user/:id/profile/info',
        components: {
          userSection: resolve => require(['./components/UserDashboardProfile.vue'], resolve)
        },
        children:[{
          path: 'info',
          name: 'info',
          components: {
            userMain: resolve => require(['./components/UserInfoModify.vue'], resolve),
          }
        },{
          path: 'modifyPassword',
          name: 'modifyPassword',
          components: {
            userMain: resolve => require(['./components/UserModifyPassword.vue'], resolve),
          }
        },{
          path: 'babyInfo',
          name: 'babyInfo',
          components: {
            userMain: resolve => require(['./components/UserBabyInfo.vue'], resolve),
          }
        }],
      },{
        path: 'account',
        name: 'account',
        redirect: '/user/:id/account/info',
        components: {
          userSection: resolve => require(['./components/AccountDashboard.vue'], resolve)
        },
        children:[{
          path: 'info',
          name: 'accountInfo',
          components: {
            userMain: resolve => require(['./components/AccountInfo.vue'], resolve),
          },
        },{
          path: 'charge',
          name: 'charge',
          components: {
            userMain: resolve => require(['./components/AccountCharge.vue'], resolve),
          },
        },{
          path: 'myCards',
          name: 'myCards',
          components: {
            userMain: resolve => require(['./components/AccountCards.vue'], resolve),
          },
        },{
          path: 'consultRecorder',
          name: 'consultRecorder',
          components: {
            userMain: resolve => require(['./components/UnderConstruction.vue'], resolve),
            // userMain: resolve => require(['./components/AccountConsultList.vue'], resolve),
          },
        },{
          path: 'trainingRecorder',
          name: 'trainingRecorder',
          components: {
            userMain: resolve => require(['./components/UnderConstruction.vue'], resolve),
            // userMain: resolve => require(['./components/AccountTrainingList.vue'], resolve),
          },
        }],
      },{
        path: 'order',
        name: 'order',
        components: {
          userSection: resolve => require(['./components/UnderConstruction.vue'], resolve),
          // userSection: resolve => require(['./components/UserDashboardOrder.vue'], resolve)
        },
      }],
    },
    {
      path: '/needAsk',
      name: 'needAsk',
      component: resolve => require(['./components/MainContent.vue'], resolve),
      children: [{
        path: 'multiIntelligence',
        name: 'multiIntelligence',
        component: resolve => require(['./components/MultiIntelligence.vue'], resolve),
      },{
        path: 'payment/:itemName/',
        name: 'multiIntelligencePayment',
        component: resolve => require(['./components/Payment.vue'], resolve),
      },{
        path: 'multiIntelligenceRoom',
        name: 'multiIntelligenceRoom',
        component: resolve => require(['./components/MultiIntelligenceRoom.vue'], resolve),
      },{
        path: 'multiIntelligenceBook',
        name: 'multiIntelligenceBook',
        component: resolve => require(['./components/MultiIntelligenceBook.vue'], resolve),
      },{
        path: 'multiIntelligenceTest',
        name: 'multiIntelligenceTest',
        component: resolve => require(['./components/MultiIntelligenceTest.vue'], resolve),
      }],
    },
    {
      path: '/payment/:item',
      name: 'payment',
      component: resolve => require(['./components/Payment.vue'], resolve),
      children:[{
        path: '/payment/:item/cart',
        name: 'cart',
        component: resolve => require(['./components/PaymentCart.vue'], resolve),
      },{
        path: '/payment/:item/checkout',
        name: 'checkout',
        component: resolve => require(['./components/PaymentCheckout.vue'], resolve),
      },{
        path: '/payment/:item/result',
        name: 'paymentResult',
        component: resolve => require(['./components/paymentResult.vue'], resolve),
      }]
    },
    {
      path: '/video',
      name: 'video',
      component: resolve => require(['./components/UnderConstruction.vue'], resolve),
    },
    {
      path: '/consult',
      name: 'consult',
      component: resolve => require(['./components/UnderConstruction.vue'], resolve),
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['./components/UnderConstruction.vue'], resolve),
    },
    {
      path: '/construction',
      name: 'construction',
      component: resolve => require(['./components/UnderConstruction.vue'], resolve),
    },
    { path: '/inteltest',
      name: 'inteltest',
      component: resolve => require(['./components/campaign/test/inteltest.vue'],resolve),
    },
    { path: '/attntest',
      name: 'attntest',
      component: resolve => require(['./components/campaign/test/attntest.vue'],resolve),
    },
    { path: '/', redirect: '/home' },
    { path: '*', redirect: '/home' }
  ]
})

Vue.filter('capitalize', function (value) {
  // 返回处理后的值
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1)
    {
        return "0"+value.toString();
    }
    return value.toString();
})


/* appInstance */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})

// new Vue({
//   router,
//   store,
//   el: '#sidebar',
//   template:'<Sidebar/>',
//   components: { Sidebar }
// })
