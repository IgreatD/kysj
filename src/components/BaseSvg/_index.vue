<template>
  <svg
    v-on="$listeners"
    :class="svgClass"
    v-bind="$attrs"
    class="ky-svg-icon"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class BaseSvg extends Vue {
  @Prop()
  private iconClass!: string;
  @Prop({ default: '' })
  private className!: string;

  private get iconName() {
    return `#ky-icon-${this.iconClass}`;
  }

  private get svgClass() {
    return `ky-svg-${this.className}`;
  }
}
</script>

<style scoped>
.ky-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
