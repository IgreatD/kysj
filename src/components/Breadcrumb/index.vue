<template>
  <el-breadcrumb class="app-breadcrumb" v-if="matched && matched.length > 0" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item) in matched" :key="item.path">
        <router-link :to="to(item)">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';
@Component
export default class Breadcrumb extends Vue {
  private matched: any = [];
  @Watch('$route', { immediate: true })
  private onRouteChange() {
    const matched = this.$route.matched.filter((item) => item.meta && item.meta.title) as any;
    const first = matched[0];
    if (!this.isHome(first)) {
      matched.unshift({
        path: '/home',
        meta: {
          title: '首页',
        },
      });
    }
    this.matched = matched;
  }
  private isHome(val: RouteRecord) {
    return val && /home/.test(val.path);
  }
  private isHidden(val: RouteRecord) {
    return val && val.meta.hidden;
  }
  private to(val: RouteRecord) {
    if (val.redirect) {
      return `${val.path}/${val.redirect}`;
    }
    return val.path;
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
