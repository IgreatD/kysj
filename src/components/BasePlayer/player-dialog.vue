<template>
  <base-dialog :visible.sync="syncShow" append-to-body :title="title">
    <player :url="url" />
    <slot></slot>
    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Prop } from 'vue-property-decorator';
import player from './index.vue';
import BaseDialogVue from '@/base/BaseDialogVue';
@Component({
  components: {
    player,
  },
})
export default class PlayerDialog extends Mixins(BaseDialogVue) {
  @Prop({ default: '' }) readonly title!: string;
  @Prop() readonly url!: string;
}
</script>
