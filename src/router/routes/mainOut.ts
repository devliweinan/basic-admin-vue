/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '/@/router/types';

export const mainOutRoutes: AppRouteModule[] = [
  // test  http:ip:port/maps
  {
    path: '/maps',
    name: 'Maps',
    component: () => import('/@/views/mainout/maps/index.vue'),
    meta: {
      title: '地图',
      ignoreAuth: true,
    },
  },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
