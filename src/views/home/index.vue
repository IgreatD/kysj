<template>
  <div class="home">
    <h3>{{title}}</h3>
    <!-- <template v-if="isOrgan">
    </template>
    <template v-else>
      <lm-register style="margin-bottom: 20px" />
      <ky-register />
    </template>-->
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import settings from '@/config/settings';
import KyRegister from '@/views/expand/echarts/ky-register.vue';
import LmRegister from '@/views/expand/echarts/lm-register.vue';
import user from '@/store/user';
@Component({
  components: {
    KyRegister,
    LmRegister,
  },
})
export default class Home extends Vue {
  get title() {
    return `欢迎来到${settings.title}`;
  }
  get isOrgan() {
    return user.auth && user.auth.organizationId;
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/var';
.home {
  background: $--background-color-base;
}
</style>
