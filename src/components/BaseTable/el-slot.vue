<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class ElSlot extends Vue {
  @Prop() private h!: (h: typeof Vue.prototype.$createElement, params: any) => any;
  @Prop({ default: 0 }) private $index!: number;
  @Prop({
    default: () => {
      return {};
    },
  })
  private row!: object;
  @Prop({
    default: () => {
      return {};
    },
  })
  private column!: object;
  @Prop() private tableData!: any[];
  private render(h: typeof Vue.prototype.$createElement, ctx: any) {
    return this.h(h, {
      row: this.row,
      column: this.column,
      $index: this.$index,
      vm: this,
      tableData: this.tableData,
    });
  }
}
</script>
