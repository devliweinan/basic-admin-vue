import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

const dashboardRoute = {
  path: '/home',
  name: 'Home',
  component: 'LAYOUT',
  redirect: '/home/maps',
  meta: {
    title: 'routes.home.maps',
    hideChildrenInMenu: true,
    icon: 'bx:bx-home',
  },
  children: [
    {
      path: 'maps',
      name: 'MapsPage',
      component: '/home/analysis/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.home.maps',
        currentActiveMenu: '/home',
        icon: 'bx:bx-home',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/home/workbench/index',
      meta: {
        hideMenu: false,
        hideBreadcrumb: true,
        title: 'routes.home.workbench',
        currentActiveMenu: '/home',
        icon: 'bx:bx-home',
      },
    },
  ],
};

const sysRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  redirect: '/system/account',
  meta: {
    icon: 'ion:settings-outline',
    title: 'routes.system.moduleName',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: 'routes.system.account',
        ignoreKeepAlive: true,
      },
      component: '/system/account/index',
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: 'routes.system.account_detail',
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: '/system/account/AccountDetail',
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: 'routes.system.role',
        ignoreKeepAlive: true,
      },
      component: '/system/role/index',
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: 'routes.system.menu',
        ignoreKeepAlive: true,
      },
      component: '/system/menu/index',
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: 'routes.system.dept',
        ignoreKeepAlive: true,
      },
      component: '/system/dept/index',
    },
  ],
};

// const backRoute = {
//   path: 'back',
//   name: 'PermissionBackDemo',
//   meta: {
//     title: 'routes.demo.permission.back',
//   },

//   children: [
//     {
//       path: 'page',
//       name: 'BackAuthPage',
//       component: '/demo/permission/back/index',
//       meta: {
//         title: 'routes.demo.permission.backPage',
//       },
//     },
//     {
//       path: 'btn',
//       name: 'BackAuthBtn',
//       component: '/demo/permission/back/Btn',
//       meta: {
//         title: 'routes.demo.permission.backBtn',
//       },
//     },
//   ],
// };

// const linkRoute = {
//   path: '/link',
//   name: 'Link',
//   component: 'LAYOUT',
//   meta: {
//     icon: 'ion:tv-outline',
//     title: 'routes.demo.iframe.frame',
//   },
//   children: [
//     {
//       path: 'doc',
//       name: 'Doc',
//       meta: {
//         title: 'routes.demo.iframe.doc',
//         frameSrc: 'https://doc.vvbin.cn/',
//       },
//     },
//     {
//       path: 'https://doc.vvbin.cn/',
//       name: 'DocExternal',
//       component: 'LAYOUT',
//       meta: {
//         title: 'routes.demo.iframe.docExternal',
//       },
//     },
//   ],
// };

// const authRoute = {
//   path: '/permission',
//   name: 'Permission',
//   component: 'LAYOUT',
//   redirect: '/permission/front/page',
//   meta: {
//     icon: 'carbon:user-role',
//     title: 'routes.demo.permission.permission',
//   },
//   children: [backRoute],
// };

// const levelRoute = {
//   path: '/level',
//   name: 'Level',
//   component: 'LAYOUT',
//   redirect: '/level/menu1/menu1-1',
//   meta: {
//     icon: 'carbon:user-role',
//     title: 'routes.demo.level.level',
//   },

//   children: [
//     {
//       path: 'menu1',
//       name: 'Menu1Demo',
//       meta: {
//         title: 'Menu1',
//       },
//       children: [
//         {
//           path: 'menu1-1',
//           name: 'Menu11Demo',
//           meta: {
//             title: 'Menu1-1',
//           },
//           children: [
//             {
//               path: 'menu1-1-1',
//               name: 'Menu111Demo',
//               component: '/demo/level/Menu111',
//               meta: {
//                 title: 'Menu111',
//               },
//             },
//           ],
//         },
//         {
//           path: 'menu1-2',
//           name: 'Menu12Demo',
//           component: '/demo/level/Menu12',
//           meta: {
//             title: 'Menu1-2',
//           },
//         },
//       ],
//     },
//     {
//       path: 'menu2',
//       name: 'Menu2Demo',
//       component: '/demo/level/Menu2',
//       meta: {
//         title: 'Menu2',
//       },
//     },
//   ],
// };

export default [
  {
    url: '/basic-api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object[];
      switch (id) {
        case '1':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
          menu = [dashboardRoute, sysRoute];
          break;
        case '2':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path;
          menu = [dashboardRoute, sysRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
