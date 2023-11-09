<template>
  <div class="relative w-full h-full">
    <div class="flex items-center absolute right-4 top-4">
      <locale-picker />
    </div>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
      <login-form />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LocalePicker } from '@/components/application';
import LoginForm from './login-form.vue';

</script>

<style>
</style>