<template>
  <div class="ky-global-header">
    <span
      class="ky-global-header__left menu"
      @click="toggleColl"
    >
      <navbar-menu :is-active="coll" />
    </span>
    <ky-breadcrumb class="ky-global-header__left breadcrumb" />
    <navbar-right />
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import app from '@/store/app';
import NavbarMenu from './menu.vue';
import NavbarRight from './right.vue';
import kyBreadcrumb from '@/components/Breadcrumb/index.vue';
@Component({
  components: {
    NavbarMenu,
    NavbarRight,
    kyBreadcrumb,
  },
})
export default class Navbar extends Vue {
  private get coll() {
    return app.sidebar.open;
  }
  private toggleColl() {
    app.toggleSidebar();
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
