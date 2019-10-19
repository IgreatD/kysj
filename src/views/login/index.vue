<template>
  <div class="login">
    <div class="login-container">
      <div class="login-content--title">{{title}}</div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login-content--input"
      >
        <el-form-item prop="userName">
          <el-input
            size="large"
            v-model="loginForm.userName"
            autofocus
            clearable
            placeholder="请输入用户名"
          >
            <base-svg slot="prepend" class="login-input--icon" icon-class="username" />
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            size="large"
            type="passWord"
            v-model="loginForm.passWord"
            placeholder="请输入密码"
            show-password
            @keyup.enter.native="login"
          >
            <base-svg slot="prepend" class="login-input--icon" icon-class="password" />
          </el-input>
        </el-form-item>
        <div class="login-content--btn">
          <el-button
            :loading="loading"
            :disabled="loading"
            :style="loginBtnStyle"
            size="large"
            @click="login"
          >{{loginStaus}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { ILogin, IloginForm, ILoginRules } from './login';
import { Vue, Ref, Component, Mixins } from 'vue-property-decorator';
import BaseVue from '@/base/BaseVue';
import user from '@/store/user';
import kysjApis from '@/api/kysj';
import { UserDataModel } from '@/types/modles/user';
import settings from '@/config/settings';
@Component
export default class Login extends Mixins(BaseVue) implements ILogin {
  loginForm: IloginForm = {
    userName: '',
    passWord: '',
  };
  rules: ILoginRules = {
    userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };
  loading = false;
  title = '课上课下教学精细化管理系统';
  loginStaus = '马上登录';
  private get loginBtnStyle() {
    return {
      backgroundColor: settings.theme,
      borderColor: settings.theme,
      color: '#fff',
    };
  }
  login() {
    const loginForm: any = this.$refs.loginForm;
    loginForm.validate((valid: boolean) => {
      if (valid) {
        this.loginStaus = '登录中...';
        this.loadData<UserDataModel>({
          url: kysjApis.login,
          data: {
            userName: this.loginForm.userName,
            passWord: this.loginForm.passWord,
            timeSpan: parseInt((new Date().getTime() / 1000).toString(), 10),
          },
        }).then((res) => {
          const auth = {
            ...res.data,
            userName: this.loginForm.userName,
            passWord: this.loginForm.passWord,
          };
          user.setUserInfo(auth);
          this.$router.replace('/home');
        });
      } else {
        return false;
      }
    });
  }

  loadError() {
    this.loginStaus = '重新登录';
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

<style lang="scss">
@import '~@/style/var';
.login {
  /* .el-input {
    height: 47px;
    input {
      height: 47px;
    }
  } */
  .el-input-group__prepend,
  .el-input-group__append {
    background: $--color-primary;
  }
}
</style>
