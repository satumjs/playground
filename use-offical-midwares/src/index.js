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
  // 使用中间件节点 MidwareName.urlOption
  // 该节点设置类型请参考 https://satumjs.github.io/website/guide/midware/flow-nodes.html#%E6%8C%89%E6%94%AF%E6%8C%81%E3%80%8E%E5%8D%95%E4%B8%AA-%E5%A4%9A%E4%B8%AA%E3%80%8F%E5%88%92%E5%88%86
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