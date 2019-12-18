<template>
  <base-dialog :visible.sync="syncShow" :title="title" v-if="syncShow">
    <el-form label-width="120px">
      <el-form-item label="课时标题">{{title}}</el-form-item>
      <el-form-item label="班级名称">{{dialogData.className}}</el-form-item>
      <el-form-item label="录像列表">
        <span v-if="!records || records.length === 0">该课时没有录像</span>
        <template v-for="(item, index) in records">
          <el-form :key="index" label-width="auto">
            <el-form-item :label="formatDuration(item.duration)">
              <el-button type="primary" @click="play(item.video_url)">播 放</el-button>
              <el-button type="warning" @click="clip(item)">剪 辑</el-button>
              <el-button type="danger" @click="deleteVideo(item)">删 除</el-button>
              <el-button type="success" @click="transfer(item)">转 让</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-form-item>
    </el-form>
    <player-dialog :url="url" :show.sync="playerDialogShow" :title="title">
      <template v-slot:footer>
        <el-button type="warning" @click="clipVideo" :loading="clipLoading">剪辑</el-button>
      </template>
      <el-form inline style="padding-top: 20px;" v-if="showClip">
        <el-form-item label="请输入剪辑开始时间(秒)">
          <el-input v-model="timeObj.startTime" placeholder="请输入剪辑开始时间"></el-input>
        </el-form-item>
        <el-form-item label="请输入剪辑结束时间(秒)">
          <el-input v-model="timeObj.endTime" placeholder="请输入剪辑结束时间"></el-input>
        </el-form-item>
      </el-form>
    </player-dialog>
    <record-transfer-dialog :show.sync="recordTransferDialogShow" :dialog-data="current" />
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { secondToDate } from '@/utils';
import PlayerDialog from '@/components/BasePlayer/player-dialog.vue';
import kysjApis from '@/api/kysj';
import RecordTransferDialog from './record-transfer-dialog.vue';
@Component({
  components: {
    PlayerDialog,
    RecordTransferDialog,
  },
})
export default class LessonRecordDialog extends Mixins(BaseDialogVue) {
  private url = '';
  private current: any = {};
  private playerDialogShow = false;
  private recordTransferDialogShow = false;
  private clipLoading = false;
  private timeObj = {
    startTime: 0,
    endTime: 0,
  };
  private showClip = false;
  private videoData: any = {};
  private get records() {
    return this.dialogData.data;
  }
  private get title() {
    return this.dialogData.lessonTitle;
  }
  private formatDuration(duration: number) {
    return '录像时长  ' + secondToDate(duration);
  }
  private play(url: string) {
    this.url = url;
    this.playerDialogShow = true;
  }
  private clip(item: any) {
    this.videoData = item;
    this.url = item.video_url;
    this.$set(this.timeObj, 'endTime', item.duration);
    this.playerDialogShow = true;
    this.showClip = true;
  }
  private transfer(item: any) {
    this.current = item;
    this.recordTransferDialogShow = true;
  }
  private deleteVideo(item: any) {
    this.$confirm('此操作将删除课时录像, 是否继续?', '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.http({
          url: kysjApis.deleteClassLessonRecord,
          data: {
            fileId: item.file_id,
          },
        })
          .then(() => {
            this.$message.success('录像删除成功');
            this.dialogData.data.splice(
              this.dialogData.data.indexOf(
                this.dialogData.data.filter((element: any) => item.file_id === element.file_id)[0],
                1,
              ),
            );
          })
          .catch(() => {
            this.$message.error('录像删除失败，请重试！');
          });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
  }
  private clipVideo() {
    this.clipLoading = true;
    this.http({
      url: kysjApis.clipVideo,
      data: {
        classLessonID: this.videoData.classLessonId,
        fileId: this.videoData.file_id,
        newFileName: Date.now(),
        startTimeOffset: this.timeObj.startTime,
        endTimeOffset: this.timeObj.endTime,
      },
    })
      .then(() => {
        this.clipLoading = false;
        this.$message.success('视频剪辑成功，5秒后重新刷新数据');
        this.playerDialogShow = false;
        this.syncShow = false;
        this.updateSuccess();
      })
      .catch(() => {
        this.clipLoading = false;
      });
  }
}
</script>
