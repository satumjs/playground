// @ts-check
import { register, start, use, MidwareName } from '@satumjs/core';

register({
  name: 'react',
  entry: 'https://zeroing.jd.com/micro-app/react17/',
  rules: {
    rule: '/',
    container: '#mountNode',
  },
});

use((sys, apps, next) => {
  // 使用中间件节点 MidwareName.domChange
  // 中间件函数参数请参考 https://satumjs.github.io/website/guide/midware/flow-nodes.html#%E6%8C%89%E6%94%AF%E6%8C%81%E3%80%8E%E5%8D%95%E4%B8%AA-%E5%A4%9A%E4%B8%AA%E3%80%8F%E5%88%92%E5%88%86
  sys.set(MidwareName.domChange, (appName, mountNode) => {
    // 每次 dom 更新，获取到所有图片
    mountNode.querySelectorAll("img").forEach((el) => {
      const src = el.getAttribute("src");

      // 根据微应用名，获取到当前微应用，且得到其静态资源路径
      const { assetPublicPath = '' } = apps.find((item) => item.name === appName) || {};

      // 获取到静态资源路径的根目录
      const matchs = assetPublicPath.match(/(^(https?\:)?\/\/[^\/]+)/g);
      const rootPath = matchs[0];

      // 如果是以 http/https/双斜杠开头，则不做处理；
      // 如果是以单斜杠开头，则表示相对根目录，使用 rootPath 补全；
      // 如果不以上述开头，则相对当前静态资源路径，使用 assetPublicPath 补全
      const newSrc = /^(https?\:)?\/\//.test(src) ? src : `${src.charAt(0) === "/" ? rootPath : assetPublicPath}${src}`;

      // 重新设置图片路径
      el.setAttribute("src", newSrc);
    });

    // 因为该中间件支持多个依次处理，下一个相同节点中间件需要微应用名，返回该值
    return appName;
  });
  next();
});

start();