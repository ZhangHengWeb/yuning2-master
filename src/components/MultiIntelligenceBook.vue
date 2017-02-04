<template lang="html">

  <div class="ui fluid container" id="multiIntelligenceBook" v-if="USER_SIGN_IN_INFO!==undefined">

    <div class="ui container" >
        <div class="ui grid stackable">
        <div class="four wide column">
          <h2 class="ui header olive" style="color:#57a437!important;">
            <i class="calendar icon"></i>
            <div class="content">
              课程预约
            </div>
          </h2>
        </div>
      </div>
    </div>

    <div class="ui container segment">
      <div class="ui grid center aligned">
        <div class="column">
          <el-radio-group v-model="course.name" size="large" @change="courseTypeChange">
            <el-radio-button label="训练课预约" ></el-radio-button>
            <el-radio-button label="体验课预约" ></el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <el-popover
        ref="popover"
        placement="top-start"
        title="取消预约课程？"
        width="200"
        v-model="eventDetailPopoverVisible">
        
        <p>预约课程可以在24小时内取消</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" style="color:#66b489" @click="cancelEvent">确定</el-button>
          <el-button type="success" style="background-color:#66b489; border-color:#66b489;" size="mini" @click="eventDetailPopoverVisible = false">取消</el-button>
        </div>
      </el-popover>

        <full-calendar
        :events="ACCOUNT_BOOKED_COURSE_INFO"
        lang="zh"
        @changeMonth="changeMonth"
        @eventClick="eventClick"
        @dayClick="dayClick"
        @moreClick="moreClick"
        slot="reference"
        ></full-calendar>

      <el-dialog
        custom-class="responsive-element-dialog"
        title="请选择您想预的课程及时间"
        top="0"
        v-model="bookTimeVisible"
        >

        <el-table
          :data="bookButtons"
          style="width: 100%"
          highlight-current-row
          :row-class-name="tableRowClassName">
            <el-table-column
              label="时间"
              >
              <template scope="scope">
                {{ scope.row.time }}:00
            </el-table-column>
            <el-table-column>
              <template scope="scope">
                <el-button
                  v-if="scope.row.bookAvaiable"
                  size="small"
                  type="success"
                  @click="courseDetailPreview(scope.$index, scope.row)"
                  >马上预约</el-button>
                  <!--@click="confirmBooking(scope.$index, scope.row)"-->
                </template>
            </el-table-column>
        </el-table>

      </el-dialog>
      <el-dialog
      custom-class="responsive-element-dialog"
      title="确认信息"
      v-model="bookCourseVisible" v-if="bookedItem!=null">
        <h3 class="ui header">{{bookedItem.courseDetail[0].name}}</h3 class="ui header">
          <el-table
            :data="bookedItem.courseDetail"
            style="width: 100%">
            <el-table-column
              prop="fieldOneCn"
              label="维度">
            </el-table-column>
            <el-table-column
              prop="fieldTwoCn"
              label="因子">
            </el-table-column>
          </el-table>
          <h3 class="ui header">上课时间</h3 class="ui header">
          <el-table
            :data="bookedItem.courseDetail"
            style="width: 100%">
            <el-table-column
              prop="bookingDate"
              label="预约日期">
            </el-table-column>
            <el-table-column
              prop="bookingTime"
              label="预约时间">
            </el-table-column>
          </el-table>
          <h3 class="ui header">消耗课时</h3 class="ui header">
          {{bookedItem.useTimeNum}}小时

        <span slot="footer" class="dialog-footer">
          <el-button @click="bookCourseVisible = false">取 消</el-button>
          <el-button type="success"  @click="confirmBooking">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import fullCalendar from 'vue-fullcalendar'
import {mapGetters} from 'vuex'

