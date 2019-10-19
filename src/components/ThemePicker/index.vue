<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11aa8f', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script lang='ts'>
import ThemeChange from '@/utils/change-theme';
import { Vue, Component, Watch } from 'vue-property-decorator';
import app from '@/store/app';
import { isEmpty } from '@/utils';
@Component
export default class ThemePicker extends Vue {
  private theme = '';
  private get defaultTheme() {
    return app.theme;
  }
  @Watch('defaultTheme', { immediate: true })
  private onDefaultThemeChange(val: string) {
    this.theme = val;
  }
  @Watch('theme')
  private async onThemeChange(val: string) {
    const themeChangeInstance = new ThemeChange();
    await themeChangeInstance.changeTheme(this.theme);
  }
}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
