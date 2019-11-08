import getPageTitle from '@/utils/getPageTitle';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from '@/router';
import { get, LsKey } from '@/utils/ls';
import menu from '@/store/menu';
import user from '@/store/user';
import { Message } from 'element-ui';
import { isEmpty } from '@/utils';
import ThemeChange from '@/utils/change-theme';
import app from '@/store/app';

new ThemeChange().changeTheme(app.theme, false);

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const auth = get(LsKey.AUTH);
  if (auth && auth.token) {
    if (to.path === '/login') {
      next('/');
    } else {
      if (!isEmpty(menu.permissionRouter)) {
        next();
      } else {
        if (isEmpty(menu.permissionRouter)) {
          await menu
            .getMyMenus()
            .then((data) => {
              menu.generateRoutes(data).then((routes) => {
                router.addRoutes(routes);
                next({ ...to, replace: true });
              });
            })
            .catch(() => {
              user.logOut().then(() => {
                error(next);
              });
            });
        }
      }
    }
  } else {
    if (to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});

const error = (next: any) => {
  Message.error('角色验证失败，请重新登陆');
  next('/login');
};
