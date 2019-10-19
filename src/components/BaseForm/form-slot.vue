<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class ElSlot extends Vue {
  @Prop() private h!: (h: typeof Vue.prototype.$createElement, params: any) => any;
  @Prop() private data!: object[];
  private render(h: typeof Vue.prototype.$createElement, ctx: any) {
    return this.h(h, {
      data: this.data,
      vm: this,
    });
  }
}
</script>
