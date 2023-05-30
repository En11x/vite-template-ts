//处理动态路由

import type { RouteRecordRaw } from 'vue-router';

//获取所有路由配置
const getAllRoutes = async () => {};

//递归获取Route
const recurseGetRoute = (menus, allRoutes, route) => {};

//根据菜单生成路由
const menuToRoutes = (menu): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve) => {
    resolve([]);
  });
};
