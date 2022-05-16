// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "layout": false,
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/user/Login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/welcome",
        "name": "welcome",
        "icon": "smile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/Welcome'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/sub-layout",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SubLayout' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/SubLayout'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/admin",
        "name": "admin",
        "icon": "crown",
        "access": "canAdmin",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Admin' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/Admin'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/admin/sub-page",
            "name": "sub-page",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/Welcome'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "name": "list.table-list",
        "icon": "table",
        "path": "/list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableList' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/TableList'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/index.html",
        "redirect": "/welcome",
        "exact": true
      },
      {
        "path": "/",
        "redirect": "/welcome",
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/valleykid/CodeVolution/Packages/satumjs/playground/use-layout-and-block/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
