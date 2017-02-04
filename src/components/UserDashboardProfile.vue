<template lang="html">
  <div class="row " id="testContent">
    <div class="four wide column small">
      <user-sidebar ></user-sidebar>
    </div>
      <div class="twelve wide column ">
        <router-view name="userMain" ></router-view>
      </div>
  </div>
</template>

<script>
import UserSidebar from './UserSidebar'

export default {
  name: 'user-dashboard',
  components: {
    UserSidebar,
  },
  methods:{
    showSidebar() {
      console.log('test')

    }
  },
  mounted () {
    $('.ui.sidebar.user')
    .sidebar({
      context: $('#testContent')
    })
    .sidebar('attach events', '#userProfileMenuTrigger')
  }

}
</script>

<style lang="scss" scoped>
.segment.piled.raised {
  padding-top: 40px;
  padding-bottom: 40px;
  .ui.form {
    padding-top: 30px;
  }
}
</style>
