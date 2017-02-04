<template>
      <div id="app" >
          <primary-nav v-bind:userSignInInfo="USER_SIGN_IN_INFO"></primary-nav>
          <router-view class="mainContent"></router-view>
          <sticky-footer></sticky-footer>
          <user-login-modal class="user-login coupled" id="userLoginModal"></user-login-modal>
      </div>
</template>
<script>
import PrimaryNav from './components/PrimaryNav'
import UserLoginModal from './components/UserLoginModal'
import StickyFooter from './components/StickyFooter'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    PrimaryNav,
    StickyFooter,
    UserLoginModal,
  },
  created () {
      this.$store.dispatch('USER_CHECK_IN')
  },
  computed: mapGetters(['USER_SIGN_IN_INFO']),
  mounted () {

  },
  destroyed () {

  }
}
</script>

<style lang="scss">
.swiper-pagination-bullet-active {
  background-color: #22a231!important;
}
@media only screen and (max-width: 700px) {
  .responsive-element-dialog {
    width: 90vw!important;
  }
}
.text.olive {
  color:#22a231;
}
//element ui overrid
//button
.el-button:focus, .el-button:hover,.el-dialog__close:hover  {
    color: #22a231;
    border-color: #22a231;
}

//table
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
.el-row.address {
  margin: 0px!important;
  .el-col {
    padding:0px!important;
    padding-right: 5px!important;
  }
}
.el-input-number__decrease.el-icon-minus {
  left:0px;
  border-right:1px solid #c0ccda;
}
.el-input-number .el-input__inner {
  padding-left: 41px;
  padding-right: 41px;
  text-align: center;
}
//calendar cancel event
.event-item {
  background-color: #22a231!important;
  padding: 3px 0px;
  font-weight: bold;
  color: #fff!important;
  display: block;
  &.is-finished {
    background-color: #adadad!important;
  }
  &.is-start {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;

    &:before{
      display: inline-block;
    }
  }
  &.is-end {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  &:before{
    display: none;
    color:#fff;
  }
}
//progress
.el-progress.is-success .el-progress-bar__inner {
  background-color: #22a231!important;

}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #22a231;
  background: #22a231;
}
//selector

.el-select-dropdown__item.selected,.el-select-dropdown__item.selected.hover,.el-select-dropdown__item.selected {
  background-color: #22a231!important;
}
//radio
.el-radio-button.is-active {
  .el-radio-button__inner {
    background-color: #22a231!important;
    border-color: #22a231!important;
    &:hover{
      color:#fff!important;

    }
  }
}
// form
.el-form {
  text-align: left;
}
// #a23737
.el-radio-button__inner {
  &:hover{
    color:#22a231!important;
  }
}

</style>
<style lang="scss" scoped>
  #app{
    // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  #homepage.mainContent {
    padding-top: 0px;
  }

</style>
<style >

@-webkit-keyframes scroll-down-anim {
	0%{ bottom: 2px; }
	50%{ bottom: 7px; }
	100%{ bottom: 2px; }
}
@-moz-keyframes scroll-down-anim {
	0%{ bottom: 2px; }
	50%{ bottom: 7px; }
	100%{ bottom: 2px; }
}
@-o-keyframes scroll-down-anim {
	0%{ bottom: 2px; }
	50%{ bottom: 7px; }
	100%{ bottom: 2px; }
}
@keyframes scroll-down-anim {
	0%{ bottom: 2px; }
	50%{ bottom: 7px; }
	100%{ bottom: 2px; }
}

@keyframes masthead {
 0% {
    background-position: 0% 0%;
 }
 100% {
    background-position: 0% -475px;
 }

}

@-moz-keyframes masthead {
 0% {
   background-position: 0% 0%;
 }
 100% {
   background-position: 0% -475px;
 }
}

@-webkit-keyframes masthead {
 0% {
   background-position: 0% 0%;
 }
 100% {
   background-position: 0% -475px;
 }
}

@-ms-keyframes masthead {
 0% {
   background-position: 0% 0%;
 }
 100% {
  background-position: 0% -475px;
 }
}

@-o-keyframes masthead {
 0% {
   background-position: 0% 0%;
 }
 100% {
   background-position: 0% -475px;
 }

}
</style>
