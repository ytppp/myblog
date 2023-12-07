<template>
  <h2 class="mb-3 font-bold text-2xl xl:text-3xl text-center xl:text-left">
    {{ $t('trans0024') }}
  </h2>
  <a-form
    class="p-4"
    :model="formData"
    :rules="formRules"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <a-form-item name="email">
      <a-input size="large" v-model:value="formData.email" :placeholder="$t('trans0025')">
        <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item name="password">
      <a-input-password size="large" v-model:value="formData.password" :placeholder="$t('trans0026')">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input-password>
    </a-form-item>
    <a-row>
      <a-col :span="12">
        <a-form-item>
          <a-checkbox size="small" v-model:checked="rememberMe">{{ $t('trans0028') }}</a-checkbox>
        </a-form-item>
      </a-col>
      <a-col :span="12" class="text-right">
        <a-form-item>
          <a-button type="link" size="small">{{ $t('trans0027') }}</a-button>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item>
      <a-button size="large" type="primary" @click="handleLogin" :loading="loading" block>{{ $t('trans0024') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { useLocale } from '@/locale/useLocale';
import { LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useFormValid } from '@/hooks/useForm';

const userStore = useUserStore();
const { translate } = useLocale();

interface IFormData {
  email: string;
  password: string;
}
const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);
const { validForm } = useFormValid(formRef)
const formRules: Record<string, Rule[]> = {
  email: [
    { required: true, message: translate('trans0029', { val: translate('trans0025') }), trigger: 'change' },
  ],
  password: [
    { required: true, message: translate('trans0029', { val: translate('trans0026') }), trigger: 'change' }
  ],
}
const formData = reactive<IFormData>({
  email: '',
  password: '',
});

async function handleLogin() {
  validForm().then(async data => {
    if (!data) return;
    const res = await userStore.login({
      email: data.email,
      password: data.password,
    });
    console.log(res);
  }).catch(error => {
    console.log('error', error)
  })
}
</script>