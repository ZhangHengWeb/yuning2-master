<template lang="html">
  <div class="ui fluid container">
    <div class="ui container" >
        <div class="ui segment stacked">

          <template v-if="loading==false">
            <div class="ui olive ribbon label">
              <p><i class="eye icon"></i> 注意力测试</p>第{{local.user_at+1}}题 <small>({{completed}}已经完成)</small>
            </div>
            <div class="counter" :class="[progressBarTime > 0 ?'visible':'hide']" >
              <radial-progress-bar :diameter="75"
                                    startColor="#8cc7a7"
                                    stopColor="#73b591"
                                    :animateSpeed = "progressBarTime"
                                   :completed-steps="progressBarCompleted"
                                   :total-steps="progressBarTotal">
               <p class="text olive"><i class="icon olive" :class="counterIcon()"></i>{{counterTime}}s</p>
              </radial-progress-bar>
            </div>
            <div class="ui segment basic stagView" >
              <transition name="fade" appear>
                <div class="ui basic segment"
                  v-for="(stag,index) in local.stag"
                  v-if="local.user_at==stag_setting[index][0]
                  && stag.start==false" >
                    <h3>{{stag.title}}</h3>
                    <p>{{stag.intro}}</p>
                    <p>
                      <button class="ui basic button" @click="stagStart(index)">
                        <i class="icon user"></i>
                        开始
                      </button>
                    </p>
              </div>
            </transition>


            <transition name="slide-fade" appear>
              <transition-group
                 v-on:before-enter="beforeQuestionEnter"
                 name="list"
                 tag="div" >
                    <div class="ui basic segment"
                        v-if="local.user_at==index
                        && stag_setting[local.stag_at].indexOf(local.user_at)!=-1
                        && local.stag[local.stag_at].start==true"
                        v-bind:key="question"
                        v-for="(question,index) in questions">

                          <div class="ui active centered inline loader" v-if="questionLoading == true"></div>

                          <transition
                            class="test"
                            appear
                            name="fade"
                            v-on:after-enter="questionLoadingCompleted">

                            <div class="ui basic segment" v-if="questionLoading != true" >
                                <div class="ui grid" >
                                    <transition appear name="fade" >
                                      <div class="doubling one column row centered aligned" v-show="displayQuestion==true" >
                                        <h3 class="ui header">{{question.question_text}}</h3>
                                        <img v-if="question.imageUrl" :src="campaign.cdn+question.imageUrl" alt="">
                                      </div>
                                    </transition>

                                    <transition appear name="fade">
                                    <div class="doubling four column row option-section" :class="optionClass(question.answer)" v-show="displayOptions==true">
                                      <div class=" column center aligned"
                                      v-for="(option,index) in question.options">
                                          <img
                                          v-on:click.stop.prevent="selected(index)"
                                          :src="campaign.cdn+option" >
                                          <div class="iconContainer" v-if="local.user_selected!='' && local.user_selected == String.fromCharCode(65 + index)">
                                            <i class="icon olive checkmark" v-if="String.fromCharCode(65 + index) == question.answer"></i>
                                            <i class="icon red remove" v-else></i>
                                          </div>
                                      </div>
                                    </div>
                                  </transition>
                                </div>

                            </div>
                          </transition>
                    </div>
                  </transition-group>
                </transition>

              </div>
              <div class="ui segment center aligned basic">
                <el-dialog title="测试完成" custom-class="responsive-element-dialog" v-model="readyToSubmit" size="tiny">
                  <span>恭喜您！已经完成了注意力测试</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button  @click="submit">提交测试结果</el-button>
                  </span>
                </el-dialog>
                <div class="ui divider"></div>
                <!-- add debug: @click="switchTo(item,index)" -->
                <a class="ui circular label"  v-for="(item,index) in local.answer_sheet" :class="labelClass(item,index)" >{{index+1}}</a>
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
import RadialProgressBar from 'vue-radial-progress'
let showQuestionAndOptionsTimer = undefined
let showQuestionThenOptionsPeekTimer = undefined
let showQuestionThenOptionsAnswerTimer = undefined
let showResultTimer = undefined
let counterInterval = undefined
let switchingTime = undefined //TODO

