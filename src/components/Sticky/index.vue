<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div
      :class="{className , 'is-sticky': isSticky}"
      :style="{top:(isSticky ? stickyTop +'px' : ''),zIndex:zIndex,position:position,width:width,height:height+'px'}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false,
    };
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height + 18;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener(
      'resize',
      debounce(() => {
        this.handleResize();
      }, 100),
    );
  },
  activated() {
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    sticky() {
      if (this.active) {
        return;
      }
      this.position = 'fixed';
      this.active = true;
      this.width = this.width + 'px';
      this.isSticky = true;
    },
    handleReset() {
      if (!this.active) {
        return;
      }
      this.reset();
    },
    reset() {
      this.position = '';
      this.width = 'auto';
      this.active = false;
      this.isSticky = false;
    },
    handleScroll() {
      const width = this.$el.getBoundingClientRect().width;
      this.width = width || 'auto';
      const offsetTop = this.$el.getBoundingClientRect().top;
      if (offsetTop < this.stickyTop) {
        this.sticky();
        return;
      }
      this.handleReset();
    },
    handleResize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.is-sticky {
  background: #fff;
  padding: 18px 0 0 10px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
</style>
