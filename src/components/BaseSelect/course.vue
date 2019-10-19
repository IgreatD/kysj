<template>
  <el-select v-model="courseId" placeholder="请选择科目" @change="courseChange">
    <el-option
      v-for="item in course"
      :key="item.CourseInfoID"
      :label="item.CourseInfoName"
      :value="item.CourseInfoID"
    />
  </el-select>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component
export default class CourseSelect extends Vue {
  @Prop() readonly value!: any;
  private courseId: any = '';
  private course = [
    {
      CourseInfoID: '8',
      CourseInfoName: '物理',
    },
    {
      CourseInfoID: '2',
      CourseInfoName: '数学',
    },
    {
      CourseInfoID: '4',
      CourseInfoName: '化学',
    },
    {
      CourseInfoID: '1',
      CourseInfoName: '英语',
    },
    {
      CourseInfoID: '3',
      CourseInfoName: '语文',
    },
    {
      CourseInfoID: '5',
      CourseInfoName: '地理',
    },
    {
      CourseInfoID: '6',
      CourseInfoName: '政治',
    },
    {
      CourseInfoID: '7',
      CourseInfoName: '历史',
    },
    {
      CourseInfoID: '9',
      CourseInfoName: '生物',
    },
    {
      CourseInfoID: '10',
      CourseInfoName: '信息技术',
    },
    {
      CourseInfoID: '11',
      CourseInfoName: '体育',
    },
    {
      CourseInfoID: '12',
      CourseInfoName: '音乐',
    },
    {
      CourseInfoID: '13',
      CourseInfoName: '美术',
    },
    {
      CourseInfoID: '14',
      CourseInfoName: '管理',
    },
    {
      CourseInfoID: '15',
      CourseInfoName: '心理辅导',
    },
  ];
  @Watch('value', { immediate: true })
  private init(val: any) {
    this.courseId = val;
  }
  private courseChange() {
    this.$emit('input', this.courseId);
  }
}
</script>
