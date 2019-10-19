<template>
  <el-form label-position="left" inline align="left" class="table-expand">
    <el-form-item label="推流客户端ip">
      <span>{{ live.ClientIp }}</span>
    </el-form-item>
    <el-form-item label="接流服务器ip">
      <span>{{ live.ServerIp }}</span>
    </el-form-item>
    <el-form-item label="分辨率">
      <span>{{ live.Resolution }}</span>
    </el-form-item>
    <el-form-item label="推流视频码率(bps)">
      <span>{{ live.VideoFps }}</span>
    </el-form-item>
    <el-form-item label="推流音频帧率(Hz)">
      <span>{{ live.AudioFps }}</span>
    </el-form-item>
    <el-form-item label="推流音频码率(bps)">
      <span>{{ live.AudioSpeed }}</span>
    </el-form-item>

    <el-form-item label="音频编码格式">
      <span>{{ live.AudioSpeed }}</span>
    </el-form-item>
    <el-form-item label="视频编码格式">
      <span>{{ live.Vcodec }}</span>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class LiveExpand extends Vue {
  @Prop() readonly live!: any;
}
</script>
