<template>
  <el-form label-position="left" inline align="left" class="table-expand">
    <el-form-item label="开始时间">
      <span>{{ clz.BeginDate }}</span>
    </el-form-item>
    <el-form-item label="结束时间">
      <span>{{ clz.EndDate }}</span>
    </el-form-item>
    <el-form-item label="班级名称">
      <span>{{ clz.Name }}</span>
    </el-form-item>
    <el-form-item v-if="clz.Describe" label="班级描述">
      <span>{{ clz.Describe }}</span>
    </el-form-item>
    <el-form-item label="课时个数">
      <span>{{ clz.LessonNumber }}</span>
    </el-form-item>
    <el-form-item label="课时价格">
      <span>{{ clz.LessonPrice }}</span>
    </el-form-item>
    <el-form-item label="年级">
      <span>{{ clz.Stage }}</span>
    </el-form-item>
    <el-form-item label="学生个数">
      <span>{{ clz.StudentNumber }}</span>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class ClassExamineExpand extends Vue {
  @Prop() readonly clz!: any;
}
</script>
