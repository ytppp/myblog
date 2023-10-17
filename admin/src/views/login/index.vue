<template>
  <div>{{ $t('trans0001', { msg: 'hello' }) }}</div>
  <my-dropdown
    placement="bottom"
    :trigger="['click']"
    :dropMenuList="langList"
    :selectedKeys="selectedKeys"
    @menu-event="handleMenuEvent"
    overlayClassName="app-locale-picker-overlay"
  >
    <span class="cursor-pointer flex items-center">
      <span v-if="showText" class="ml-1">{{ getLangText }}</span>
    </span>
  </my-dropdown>
</template>

<script setup lang="ts">
import { LangType } from '#/config';
import { type IDropMenu } from '@/components/dropdown';
import { useLocale } from '@/locale/useLocale';
import { computed, ref, unref, watchEffect } from 'vue';
import { langList } from '@/settings/locale'

const { changeLang, getLang } = useLocale();
const selectedKeys = ref<string[]>([]);

const props = defineProps({
  showText: { type: Boolean, default: true },
  reload: { type: Boolean },
});
const getLangText = computed(() => {
  const key = selectedKeys.value[0];
  if (!key) {
    return '';
  }
  return langList.find((item) => item.key === key)?.text;
});

watchEffect(() => {
  selectedKeys.value = [unref(getLang)];
});

async function toggleLocale(lang: LangType | string) {
  await changeLang(lang as LangType);
  selectedKeys.value = [lang as string];
  props.reload && location.reload();
}
function handleMenuEvent(menu: IDropMenu) {
  if (unref(getLang) === menu.key) {
    return;
  }
  toggleLocale(menu.key as string);
}
</script>