<template lang="html">
  <div>
    <div class="ui container" >
      <div class="ui grid stackable">
      <div class="four wide column">
        <h2 class="ui header olive">
          <i class="payment icon"></i>
          <div class="content">
            结算中心
          </div>
        </h2>
      </div>
      <div class="twelve wide column">
        <steps :steps="steps" :currentSteps="PAYMENT_STEP" aligned="right"></steps>
      </div>
    </div>
  </div>
  <router-view class="main"></router-view>
  </div>
</template>

<script>
import Steps from './Steps'
import {mapGetters} from 'vuex'

export default {
  name:'payment',
  beforeRouteEnter (route, from, next) {
    if (window.localStorage.USER_SIGN_IN_INFO) {
      next(vm => {
        // console.log(vm)

      })
    } else {
      next(vm=>{

        // if the user closed the modal and not proceed
        vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
          selector:'#userLoginModal',
          onHide () {
            vm.$router.replace('/needAsk/multiIntelligence')
          }
        })

        vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
          selector:'#userRegisterModal',
          needToggle:'hide',
          onHide () {
            vm.$router.replace('/needAsk/multiIntelligence')
          }
        })

        vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
          selector:'#userForgetPassword',
          needToggle:'hide',
          onHide () {
            vm.$router.replace('/needAsk/multiIntelligence')
          }
        })

        // if the user has success loged in
        vm.$store.state.userRegLog.USER_LOGIN_REDIRECT = '/payment/multiIntelligence/cart'
        vm.$store.state.userRegLog.USER_LOGIN_REDIRECT_BEHAVIOR = function(){
          // vm.getUserBookedInfo()
          vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{selector:'#userLoginModal'})
        }
      })
    }
  },
  components: {
    Steps,
  },
  data () {
    return {
      steps: [
        {'name':'确认定单'},
        {'name':'支付定单'},
        {'name':'定单完成'},
      ],
    }
  },
  computed:{
    ...mapGetters(['PAYMENT_STEP'])
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-weight: normal;
}
.mainContent {
  background-color: #f5f5f5;
  padding-top: 10rem;
  padding-bottom: 10rem;

  min-height: 86vh;

  @media only screen and (max-width: 700px) {
    padding-top: 64px;
  }
  .main {
    margin-top: 3rem;
  }
}

</style>
