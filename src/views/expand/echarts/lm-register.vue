<template>
  <el-card class="lm-charts">
    <div slot="header" class="clearfix">
      <el-row>
        <el-col :span="12">
          <span>龙门课堂首页用户访问来源</span>
        </el-col>
        <el-col :span="12">
          <span>活跃推广员用户(取前3名)</span>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="12">
        <base-charts ref="charts" id="id-lm-charts" width="50%" height="250px"></base-charts>
      </el-col>
      <el-col :span="12">
        <base-table :table-data="shareTopList" :row-header="rowHeader" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Ref } from 'vue-property-decorator';
import BaseVue from '@/base/BaseVue';
import kysjApis from '@/api/kysj';
import BaseCharts from '@/components/BaseCharts/index.vue';
import BaseTable from '@/components/BaseTable/_index.vue';
import { IRowHeader } from '@/components/BaseTable';
@Component({
  components: {
    BaseCharts,
    BaseTable,
  },
})
export default class LmCharts extends Mixins(BaseVue) {
  @Ref() readonly charts!: BaseCharts;
  private shareCount: any[] = [];
  private shareTopList: any[] = [];
  private rowHeader: IRowHeader[] = [
    {
      label: '打开次数',
      prop: 'openNum',
      width: 120,
    },
    {
      label: '手机号码',
      prop: 'userName',
    },
    {
      label: '昵称',
      prop: 'name',
    },
    {
      label: '招生人数',
      prop: 'recruitStudentsCount',
      width: 120,
    },
    {
      label: '推广人数',
      prop: 'spreadCount',
      width: 120,
    },
  ];
  mounted() {
    this.getData();
  }
  private async getData() {
    await this.http({
      url: kysjApis.getWxShare,
      data: {},
    }).then(({ data }: any) => {
      data = data.data;
      this.shareCount[0] = {
        name: '公众号',
        value: data.wxPublicNumberCount,
      };
      this.shareCount[1] = {
        name: '二维码',
        value: data.wxQrcodeCount,
      };
      this.shareCount[2] = {
        name: '链接',
        value: data.wxReferrLinkCount,
      };
      this.shareCount[3] = {
        name: '其他',
        value: data.otherCount,
      };
      this.shareTopList = data.mostHotPerson;
    });
    this.charts.initCharts();
    this.setOptions();
  }
  private setOptions() {
    this.charts.chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['二维码', '公众号', '链接', '其他'],
      },
      series: [
        {
          name: '访问来源',
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.shareCount,
        },
      ],
    });
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/mixins/utils';
.lm-charts {
  .clearfix {
    @include utils-clearfix();
  }
}
</style>
