<template>
  <PageWrapper
    title="用户资料"
    :content="`用户` + userDetail.nickname + `的资料`"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button v-if="!userDetail.status" type="primary" danger @click="handleDisabled">
        禁用账号
      </a-button>
      <a-button v-else type="primary" @click="handleDisabled"> 启用账号 </a-button>
      <a-button type="primary" @click="handleResetPassword"> 重置密码 </a-button>
    </template>
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="用户资料" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'detail'">
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">账户名：</div>
          <div class="ml-2">{{ userDetail.account }}</div>
        </div>
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">昵称：</div>
          <div class="ml-2">{{ userDetail.nickname }}</div>
        </div>
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">邮箱：</div>
          <div class="ml-2">{{ userDetail.email }}</div>
        </div>
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">手机号：</div>
          <div class="ml-2">{{ userDetail.phone }}</div>
        </div>
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">部门：</div>
          <div class="ml-2">{{ userDetail.dept }}</div>
        </div>
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">角色：</div>
          <div class="ml-2">{{ userDetail.role }}</div>
        </div>
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">创建时间：</div>
          <div class="ml-2">{{ userDetail.created_time }}</div>
        </div>
        <div class="flex mt-5">
          <div class="font-bold w-32 text-right">创建人：</div>
          <div class="ml-2">{{ userDetail.created_by }}</div>
        </div>
      </template>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { h, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { useGo } from '@/hooks/web/usePage';
  import { useTabs } from '@/hooks/web/useTabs';
  import { Tabs } from 'ant-design-vue';
  import { getUserDetailInfo, diabledUser, resetPassword } from '@/api/sys/user';
  import { User } from '@/api/sys/model/userModel';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'AccountDetail' });

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const userId = ref(route.params?.id);
  const currentKey = ref('detail');
  const userDetail = ref<User>({} as any);
  const { setTitle } = useTabs();
  onMounted(() => {
    if (!userId.value) return;
    getUserDetailInfo(userId.value as string).then((res) => {
      console.log(res);
      setTitle('详情：用户' + res.nickname);
      userDetail.value = res;
    });
  });

  function goBack() {
    // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
    go('/system/account');
  }
  function handleDisabled() {
    console.log('禁用账号');
    const { createConfirm } = useMessage();
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '提示'),
      content: () => h('span', '是否确认' + (userDetail.value.status ? '禁用' : '启用') + '账号'),
      onOk: async () => {
        userDetail.value = await diabledUser(userId.value as string);
      },
    });
  }
  function handleResetPassword() {
    console.log('重置密码');
    const { createConfirm } = useMessage();
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '提示'),
      content: () => h('span', '是否确认重置密码'),
      onOk: async () => {
        await resetPassword(userId.value as string);
      },
    });
  }
</script>

<style></style>
