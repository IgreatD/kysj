<template>
  <el-form label-position="left" inline align="left" class="table-expand">
    <el-form-item label="设备用户">
      <span>{{ live.deviceUser }}</span>
    </el-form-item>
    <el-form-item label="设备密码">
      <span>{{ live.devicePwd }}</span>
    </el-form-item>
    <el-form-item label="设备IP地址">
      <span>{{ live.deviceIP }}</span>
    </el-form-item>
    <el-form-item label="创建人">
      <span>{{ live.createUserID }}</span>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class MtExpand extends Vue {
  @Prop() readonly live!: any;
}
</script>
