<template lang="html">
  <div class="ui container segment payment very padded">
    <div class="ui yellow message">请在1小时内完成支付！逾期订单将取消！</div>
    <h3 class="ui header">订单:</h3>
    <div class="ui divider"></div>
    <h3 class="ui header">购买商品:</h3>
    <el-tree :data="PAYMENT_LIST" :props="productProps" @node-click="handleNodeClick"></el-tree>
    <div class="ui divider"></div>
    <h3 class="ui header">选择支付方式</h3>
    <selectable-button v-for="item in paymentMethods" :item="item" :target="selectedMethod" v-on:selected="selectMethod"></selectable-button>
    <div class="divider ui"></div>
    <div class="ui right aligned container">
      <h1 class="ui red header price"><small>待支付</small> &yen;{{sum/100}}</h1>
    </div>
    <div class="ui divider"></div>
    <div class="ui right aligned container">
      <button class="ui red button" @click="pay" >立即支付</button>
    </div>
    <div class="ui divider hidden"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SelectableButton from './SelectableButton'
import pingpp from 'pingpp-js'

export default {
  name:'checkout',
  components: {
    SelectableButton,
  },
  data () {
    return {
      productProps: {
          children: 'detail',
          label: 'name'
      },
      selectedMethod: '支付宝',
      paymentMethods: [
        {primary:'支付宝',active:true},
        {primary:'微信',active:false},
    ],
    }
  },
  computed: {
    sum(){
      return this.PAYMENT_LIST.reduce((sum,product) => sum+product.price*100*product.goods_qty,0)
    },
    charge () {
      let vm = this
      return {
        goods_id:'121',
        goods_qty:1,
        user_id:vm.$store.state.userRegLog.USER_SIGN_IN_INFO.id,
        sourceType:'web',
        req_channel:'web',
        pay_type: 'alipay',
        shipping_method:'SMS',
        goods_cat: 'course',
        shipping_fee:1,
      }
    },
    ...mapGetters(['PAYMENT_LIST']),
  },
  methods: {
    selectMethod (value) {
      this.selectedMethod = value
    },
    pay () {
      // this.$router.push({name:'paymentResult'})
      let vm = this

      pingpp.createPayment(vm.$store.state.cart.CHECKOUT_REQUEST, function(result, err){
        if (result == "success") {
          // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
        } else if (result == "fail") {
          // charge 不正确或者微信公众账号支付失败时会在此处返回
          console.log(err)
        } else if (result == "cancel") {
          // 微信公众账号支付取消支付
          console.log(err)

        }
      })
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
  created () {
    this.$store.state.cart.PAYMENT_STEP = 2
    if (this.$store.state.cart.CHECKOUT_REQUEST==null) {
      this.$router.push({name:'cart'})
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  border:none;
}
h1.header.price {
  small{
    font-size: 1rem;
    font-weight: normal;
    color:#afafaf;
  }
}
</style>
