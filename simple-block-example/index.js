import { register, start, use } from '@satumjs/core';
import {
  imageUrlCompleteMidware,
  simpleSandboxMidware,
  mountNodeMidware,
} from '@satumjs/simple-midwares';
import singleSpaMidware from '@satumjs/midware-single-spa';

register([
  {
    name: 'baidu',
    entry: 'https://zeroing.jd.com/micro-app/vue3/',
    rules: {
      rule: '/',
      container: '#mountNode',
      blocks: [
        {
          path: '/react',
          container: '.msg-title',
        },
      ],
    },
  },
  {
    name: 'react',
    entry: 'https://zeroing.jd.com/micro-app/react17/',
    rules: {
      rule: '/react',
      container: '#mountNode',
    },
  },
]);

use(imageUrlCompleteMidware);
use(simpleSandboxMidware, {
  winVariable(k, _, win) {
    if (k === 'getComputedStyle') {
      const orginGetComputedStyle = win[k].bind(win);
      return (...args) => {
        let el = args.shift();
        el = el instanceof Document || el.tagName === 'HTML' ? document.body : el;
        return orginGetComputedStyle(el, ...args);
      };
    }
  },
});
use(mountNodeMidware);
use(singleSpaMidware);

start();
