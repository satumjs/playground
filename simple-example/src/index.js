// @ts-check
import { register, start } from '@satumjs/core';

register({
  name: 'react',
  entry: 'https://zeroing.jd.com/micro-app/react17/',
  rules: {
    rule: '/',
    container: '#mountNode',
  },
});

start();