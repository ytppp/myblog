<template>
  <div class="text-3xl font-bold underline">{{ $t('trans0001') }}</div>
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
      <DownOutlined />
    </span>
  </my-dropdown>
  <a-button type="primary" @click="login">Primary Button</a-button>
</template>

<script setup lang="ts">
import { LangType } from '@/constants/config';
import { type IDropMenu } from '@/components/dropdown';
import { useLocale } from '@/locale/useLocale';
import { computed, ref, unref, watchEffect } from 'vue';
import { langList } from '@/settings/locale';
import { DownOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/store/modules/user';

const { changeLang, getLang } = useLocale();
const selectedKeys = ref<string[]>([]);
const userStore = useUserStore();

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
async function login() {
  const data = await userStore.login({
    email: 'admin',
    password: '123456',
  })
  console.log(data)
}
</script>

<style>
</style>