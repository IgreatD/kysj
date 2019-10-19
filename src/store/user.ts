import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import examineApis from '@/api/kysj';
import { get, set, LsKey } from '@/utils/ls';
import { SET_AUTH } from './mutations-types';
import store from '@/store';
import axios from '@/utils/http/axios';
import { ICommonModel } from '@/types/modles/models';
import { UserDataModel } from '@/types/modles/user';
import { AxiosRequestConfig } from 'axios';
import menu from './menu';
import { resetRouter } from '@/router';
@Module({
  name: 'user',
  dynamic: true,
  store,
  namespaced: true,
})
class User extends VuexModule {
  public auth = get(LsKey.AUTH);

  @Mutation
  public [SET_AUTH](token: any) {
    this.auth = token;
  }

  @Action
  public setUserInfo(auth: any) {
    set(LsKey.AUTH, auth);
    this.context.commit(SET_AUTH, auth);
  }

  @Action
  public async getUserToken() {
    if (this.auth) {
      const apiConfig: AxiosRequestConfig = {
        url: examineApis.getUserToken,
        data: {
          passWord: this.auth.passWord,
          userName: this.auth.userName,
          timeSpan: parseInt((new Date().getTime() / 1000).toString(), 10),
        },
      };
      return await axios.create<ICommonModel<UserDataModel>>(apiConfig).then((res) => {
        const { /* token, */ ...otherAuth } = this.auth;
        const auth = {
          ...otherAuth,
          token: res.data.data.token,
        };
        this.setUserInfo(auth);
        return res.data.data.token;
      });
    }
    return await Promise.reject('token 获取失败');
  }

  @Action
  public async logOut() {
    return await new Promise((res) => {
      localStorage.clear();
      this.context.commit(SET_AUTH, undefined);
      menu.setRoutes([]);
      menu.setPermissionRouter([]);
      resetRouter();
      res();
    });
  }
}

export default getModule(User);
