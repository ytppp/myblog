<template>
  <a-config-provider :locale="getAntdLocale" :theme="isDark ? antdDarkTheme : {}">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useLocale } from '@/locale/useLocale';
import { useTheme } from '@/hooks/useTheme';

dayjs.locale('zh-cn');
const { getAntdLocale } = useLocale();
const { isDark, antdDarkTheme } = useTheme();
</script>