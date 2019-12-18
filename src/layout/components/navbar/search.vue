<template>
  <div class="ky-navbar-search">
    <el-select
      class="ky-navbar-search__select"
      placeholder="输入菜单名称..."
      remote
      filterable
      default-first-option
      v-model="search"
      :remote-method="querySearch"
      @change="change"
    >
      <i slot="prefix" class="el-icon-search" />
      <el-option
        v-for="(item) in options"
        :key="item.path"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator';
import menu from '@/store/menu';
import Fuse from 'fuse.js';
import path from 'path';
@Component
export default class NavbarSearch extends Vue {
  private search: string = '';
  private options: any[] = [];
  private searchPool: any[] = [];
  private fuse: any = null;
  private mounted() {
    this.searchPool = this.generatorRoute(this.routes);
  }
  private get routes() {
    return menu.permissionRouter;
  }
  @Watch('routes')
  private onRoutesChange() {
    this.searchPool = this.generatorRoute(this.routes);
  }
  @Watch('searchPool')
  private initFuse(list: any) {
    this.fuse = new Fuse(list, {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        {
          name: 'title',
          weight: 0.7,
        },
        {
          name: 'path',
          weight: 0.3,
        },
      ],
    });
  }
  private change(val: any) {
    this.$router.push(val.path);
    this.search = '';
    this.options = [];
  }
  private generatorRoute(routes: any, basePath = '/', prefixTitle = []) {
    let res: any[] = [];
    routes.forEach((route: any) => {
      const data: any = {};
      data.path = path.resolve(basePath, route.path);
      data.title = [...prefixTitle];
      if (route.meta && route.meta.title) {
        data.title = [...prefixTitle, route.meta.title];
        res.push(data);
      }
      if (route.children) {
        const childerenData = this.generatorRoute(route.children, data.path, data.title);
        if (childerenData.length >= 1) {
          res = [...res, ...childerenData];
        }
      }
    });
    return res;
  }
  private querySearch(search: string) {
    if (search !== '') {
      this.options = this.fuse.search(search);
    } else {
      this.options = [];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@~@/style/mixins/mixins';
@include b(navbar-search) {
  @include e(icon) {
    margin: 15px;
    outline: none;
    vertical-align: middle !important;
    cursor: pointer;
  }
  @include e(select) {
    outline: none;
    vertical-align: middle !important;
    // width: 0;
    height: 32px;
    line-height: 32px;
    transition: width 0.2s;
    @include when(show) {
      // width: 250px;
    }
  }
}
</style>

<style  scoped>
.ky-navbar-search__select >>> .el-input__inner {
  border-radius: 15px;
}
</style>
