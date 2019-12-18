<template>
  <base-dialog :visible.sync="syncShow" :title="title" @opened="getData" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="warning" @click="bind" :loading="updateLoading">绑定</el-button>
    </template>
    <el-form :model="formModel">
      <el-form-item label="摄像头上课">
        <el-switch v-model="formModel.isExistPushRTMP" active-text="支持" inactive-text="不支持" />
      </el-form-item>
      <el-form-item label="设备列表">
        <el-select v-model="formModel.deviceCodes" multiple>
          <el-option
            v-for="(item, index) in devices"
            :key="index"
            :label="item.name"
            :value="item.deviceCode"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
@Component
export default class ClassBindRtmpDialog extends Mixins(BaseDialogVue) {
  private get title() {
    return this.dialogData.Name;
  }
  private formModel: any = {};
  private devices: any[] = [];
  @Watch('dialogData')
  private initFormModel(data: any) {
    if (!isEmpty(data)) {
      this.formModel.classId = data.ClassID;
      this.$set(this.formModel, 'isExistPushRTMP', data.IsExistPushRTMP === '1' ? true : false);
      this.$set(this.formModel, 'deviceCodes', data.DeviceCodes.split(','));
    }
  }
  private getData() {
    this.http({
      url: kysjApis.getRtmpDeviceList,
      data: {
        pageSize: 1000,
        pageIndex: 0,
      },
    }).then(({ data }: any) => {
      this.devices = Object.freeze(
        data.data.map((item: any) => {
          item.name = `${item.deviceName} - ${item.deviceCode}`;
          return item;
        }),
      );
    });
  }
  private bind() {
    this.updateLoading = true;
    this.http({
      url: kysjApis.classBindRtmp,
      data: {
        classId: this.formModel.classId,
        isExistPushRTMP: this.formModel.isExistPushRTMP ? 1 : 0,
        deviceCodes: this.formModel.deviceCodes.join(','),
      },
    })
      .then(() => {
        this.$message.success('班级设备绑定成功');
        this.updateLoading = false;
        this.syncShow = false;
        this.updateSuccess();
      })
      .catch((err) => {
        this.$message.error('班级设备绑定失败');
        this.updateLoading = false;
      });
  }
}
</script>
