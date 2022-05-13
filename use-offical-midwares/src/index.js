import { MidwareName, HistoryType, register, start, use, corsRuleLabel } from '@satumjs/core';
import { simpleSandboxMidware } from '@satumjs/simple-midwares';
import midwareSingleSpa from '@satumjs/midware-single-spa';

register({
  name: 'vue-todomvc',
  entry: 'https://todomvc.com/examples/vue/',
  history: HistoryType.HASH,
  rules: {
    rule: '/',
    container: '#mountNode'
  },
});

use((system, _, next) => {
  system.set(MidwareName.urlOption, {
    corsRule: `https://thingproxy.freeboard.io/fetch/${corsRuleLabel}`
  });
  next();
});

// 使用简单的沙箱
use(simpleSandboxMidware);

// 使用 single-spa 中间件处理微应用的加载/卸载
use(midwareSingleSpa);

start({ baseHistoryType: HistoryType.HASH });