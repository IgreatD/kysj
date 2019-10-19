<template>
  <el-card class="create" shadow="always">
    <el-form
      ref="form"
      :model="regedit"
      :rules="rulesRegedit"
      class="regedit"
      status-icon
      label-width="100px"
    >
      <el-form-item label="账户类型">
        <el-radio-group v-model="type">
          <template v-for="(item, index) in types">
            <el-radio :label="item.value" :key="index">{{ item.label }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
      <template v-if="type === '3'">
        <el-form-item label="手机号码" prop="UserName">
          <el-input :maxlength="11" v-model="regedit.UserName" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="regedit.Password" placeholder="请输入密码" type="password" />
        </el-form-item>
      </template>
      <template v-else-if="type === '4'">
        <el-form-item label="账号" prop="UserName">
          <el-input :maxlength="11" v-model="regedit.UserName" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="昵称" prop="Name">
          <el-input v-model="regedit.Name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="regedit.Password" placeholder="请输入密码" type="password" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="昵称" prop="Name">
          <el-input v-model="regedit.Name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="手机号码" prop="UserName">
          <el-input :maxlength="11" v-model="regedit.UserName" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="regedit.Password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item label="推荐人">
          <el-input v-model="regedit.RefererAccount" placeholder="请输入账户推荐人(选填项)" />
        </el-form-item>
        <el-form-item label="学段" prop="StageID">
          <el-select v-model="regedit.StageID" placeholder="请选择学段" @change="stageChange">
            <el-option
              v-for="item in stages"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="type !== '1'" label="科目" prop="CourseInfoID">
          <el-select v-model="regedit.CourseInfoID" placeholder="请选择科目" @change="courseChange">
            <el-option
              v-for="item in courseTypes"
              :key="item.CourseInfoID"
              :label="item.CourseInfoName"
              :value="item.CourseInfoID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="regedit.Sex">
            <template v-for="(item, index) in sexs">
              <el-radio :label="item.value" :key="index">{{ item.label }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区">
          <el-cascader
            ref="citys"
            v-model="selectCity"
            :options="citys"
            placeholder="请选择地区"
            @change="cityChange"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="resetForm">重 置</el-button>
        <el-button :loading="loading" type="primary" @click="submitForm">注 册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Ref } from 'vue-property-decorator';
import { citys, stages, sexs, courseTypes, types } from './model';
import BaseVue from '@/base/BaseVue';
import { ElForm } from 'element-ui/types/form';
import { validatePhone } from '@/utils/validate';
import kysjApis from '@/api/kysj';
import trApis from '@/api/tr';
import md5 from 'js-md5';
@Component
export default class AccountCreate extends Mixins(BaseVue) {
  @Ref() readonly form!: ElForm;
  private readonly citys = citys;
  private readonly stages = stages;
  private readonly sexs = sexs;
  private readonly courseTypes = courseTypes;
  private readonly types = types;
  private type = '1';
  private regedit: any = {};
  private selectCity: any[] = [];
  private rulesRegedit: any = {
    Name: [
      {
        required: true,
        message: '请输入昵称',
        trigger: 'blur',
      },
    ],
    Password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
    UserName: [
      {
        required: true,
        validator: validatePhone,
        trigger: 'blur',
      },
    ],
    StageID: [
      {
        required: true,
        message: '请选择学段',
        trigger: 'change',
      },
    ],
    CourseInfoID: [
      {
        required: true,
        message: '请选择科目',
        trigger: 'change',
      },
    ],
  };
  private stageChange(value: string) {
    this.regedit.Stage = value ? this.stages.filter((stage) => stage.value === value)[0].label : '';
  }
  private courseChange(value: string) {
    this.regedit.CourseInfoName = value
      ? this.courseTypes.filter((course) => course.CourseInfoID === value)[0].CourseInfoName
      : '';
  }
  private cityChange() {
    for (const province of this.citys) {
      if (this.selectCity[0] === province.value) {
        this.regedit.ProvinceID = this.selectCity[0];
        this.regedit.Province = province.label;
        for (const city of province.children) {
          if (this.selectCity[1] === city.value) {
            this.regedit.City = city.label;
            this.regedit.CityID = this.selectCity[1];
            for (const dist of city.children) {
              if (this.selectCity[2] === dist.value) {
                this.regedit.DistrictID = this.selectCity[2];
                this.regedit.District = dist.label;
                break;
              }
            }
          }
        }
      }
    }
  }
  private resetForm() {
    try {
      this.form.resetFields();
    } catch (error) {
      console.log(error);
    }
    this.regedit = {};
    this.selectCity = [];
  }
  private submitForm() {
    this.form.validate((valid) => {
      if (valid) {
        this.regeditAccount();
      } else {
        return false;
      }
    });
  }
  private regeditAccount() {
    let url = '';
    let data: any = {};
    switch (this.type) {
      case '1':
        url = kysjApis.regeditStudent;
        data = {
          ...this.regedit,
          Password: md5(this.regedit.Password),
          TimeSpan: Date.now() / 1000,
        };
        break;
      case '2':
        url = kysjApis.regeditTeacher;
        data = {
          ...this.regedit,
          Password: md5(this.regedit.Password),
          TimeSpan: Date.now() / 1000,
        };
        break;
      case '3':
        url = trApis.regeditReferer;
        data = {
          UserName: this.regedit.UserName,
          Password: md5(this.regedit.Password),
          Flat: '',
          FlatSerial: '',
          FlatModel: '',
          TimeSpan: Date.now() / 1000,
          RefererAccount: '',
        };
        break;
    }
    this.http({
      url,
      data,
    })
      .then(() => {
        this.$message.success('账号创建成功');
        this.resetForm();
      })
      .catch((err) => {
        this.$message.error(err.message || '账号创建失败');
      });
  }
}
</script>

<style lang="scss" scoped>
.create {
  & .el-input {
    max-width: 30%;
  }
}
</style>
