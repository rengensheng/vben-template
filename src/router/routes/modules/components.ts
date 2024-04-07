import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const component: AppRouteModule = {
  path: '/component',
  name: 'Component',
  component: LAYOUT,
  redirect: '/component/index',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.component.component'),
  },
  children: [
    {
      path: 'index',
      name: 'ComponentIndex',
      component: () => import('/@/views/design/component/index.vue'),
      meta: {
        affix: true,
        title: t('routes.component.index'),
      },
    },
  ],
};

export default component;
