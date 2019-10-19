import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';
import { isEmpty } from '.';

export function generateAsyncRouterMap(data: any[]) {
  const asyncRouterMap: RouteConfig[] = [];
  data.forEach((parent, index) => {
    if (!isEmpty(parent.childList)) {
      asyncRouterMap[index] = {
        path: `/${parent.url}`,
        component: Layout,
        redirect: parent.childList[0].url,
        children: generateAsyncChildRouterMap(parent.otherName, parent.childList),
        meta: {
          title: parent.name,
          icon: parent.icon || '',
        },
      };
    } else {
      asyncRouterMap[index] = {
        path: `/${parent.url}`,
        component: Layout,
        redirect: '',
        children: [
          {
            path: '',
            name: getRouteName(parent.otherName, parent.otherName, index),
            component: () => import(`@/views/${parent.otherName}/index.vue`).then((m) => m.default),
            meta: {
              title: parent.name,
              icon: parent.icon || '',
            },
          },
        ],
      };
    }
  });
  return asyncRouterMap;
}

export function generateAsyncChildRouterMap(parentOtherName: string, data: any[]) {
  const asyncChildRouterMap: RouteConfig[] = [];
  data.forEach((child, index) => {
    asyncChildRouterMap[index] = {
      path: child.url,
      name: getRouteName(parentOtherName, child.otherName, index),
      component: () =>
        import(`@/views/${parentOtherName}/${child.otherName}/index.vue`).then((m) => m.default),
      meta: {
        title: child.name,
        icon: '',
        functions: child.functionList,
      },
    };
  });
  return asyncChildRouterMap;
}

export function getRouteName(parentName: string, childName: string, index: number) {
  return `${parentName}-${childName}-${index}`;
}
