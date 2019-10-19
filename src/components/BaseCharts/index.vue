<template>
  <div :id="id" :style="{width,height}"></div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { debounce } from 'lodash';
@Component
export default class BaseCharts extends Vue {
  @Prop({ default: Math.random() * Date.now() }) readonly id!: string;
  @Prop({ default: '100%' }) readonly width!: string;
  @Prop({ default: '350px' }) readonly height!: string;
  @Prop({ default: true }) readonly autoResize!: boolean;
  chart: any = undefined;
  private sidebarElm: any = undefined;
  private resizeHandler: any = null;
  created() {
    if (this.autoResize) {
      this.resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener('resize', this.resizeHandler);
    }

    this.sidebarElm = document.getElementsByClassName('ky-layout__sidar')[0];
    if (this.sidebarElm) {
      this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
    }
  }

  initCharts() {
    this.chart = window.echarts.init(document.getElementById(this.id), 'macarons');
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);

    if (this.sidebarElm) {
      this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
    }
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }

  sidebarResizeHandler(e: any) {
    if (e.propertyName === 'width') {
      this.resizeHandler();
    }
  }
}
</script>
