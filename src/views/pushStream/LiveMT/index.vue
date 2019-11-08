 <template>
  <div>
    <base-table
      ref="baseTable"
      :forms="forms"
      :row-header="rowHeader"
      :url="url"
      :show-form="true"
      :show-functions="false"
      :check-must="false"
      @opear-steam="opearSteam"
      @play="play"
    />
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component, Provide, Mixins, Watch } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import { rowHeader, forms } from './model';
import BaseFormVue from '@/base/BaseFormVue';
@Component
export default class PushStreamClass extends Mixins(BaseFormVue) {
  private forms = forms;
  private get url() {
    return kysjApis.getDescribeLiveStreamPushInfoList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private mounted() {
    this.getData();
  }
  private opearSteam({ row, url, name }: any) {
    this.http({
      url,
      data: {
        DomainName: row.DomainName,
        AppName: row.AppName,
        StreamName: row.StreamName,
      },
    })
      .then(() => {
        this.$message.success(`${name}直播流成功`);
      })
      .catch(() => {
        this.$message.error(`${name}直播流失败`);
      });
  }
  private play({ AppName, StreamName }: any) {
    const videoUrl = `http://liveplay.sijiaokeji.com/${AppName}/${StreamName}.m3u8`;
    const { href } = this.$router.resolve({
      name: 'TxLive',
      params: {
        push: videoUrl,
      },
    });
    window.open(href, '_blank');
  }
}
</script>
