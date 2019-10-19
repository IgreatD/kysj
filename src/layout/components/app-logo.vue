<template>
  <transition name="sidebarLogoFade">
    <router-link class="sidebar-logo" to="/">
      <img v-if="logo" :src="logo" />
      <span v-if="!collapse">{{ title }}</span>
    </router-link>
  </transition>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import app from '@/store/app';
import settings from '@/config/settings';
@Component
export default class AppLogo extends Vue {
  private title = settings.logoTitle;
  private logo = settings.logo;
  private get collapse() {
    return app.sidebar.open;
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/var';
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo {
  width: 100%;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  text-decoration: none;
  height: $--navbar-height;
  line-height: $--navbar-height;
  background-color: $--color-primary;
  border-bottom: 1px $--border-color-light solid;
  color: #ffffff;
  font-weight: 600;
  & img {
    vertical-align: middle;
    margin-right: 6px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border: none;
  }
  & span {
    vertical-align: middle;
    height: 40px;
    line-height: 40px;
  }
}
</style>
