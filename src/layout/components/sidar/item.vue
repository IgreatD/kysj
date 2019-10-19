<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    if (icon) {
      vnodes.push(<base-svg icon-class={icon.replace('el-icon-dl-', '')} class-name='submenu' />);
    }

    if (title) {
      vnodes.push(
        <span slot='title' style='margin-left:16px;'>
          {title}
        </span>,
      );
    }
    return vnodes;
  },
};
</script>

<style lang='scss' scoped>
.ky-svg-submenu {
  font-size: 20px;
  vertical-align: middle !important;
}
</style>
