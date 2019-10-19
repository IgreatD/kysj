<template>
  <el-form ref="form" :inline="inline" :model="value" v-bind="$attrs">
    <template v-for="({form,type}, index) in forms">
      <el-form-item v-if="!form.hidden" :key="index" :label="form.label" :prop="form.key">
        <template v-if="type==='custom'">
          <slot :name="form.slotName" :form="form" />
        </template>
        <el-select
          v-if="type==='select'"
          v-model="value[form.key]"
          :placeholder="form.placeholder || '请选择' + form.label"
          :filterable="!form.multiple && form.searchAble"
          :multiple="form.multiple"
          :collapse-tags="form.multiple"
          clearable
          @change="change($event,form)"
        >
          <el-option
            v-for="(option, optionIndex) in form.options"
            :key="optionIndex"
            :label="form.searchAble? cncharLabel(option.label) : option.label"
            :value="form.multiple ? option : option.value"
          >
            <template v-if="form.h">
              <form-slot :h="form.h" :data="option" />
            </template>
          </el-option>
        </el-select>
        <el-date-picker
          v-if="type==='date'"
          v-model="value[form.key]"
          :type="form.type || 'date'"
          :format="form.format || 'yyyy-MM-dd'"
          :value-format="form.valueFormat || 'yyyy-MM-dd'"
          :placeholder="form.placeholder  || '请输入' + form.label"
          @change="change($event,form)"
        ></el-date-picker>
        <el-input
          v-if="type==='input'"
          clearable
          v-model="value[form.key]"
          :placeholder="form.placeholder  || '请输入' + form.label"
          :type="form.type || 'text'"
        >
          <template v-if="form.append" v-slot:append>
            <form-slot :h="form.append" v-on="$listeners" />
          </template>
        </el-input>
        <el-time-select
          v-if="type==='time'"
          v-model="value[form.key]"
          :placeholder="form.placeholder  || '请选择' + form.label"
          :picker-options="{
            start: '06:00',
            step: '00:15',
            end: '24:00'
          }"
        />
        <el-radio-group
          v-if="type==='radio'"
          v-model="value[form.key]"
          :placeholder="form.placeholder"
        >
          <el-radio
            v-for="(radio, index) in form.options"
            :key="index"
            :label="radio.value"
          >{{radio.label}}</el-radio>
        </el-radio-group>
        <template v-if="form.endH">
          <form-slot :h="form.endH" v-on="$listeners" />
        </template>
      </el-form-item>
    </template>
    <el-form-item v-if="showQuery">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search" @click="$emit('query')">查询</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { IForm } from '@/types/form.d';
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { IFormType } from '@/types/formType';
import cnchar from 'cnchar';
@Component({
  components: {
    'form-slot': () => import('./form-slot.vue'),
  },
})
export default class BaseForm extends Vue {
  @Prop({ default: true }) readonly inline!: boolean;
  @Prop({ default: true }) readonly showQuery!: boolean;
  @Prop({ default: true }) readonly showExcel!: boolean;
  @Prop({ default: false }) readonly down!: boolean;
  @Prop({
    default() {
      return {};
    },
  })
  readonly formRef!: ElForm;

  @Prop({
    default() {
      return [];
    },
  })
  readonly forms!: IForm[];

  @Prop({
    default() {
      return {};
    },
  })
  readonly value!: any;

  private showDown = false;

  private updateFormRef() {
    this.$emit('update:form-ref', this.$refs.form as ElForm);
  }

  private initValue() {
    const value: any = {};
    this.forms.forEach(({ form }: any) => {
      value[form.key] = form.value || '';
    });
    this.$emit('input', value);
  }

  private mounted() {
    this.initValue();
    this.updateFormRef();
  }

  @Watch('value')
  private onValueChange(newVal?: any) {
    if (newVal) {
      this.$emit('input', newVal);
    }
  }

  private change(data: any, form: any) {
    if (form.change) {
      return form.multiple ? form.change(data) : form.change(this.value[form.key]);
    }
  }

  private cncharLabel(label: string) {
    return `${cnchar.spell(label, 'first', 'low')} - ${label}`;
  }
}
</script>


<style lang="scss" scoped>
.ky-form {
  .down.is-active {
    & /deep/ .el-icon-arrow-down {
      transition: all 0.3s;
      transform: rotate(180deg);
    }
  }
}
</style>
