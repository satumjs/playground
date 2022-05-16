// import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';

import { register, start, use, setHostHistory, MidwareName, FileType } from '../node_modules/@satumjs/core';
import { simpleSandboxMidware, mountNodeMidware } from '../node_modules/@satumjs/simple-midwares';
import singleSpaMidware from '../node_modules/@satumjs/midware-single-spa';
import interceptorMidware from '../node_modules/@satumjs/midware-interceptor';

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
    { rule: '/react17', path: '/sub-layout' },
    { rule: /\/vue(2|3)/, path: '/sub-layout' }
  ]);
  return props;
}

register([{
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

use((sys, apps, next) => {
  sys.set(MidwareName.domChange, (appName, mountNode) => {
    mountNode.querySelectorAll("img").forEach((el) => {
      const src = el.getAttribute("src");
      const { assetPublicPath = '' } = apps.find((item) => item.name === appName) || {};
      const matchs = assetPublicPath.match(/(^(https?\:)?\/\/[^\/]+)/g);
      const rootPath = matchs[0];
      const newSrc = /^(https?\:)?\/\//.test(src) ? src : `${src.charAt(0) === "/" ? rootPath : assetPublicPath}${src}`;
      el.setAttribute("src", newSrc);
    });
    return appName;
  });

  sys.set(MidwareName.code, (code, file) => {
    const ext = sys.fileExtName(file);
    if (ext === FileType.CSS) {
      const cssPath = file.replace(/[^\/]+$/, '');
      const { assetPublicPath = cssPath } = apps.find(item => item.fileExtNameMap[file]) || {};
      const matchs = code.match(/url\([^\)]+\)/ig);
    
      if (matchs) {
        matchs.forEach(s => {
          const paths = s.match(/\(([^\)]+)\)/);
          const url = paths ? paths[1] : undefined;
          if (url && url.charAt(0) === '.') {
            code = code.replace(s, s.replace(url, assetPublicPath + url));
          }
        });
      }
      return code;
    }
    return code;
  });

  sys.set(MidwareName.url, (url) => {
    const repeatPart = '/micro-app/vue2';
    if (url.indexOf(repeatPart) !== url.lastIndexOf(repeatPart)) {
      return url.replace(repeatPart, '');
    }
    return url;
  });
  
  next();
});

use(simpleSandboxMidware);
use(interceptorMidware);
use(mountNodeMidware);
use(singleSpaMidware);

start();
