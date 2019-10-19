import { Module, VuexModule, Action, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { get, set, LsKey } from '@/utils/ls';
import settings from '@/config/settings';
@Module({
  name: 'App',
  dynamic: true,
  store,
  namespaced: true,
})
class App extends VuexModule {
  public theme: string = get(LsKey.DEFAULT_THEME) ? get(LsKey.DEFAULT_THEME) : settings.theme;

  public sidebar: ISidebar = {
    open: get(LsKey.SIDEBAR) ? (get(LsKey.SIDEBAR) === '0' ? true : false) : false,
  };

  public campusSidebar: ISidebar = {
    open: false,
  };

  @Mutation
  public setSidebar() {
    set(LsKey.SIDEBAR, this.sidebar.open ? '1' : '0');
    this.sidebar.open = !this.sidebar.open;
  }

  @Mutation
  public setTheme(theme: string) {
    set(LsKey.DEFAULT_THEME, theme);
    this.theme = theme;
  }

  @Action
  public toggleSidebar() {
    this.context.commit('setSidebar');
  }

  @Mutation
  public setCampusSidebar() {
    this.campusSidebar.open = !this.campusSidebar.open;
  }

  @Action
  public toggleCampusSidebar() {
    this.context.commit('setCampusSidebar');
  }
}

export default getModule(App);

interface ISidebar {
  open: boolean;
}
