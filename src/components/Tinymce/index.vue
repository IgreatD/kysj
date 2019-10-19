<template>
  <div
    :class="{isFullscreen}"
    class="ky-tinymce"
    :style="{width:containerWidth}"
  >
    <textarea
      :id="tinymceId"
      class="ky-tinymce__content"
    />

    </div>
</template>

<script lang='ts'>
import load from './dynamicLoadScript';
import plugins from './plugins';
import toolbar, { menubar } from './toolbar';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js';
@Component
export default class Tinymce extends Vue {
  private isFullscreen = false;
  private hasChange = false;
  private hasInit = false;
  @Prop({ default: '' }) private value!: string;
  @Prop({ default: 'vue-tinymce-' + Date.now() + (Math.random() * 1000).toFixed(0) })
  private tinymceId!: string;
  @Prop({ default: 'auto' }) private width!: string;
  @Prop({ default: 360 }) private height!: number;
  @Watch('value')
  private onContentChange(val: string) {
    if (!this.hasChange && this.hasInit) {
      this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''));
    }
  }
  private get containerWidth() {
    const reg = /^[\d]+(\.[\d]+)?$/;
    if (reg.test(this.width)) {
      return `${this.width}px`;
    }
    return this.width;
  }
  private mounted() {
    this.init();
  }
  private activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  }
  private deactivated() {
    this.destroyTinymce();
  }
  private destroyed() {
    this.destroyTinymce();
  }
  private init() {
    load(tinymceCDN, (err: any) => {
      if (err) {
        this.$message.error(err.message);
        return;
      }
      this.initTinymce();
    });
  }
  private setContent(value: string) {
    window.tinymce.get(this.tinymceId).setContent(value);
  }
  private getContent() {
    window.tinymce.get(this.tinymceId).getContent();
  }
  private initTinymce() {
    const self = this;
    window.tinymce.init({
      selector: `#${this.tinymceId}`,
      language: 'zh_CN',
      height: this.height,
      body_class: 'panel-body ',
      object_resizing: false,
      branding: false,
      toolbar,
      menubar,
      plugins,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      link_title: false,
      nonbreaking_force_tab: true,
      init_instance_callback: (editor: any) => {
        if (self.value) {
          editor.setContent(self.value);
        }
        self.hasInit = true;
        editor.on('NodeChange Change KeyUp SetContent', () => {
          this.hasChange = true;
          this.$emit('input', editor.getContent());
        });
      },
      setup(editor: any) {
        editor.on('FullscreenStateChanged', (e: any) => {
          self.isFullscreen = e.state;
        });
      },
    });
  }
  private destroyTinymce() {
    const tinymce = window.tinymce.get(this.tinymceId);
    if (this.isFullscreen) {
      tinymce.execCommand('mceFullScreen');
    }

    if (tinymce) {
      tinymce.destroy();
    }
  }
}
</script>

@<style lang="scss" scoped>
@import './index';
</style>

