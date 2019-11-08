<template>
  <base-dialog :visible.sync="syncShow" :title="title" v-if="syncShow">
    <div v-html="content"></div>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Prop } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
@Component
export default class PrivewDialog extends Mixins(BaseDialogVue) {
  title: string = '详情';
  content: string = '';
  public setContent(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
</script>
