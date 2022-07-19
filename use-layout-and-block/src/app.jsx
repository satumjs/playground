// import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';

import { register, start, use, set, setHostHistory, MidwareName, FileType, PluginEvent, TimingHookName, uHostAppName } from '../node_modules/@satumjs/core';
import { simpleSandboxMidware, mountNodeMidware, interceptorMidware, imageUrlCompleteMidware } from '../node_modules/@satumjs/simple-midwares';
import singleSpaMidware from '../node_modules/@satumjs/midware-single-spa';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    menuDataRender: (menuData) => [...menuData,
      { name: 'react17', path: '/react17', locale: false },
      { name: 'vue2', path: '/vue2', locale: false },
      { name: 'unknown', path: '/unknown', locale: false },
    ],
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <a key="satumjsApi" href="https://satumjs.github.io/website" target="_blank">
            <LinkOutlined />
            <span>Satumjs 文档</span>
          </a>,
          <a key="satumjsExamples" href="https://stackblitz.com/@valleykid" target="_blank">
            <BookOutlined />
            <span>Satumjs 示例</span>
          </a>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )} */}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export function modifyClientRenderOpts(props) {
  // console.log('-------', props)
  setHostHistory(props.history, [
    { rule: '/react17', layout: '/sub-layout' },
    { rule: /\/vue(2|3)/, layout: '/sub-layout' }
  ]);
  return props;
}

register([/* {
  name: uHostAppName,
  rules: [
    { rule: '/react17', layout: '/sub-layout' },
    { rule: /\/vue(2|3)/, layout: '/sub-layout' }
  ]
}, */ {
  name: 'react17',
  entry: 'https://zeroing.jd.com/micro-app/react17/',
  rules: {
    rule: '/react17',
    container: '#subAppWrapper'
  }
}, {
  name: 'vue2',
  entry: 'https://zeroing.jd.com/micro-app/vue2/',
  rules: {
    rule: '/vue2',
    container: '#subAppWrapper'
  }
}]);

use((sys, _, next) => {
  sys.set(MidwareName.url, (url) => {
    const repeatPart = '/micro-app/vue2';
    if (url.indexOf(repeatPart) !== url.lastIndexOf(repeatPart)) {
      return url.replace(repeatPart, '');
    }
    return url;
  });
  
  next();
});

use(imageUrlCompleteMidware);
use(simpleSandboxMidware);
use(interceptorMidware);
use(mountNodeMidware);
use(singleSpaMidware);

set((sys) => {
  /* sys.event(PluginEvent.beforeLoad, customs => {
    console.log('-------- beforeLoad', customs);
  });
  sys.event(PluginEvent.afterMount, customs => {
    console.log('-------- afterMount', customs);
  }); */

  Object.values(TimingHookName).forEach(thn => {
    // sys.event(thn, data => console.log('----------', thn, data, Date.now()))
  })
});

start();
