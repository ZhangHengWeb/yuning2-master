<template lang="html">
  <div class="ui form" >

      <div class="field">
        <label>宝宝名字</label>
        <input type="text" name="baby_name" v-model="CHILD_DETAIL.baby_name" >
      </div>

      <div class="field">
        <label>生日</label>
        <input type="hidden" name="baby_birth" v-model="CHILD_DETAIL.baby_birth">
        <el-date-picker
          v-model="CHILD_DETAIL.baby_birth"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          @change="setBirth"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>

      <div class="field">
        <label>宝宝性别</label>
        <el-select placeholder="宝宝性别" @change="setGender" v-model="CHILD_DETAIL.baby_gender" >
          <el-option label="小王子" value="1"></el-option>
          <el-option label="小公主" value="0"></el-option>
        </el-select>
        <input type="hidden" name="baby_gender" v-model="CHILD_DETAIL.baby_gender">
      </div>

      <div class="actions" >
          <div class="ui olive right labeled icon button submit">
            完成，提交
            <i class="save icon"></i>
          </div>
      </div>
      <!-- errors from frontend -->
      <div class="ui error message">
        <ul>
          <li></li>
        </ul>
      </div>
    <!-- errors from backend -->
    <div v-if="CHILD_MODIFY_ERRORS"  class="ui visible message" v-bind:class="CHILD_MODIFY_ERRORS.isSuccess==true?'success':'error'">
      <ul class="list">
        <li>{{ CHILD_MODIFY_ERRORS.errorMsg }}</li>
      </ul>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-baby-modify-form',
  computed: {
    ...mapGetters(['CHILD_DETAIL','CHILD_MODIFY_ERRORS'])
  },
  data () {
    return {
      babyGenderLable:'',
      datepickerValue:'',
      pickerOptions: {
         disabledDate(time) {
           return time.getTime() > Date.now() - 8.64e7;
         },
       },
    }
  },
  methods:{
    setGender(value){
      console.log(value)
      this.$store.state.baby.CHILD_DETAIL.baby_gender = value
    },
    setBirth(value){
      this.$store.state.baby.CHILD_DETAIL.baby_birth = value
    }
  },
  mounted () {
    // INITIALISE THE ADD CHILD FORM
    const vm = this
    const $modifyChildForm = $('#modifyChildModal .ui.form')
    const modifyChildRules = {
        baby_name: {
          identifier: 'baby_name',
          rules: [
            {
              type: 'empty',
              prompt: '请输宝宝名称'
            }
          ]
        },
        baby_gender: {
          identifier: 'baby_gender',
          rules: [
            {
              type: 'empty',
              prompt: '请输入性别'
            }
          ]
        },
        baby_birth: {
          identifier: 'baby_birth',
          rules: [
            {
              type: 'empty',
              prompt: '请输入宝宝生日'
            }
          ]
        }
      }
    const modifyChildAction = (event) => {
      // copy the datepicker value into vuex state
      if (vm.CHILD_DETAIL.baby_gender=='小王子'||vm.CHILD_DETAIL.baby_gender==1){
        vm.CHILD_DETAIL.baby_gender = 1
      } else {
        vm.CHILD_DETAIL.baby_gender = 0
      }

      vm.$store.dispatch('CHILD_MODIFY_ACTION', JSON.parse(JSON.stringify(vm.CHILD_DETAIL))).then((res)=>{


        // notify the list view to update
          vm.$store.dispatch('CHILD_GET_ALL', vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id)

          //reset state for the next session
          setTimeout(()=>{
            vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',{selector:'#modifyChildModal'})
          },2000)

        }).catch((err)=>{
          // TODO ask backend about this
          console.log('modify failure')
        })
    }

    $modifyChildForm.form({
      fields: modifyChildRules,
      onSuccess: modifyChildAction
    })

  },
}
</script>

<style lang="css">
</style>
