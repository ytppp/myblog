<template>
  <svg class="svg_icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import './iconfont';

defineOptions({
  name: 'MyIcon',
});
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
})
const iconName = computed(() => `#${props.icon}`);
</script>

<style scoped>
.svg_icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
