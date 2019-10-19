<template>
  <div class="ky-navbar__right">
    <span class="ky-navbar__right--action">
      <navbar-search />
    </span>
    <span class="ky-navbar__right--action">
      <theme-picker />
    </span>
    <span class="ky-navbar__right--action">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="ky-navbar__right--action is-name el-dropdown-link">
          {{name}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">切换账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import user from '@/store/user';
import NavbarSearch from './search.vue';
import ThemePicker from '@/components/ThemePicker/index.vue';
import app from '@/store/app';
@Component({
  components: {
    NavbarSearch,
    ThemePicker,
  },
})
export default class NavbarRight extends Vue {
  get open() {
    return app.campusSidebar.open;
  }
  get isActive() {
    return app.sidebar.open;
  }

  get userInfo() {
    return user.auth;
  }

  get name() {
    return this.userInfo ? this.userInfo.userName : '';
  }

  private handleCommand(command: string) {
    if (command === 'logout') {
      user.logOut().then(() => {
        this.$router.push('/login');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/mixins/mixins';
@import '~@/style/mixins/utils';
@include b(navbar) {
  @include e(right) {
    float: right;
    display: flex;
    align-content: center;
    height: 100%;
    overflow: hidden;
    @include utils-clearfix();
    @include m(action) {
      padding: 0 12px;
      cursor: pointer;
      transition: all 0.3s;
      & .campus {
        border-radius: 15px !important;
      }
      @include when(name) {
        @include utils-user-select(none);
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
}
</style>
