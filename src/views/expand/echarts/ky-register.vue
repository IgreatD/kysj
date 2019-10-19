<template>
  <el-card>
    <div slot="header">
      <span>注册用户数</span>
    </div>
    <base-charts ref="charts" id="id-ky-charts"></base-charts>
  </el-card>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Ref } from 'vue-property-decorator';
import BaseVue from '@/base/BaseVue';
import BaseCharts from '@/components/BaseCharts/index.vue';
import kysjApis from '@/api/kysj';
import { set, LsKey, get, ExpKey } from '@/utils/ls';
@Component({
  components: {
    BaseCharts,
  },
})
export default class ChartsRegister extends Mixins(BaseVue) {
  @Ref() readonly charts!: BaseCharts;
  private chartData: any = {
    students: [],
    teachers: [],
    sellers: [],
    all: [],
  };
  mounted() {
    this.getData();
  }
  private async getData() {
    const chartData = get(LsKey.REGISTER, ExpKey.DAY);
    if (chartData) {
      this.chartData = chartData;
    } else {
      const days = ['360', '180', '90', '30', '7', '2'];
      for (const day of days) {
        await this.http({
          url: kysjApis.getAccountStatistics,
          data: {
            days: day || '1',
            pageIndex: 0,
            pageSize: 1,
          },
        }).then(({ data }: any) => {
          this.chartData.students.push(data.studentCount);
          this.chartData.teachers.push(data.teacherCount);
          this.chartData.sellers.push(data.sellerCount);
          this.chartData.all.push(data.sellerCount + data.studentCount + data.teacherCount);
          set(LsKey.REGISTER, this.chartData);
        });
      }
    }
    this.charts.initCharts();
    this.setOptions();
  }
  private setOptions() {
    this.charts.chart.setOption({
      color: '#409EFF',
      xAxis: {
        data: ['一年', '半年', '三月', '一月', '一周', '昨天'],
        boundaryGap: false,
        axisTick: {
          show: false,
        },
      },
      grid: {
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ['学生', '教师', '业务员', '全部'],
      },
      series: [
        {
          name: '学生',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2,
              },
            },
          },
          smooth: true,
          type: 'line',
          data: this.chartData.students,
          animationDuration: 2000,
          animationEasing: 'cubicInOut',
        },
        {
          name: '业务员',
          itemStyle: {
            normal: {
              color: '#E6A23C',
              lineStyle: {
                color: '#E6A23C',
                width: 2,
              },
            },
          },
          smooth: true,
          type: 'line',
          data: this.chartData.sellers,
          animationDuration: 2000,
          animationEasing: 'cubicInOut',
        },
        {
          name: '教师',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2,
              },
              areaStyle: {
                color: '#f3f8ff',
              },
            },
          },
          data: this.chartData.teachers,
          animationDuration: 2000,
          animationEasing: 'quadraticOut',
        },
        {
          name: '全部',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#67C23A',
              lineStyle: {
                color: '#67C23A',
                width: 2,
              },
              areaStyle: {
                color: '#f3f8ff',
              },
            },
          },
          data: this.chartData.all,
          animationDuration: 2000,
          animationEasing: 'quadraticOut',
        },
      ],
    });
  }
}
</script>
