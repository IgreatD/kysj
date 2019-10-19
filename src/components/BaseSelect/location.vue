<template>
  <el-cascader
    ref="citys"
    v-model="selectCity"
    :options="citys"
    placeholder="请选择地区"
    @change="cityChange"
  />
</template>

<script lang='ts'>
export const citys = require('@/assets/citys.json');
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { isArray } from '@/utils';
@Component
export default class LocationSelect extends Vue {
  @Prop() readonly value!: any;
  private selectCity: any[] = [];
  @Watch('value', { immediate: true })
  private initCity() {
    if (isArray(this.value)) {
      this.selectCity = this.value;
    }
  }
  private get citys() {
    return citys;
  }
  private cityChange() {
    const location: any = {};
    for (const province of this.citys) {
      if (this.selectCity[0] === province.value) {
        location.ProvinceID = this.selectCity[0];
        location.Province = province.label;
        for (const city of province.children) {
          if (this.selectCity[1] === city.value) {
            location.City = city.label;
            location.CityID = this.selectCity[1];
            for (const dist of city.children) {
              if (this.selectCity[2] === dist.value) {
                location.DistrictID = this.selectCity[2];
                location.District = dist.label;
                break;
              }
            }
          }
        }
      }
    }
    this.$emit('input', location);
  }
}
</script>
