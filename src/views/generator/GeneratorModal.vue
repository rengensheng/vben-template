<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="register" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { generateWeb } from '@/api/generator/generator';
  import { getAppEnvConfig } from '@/utils/env';
  import { message } from 'ant-design-vue';
  import { ref } from 'vue';
  import { formSchema } from './generator.data';

  defineOptions({
    name: 'GeneratorModal',
  });

  const [register, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 200,
    schemas: formSchema,
    baseColProps: {
      span: 24,
    },
    showActionButtonGroup: false,
  });

  const tableNames = ref<string[]>([]);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    tableNames.value = data.tableNames;
    resetFields();
    setModalProps({
      confirmLoading: false,
      title: '设置代码路径',
    });
    const { VITE_PROJECT_PATH } = getAppEnvConfig();
    if (VITE_PROJECT_PATH) {
      setFieldsValue({
        projectPath: VITE_PROJECT_PATH,
      });
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      await generateWeb(tableNames.value, values.projectPath);
      closeModal();
      message.success('生成成功');
    } catch (e) {
      message.error('生成失败');
    }
  }
</script>
