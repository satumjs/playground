// @ts-check
import { register, start, use, MidwareName, corsRuleLabel } from '@satumjs/core';
import { simpleSandboxMidware, mountNodeMidware, interceptorMidware } from '@satumjs/simple-midwares'

register([{
  name: 'react',
  entry: 'http://localhost:3000',
  rules: [{
    rule: '/',
    container: '#mountNode'
  }]
}, {
  name: 'vue',
  entry: 'http://localhost:3001/',
  rules: { rule: '/vue', container: '#mountNode' },
}, {
  name: 'store',
  entry: 'https://render.alipay.com/p/w/occ-appstore/index.html',
  rules: {
    rule: '/store',
    container: '#storeWrapper',
    layout: '/components'
  },
  shareProps: {
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  },
}]);

use((sys, _, next) => {
  sys.set(MidwareName.urlOption, { corsRule: `https://thingproxy.freeboard.io/fetch/${corsRuleLabel}` });
  next();
});

use(interceptorMidware);
use(simpleSandboxMidware);
use(mountNodeMidware);

start({ ignoreFileRule: /react(-dom)?/ });