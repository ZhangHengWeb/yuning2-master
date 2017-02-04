<template lang="html" >
  <div class="ui fixed menu">
    <div class="ui container">
      <router-link :to="{ name: 'home' }" class="brand" >
        <img class="ui logo" src="../assets/images/logo.png" alt="logo" />
      </router-link>
      <div class="ui large container menu right floated">
        <a class="toc item" @click="mobileMenuVisible = true"><i class="sidebar icon"></i></a>
        <router-link class="item" :to="{name: 'home' }" >首页</router-link>
        <router-link class="item" :to="{name:'video'}">在线视频</router-link>
        <router-link class="item" :to="{name:'multiIntelligence'}">训练课</router-link>
        <router-link class="item" :to="{name:'consult'}">轻咨询</router-link>
        <router-link class="item" :to="{name:'test'}">专业测评</router-link>
        <div class="right item" id="userLogin" >
          <button class="ui tiny olive button" v-if="!userSignInInfo" @click="openLoginModal">
            <i class="icon user"></i>
            登录 | 注册
          </button>
          <user-menu v-if="userSignInInfo" v-bind:userSignInInfo="userSignInInfo"></user-menu>
        </div>
      </div>
      <el-dialog title="菜单" id="mobilePrimaryNav" v-model="mobileMenuVisible" size="large" top="46px" :modal="false">
        <a class="item"  @click="goToRouterLink({name: 'home' })">首页</a>
        <a class="item"  @click="goToRouterLink({name:'video'})">在线视频</a>
        <a class="item"  @click="goToRouterLink({name:'multiIntelligence'})">训练课</a>
        <a class="item"  @click="goToRouterLink({name:'consult'})">轻咨询</a>
        <a class="item" @click="goToRouterLink({name:'test'})">专业测评</a>
        <button class="ui tiny olive button" style="margin-top:10px;" v-if="!userSignInInfo" @click="openLoginModal">
          <i class="icon user"></i>
          登录 | 注册
        </button>
        <user-menu v-if="userSignInInfo" v-bind:userSignInInfo="userSignInInfo"></user-menu>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import UserMenu from './UserMenu'

export default {
  name: 'primary-nav',
  props: ['userSignInInfo'],
  data () {
    return {
      mobileMenuVisible: false,
    }
  },
  components: {
    UserMenu,
  },
  mounted () {

  },
  methods: {
    goToRouterLink (toName) {
      let vm = this
      vm.mobileMenuVisible = false
      vm.$router.push(toName)
    },
    openLoginModal () {
      this.$store.dispatch('TOGGLE_SIMPLE_POPUP',{selector:'#userLoginModal'})
    }
  },
}
</script>
<style lang="scss">
.ui.menu .ui.dropdown .menu>.item {
  padding: 1.5em!important;
}
.ui.search {
  .ui.icon.input {
    margin-top: 20px;
    margin-left: 20px;
  }
}
#mobilePrimaryNav {
  // display: none;
  .el-dialog {
    width:200px;
    left:auto;
    right:0px;
    transform: translateX(0%);
  }
  .el-dialog__title,.el-dialog__close {
    display: none;
  }
  .el-dialog__body {
    padding-top: 0px;
    a {
      &:before{
        display: none;
      }
    }
  }
}
</style>
<style lang="scss" scoped >
.overlay {
  float: right;
  margin: 0em 3em 1em 0em;
}
.overlay .menu {
  position: relative;
  left: 0;
  transition: right 0.5s ease;
}
.overlay.fixed .menu {
  left: 0px;
}
.ui.fixed.menu {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#feffff+80,ededed+100 */
// background: #feffff; /* Old browsers */
// background: -moz-linear-gradient(top,  #feffff 80%, #ededed 100%); /* FF3.6-15 */
// background: -webkit-linear-gradient(top,  #feffff 80%,#ededed 100%); /* Chrome10-25,Safari5.1-6 */
// background: linear-gradient(to bottom,  #feffff 80%,#ededed 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
// filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#feffff', endColorstr='#ededed',GradientType=0 ); /* IE6-9 */
  box-shadow: none;
  .ui.menu .item:before {
    background: none;
  }
}

.logo{
  padding: 0em 2em 0em 0em;
  height: 80px;

  @media only screen and (max-width: 700px) {
    // float: right;
    // transform: scale(0.5);
    width: 80px;
    height: 40px;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 10px;
  }
}
.user-info {

}
.large.menu .active.item {
  color:#25ac38!important;
}
.large.menu, .compact.menu {
  border: none;
  box-shadow: none;
  background-color: transparent;
}
.large.menu {
  .item {
    color:#484848;
  }
  .active.item {
    border-color:#25ac38;
  }
  .toc.item {
    display: none;
  }

  @media only screen and (max-width: 700px) {
    margin-right: 0px!important;
    .ui.search,.item {display: none;}
    #userLogin {display: none;}
    .toc.item {
      // float: left;
      display: block;
    }
  }
}
</style>