export default {
  name:'attntest',
  data () {
    return {
      progressBarCompleted: 0,
      progressBarTotal: 1,
      progressBarTime:0,
      displayOptions:false,
      displayQuestion:false,
      questionMode:'',
      counterTime:0,
      loading:true,
      readyToSubmit:false,
      local:{
        user_at:0,
        stag_at:0,
        user_selected:"",
        stag:[
          {
            title:'stag 1 title',
            intro:'stag 1 intro',
            start:false,
          },
          {
            title:'stag 2 title',
            intro:'stag 2 intro',
            start:false,
          }
        ],
        answer_sheet:[],
      },
      jumpTo:'',
      completion: [],
      campaign:{
        host:'http://mp.yuningwang.com',
        path:'/quiz/attndata',
        test_id:'8a2f4e91583db1ad015842cda7781238',
        cdn:'http://cdn.czbapp.com/',
        submitTo:'...',
      },
      reachedEnd:false,
      questionLoading:false,
    }
  },
  components: {
    RadialProgressBar
  },
  computed:{
    questions (){
      return this.CAMPAIGN_DATA['server']['data']['questions']
    },
    stag_setting () {
      return [[0,1,2,3,4,5,6,7,8,9],[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]]
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
  methods:{
    resetQuestion(){
      let vm = this
      vm.progressBarCompleted=0
      vm.progressBarTime = 0
      vm.local.user_selected=""
      vm.displayOptions = false
      vm.displayQuestion = false

      clearTimeout(showQuestionAndOptionsTimer)
      clearTimeout(showResultTimer)
      clearTimeout(showQuestionThenOptionsPeekTimer)
      clearTimeout(showQuestionThenOptionsAnswerTimer)
      clearTimeout(switchingTime)
      clearInterval(counterInterval)

      vm.loadQuestionImages(vm.local.user_at)

    },
    beforeQuestionEnter: function (el) {
      let vm = this
      vm.resetQuestion()
    },
    questionLoadingCompleted (el) {
      let vm = this
      if (vm.questions[vm.local.user_at].mode=='showQuestionAndOptions') {
        vm.showQuestionAndOptionsMode()
      } else if (vm.questions[vm.local.user_at].mode=='showQuestionThenOptions') {
        vm.showQuestionThenOptionsMode()
      }
    },
    showQuestionAndOptionsMode () {
      let vm = this
      vm.displayOptions = true
      vm.displayQuestion = true
      vm.questionMode = 'showQuestionAndOptionsMode'
      vm.progressBarCompleted= 1
      vm.counterTime = vm.questions[vm.local.user_at].questionTime
      vm.progressBarTime=vm.counterTime*1000
      // vm.progressBarTime=vm.counterTime*100000000

      counterInterval = setInterval(()=>{
        vm.counterTime -= 1
      },1000)

      showQuestionAndOptionsTimer = setTimeout(()=>{
        vm.next()
      },vm.progressBarTime)

    },
    showQuestionThenOptionsMode () {
      let vm = this
      let viewTime = vm.questions[vm.local.user_at].viewQuestionTime*1000
      let answerTime = vm.questions[vm.local.user_at].answerTime*1000
      // let viewTime = vm.questions[vm.local.user_at].viewQuestionTime*1000000
      // let answerTime = vm.questions[vm.local.user_at].answerTime*1000000
      vm.questionMode = 'showQuestionThenOptionsViewMode'
      vm.displayQuestion = true
      vm.progressBarCompleted= 1
      vm.progressBarTime= viewTime
      vm.counterTime = viewTime/1000

      counterInterval = setInterval(()=>{
        vm.counterTime -= 1
      },1000)

      showQuestionThenOptionsPeekTimer = setTimeout(()=>{
        //give it a little time for counterTime restore
        vm.progressBarCompleted= 0
        vm.progressBarTime= 0


        switchingTime = setTimeout(()=>{
          clearTimeout(switchingTime)
          clearInterval(counterInterval)
          vm.displayOptions = true
          vm.displayQuestion = false
          vm.progressBarCompleted = 1
          vm.progressBarTime= answerTime
          vm.questionMode = 'showQuestionThenOptionsAnswerMode'
          vm.counterTime = answerTime/1000


          counterInterval = setInterval(()=>{
            if (vm.counterTime > 0){
              vm.counterTime -= 1
            } else {
              clearInterval(counterInterval)
            }
          },1000)

          showQuestionThenOptionsAnswerTimer = setTimeout(()=>{

            if (vm.reachedEnd==false){
              vm.next()
            } else {
              vm.readyToSubmit = true
            }
          },answerTime)
        },500)


      },viewTime)
    },
    counterIcon(){
      let vm = this
      if (vm.questionMode=='showQuestionThenOptionsViewMode'){
        return 'unhide'
      }
      return 'alarm'
    },
    stagStart(val){
      let vm = this
      vm.questionLoading = true
      vm.$set(vm.local.stag[val],'start', true)
      vm.$set(vm.local,'stag_at', val)
      vm.loadQuestionImages(vm.local.user_at)
    },
    labelClass(item,index){
      let vm = this
      if (vm.local.user_at === index){
        return 'grey'
      }

      if (item.answer === vm.questions[index].answer) {
        return 'green'
      } else {
        if (vm.completion[index].value==true){
          return 'red'
        }
        return ''
      }
      return ''
    },
    optionClass(correctAnswer){
      let vm = this
      if (vm.local.user_selected !='') {
        if (vm.local.user_selected == correctAnswer) {
          return 'correct'
        } else {
          return 'error'
        }
      }

      if (vm.questionMode == 'showQuestionThenOptionsViewMode') {
        return 'showQuestionThenOptionsViewMode'
      }
      return vm.questionMode
    },
    switchTo (item,val) {
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
      // eg. "[{"question_id":"8a2f4e91583db1ad015846d9a0d9202f","answer":"B"},,,,,,,,,,]
      let vm = this
      if (vm.completion[vm.local.user_at].value==false) {
        let translateArray = ['A','B','C','D']
        let value = String.fromCharCode(65 + val) //ABCDEFG....max is 25
        vm.$set(vm.completion[vm.local.user_at],'value',true)
        vm.$set(vm.local.answer_sheet[vm.local.user_at],'answer',value)
        vm.$set(vm.local,'user_selected',value)

        showResultTimer = setTimeout(()=>{
          vm.next()
        },1000)
      }

    },

    next(){
      let vm = this
      vm.resetQuestion()
      //mark it
      vm.$set(vm.completion[vm.local.user_at],'value',true)

      if (vm.local.user_at<vm.questions.length-1) {
        vm.local.user_at += 1
      }
      if (vm.local.user_at==vm.questions.length-2) {
        vm.reachedEnd = true
      }
    },
    prev(){
      let vm = this
      vm.resetQuestion()
      if (vm.local.user_at>0){
         vm.local.user_at -= 1
      }
    },
    loadQuestionImages(index){
      let vm = this
      vm.questionLoading = true
      let question = Object.values(vm.questions[index])
      let questionAssets = question.filter(item=>typeof(item)=='string').filter(item=>item.indexOf('images/')==0)

      questionAssets.forEach((url,assetsIndex)=>{
        let image = new Image()
        image.src = vm.campaign.cdn+url
        image.onload = () => {
          vm.questions[index].assetsLoadStatus[assetsIndex] = true
          if(vm.questions[index].assetsLoadStatus.every(item=>item == true)){
            vm.questionLoading = false
          }
        }
      })

    },
    showSignIn(){
      let vm = this
      // if the user closed the modal and not proceed
      vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
        selector:'#userLoginModal',
        onHide () {
          vm.$router.replace('/attntest')
        }
      })

      vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
        selector:'#userRegisterModal',
        needToggle:'hide',
        onHide () {
          vm.$router.replace('/attntest')
        }
      })

      vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{
        selector:'#userForgetPassword',
        needToggle:'hide',
        onHide () {
          vm.$router.replace('/attntest')
        }
      })

      // if the user has success loged in
      vm.$store.state.userRegLog.USER_LOGIN_REDIRECT = '/attntest'
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
        // formData.append('json_data', vm.local.answer_sheet)

        let submitData = {
          url:vm.campaign.submitTo,
          payload: formData,
        }

        vm.$store.dispatch('CAMPAIGN_POST_DATA',submitData).then(res=>{
          console.log(res)
        })
      }
    }
  },
  created () {
    let vm = this
    vm.$store.dispatch('CAMPAIGN_GET_DATA',vm.campaign.host+vm.campaign.path+'/'+vm.campaign.test_id+'/tempUser/0/0/0').then(res=>{

      //make answer_sheet for submit
      vm.completion = new Array(vm.questions.length).fill({}).map((item,i)=>{
        let answer = {
          id:i,
          value:false,
        }
        return answer
      })
      vm.local.answer_sheet = new Array(vm.questions.length).fill({}).map((item,i)=>{
        let answer = {
          'question_id':vm.questions[i].question_id,
          'answer':'',
        }
        return answer
      })
      vm.questions.forEach((question,index,array)=>{
        let stringResource = Object.values(question).filter(item=>typeof(item)=='string')
        let questionAssets = stringResource.filter(item=>item.indexOf('images/')==0)
        let questionAssetsLength = questionAssets.length
        let optionAssets = questionAssets.filter(item=>{
          if (item.indexOf('A')!=-1||item.indexOf('B')!=-1||item.indexOf('C')!=-1||item.indexOf('D')!=-1){
            return item
          }
        })

        question['assetsLoadStatus']= new Array(questionAssetsLength).fill(false)
        question['options']= optionAssets

        if (index<10){
          question['questionTime'] = 10
          question['mode'] = 'showQuestionAndOptions'
        } else {
          question['viewQuestionTime'] = 3
          question['answerTime'] = 10
          question['mode'] = 'showQuestionThenOptions'
        }
      })

      vm.loading = false
    })

  },
}
</script>

<style lang="scss">

.showQuestionThenOptionsAnswerMode {
  position: absolute!important;
  left:0px;
  top:0px;
}
.stagView,.itemView {
  min-height: 60vh;
}
.iconContainer {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 1em;
  font-size: 250px;
  vertical-align: middle!important;

  @media only screen and (max-width: 768px) {
    font-size: 25vw;
  }

  i {
    font-size: 1em;
    position: absolute;
    left:50%;
    top:50%;
    margin:-0.55em 0px 0px -0.5em!important;
    width: auto!important;
    text-align: center!important;
    vertical-align: middle!important;
  }
  i.remove {
    margin:-0.55em 0px 0px -0.4em!important;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.counter {
  position: absolute;
  right:10px;
  top:10px;
  p {
    text-align: center;
    i {
      margin: 0px!important;
    }
  }
  &:after {
    content: '';
    display: block;
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    left:0px;
    top:0px;
  }
  &.visible {
    &:after {
      display: none;
    }
  }
}
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
  transition: all .5s;
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
  min-height: 86vh;
  padding-bottom: 30px;
  .ui.olive.ribbon.label {
    font-size: 1.2em;
  }
  @media only screen and (max-width: 700px) {
    padding-top: 64px;

  }
}
</style>
