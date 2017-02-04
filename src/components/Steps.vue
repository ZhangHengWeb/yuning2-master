<template lang="html">
  <div class="ui segments ui-steps" v-bind:class="[aligned=='left'?'left':'right']">
    <div class="ui horizontal segments">
      <div v-for="(item,index) in steps" class="ui segment basic item" v-bind:class="[index < currentSteps?'active':'']">
        <div class="name">{{item.name}}</div>
        <label class="ui huge circular label">
          <b>{{index+1}}</b>
        </label>
        <label class="ui huge circular label finished">
          <i class="ui icon checkmark"></i>
        </label>
        <div class="dash-unactive">
        </div>
        <div class="dash-active">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'steps',
  props:['steps','currentSteps','aligned'],
}
</script>

<style lang="scss" scoped>
.ui.horizontal.segments>.segment {
  border-left: none;
}

.ui-steps {
  border:none;
  box-shadow: none;

  .item {
    padding: 0em;
    height: 3rem;

    &.active {
      .circular.label.finished{
        display: block;
      }
      .dash-active {
        display: block;
        background-color: #55a534;
      }
    }
    //common
    .name {
      position: absolute;
      top:-2rem;
      color:#b1b1b1;
    }
    .dash-active,.dash-unactive {
      content: " ";
      position: absolute;
      top:50%;
      left:5px;
      right:auto;
      width: 100%;
      height: 14px;
      background-color: #dcdcdc;
      border:3px solid #dcdcdc;
      border-left:none;
      border-right:none;
      margin-top: -7px;
      z-index: 1;
    }
    .dash-active {
      display: none;
      z-index: 98;
      background-color: #dcdcdc;
    }
  }

  .circular.label{

    &.finished {
      display: none;
      color: #fff;
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#57c13d+0,57a631+100 */
      background: #57c13d; /* Old browsers */
      background: -moz-radial-gradient(center, ellipse cover,  #57c13d 0%, #57a631 100%); /* FF3.6-15 */
      background: -webkit-radial-gradient(center, ellipse cover,  #57c13d 0%,#57a631 100%); /* Chrome10-25,Safari5.1-6 */
      background: radial-gradient(ellipse at center,  #57c13d 0%,#57a631 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#57c13d', endColorstr='#57a631',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

      z-index: 99;
      transform: scale(0.8);
    }

    position: absolute;
    left:0px;
    right:auto;
    top:0px;
    margin: 0px;
    background-color: #dcdcdc;
    z-index: 97;

    i {
      margin: 0px;
    }
  }

  // right mode
  &.right {
    .item {
      .name {
        left:auto;
        right:0px;
      }
      .dash-active,.dash-unactive  {
        left:auto;
        right:5px;
      }
      &:first-child {
        .dash-unactive,.dash-active {
          display: none;
        }
      }
    }
    .circular.label{
      right:0px;
      left:auto;
    }
  }

  // left mode
  &.left {
    .item {
      .name {
        right:auto;
        left:0px;
      }
      .dash-active,.dash-unactive  {
        left:5px;
        right:auto;
      }
      &:last-child {
        .dash-unactive,.dash-active {
          display: none;
        }
      }
    }
    .circular.label{
      left:0px;
      right:auto;
    }

  }

}
</style>
