export default {
  path: 'crm',
  name: 'CRM',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: 'CRM',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'customer/list',
      name: 'crm.customer.title',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '客户管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
