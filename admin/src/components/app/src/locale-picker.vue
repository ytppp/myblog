<template>
  <my-dropdown
    placement="bottom"
    :trigger="['click']"
    :dropMenuList="langList"
    :selectedKeys="selectedKeys"
    @menu-event="handleMenuEvent"
    overlayClassName="app-locale-picker-overlay"
  >
    <span class="cursor-pointer">
      <span v-if="showText" class="ml-1">{{ getLangText }}</span>
      <TranslationOutlined class="text-xl" />
    </span>
  </my-dropdown>
</template>

<script setup lang="ts">
import { LangType } from '@/constants/config';
import { type IDropMenu } from '@/components/dropdown';
import { useLocale } from '@/locale/useLocale';
import { computed, ref, unref, watchEffect } from 'vue';
import { langList } from '@/settings/locale';
import { TranslationOutlined } from '@ant-design/icons-vue';

const { changeLang, getLang } = useLocale();
const selectedKeys = ref<string[]>([]);

const props = defineProps({
  showText: { type: Boolean, default: false },
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

function handleMenuEvent(menu: IDropMenu) {
  if (unref(getLang) === menu.key) {
    return;
  }
  toggleLocale(menu.key as string);
}
async function toggleLocale(lang: LangType | string) {
  await changeLang(lang as LangType);
  selectedKeys.value = [lang as string];
  props.reload && location.reload();
}
</script>