import { Ref, computed, unref } from 'vue';
import { FormInstance } from 'ant-design-vue/lib/form/Form';
import { NamePath } from 'ant-design-vue/lib/form/interface';

export function useFormValid<T extends Object = any>(formRef: Ref<FormInstance>) {
  const validate = computed(() => {
    const form = unref(formRef);
    return form?.validate ?? ((_nameList?: NamePath) => Promise.resolve());
  });

  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validate, validForm };
}