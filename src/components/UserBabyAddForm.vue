<template lang="html">
  <div class="ui form">
      <div class="field">
        <label>宝宝名字</label>
        <input type="text" name="baby_name" v-model="newChildInfo.baby_name">
      </div>

      <div class="field">
        <label>生日</label>
        <input type="hidden" name="baby_birth" v-model="newChildInfo.baby_birth">
        <el-date-picker
          v-model="datepickerValue"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          @change="setBirth"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    <div class="field">
      <label>宝宝性别</label>
      <input type="hidden" name="baby_gender" v-model="newChildInfo.baby_gender">
      <el-select placeholder="宝宝性别" v-model="newChildInfo.baby_gender">
        <el-option label="小王子" value="1"></el-option>
        <el-option label="小公主" value="0"></el-option>
      </el-select>
    </div>
    <div class="actions" >
        <div class="ui olive right labeled icon button submit">
          完成，提交
          <i class="checkmark icon"></i>
        </div>
    </div>
    <!-- errors from frontend -->
    <div class="ui error message">
      <ul>
        <li></li>
      </ul>
    </div>
    <!-- errors from backend -->
    <div v-if="CHILD_ADD_ERRORS"  class="ui visible message" v-bind:class="CHILD_ADD_ERRORS.isSuccess==true?'success':'error'">
      <ul class="list">
        <li>{{ CHILD_ADD_ERRORS.errorMsg }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-baby-add-form',
  computed: {
    ...mapGetters(['CHILD_ADD_ERRORS'])
  },
  methods:{
    setBirth(value){
      this.newChildInfo.baby_birth = value
    }
  },
  data () {
    return {
      newChildInfo: {
        user_id: this.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
        baby_name: '',
        baby_gender: '',
        baby_birth: '',
      },
      datepickerValue:'',
      pickerOptions: {
         disabledDate(time) {
           return time.getTime() > Date.now() - 8.64e7;
         },
       },
    }
  },
  mounted () {
    // INITIALISE THE ADD CHILD FORM
    const vm = this
    const $addChildForm = $('#addChildModal .ui.form')
    const addChildRules = {
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
    const addChildAction = (event) => {

      vm.$store.dispatch('CHILD_ADD_ACTION', JSON.parse(JSON.stringify(vm.newChildInfo))).then(()=>{

          vm.newChildInfo =  {
              user_id: vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
              baby_name: '',
              baby_gender: '',
              baby_birth: '',
            }
            vm.datepickerValue = ''
            setTimeout(()=>{

              const modalPayload = {
                selector:'#addChildModal',
              }

              vm.$store.dispatch('TOGGLE_SIMPLE_POPUP',modalPayload)
              vm.$store.state.baby.CHILD_ADD_ERRORS = undefined
              vm.$store.dispatch('CHILD_GET_ALL',vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id)

            },2000)
      })
    }

    $addChildForm.form({
      fields: addChildRules,
      onSuccess: addChildAction
    })


  }
}
</script>

<style lang="css">
</style>
