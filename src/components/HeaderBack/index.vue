<template>
  <el-card class="back">
    <div class="back-box" @click="$router.back()">
      <span class="el-icon-back back-box-icon" />
      <span class="back-box-title">{{ title }}</span>
    </div>
    <div class="back-content">
      <slot />
    </div>
  </el-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class HeaderBack extends Vue {
  @Prop({ default: '返回' }) readonly title!: string;
}
</script>

<style lang="scss" scoped>
@import '~@/style/var.scss';
.back {
  &-box {
    cursor: pointer;
    color: $--color-text-regular;
    font-size: 18px;
    &:active,
    &:hover {
      color: #409eff;
    }
    &-title {
      padding-left: 10px;
    }
  }
  &-content {
    padding: 20px 0;
  }
}
</style>
