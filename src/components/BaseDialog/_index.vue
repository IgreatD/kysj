<template>
  <el-dialog
    v-on="$listeners"
    v-bind="$attrs"
    :visible.sync="syncVisible"
    @close="close"
    :close-on-click-modal="false"
  >
    <slot v-if="syncVisible" />
    <template v-slot:footer>
      <el-button @click="close">{{ cancelText }}</el-button>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Prop, PropSync, Emit } from 'vue-property-decorator';
@Component({
  name: 'BaseDialog',
})
export default class BaseDailog extends Vue {
  @Prop({ default: '关闭' }) readonly cancelText!: string;
  @PropSync('visible') private syncVisible!: boolean;
  private close() {
    this.syncVisible = false;
    const parent = this.$parent as any;
    if (parent.close) {
      parent.close();
    }
  }
}
</script>
