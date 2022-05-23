// @ts-check
import { register, start, use } from '@satumjs/core';
import sandboxMidware from '@satumjs/midware-sandbox';
import singleSpaMidware from '@satumjs/midware-single-spa';

register({
  name: 'vite',
  entry: 'http://localhost:3000/',
  rules: { rule: '/', container: '#mountNode' },
});

use(sandboxMidware);
use(singleSpaMidware);

start({ ignoreFileRule: ['localservice@runtime'] });
