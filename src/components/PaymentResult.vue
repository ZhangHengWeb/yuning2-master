<template lang="html">
  <div class="ui container segment payment very padded">
    <h2 class="ui center aligned icon header olive">
      <i class="circular checkmark icon"></i>
      恭喜您，支付成功!
    </h2>
    <div class="ui center aligned container">
      <p><button class="ui olive button">返回首页</button></p>
    </div>


  </div>
</template>

<script>
export default {

  created () {
    this.$store.state.cart.PAYMENT_STEP = 3
  }
}
</script>

<style lang="css">
</style>
