<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <span slot="header">龙门课堂首页 - 用户访问来源</span>
        <el-row>
          <el-col :span="18">
            <base-charts ref="charts" id="id-lm-charts" width="50%" height="250px"></base-charts>
          </el-col>
          <el-col :span="6">
            <el-card class="lm-card">
              <div class="lm-card-flex" @click="jump(true)">
                <base-svg icon-class="baomingshuju" style="font-size: 22px;" />
                <div>
                  <span>报名</span>
                  <span class="lm-card-flex--active">{{ topTeacherCount.topClassSignCount || 0 }}</span>
                </div>
              </div>
            </el-card>
            <el-card class="lm-card">
              <div class="lm-card-flex" @click="jump(false)">
                <base-svg icon-class="payment" style="font-size: 22px;" />
                <div>
                  <span>支付</span>
                  <span class="lm-card-flex--active">{{ topTeacherCount.topClassPayCount || 0 }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <span slot="header">活跃推广员用户(取前3名)</span>
        <base-table :table-data="shareTopList" :row-header="rowHeader" style="height:250px" />
      </el-card>
    </el-col>
  </el-row>
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
  private topTeacherCount: any = {};
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
    this.getTopClassStatistics();
  }
  private jump(flag: boolean) {
    this.$router.push({
      name: 'LmSignPay',
      query: {
        name: flag ? 'sign' : 'pay',
        url: flag ? kysjApis.getSignInStudentList : kysjApis.getPayStudentList,
      },
    });
  }
  private getTopClassStatistics() {
    this.http({
      url: kysjApis.getTopClassStatistics,
    }).then(({ data }: any) => {
      this.topTeacherCount = data.data;
    });
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
        left: 'left',
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
@import '~@/style/var';
.lm-card {
  cursor: pointer;
  &:nth-child(1) {
    margin-bottom: 20px;
  }
  &-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--active {
      color: $--color-primary;
    }
  }
}
</style>
