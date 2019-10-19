import { Module, VuexModule, Action, getModule, Mutation } from 'vuex-module-decorators';
import menuApis from '@/api/kysj';
import axios from '@/utils/http/axios';
import store from '@/store';
import { generateAsyncRouterMap } from '@/utils/generateRoutes';
import { AxiosRequestConfig } from 'axios';
import { resetRouter } from '@/router';
import { ICommonModel } from '@/types/modles/models';
import { get, set, LsKey, ExpKey } from '@/utils/ls';
import { isEmpty } from '@/utils';
@Module({
  name: 'Menu',
  dynamic: true,
  store,
  namespaced: true,
})
class Menu extends VuexModule {
  public addRoutes: any[] = get(LsKey.MNEUS, ExpKey.HALF_HOUR) || [];
  public permissionRouter: any[] = [];

  @Mutation
  public setPermissionRouter(data: any[]) {
    this.permissionRouter = data;
  }

  @Mutation
  public setRoutes(data: any[]) {
    this.addRoutes = data;
  }

  @Action
  public async getMyMenus() {
    if (!isEmpty(this.addRoutes)) {
      return await this.addRoutes;
    }
    const apiConfig: AxiosRequestConfig = {
      url: menuApis.getMyMenus,
      data: {},
    };
    return await axios.create<ICommonModel<any[]>>(apiConfig).then((res) => {
      const data = res.data.data;
      data.unshift({
        name: '首页',
        url: 'home',
        otherName: 'home',
        icon: 'home',
        childList: [],
      });
      if (process.env.NODE_ENV !== 'production') {
        data.push({
          name: '工具',
          url: 'tools',
          otherName: 'tools',
          icon: 'tool',
          childList: [
            {
              name: '富文本编辑器',
              url: 'editor',
              otherName: 'editor',
              childList: [],
            },
          ],
        });
      }
      this.context.commit('setRoutes', data);
      set(LsKey.MNEUS, data);
      return data;
    });
  }

  @Action
  public async generateRoutes(data: any[]) {
    const routes = await generateAsyncRouterMap(data);
    this.context.commit('setPermissionRouter', routes);
    resetRouter();
    return routes;
  }
}

export default getModule(Menu);
