<template>
  <div id="dplayer"></div>
</template>

<script lang='ts'>
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class BasePlayer extends Vue {
  @Prop() url!: string;
  private dp: any = null;
  private mounted() {
    this.init();
  }
  private init() {
    this.dp = new DPlayer({
      container: this.$el,
      autoplay: true,
      /* screenshot: true, */
      video: {
        url: this.url,
        type: 'auto',
      },
    });
  }
  private beforeDestroy() {
    if (this.dp) {
      this.dp.destroy();
    }
  }
}
</script>

<style lang="scss" scoped>
/* #dplayer {
  max-width: 360px;
} */
</style>
