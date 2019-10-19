<template>
  <div>
    <tinymce v-model="content" />
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Tinymce from '@/components/Tinymce/index.vue';
@Component({
  components: {
    Tinymce,
  },
})
export default class ToolsRichText extends Vue {
  content = '';
}
</script>
