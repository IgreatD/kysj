<template>
  <router-link :to="path" v-if="hasOneShowingChild">
    <el-menu-item :index="path" class="ky-menu__item">
      <menu-item :icon="item.icon" :title="item.name" />
    </el-menu-item>
  </router-link>
  <el-submenu v-else :index="item.url">
    <template slot="title">
      <menu-item :icon="item.icon" :title="item.name" />
    </template>
    <sidebar-item
      v-for="(child,index) in item.childList"
      :key="basePath + child.url"
      :item="child"
      :base-path="basePath"
      :base-index="index"
    />
  </el-submenu>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import MenuItem from './item.vue';
import { getRouteName } from '@/utils/generateRoutes';
import { isEmpty } from '@/utils';
import app from '@/store/app';
@Component({
  name: 'sidebar-item',
  components: {
    MenuItem,
  },
})
export default class SidebarItem extends Vue {
  @Prop() private item!: any;
  @Prop() private basePath!: string;
  @Prop() private baseIndex!: number;

  get hasOneShowingChild() {
    return isEmpty(this.item.childList);
  }

  get path() {
    if (this.basePath === this.item.url) {
      return `/${this.basePath}`;
    }
    return `/${this.basePath}/${this.item.url}`;
  }
}
</script>
