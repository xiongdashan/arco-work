export default {
  path: 'order',
  name: 'OrderCenter',
  component: () => import('@/views/order/index.vue'),
  meta: {
    title: '订单中心',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 1,
  },
  children: [
    {
      path: 'airline/issueticket',
      name: 'OrderCeneter.Air',
      component: () => import('@/views/order/airline/issueticket.vue'),
      meta: {
        title: '机票订单',
        requiresAuth: true,
        roles: ['*'],
        icon: 'icon-idcard',
      },
    },
  ],
};
