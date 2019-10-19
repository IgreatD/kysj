<template>
  <el-select v-model="stageId" placeholder="请选择学段" @change="$emit('change',$event)">
    <el-option v-for="item in stages" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component
export default class BaseStageSelect extends Vue {
  @Prop() readonly value!: string;
  private readonly stages = [
    {
      label: '小学',
      value: '1',
    },
    {
      label: '初中',
      value: '2',
    },
    {
      label: '高中',
      value: '3',
    },
    {
      label: '测试',
      value: '5',
    },
  ];
  private stageId = '';
  @Watch('value', { immediate: true })
  private initStageId(val: string) {
    this.stageId = val;
  }
}
</script>
