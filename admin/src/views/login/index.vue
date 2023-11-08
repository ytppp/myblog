<template>
  <div class="relative w-full h-full px-4">
    <div class="flex items-center absolute right-4 top-4 z-10">
      <locale-picker />
    </div>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style="width: 430px;">
      <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
        login
      </h2>
      <a-form
        :model="formState"
        autocomplete="off"
      >
        <a-form-item>
          <a-input size="large" v-model:value="formState.username">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password size="large" v-model:value="formState.password">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input-password>
        </a-form-item>
        <a-row>
          <a-col :span="12">
            <a-form-item>
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="12" class="text-right">
            <a-form-item>
              <a-button type="link" size="small">login ?</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <a-button type="primary" @click="login" block>login</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { LocalePicker } from '@/components/application';
import { reactive } from 'vue';

const userStore = useUserStore();

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

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