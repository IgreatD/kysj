<template>
  <base-dialog :visible.sync="syncShow" title="添加菜单" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="primary" @click="add" :loading="updateLoading">添加</el-button>
    </template>
    <el-form label-width="120px" :model="formModel" ref="form">
      <el-form-item label="父菜单名称">
        <template v-if="!isAddP">
          <el-select v-model="formModel.menuPid" placeholder="请选择菜单名称">
            <el-option
              v-for="item in pMenus"
              :key="item.menuId"
              :label="item.name"
              :value="item.menuId"
            />
          </el-select>
        </template>
        <template v-if="isAddP">
          <el-input v-model="formModel.menuName" placeholder="请输入父菜单名称" style="width: 85%" />
        </template>
        <el-button
          :type="!isAddP ? 'primary' : 'ifno' "
          @click="isAddP = !isAddP"
        >{{!isAddP ? '添加' : '取消'}}</el-button>
      </el-form-item>
      <el-form-item label="子菜单名称" v-if="!isAddP">
        <el-input v-model="formModel.menuName" placeholder="请输入子菜单名称" />
      </el-form-item>
      <el-form-item label="菜单url">
        <el-input v-model="formModel.menuUrl" placeholder="请输入菜单url" />
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="formModel.menuIcon" placeholder="请输入菜单图标" />
      </el-form-item>
      <el-form-item label="菜单别名">
        <el-input v-model="formModel.menuOtherName" placeholder="请输入菜单别名" />
      </el-form-item>
      <el-form-item label="菜单序号">
        <el-input v-model="formModel.menuSort" placeholder="请输入菜单序号" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formModel.menuRemark" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Prop } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { ICommonModel } from '@/types/modles/models';
import kysjApis from '@/api/kysj';
@Component
export default class AddDialog extends Mixins(BaseDialogVue) {
  @Prop() readonly pMenus!: any[];
  private isAddP = false;
  private formModel: any = {
    menuName: '',
    menuUrl: '',
    menuOtherName: '',
    menuIcon: '',
    menuSort: '1',
    menuRemark: '',
    menuPid: '',
    menuId: '',
  };
  private add() {
    this.updateLoading = true;
    this.http({
      url: kysjApis.addMenu,
      data: {
        ...this.formModel,
      },
    })
      .then(() => {
        this.$message.success('菜单添加成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch((err) => {
        this.$message.error(err.message || '菜单添加失败');
        this.updateLoading = false;
      });
  }
}
</script>


