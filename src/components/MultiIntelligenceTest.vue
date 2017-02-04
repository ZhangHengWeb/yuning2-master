<template lang="html">
  <div class="ui fluid container">
    <div class="ui container very padded tall stacked segment">
      <h2 class="ui header olive center aligned">开始测试吧！</h2>
      <div class="ui divider"></div>
      <div class="ui grid center aligned segment basic">
        <el-form :model="userQuizForm" label-width="100px" ref="userQuizForm" :rules="rules">
          <el-form-item label="宝宝年龄" prop="babyAge">
            <el-select v-model="userQuizForm.babyAge" placeholder="请选择"  @change="setTestOptions">
              <el-option
                v-for="(item,index) in ageOptions"
                v-if="index>2"
                :label="item.age+'岁'"
                :value="item.age">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宝宝性别">
            <el-radio-group v-model="userQuizForm.babyGender">
              <el-radio :label="1" style="display:block;margin:10px 0px;">小王子</el-radio>
              <el-radio :label="0" style="display:block;margin:10px 0px;">小公主</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您的性别">
            <el-radio-group v-model="userQuizForm.parentGender">
              <el-radio :label="1">爸爸</el-radio>
              <el-radio :label="0">妈妈</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="推荐测试" v-if="userQuizForm.babyAge!=undefined" >
            <el-radio-group v-model="userQuizForm.testOption">
              <el-radio style="display:block;margin:10px 0px;" :label="item.name" v-for="item in testOptions" :value="item.name">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('userQuizForm')">开始测试</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
const applicableOptions = [
  {
    name:'多元智能测试',
    age:[3,4,5,6],
    routeName: 'inteltest',
  },
  {
    name:'注意力测试',
    age:[5,6,7,8,9,10,11,12],
    routeName: 'attntest',
  }
]

export default {
  name:'multi-intelligence-test',
  data () {
    return {
      rules: {
        babyAge: [
          { required: true, type: 'number', message: '请选择宝宝年龄？', trigger: 'change submit' },
        ],
      },
      userQuizForm: {
        babyAge:undefined,
        parentGender:0,
        babyGender:0,
        testOption:'',
      },
      ageOptions:new Array(13).fill({}).map((item,i)=>{
        let option = {}
        option['age'] = i
        option['applicableOptions'] = applicableOptions.filter(option=>{
            return option.age.find(ageIndex=>ageIndex==i)
        })
        return option
      }),
      testOptions:[],
    }
  },
  methods: {
    submitForm(formName) {
      let vm = this
       vm.$refs[formName].validate((valid) => {
         if (valid) {
          let selectedTestOption = applicableOptions.find(element=>element.name==vm.userQuizForm.testOption)
          this.$router.push({name:selectedTestOption.routeName})
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     },
    setTestOptions(i){
      let vm = this
      if (vm.ageOptions[i]['applicableOptions'].length>0) {
        vm.userQuizForm.testOption = vm.ageOptions[i]['applicableOptions'][0]['name']
      } else {
        vm.userQuizForm.testOption = '暂无该年龄段课程'
      }

      vm.testOptions = vm.ageOptions[i]['applicableOptions']
    }
  },
  mounted () {

    // this.userQuizForm.babyAge =
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
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
