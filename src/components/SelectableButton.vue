<template lang="html">
  <button class="ui button large basic" v-bind:class="[item.active==true?'olive':'']" @click="selected(item)">
    <b>{{item.primary}}</b>
    <p>{{item.secondary}}</p>
    <p>{{item.tertiary}}</p>
    <span class="ui bottom right corner label olive">
      <i class="checkmark icon"></i>
    </span>
  </button>
</template>

<script>
export default {
  name: 'selectable-button',
  props: ['item','index'],
  methods: {
    selected (item) {
      // let item = item

      this.$emit('selected',this.index)
    }
  },
}
</script>

<style lang="scss" scoped>

  .ui.basic.button {
    position: relative;
    padding-right: 3rem;
    margin-bottom: .25em;
    border-radius: 0px;
    p {
      margin: 0px;
      padding: 0px;
    }
    .ui.corner.label {
      display: none;
          top: auto;
          bottom:0px;
          width: 3em;
          height: 3em;
      .icon {
        top: 1.242857em;
        left: 0.5em;
      }
      &:after{

        border-top-width: 3em;
        border-right-width: 3em;
        border-bottom-width: 0em;
        border-left-width: 0;
      }
    }
    &.olive {
      .ui.corner.label {
        display: block;
      }
    }
  }
</style>
