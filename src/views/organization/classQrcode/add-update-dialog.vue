<template>
  <base-dialog :visible.sync="syncShow" :title="title" @opened="open" width="40%">
    <template v-slot:footer>
      <el-button :type="confirmType" :loading="updateLoading" @click="submit">{{confirmText}}</el-button>
    </template>
    <el-form :model="formModel" label-width="100px" :loading="loading">
      <el-form-item label="班级">
        <el-select v-model="formModel.classId" placeholder="请选择绑定的班级">
          <el-option
            v-for="(item, index) in bindClzes"
            :key="index"
            :value="item.ClassID"
            :label="item.Name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区">
        <el-cascader
          clearable
          ref="citys"
          v-model="selectCity"
          :options="citys"
          placeholder="请选择地区"
          @change="cityChange"
        >
          <template slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf">({{ data.children.length }})</span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item label="学校">
        <el-select
          clearable
          v-model="formModel.schoolId"
          placeholder="请选择学校"
          @change="onSchoolChange"
        >
          <el-option
            v-for="(item, index) in schools"
            :key="index"
            :value="item.SchoolID"
            :label="item.Name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学段、年级">
        <el-cascader
          v-model="selectStage"
          :options="stages"
          placeholder="请选择学段、年级"
          @change="onStageChange"
          clearable
        >
          <template slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
          </template>
        </el-cascader>
        <!-- <el-checkbox label="必选" style="padding-left: 16px;" v-model="stageMust"></el-checkbox> -->
      </el-form-item>
      <el-form-item label="二维码" v-if="isAdd">
        <el-select v-model="size" placeholder="请选择二维码的尺寸" @change="onSizeChange">
          <el-option
            v-for="(item, index) in qrcodeSize"
            :key="index"
            :value="item.size"
            :label="item.label"
          ></el-option>
        </el-select>
        <div :id="qrcodeId" class="qrcode"></div>
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import kysjApis from '@/api/kysj';
import user from '@/store/user';
import { isEmpty } from '@/utils';
const citys = require('@/assets/citys.json');
import { stages, qrcodeSize } from './model';
const qrCode = require('qrcodejs2');
import { guid, dataURLtoFile } from '@/utils';
import upload from '@/utils/http/cos';
import { ISucessData } from '@/types';
const parameterGuid = guid();
@Component
export default class AddUpdateDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {};
  private bindClzes: any[] = [];
  private selectCity: any = [];
  private selectStage: any = [];
  private schools: any[] = [];
  private citys = citys;
  private stages = stages;
  private qrcodeSize = qrcodeSize;
  private size = 128;
  private qrCode: any = null;
  private showCode = false;
  // private stageMust = true;
  private get qrcodeId() {
    return `qrcode-${Date.now()}`;
  }
  private get title() {
    return `${this.confirmText}班级二维码`;
  }
  private get isAdd() {
    return isEmpty(this.dialogData);
  }
  @Watch('formModel', { immediate: true })
  private onFormModelChange(val: any) {
    if (!this.isAdd) {
      return;
    }
    if (isEmpty(val)) {
      return;
    }
    let canMakeCode: boolean = true;
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        const element = val[key];
        if (isEmpty(element)) {
          canMakeCode = false;
          break;
        }
      }
    }
    if (canMakeCode) {
      const qrCodeData = {
        text: `http://share.sijiaokeji.com/class/${parameterGuid}`,
        width: this.size,
        height: this.size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: qrCode.CorrectLevel.H,
      };
      this.genCode(qrCodeData);
    }
  }
  private genCode(qrCodeData: any) {
    this.$nextTick().then(() => {
      const qrCodeElement = document.getElementById(this.qrcodeId);
      if (qrCodeElement) {
        qrCodeElement.innerHTML = '';
        this.qrCode = null;
        this.qrCode = new qrCode(qrCodeElement, qrCodeData);
        this.formModel.parameterGuid = parameterGuid;
      }
    });
  }
  private open() {
    if (!isEmpty(this.dialogData)) {
      this.formModel = Object.assign({}, this.dialogData);
      this.selectCity = [
        this.formModel.provinceId,
        this.formModel.cityId,
        this.formModel.districtId,
      ];
      this.selectStage = [this.formModel.stageId, this.formModel.gradeId];
    }
    this.getBindClass();
    if (!isEmpty(this.selectCity)) {
      this.getSchool();
    }
  }
  private getBindClass() {
    this.http<any[]>({
      url: kysjApis.getOrganizationParametersClassList,
      data: {
        organizationCode: user.auth.organizationCode,
        pageSize: 1000,
        pageIndex: 0,
      },
    }).then(({ data }) => {
      this.bindClzes = data.data;
    });
  }
  private onSizeChange() {
    this.onFormModelChange(this.formModel);
  }
  private onSchoolChange() {
    for (const school of this.schools) {
      if (this.formModel.schoolId === school.SchoolID) {
        this.$set(this.formModel, 'school', school.Name);
        break;
      }
    }
  }
  private onStageChange() {
    if (isEmpty(this.selectStage)) {
      this.formModel.stage = '';
      this.formModel.stageId = '';
      this.formModel.grade = '';
      this.formModel.gradeId = '';
      return;
    }
    for (const stage of this.stages) {
      if (this.selectStage[0] === stage.value) {
        this.formModel.stageId = this.selectStage[0];
        this.formModel.stage = stage.label;
        for (const grade of stage.children) {
          if (this.selectStage[1] === grade.value) {
            this.formModel.grade = grade.label;
            this.formModel.gradeId = this.selectStage[1];
            break;
          }
        }
      }
    }
  }
  private cityChange() {
    this.$set(this.formModel, 'school', '');
    this.$set(this.formModel, 'schoolId', '');
    if (!this.selectCity[0]) {
      this.formModel.provinceId = '';
      this.formModel.province = '';
      this.formModel.city = '';
      this.formModel.cityId = '';
      this.formModel.districtId = '';
      this.formModel.district = '';
      return;
    }
    for (const province of this.citys) {
      if (this.selectCity[0] === province.value) {
        this.formModel.provinceId = this.selectCity[0];
        this.formModel.province = province.label;
        for (const city of province.children) {
          if (this.selectCity[1] === city.value) {
            this.formModel.city = city.label;
            this.formModel.cityId = this.selectCity[1];
            for (const dist of city.children) {
              if (this.selectCity[2] === dist.value) {
                this.formModel.districtId = this.selectCity[2];
                this.formModel.district = dist.label;
                break;
              }
            }
          }
        }
      }
    }
    this.getSchool();
  }
  private getSchool() {
    if (this.selectCity[0] === '0' || this.selectCity[1] === '0') {
      return;
    }
    this.http<any[]>({
      url: kysjApis.getSchool,
      data: {
        cityId: this.selectCity[1],
        districtId: this.selectCity[2],
      },
    }).then(({ data }) => {
      this.schools = (data as any).SysSchoolInfoDto;
    });
  }
  private update() {
    this.updateLoading = true;
    /* if (this.stageMust && isEmpty(this.selectStage.stage)) {
      this.formModel.stage = '';
      this.formModel.stageId = '0';
      this.formModel.grade = '';
      this.formModel.gradeId = '0';
    } */
    this.http({
      url: kysjApis.addOrganizationParameters,
      data: {
        organizationParametersId: '',
        organizationId: user.auth.organizationId,
        organizationCode: user.auth.organizationCode,
        ...this.formModel,
      },
    })
      .then(() => {
        this.$message.success(`${this.title}成功`);
        this.updateLoading = false;
        this.syncShow = false;
        this.updateSuccess();
      })
      .catch((err) => {
        this.updateLoading = false;
        this.$message.error(`${this.title}失败，${err.message}`);
      });
  }
  private async submit() {
    if (!this.isAdd) {
      this.update();
      return;
    }
    const qrcode = (document.getElementById(this.qrcodeId) as any).getElementsByTagName('img')[0]
      .src;
    const that = this;
    await upload(dataURLtoFile(qrcode, Date.now() + '.png'), {
      onReady() {
        that.updateLoading = true;
      },
      onError() {
        that.$message.error('上传失败，请重试！');
      },
      onSuccess(data: ISucessData) {
        that.formModel.qrcode = `https://${data.Location}`;
        that.update();
      },
      onComplete() {
        that.updateLoading = false;
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.qrcode {
  padding-top: 20px;
  & img {
    border: 6px solid #fff;
  }
}
</style>
