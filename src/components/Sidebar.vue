<template lang="html">
  <div id="sidebar" class="ui vertical sidebar menu right inverted">
    <a class="toc item "><i class="sidebar icon"></i></a>
    <router-link class="item" :to="{ name: 'home' }" >首页</router-link>
    <a class="ui item courseCenter" href="#" @click.prevent >在线视频</a>
    <router-link class="item" :to="{name:'multiIntelligence'}">训练课</router-link>
    <a class="ui item " href="#" @click.prevent >轻咨询</a>
    <a class="ui item showAppQR" href="#" @click.prevent>专业测评</a>
  </div>
</template>
<script>

export default {
  name: 'sidebar',
  methods: {
    links (link) {
      console.log(link)
      // this.$router.push(link)
    }
  },
  mounted () {

  }
}
</script>
