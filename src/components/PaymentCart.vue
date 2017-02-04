<template lang="html">
  <div class="ui container segment payment very padded" v-if="USER_SIGN_IN_INFO!==undefined">
    <table class="ui padded table" id="cartList">
      <thead>
        <tr>
          <th>商品种类</th>
          <th>单价</th>
          <th>数量</th>
          <th>合计</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cartList">
          <td>{{product.name}}
          </td>
          <td>&yen;{{product.price}}</td>
          <td> <el-input-number v-model="product.goods_qty" :disabled="true" @change="quantityChange" :min="1" :max="10" ></el-input-number></td>
          <td>&yen;{{product.price*100*product.goods_qty/100}}</td>
          <td><i class="el-icon-delete" @click="removeItem(product)"></i></td>
        </tr>
        <tr v-if="cartList.length===0">
          <td colspan="5">
            <div class="ui icon message">
              <i class="inbox icon"></i>
              <div class="content">
                <div class="header">
                  没有选择商品?
                </div>
                <p>请您先选择需要的服务或者商品</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ui divider"></div>
    <a class="ui right floated button basic small" style="border:none;box-shadow:none;" @click="dialogMgtAddressFormVisible = true"><i class="icon edit"></i> 管理地址</a>
    <a class="ui right floated button basic small" style="border:none;box-shadow:none;" @click="dialogAddAddressFormVisible = true"><i class="icon add"></i> 添加地址</a>
    <h4 class="ui left floated header">请选择收货信息</h4>
    <div class="ui divider clearing hidden"></div>
    <el-dialog title="收货地址" size="small" custom-class="responsive-element-dialog" v-model="dialogAddAddressFormVisible">
      <el-form :model="newShipForm" :rules='rules' ref="addAddressForm">
        <el-form-item label="收货人" :label-width="formLabelWidth" prop="shipper">
          <el-input v-model="newShipForm.shipper" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="手机"  :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="newShipForm.mobile" auto-complete="off" ></el-input>
        </el-form-item>
         <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
           <vue-address
               :province="province"
               :city="city"
               :district="district"
               :detail="detailAddress"
               @change="addressChange"
           ></vue-address>
         </el-form-item>
         <el-form-item label="默认地址"  :label-width="formLabelWidth" >
           <el-switch
              v-model="newShipForm.default_addr"
              on-text="on"
              off-text="off"
              on-color="#13ce66"
              @change="setDefaultAddress"
              >
            </el-switch>
         </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddressForm('addAddressForm') ">取消</el-button>
        <el-button type="success" @click="addAddress('addAddressForm')">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="地址管理" custom-class="responsive-element-dialog" v-model="dialogMgtAddressFormVisible">
      <el-table
        v-loading.body="loading"
       :data="shipInfo"
       :row-class-name="shipInfoTableRowClassName"
       style="width: 100%">
       <el-table-column type="expand">
         <template scope="props">
           <p>省/市: {{ props.row.region }}</p>
           <p>住址: {{ props.row.address }}</p>
         </template>
       </el-table-column>
       <el-table-column
         label="收货人信息"
         prop="shipper">
       </el-table-column>
       <el-table-column
         prop="shipper">
         <template scope="props">
           <el-switch
              v-model="shipInfo[props.$index]['default_addr']"
              on-text="默认"
              off-text="默认"
              on-color="#66b489"
              @change="setDefaultAddress(props.row)"
              >
            </el-switch>
        </template>
       </el-table-column>
       <el-table-column
         prop="shipper">
         <template scope="props">
           <el-button type="text" style="color:#66b489" icon="delete" @click="removeAddress(props.row)"></el-button>
        </template>
       </el-table-column>
     </el-table>
    </el-dialog>

    <div class="ui container">
      <selectable-button
      v-for="(item, index) in addressList"
      :item="item"
      :index="index"
      :target="selectedAddress"

      v-on:selected="selectAddress">
    </selectable-button>
    <div class="ui icon message" v-if="loading===true">
      <i class="notched circle loading icon"></i>
      <div class="content">
        <div class="header">
          更新地址中
        </div>
        <p>请稍候....</p>
      </div>
    </div>
    <div class="ui icon message" v-if="shipInfo.length===0">
      <i class="warning icon"></i>
      <div class="content">
        <div class="header">
          您还没有添加过收货地址
        </div>
        <p>请选择添加地址</p>
      </div>
    </div>
    </div>
    <div class="divider ui"></div>
    <div class="ui right aligned container">
      <h1 class="ui red header price"><small>待支付</small> &yen;{{sum/100}}</h1>
    </div>
    <div class="ui right aligned container">
      <button class="ui red button" @click="checkout" >提交订单</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SelectableButton from './SelectableButton'
