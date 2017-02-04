<template lang="html">
  <div class="ui container center aligned">
    <swiper :options="swiperOption" id="multiIntelligencePromo">
      <swiper-slide>
        <img src="../assets/images/banner/multiIntelligence/13.jpg" alt="" >
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/banner/multiIntelligence/14.jpg" alt="" >
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/banner/multiIntelligence/15.jpg" alt="" >
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/banner/multiIntelligence/16.jpg" alt="" >
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/banner/multiIntelligence/18.jpg" alt="" >
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/banner/multiIntelligence/19.jpg" alt="" >
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <div class="ui container">
      <div class="ui labeled icon four item menu">
        <router-link class="item" :to="{name:'cart', params: { item: 'multiIntelligence' }}">
          <i class="shop olive icon"></i>
          购买课程
        </router-link>
        <router-link class="item" :to="{name:'multiIntelligenceTest'}">
          <i class="lab olive icon"></i>
          测试
        </router-link>
        <router-link class="item" :to="{name:'multiIntelligenceBook'}">
          <i class="calendar olive icon"></i>
          课程预约
        </router-link>
        <router-link class="item " :to="{name:'multiIntelligenceRoom'}">
          <i class="record olive icon"></i>
          进入教室
        </router-link>
      </div>
    </div> -->

  </div>
</template>

<script>
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        direction : 'vertical',
        paginationClickable: true,
        mousewheelControl : true,
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
#multiIntelligencePromo {
  height: 85vh;
  @media only screen and (max-width: 768px) {

  }
}

.swiper-slide {
  img {
    height: 85vh;
    @media only screen and (max-width: 768px) {
      width:95vw;
    }
  }


}
</style>