export default {
  name: 'multiIntelligenceBook',
  beforeRouteEnter (route, from, next) {
    if (window.localStorage.USER_SIGN_IN_INFO) {
      next()
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
        vm.$store.state.userRegLog.USER_LOGIN_REDIRECT = '/needAsk/multiIntelligenceBook'
        vm.$store.state.userRegLog.USER_LOGIN_REDIRECT_BEHAVIOR = function(){
          // vm.getUserBookedInfo()
          vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{selector:'#userLoginModal'})
        }
      })
      // next(false)
    }
  },
  data () {
    return {
      course:{
        name:'训练课预约',
        type:1,
        id:'',
      },
      hours:24,
      canBook:false,
      bookButtons:[],
      bookTimeVisible:false,
      bookCourseVisible:false,
      bookedItem: null,
      eventDetailPopoverVisible:false,
      selectedEvent:undefined,
      debugData:[
      {
        cssClass:"el-icon-check",
        end:"2017-01-28",
        isShow:true,
        start:"2017-01-15",
        title:"训练课预约",
      },
      {
        cssClass:"el-icon-check",
        end:"2017-01-31",
        isShow:true,
        start:"2017-01-30",
        title:"训练课预约",
      },
    ],

    }
  },
  computed: {
    ...mapGetters(['ACCOUNT_BOOKED_COURSE_INFO','COURSE_INFO','COURSE_INFO_REF','USER_SIGN_IN_INFO']),
  },
  created () {
    let vm = this
    //TODO get course type
    for (let i=0; i<vm.hours; i++){
      let bookButton = {
        time:i,
        bookAvaiable: false,
        bookDetail: undefined,
      }
      vm.bookButtons.push(bookButton)
    }
    vm.initCalendar()
  },
  components: {
    fullCalendar,
  },
  methods : {
    initCalendar() {
      let vm = this
      this.$store.dispatch('GET_COURSE_INFO').then(res=>{
        vm.getBookedCourse()
        vm.course.id = vm.COURSE_INFO[0]['id'] // it really confused?
        vm.course.type = 1
      })
    },
    courseTypeChange(val){
      let vm = this
      // console.log(val) ????? confuse part!!! it need discuss with back-end
      // console.log(vm.COURSE_INFO.filter(item => item.name == val))

      if (val==='训练课预约'){
        vm.course.type = 1
        vm.course.id = vm.COURSE_INFO[0]['id']
      } else if (val==='体验课预约') {
        vm.course.type = 2
      }
    },
    courseDetailPreview (val,item) {
      let vm = this
      vm.bookTimeVisible=false

      vm.bookedItem = this.bookButtons[val]['bookDetail']
      vm.bookedItem.courseDetail = vm.COURSE_INFO.filter(item => item.id == vm.bookedItem.courseId)
      vm.bookedItem.courseDetail[0]['fieldOneCn'] = vm.COURSE_INFO_REF['fieldOne'][vm.bookedItem.fieldOne]
      vm.bookedItem.courseDetail[0]['fieldTwoCn'] = vm.COURSE_INFO_REF['fieldTwo'][vm.bookedItem.fieldOne][vm.bookedItem.fieldOne,vm.bookedItem.fieldTwo]
      vm.bookedItem.courseDetail[0]['bookingDate'] = vm.bookedItem.year+'年'+vm.bookedItem.month+'月'+vm.bookedItem.day+'日'
      vm.bookedItem.courseDetail[0]['bookingTime'] = vm.bookedItem.hour+':00'

      vm.bookCourseVisible=true

    },
    getBookedCourse () {
      this.$store.dispatch('ACCOUNT_GET_BOOKED_COURSE_INFO_ACTION',{userId:this.$store.state.userRegLog.USER_SIGN_IN_INFO.id}).then(res=>{

      })
    },
    cancelEvent () {
      let vm = this
      vm.eventDetailPopoverVisible = false

      if (vm.selectedEvent!=undefined){
        vm.$store.dispatch('USER_CANCEL_COURSE',{id:vm.selectedEvent.courseData.id}).then(res=>{
          // console.log(res)

          vm.getBookedCourse()

          if (res.resStatus == 'success') {

            vm.$notify({
              title: '课程取消成功',
              message: '请选择您想预约的日期',
              type: 'success'
            })

          } else {

            vm.$notify({
              title: '课程取消失败',
              message: '您所预定的课程已经超过24小时',
              type: 'error'
            })
          }

        })
        // reset the selectedEvent to undefined
        vm.selectedEvent = undefined
      }
    },
    confirmBooking () {
      let vm = this
      // vm.bookedItem = this.bookButtons[val]['bookDetail']
      //if bookAvaiable then post data to server
      if (vm.bookedItem != undefined) {
        // vm.bookedItem.userId = vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id
        let data = {
          courseId:vm.bookedItem.courseId,
          userId: vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
          bookId: vm.bookedItem.id,
          courseType:vm.course.type,
        }
        // send book requestDate
        vm.$store.dispatch('USER_BOOKING_COURSE',data).then(res=>{

          vm.bookCourseVisible=false

          vm.getBookedCourse()

          if (res.resStatus == 'fail') {
            vm.$notify({
              title: '预约失败',
              message: '您已经预约过课程了，请先取消之前的预定再预约！',
              type: 'warning'
            })
          }

          if (res.resStatus == 'fail3'){
            vm.$notify({
              title: '预约失败',
              message: '课程不存在',
              type: 'warning'
            })
          }

          if (res.resStatus == 'fail2'){
            vm.$notify({
              title: '预约失败',
              message: '当用户课时不够',
              type: 'error'
            })
          }
          if (res.resStatus == 'fail1'){
            vm.$notify({
              title: '预约失败',
              message: '当预约人数已满',
              type: 'error'
            })
          }
          if (res.resStatus == 'success'){
            vm.$notify({
              title: '预约成功',
              message: '恭喜你，课程预约成功！',
              type: 'success'
            })
          }


        }).catch(err=>{
          vm.bookCourseVisible=false

          vm.$notify({
            title: '预约失败',
            message: '服务器异常',
            type: 'error'
          })
        })
      }

    },
    tableRowClassName(row, index) {
        if (row.bookAvaiable === true) {
          return 'info-row'
        }
        return ''
      },
    changeMonth (start, end, current) {
      // console.log('changeMonth', start, end, current)
    },
    eventClick (event, jsEvent, pos) {
      let vm = this
      vm.eventDetailPopoverVisible = true
      vm.$refs.popover.referenceElm = jsEvent.toElement
      vm.selectedEvent = event
    },
    dayClick (day, jsEvent) {
      let vm = this
      let date = new Date(day)
      // console.log(date,day)
      let requestDate = {
        courseId: vm.course.id,
        userId: vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
        year:date.getFullYear(),
        month:date.getMonth()+1,
        day:date.getDate(),
        courseType:vm.course.type,
      }

      this.$store.dispatch('GET_AVAIABLE_COURSE_TIME',requestDate).then(res=>{

        if (res.books.length>0){
          vm.canBook = true
          vm.bookTimeVisible = true

        } else {
          vm.$message({
            showClose: true,
            message: '不好意思！当天没有可供预约的课程',
            type: 'warning'
          })
          vm.canBook = false
        }

        //reset previous
        vm.bookButtons.forEach(button=>{
          button['bookAvaiable'] = false
          button['bookDetail'] = undefined
        })

        // console.log(res.books)
        res.books.forEach(element=>{
          vm.bookButtons[element.hour]['bookAvaiable']= true
          vm.bookButtons[element.hour]['bookDetail'] = element
        })

      }).catch(err=>{
        // console.log(err)
        // title: '预约失败',
        // message: '当用户课时不够',
        // type: 'error'
        vm.$message({
          showClose: true,
          message: '请您先联系客服，再预约课程',
          type: 'warning'
        })

        // vm.$notify({
        //   showClose: true,
        //   message: '请您先联系客服，再预约课程',
        //   type: 'warning'
        // })

      })
    },
    moreClick (day, events, jsEvent) {
      // console.log('moreCLick', day, events, jsEvent)
    }
  },
}
</script>
<style lang="scss">

#multiIntelligenceBook {
  .cell{
    text-align: center;
  }
  .day-cell {
        min-height: 109px;
  }
  .comp-full-calendar {
    .header-center {
      font-size: 2rem;
      color:#57a437;

    }
  }

  @media only screen and (max-width: 700px) {
    .comp-full-calendar {
      .header-center {
        font-size: 1rem;
      }
    }
  }
}
</style>
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
    margin: 0px!important;
  }
  .main {
    margin-top: 3rem;
  }
}
</style>
