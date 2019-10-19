<template>
  <el-pagination
    class="base-pagination"
    :total="total"
    :page-size.sync="syncPageSize"
    :current-page.sync="syncPageIndex"
    :page-sizes="[10,20,30,50]"
    background
    prev-text="上一页"
    next-text="下一页"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind="$attrs"
  />
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit, PropSync, Watch } from 'vue-property-decorator';
import { isEmpty } from '@/utils';
@Component
export default class BasePagination extends Vue {
  @Prop({ default: 0 }) private total!: number;
  @PropSync('pageSize', { type: Number }) private syncPageSize!: number;
  @PropSync('pageIndex', { type: Number }) private syncPageIndex!: number;
  private handleSizeChange(val: number) {
    this.syncPageIndex = 1;
    this.$emit('page-change');
  }
  private handleCurrentChange(val: number) {
    this.$emit('page-change');
  }
}
</script>

<style lang="scss" scoped>
.base-pagination {
  padding-top: 16px;
}
</style>
