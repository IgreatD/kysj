<template>
  <el-dialog v-on="$listeners" v-bind="$attrs" @closed="closed">
    <slot />
    <template v-slot:footer>
      <el-button @click="cancel">{{ cancelText }}</el-button>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'BaseDialog',
})
export default class BaseDailog extends Vue {
  @Prop({ default: '关闭' }) readonly cancelText!: string;
  private cancel() {
    this.$parent.$emit('cancel');
  }
  private closed() {
    this.$parent.$emit('cancel');
  }
}
</script>
