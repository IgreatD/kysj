<template>
  <div class="basic-layout">
    <section class="ky-layout ky-layout--has-sidar">
      <ky-sidar
        class="ky-layout__sidar ky-layout__sidar--fixed ky-layout__sidar--dark"
        :class="coll && 'ky-layout__sidar--coll'"
      />
      <section class="ky-layout ky-layout__main" :class="coll && 'ky-layout__main--coll'">
        <header
          class="ky-layout__header ky-layout__header--fixed"
          :class="coll && 'ky-layout__header--fixed--coll'"
        >
          <ky-navbar />
        </header>
        <main class="ky-layout__container" :class="coll && 'ky-layout__container--coll'">
          <transition name="fade" mode="out-in">
            <keep-alive :exclude="exclude" :max="maxKeepAlive">
              <router-view class="ky-layout__content"></router-view>
            </keep-alive>
          </transition>
        </main>
      </section>
    </section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import app from '@/store/app';
import kySidar from './components/sidar/index.vue';
import kyNavbar from './components/navbar/index.vue';
import settings from '../config/settings';
@Component({
  components: {
    kySidar,
    kyNavbar,
  },
})
export default class Layout extends Vue {
  private get coll() {
    return app.sidebar.open;
  }
  private get maxKeepAlive() {
    return settings.maxKeepAlive;
  }
  private get exclude() {
    return ['Home', 'DictsBase', 'ToolsEditor', 'AchievementsSecharge'];
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

<style >
.el-menu {
  border-right: 0 !important;
}
</style>
