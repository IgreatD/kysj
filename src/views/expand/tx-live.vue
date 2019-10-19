<template>
  <div id="tx_live_video" style="width:100%;height:auto;"></div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class TxLive extends Vue {
  private player: any = null;
  mounted() {
    const query = this.$route.params;
    const push = query.push;
    this.player = new window.TcPlayer('tx_live_video', {
      m3u8: push,
      autoplay: true,
      width: '640',
      height: '480',
    });
  }
}
</script>
