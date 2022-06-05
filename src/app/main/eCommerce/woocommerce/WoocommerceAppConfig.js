import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const WoocommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/woocommerce/products/:productId',
      component: lazy(() => import('./product/Product')),
    },
    {
      path: '/woocommerce/products',
      component: lazy(() => import('./products/Products')),
    },
    {
      path: '/woocommerce/categories/:categoryId',
      component: lazy(() => import('./category/Category')),
    },
    {
      path: '/woocommerce/categories',
      component: lazy(() => import('./categories/Categories')),
    },
    {
      path: '/woocommerce/orders',
      component: lazy(() => import('./orders/Orders')),
    },
    // {
    //   path: '/woocommerce/orders/:orderId',
    //   component: lazy(() => import('./order/Order')),
    // },
    // {
    //   path: '/woocommerce/orders',
    //   component: lazy(() => import('./orders/Orders')),
    // },
    {
      path: '/woocommerce',
      component: () => <Redirect to="/woocommerce/products" />,
    },
  ],
};

export default WoocommerceAppConfig;
