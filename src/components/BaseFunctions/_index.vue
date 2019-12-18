<template>
  <el-form inline class="ky-fun">
    <template v-if="showFunctions">
      <el-form-item v-for="(item, index) in functions" :key="index">
        <el-button
          :icon="item.icon"
          :type="item.type ? item.type : 'primary'"
          @click="$emit(item.otherName)"
        >{{ item.name }}</el-button>
      </el-form-item>
    </template>
    <el-form-item v-if="showQuery">
      <el-input v-model="queryText" placeholder="请输入需要搜素的内容" clearable @keyup.enter.native="search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class BaseFunctions extends Vue {
  @Prop({ default: true }) readonly showQuery!: boolean;
  @Prop({ default: true }) readonly showFunctions!: boolean;
  private queryText = '';
  get functions() {
    const meta = this.$route.meta;
    if (meta && meta.functions) {
      return meta.functions.filter((fn: any) => fn.otherName !== 'nomal');
    } else {
      return [];
    }
  }
  private search() {
    this.$emit('query', this.queryText);
  }
}
</script>

<style lang="scss" >
@import '~@/style/var.scss';
.ky-fun .el-input-group__append {
  background: $--color-primary !important;
  .el-icon-search {
    color: white;
  }
}
</style>
