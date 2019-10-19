<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="ky-sidar__scrollbar">
      <el-menu
        :default-active="$route.path"
        :collapse="coll"
        class="sidebar-el-menu"
        background-color="#304156"
        text-color="#bfcbd9"
        unique-opened
        active-text-color="#409EFF"
      >
        <sidar-item
          v-for="(route,index) in routes"
          :key="route.url"
          :item="route"
          :base-path="route.otherName"
          :base-index="index"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import menu from '@/store/menu';
import SidarItem from './sidebar-item.vue';
import app from '@/store/app';
import SyLogo from '../app-logo.vue';
@Component({
  components: {
    SidarItem,
    SyLogo,
  },
})
export default class Sidar extends Vue {
  get routes() {
    return menu.addRoutes;
  }
  get coll() {
    return app.sidebar.open;
  }
}
</script>

<style lang="scss" scoped>
@import './index';
.ky-sidar__scrollbar {
  height: calc(100% - #{$--navbar-height});
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
<style lang="scss">
@import '~@/style/var';
.el-submenu__title i {
  color: #fff !important;
}
.sidebar-el-menu .nest-menu .el-submenu > .el-submenu__title,
.sidebar-el-menu .el-submenu .el-menu-item {
  background-color: $--background-color-submenu !important;

  &:hover {
    background-color: $--background-color-menu--hover !important;
  }
}
</style>
