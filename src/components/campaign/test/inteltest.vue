<template lang="html">
  <div class="ui fluid container">
    <div class="ui container" >
        <div class="ui segment stacked">

          <template v-if="loading==false">

              <div class="ui olive ribbon label">
                <i class="eye icon"></i> 多元智能测试 - 第{{local.user_at+1}}题 <small>({{completed}}已经完成)</small>
              </div>
                <transition name="slide-fade" appear>
                   <transition-group name="list" tag="div" >
                    <div class="ui basic segment" v-if="local.user_at==index" v-bind:key="question" v-for="(question,index) in questions">
                      <div class="ui basic segment  padded">
                          <h3 class="ui header">{{question.question_text}}</h3>
                      </div>
                      <div class="ui divided selection medium list">
                          <a class="item"
                          v-for="(answer,index) in question.answers"
                          v-bind:key="answer"
                          @click="selected(index)">
                            <div
                            :class="[local.answer_sheet[question.question_id] ===answer.option_id?'olive':'grey']"
                            class="ui horizontal label"
                              style="text-transform: uppercase;">
                              {{String.fromCharCode(97 + index)}}
                            </div>
                            {{answer.option_text}}
                          </a>
                      </div>
                    </div>
                </transition-group>
              </transition>
              <div class="ui segment basic">
                <el-progress :text-inside="true" :stroke-width="14" :percentage="percentage" status="success"></el-progress>
              </div>
              <div class="ui segment center aligned basic">
                <div class="ui buttons" >
                    <button class="ui labeled icon button olive" @click="prev" >
                      <i class="left chevron icon"></i>
                      上一题
                    </button>
                    <button class="ui right labeled icon button olive"  @click="next">
                      下一题
                      <i class="right chevron icon"></i>
                    </button>
                  </div>

              </div>

              <div class="ui segment center aligned basic">
                <div v-if="reachedEnd && completed!=questions.length" class="ui warning message">您还有题目没有完成...</div>
                <button v-if="completed==questions.length" class="ui right labeled icon button green" @click="submit">
                  完成, 提交!
                  <i class="right flag checkered icon"></i>
                </button>

                <div class="ui divider"></div>
                <a class="ui circular label"  v-for="item in completion" :class="labelClass(item)" >{{item.id+1}}</a>
              </div>
            </template>
            <template v-else>
                <div class="ui active centered inline loader"></div>
            </template>
        </div>

    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name:'inteltest',
  data () {
    return {
      loading:true,
      local:{
        user_at:0,
        answer_sheet:{},
      },
      jumpTo:'',
      completion: [],
      campaign:{
        host:'http://mp.yuningwang.com',
        path:'/quiz/intelQues',
        submitTo:'http://mp.yuningwang.com/quiz/intelSubmit',
      },
      reachedEnd:false,
    }
  },
  computed: {
    questions (){
      return this.CAMPAIGN_DATA['server']['data']['questions']
    },
    completed (vm) {
      return vm.completion.filter(item=>item.value ===true).length
    },
    percentage () {
      let vm = this
      return Math.round(vm.completed/vm.questions.length*100)
    },
    ...mapGetters(['CAMPAIGN_DATA','USER_SIGN_IN_INFO'])
  },
  created () {
    let vm = this
    vm.$store.dispatch('CAMPAIGN_GET_DATA',vm.campaign.host+vm.campaign.path).then(res=>{
      vm.completion = new Array(vm.questions.length).fill({}).map((item,i)=>{
        let answer = {
          id:i,
          value:false,
        }
        return answer
      })
      vm.loading = false
    })
  },
  methods: {
    labelClass(item){
      let vm = this
      if (vm.local.user_at === item.id){
        return 'red'
      }
      return item.value === true ? 'green':''
    },
    swithTo (val) {
      let vm = this
      vm.local.user_at = val
      if (vm.local.user_at == vm.questions.length-1) {
        vm.reachedEnd = true
      }
    },
    answered () {
      return this.completion.filter(item=>item.value === true).length
    },
    selected(val){
      let vm = this
      let key = vm.questions[vm.local.user_at]['question_id']
      let value = vm.questions[vm.local.user_at]['answers'][val]['option_id']
      vm.$set(vm.completion[vm.local.user_at],'value',true)
      vm.$set(vm.local.answer_sheet,key,value)
      vm.next()
    },
    next(){
      let vm = this
      if (vm.local.user_at<vm.questions.length-1) {
        vm.local.user_at += 1
      }
      if (vm.local.user_at == vm.questions.length-1) {
        vm.reachedEnd = true
      }
    },
    prev(){
      let vm = this
      if (vm.local.user_at>0){
         vm.local.user_at -= 1
      }
    },
    showSignIn(){
      let vm = this
      // if the user closed the modal and not proceed
      vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
        selector:'#userLoginModal',
        onHide () {
          vm.$router.replace('/inteltest')
        }
      })

      vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
        selector:'#userRegisterModal',
        needToggle:'hide',
        onHide () {
          vm.$router.replace('/inteltest')
        }
      })

      vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
        selector:'#userForgetPassword',
        needToggle:'hide',
        onHide () {
          vm.$router.replace('/inteltest')
        }
      })

      // if the user has success loged in
      vm.$store.state.userRegLog.USER_LOGIN_REDIRECT = '/inteltest'
      vm.$store.state.userRegLog.USER_LOGIN_REDIRECT_BEHAVIOR = function(){
        vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{selector:'#userLoginModal'})
        vm.submit()
      }

    },
    submit(){
      let vm = this
      if (vm.USER_SIGN_IN_INFO==undefined){

        vm.showSignIn()

      } else {

        let formData = new FormData()
        formData.append('uid', '38272')
        formData.append('test_id', '8a2f4e9156d3f0370156d4ca8fd8048e')
        formData.append('age', 2)
        formData.append('gender', 1)
        formData.append('parent', 0)
        formData.append('childname', 'sss')
        formData.append('json_data', vm.local.answer_sheet)

        let submitData = {
          url:vm.campaign.submitTo,
          payload: formData,
        }

        vm.$store.dispatch('CAMPAIGN_POST_DATA',submitData).then(res=>{
          console.log(res)
        })
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.list .item {
  &:active, &:focus {
    .label {
      background-color: #DB2828 !important;
    }
  }
}
.ui.circular.label {
  margin: 5px;
}
.list-item {
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}

.mainContent {
  padding-top: 120px;
  padding-bottom: 30px;
  min-height: 86vh;
  .ui.olive.ribbon.label {
    font-size: 1.2em;
  }
  @media only screen and (max-width: 700px) {
    padding-top: 64px;

  }
}
</style>
