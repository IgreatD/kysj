<template>
  <el-table
    id="sanyi-table"
    stripe
    border
    size="medium"
    v-on="$listeners"
    v-bind="$attrs"
    ref="Table"
    highlight-current-row
    @selection-change="selectChange"
    @current-change="toggleRowSelection"
    :data="tableData"
  >
    <template v-for="(item, index) in rowHeader">
      <el-table-column
        align="center"
        show-overflow-tooltip
        v-if="!item.custom"
        :key="index"
        v-bind="item"
      >
        <template v-slot="scope" v-if="item.h">
          <el-slot :h="item.h" :table-data="tableData" v-bind="scope" v-on="$listeners" />
        </template>
        <template v-slot="scope" v-else-if="item.link">
          <router-link :to="item.to(scope.row)">
            <el-tag type="primary">{{scope.row[item.prop]}}</el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-slot
        v-else
        :key="index"
        :h="item.h"
        :index="index"
        :table-data="tableData"
        :row="item"
        v-on="$listeners"
      />
    </template>
  </el-table>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit, PropSync, Watch } from 'vue-property-decorator';
import { IRowHeader } from './index.d';
import ElSlot from './el-slot.vue';
import { ElTable } from 'element-ui/types/table';
import { isEmpty } from '@/utils';
@Component({
  components: {
    ElSlot,
  },
})
export default class BaseTable extends Vue {
  @Prop({
    default: () => {
      return {};
    },
  })
  private value!: any;
  @Prop({ default: () => [] }) private tableData!: any[];
  @Prop({ default: () => [] }) private rowHeader!: IRowHeader[];
  private currentData: any = {};
  @Watch('currentData', { immediate: true, deep: true })
  private currentDataChange(val: any) {
    this.$emit('input', val);
  }
  @Watch('value')
  private valueChange(val: any) {
    if (isEmpty(val)) {
      this.clearSelection();
    }
  }
  private selectChange(val: any) {
    const table = this.$refs.Table as ElTable;
    val.forEach((data: any, index: number) => {
      table.toggleRowSelection(data, index === val.length - 1 ? true : false);
    });
    if (val.length === 1) {
      const rowData = val[0];
      this.toggleRowSelection(rowData);
    }
  }

  private clearSelection() {
    const table = this.$refs.Table as ElTable;
    table.clearSelection();
  }

  private toggleRowSelection(val: any) {
    const table = this.$refs.Table as ElTable;
    table.toggleRowSelection(val, true);
    this.currentData = Object.assign({}, val);
  }
}
</script>

