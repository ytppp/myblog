<template>
  <a-config-provider :locale="getAntdLocale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useLocale } from './locale/useLocale';

dayjs.locale('zh-cn');
const { getAntdLocale } = useLocale();
</script>