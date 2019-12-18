import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';
Vue.use(Router);

const createRouter = () =>
  new Router({
    mode: 'history',
    base: process.env.VUE_APP_BASE_NAME,
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/tx-live/:push',
        name: 'TxLive',
        component: () => import('@/views/expand/tx-live.vue'),
      },
      {
        path: '',
        component: Layout,
        children: [
          {
            path: '/class/lesson-list/:classId',
            name: 'ClassLessonList',
            component: () => import('@/views/class/list/lesson/index.vue'),
          },
          {
            path: '/expand/lm-sign-pay',
            name: 'LmSignPay',
            component: () => import('@/views/expand/lm-sign-pay.vue'),
          },
          {
            path: '/record-stati',
            name: 'RecordStati',
            component: () => import('@/views/class/record-source/record-stati.vue'),
          },
        ],
      },
    ],
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter() as any;
  (router as any).matcher = newRouter.matcher;
}

export default router;