import vueAddress from './Address'


export default {
  name: 'cart',
  components: {
    SelectableButton,
    vueAddress,
  },
  data () {
    return {
      dialogAddAddressFormVisible: false,
      dialogMgtAddressFormVisible:false,
      province:'',
      city:'',
      district:'',
      detailAddress:'',
      newShipForm: {
          user_id: '',
          shipper: '',
          mobile: '',
          address: '',
          default_addr: true,
          region:'',
          type: 'A',
      },
      formLabelWidth: '120px',
      cartList:[
      {
        goods_id:'121',
        goods_qty:1,
        user_id:'38272',
        sourceType:'web',
        req_channel:'web',
        pay_type: 'alipay_pc_direct',
        shipping_method:'SMS',
        goods_cat: 'course',
        shipping_fee:1,
        name:'多元智能训练开发套餐',
        price:1000.31,
        detail:[],
      },
      {
        goods_id:'122',
        goods_qty:1,
        user_id:'38272',
        sourceType:'web',
        req_channel:'web',
        pay_type: 'alipay_pc_direct',
        shipping_method:'SMS',
        goods_cat: 'course',
        shipping_fee:1,
        name:'多元智能训练开发套餐B',
        price:1000.24,
        detail:[{
          name: '二级 3-1'
        }, {
          name: '二级 3-2'
        }],
      },
      ],
      selectedAddress:'',
      shipInfo: [],
      rules: {
        shipper: [{
          required: true,
          message: '请输入收货人信息',
          trigger: 'change blur',
        }],
        mobile: [{
          required: true,
          message: '请输入收货人手机信息',
          trigger: 'change blur',
        }],
        address: [{
          required: true,
          message: '请输入收货人地址信息',
          trigger: 'change blur',
        }]
      },
      loading:false,
    }
  },
  computed:{
    ...mapGetters(['USER_SIGN_IN_INFO']),
    sum(){
      return this.cartList.reduce((sum,product) => sum+product.price*100*product.goods_qty,0)
    },
    charge () {
      let vm = this
      // force select first default_addr
      let selectedAddressId = vm.shipInfo.filter(item=>item.default_addr==true)[0]['id']

      // TODO ask 奉慈 to optimize the api

      return {
        goods_id:'121',
        goods_qty:1,
        user_id:'38272',
        sourceType:'web',
        req_channel:'web',
        pay_type: 'alipay_pc_direct',
        shipping_method:'SMS',
        goods_cat: 'course',
        shipping_fee:1,
        address_id: selectedAddressId,
        return_url:'http://localhost:8080/payment/multiIntelligence/result', //支付成功后将返回的地址
      }
    },
    addressList () {
      return this.shipInfo.map(function(address){
        let item  = {
          'primary':address.shipper,
          'secondary': address.region + address.address,
          'tertiary': address.mobile,
          'active': address.default_addr,
        }
        return item
      })
    },
  },
  methods: {
    shipInfoTableRowClassName (row,index){
      if (row.default_addr === true){
        return 'positive-row'
      }
      return ''
    },
    setDefaultAddress (value) {
      // console.log(value.default_addr)
      let vm = this

      let payload = {
        id: value.id,
        user_id: vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
        shipper: value.shipper,
        mobile: value.mobile,
        address: value.address,
        default_addr: value.default_addr == true ? 1:0 ,
        region: value.region,
        type: 'E',
      }

      vm.$store.dispatch('USER_SET_DEFAULT_SHIP_ADDRESS',payload).then(res=>{
        this.$store.dispatch('USER_GET_HISTORY_RECEIVE_ADDRESS',this.$store.state.userRegLog.USER_SIGN_IN_INFO.id).then(res=>{
          vm.$nextTick(function(){
            let data =  JSON.parse(res.body)
            vm.shipInfo = data.map(function(item){
              item.default_addr = item.default_addr==1?true:false
              return item
            })
          })
        })
      })

    },
    removeAddress (value) {
      let vm = this
      vm.shipInfo = []

      let removeInfo = {
        id:value.id,
        user_id: this.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
        shipper: value.shipper,
        mobile: value.mobile,
        address: value.address,
        default_addr: 0,
        region:value.region,
        type:'D',
      }

      vm.$store.dispatch('USER_REMOVE_SHIP_ADDRESS',removeInfo).then(res=>{
        this.$store.dispatch('USER_GET_HISTORY_RECEIVE_ADDRESS',this.$store.state.userRegLog.USER_SIGN_IN_INFO.id).then(res=>{
          vm.$nextTick(function(){

            let data =  JSON.parse(res.body)

            vm.shipInfo = data.map(function(item){
              item.default_addr = item.default_addr==1?true:false
              return item
            })
          })
        })
      })

    },
    modifyAddress(value){
      let vm = this
      //TODO
    },
    closeAddressForm(formName) {
      let vm = this
       vm.dialogAddAddressFormVisible = false
      vm.$refs[formName].resetFields()
    },
    resetForm(formName) {
      let vm = this
      vm.$refs[formName].resetFields()
    },
    addAddress (formName) {
      let vm = this

      vm.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          vm.dialogAddAddressFormVisible = false
          vm.newShipForm.user_id = this.$store.state.userRegLog.USER_SIGN_IN_INFO.id
          let postInfo = {
            id:vm.newShipForm.id,
            user_id: vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
            shipper: vm.newShipForm.shipper,
            mobile: vm.newShipForm.mobile,
            address: vm.newShipForm.address,
            default_addr: vm.newShipForm.default_addr==true?1:0,
            region:vm.newShipForm.region,
            type:'A',
          }

          vm.shipInfo = []
          vm.$store.dispatch('USER_ADD_SHIP_ADDRESS',postInfo).then(res=>{
            this.$store.dispatch('USER_GET_HISTORY_RECEIVE_ADDRESS',this.$store.state.userRegLog.USER_SIGN_IN_INFO.id).then(res=>{

              vm.$refs[formName].resetFields()
              vm.newShipForm.shipper=''
              vm.newShipForm.mobile=''
              vm.newShipForm.address=''
              vm.newShipForm.region=''
              vm.newShipForm.default_addr=false
              vm.province = ''
              vm.city = ''
              vm.district = ''
              vm.detailAddress = ''

              vm.$nextTick(function(){
                let data =  JSON.parse(res.body)
                vm.shipInfo = data.map(function(item){
                  item.default_addr = item.default_addr==1?true:false
                  return item
                })
              })
            })
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      })


    },
    selectAddress (index) {
      this.selectedAddress = this.shipInfo[index]
      this.shipInfo[index].default_addr = true
      this.setDefaultAddress(this.shipInfo[index])
    },
    addressChange(value) {
      // console.log(value)
      this.newShipForm.region = value.province + '#' +value.city + '#'+ value.district
      this.newShipForm.address = value.detail
    },
    quantityChange(value) {
      console.log(value)
    },
    removeItem(item){
      this.cartList = this.cartList.filter(product => product.goods_id !== item.goods_id)
    },
    checkout(){
      let vm = this

      vm.$store.dispatch('PAYMENT_CHECKOUT',vm.charge).then(res=>{

        vm.$store.state.cart.PAYMENT_LIST = vm.cartList
        vm.$store.state.cart.CHECKOUT_REQUEST = res
        this.$router.push({name:'checkout'})
      }).catch(err=>{
        console.log(err)
        vm.$notify({
          title: '出错啦！',
          message: '服务器连接失败',
          type: 'error'
        })
      })
    },
  },
  created () {
    let vm = this
    this.$store.state.cart.PAYMENT_STEP = 1
    this.cartList.user_id = this.USER_SIGN_IN_INFO != undefined ? this.USER_SIGN_IN_INFO.user_id : ''
    // Get user history address list
    if (this.$store.state.userRegLog.USER_SIGN_IN_INFO != undefined) {

      this.$store.dispatch('USER_GET_HISTORY_RECEIVE_ADDRESS',this.$store.state.userRegLog.USER_SIGN_IN_INFO.id).then(res=>{
        vm.$nextTick(function(){
          let data =  JSON.parse(res.body)

          vm.shipInfo = data.map(function(item){
            item.default_addr = item.default_addr==1?true:false
            return item
          })

        })
      })
    }
  },
  mounted () {
    let vm = this
  },
}
</script>


<style lang="scss" scoped>

table#cartList {
  .price.header.red {
    font-size: 1rem;
  }
  border: none;
  th {
    background-color: #fff;
  }
}
h1.header.price {
  small{
    font-size: 1rem;
    font-weight: normal;
    color:#afafaf;
  }
}
</style>
