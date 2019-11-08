import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
@Module({
  name: 'select',
  dynamic: true,
  store,
  namespaced: true,
})
class Select extends VuexModule {}

export default getModule(Select);
