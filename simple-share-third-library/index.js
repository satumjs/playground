import { register, start, use } from '@satumjs/core';
import { simpleSandboxMidware, mountNodeMidware } from '@satumjs/simple-midwares';

register([{
  name: 'layout',
  entry: 'http://localhost:30000',
  rules: {
    rule: '/layout',
    container: '#mountNode'
  }
}, {
  name: 'app1',
  entry: 'http://localhost:3001',
  rules: {
    rule: '/app1',
    container: '#root',
    layout: '/layout'
  },
  shareProps: {
    externals: {
      'jquery': 'jQuery'
    }
  }
}, {
  name: 'app2',
  entry: 'http://localhost:3002',
  rules: {
    rule: '/app2',
    container: '#root',
    layout: '/layout'
  }
}]);

use(simpleSandboxMidware, {
  winVariable(k, fakeWin) {
    // window 上的方法在沙箱运行时，会被 .bind 锁定上下文
    // jQuery 不用被 bind，在默认处理前返回
    if (k === 'jQuery') return fakeWin[k];
  }
});
use(mountNodeMidware);

start({
  // 可用于模拟 qiankun 的 setDefaultMountApp 方法
  afterSystemStart(validPath /* 有效的路径，包含 `pathname + hash` */) {
    const [path] = validPath.split('#');
    if (!path || path === '/') history.replaceState(null, '', '/app1');
  }
});
