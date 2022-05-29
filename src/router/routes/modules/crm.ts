export default {
  path: 'crm',
  name: 'CRM',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '资源管理',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 1,
  },
  children: [
    {
      path: 'customer/list',
      name: 'crm.customer.title',
      component: () => import('@/views/crm/customer/list.vue'),
      meta: {
        title: '客户管理',
        requiresAuth: true,
        roles: ['*'],
        icon: 'icon-idcard',
      },
    },
    {
      path: 'suplier/list',
      name: 'crm.suplier.title',
      component: () => import('@/views/crm/suplier/list.vue'),
      meta: {
        title: '供应商管理',
        requiresAuth: true,
        roles: ['*'],
        icon: 'icon-relation',
      },
    },
  ],
};
