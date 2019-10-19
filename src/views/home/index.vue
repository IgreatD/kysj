<template>
  <div class="home">
    <lm-register style="margin-bottom: 20px" />
    <ky-register />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import settings from '@/config/settings';
import KyRegister from '@/views/expand/echarts/ky-register.vue';
import LmRegister from '@/views/expand/echarts/lm-register.vue';
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
}
</script>

<style lang="scss" scoped>
@import '~@/style/var';
.home {
  background: $--background-color-base;
}
</style>
