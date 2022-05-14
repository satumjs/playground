// @ts-check
import { register, start, use, HistoryType, MidwareName, FileType } from '@satumjs/core';
import { simpleSandboxMidware } from '@satumjs/simple-midwares';
import midwareSingleSpa from '@satumjs/midware-single-spa';

const entry = 'https://zeroing.jd.com/micro-app/vue2/';
register({
  name: 'vue2',
  entry,
  history: HistoryType.HASH,
  rules: {
    rule: '/',
    container: '#mountNode',
  },
});

use((sys, microApps, next) => {
  // 通过中间件处理样式中的路径问题
  sys.set(MidwareName.code, (code, file) => {
    const ext = sys.fileExtName(file);
    if (ext === FileType.CSS) {
      const { assetPublicPath = entry } = microApps.find(item => item.fileExtNameMap[file]) || {};
      const matchs = code.match(/url\([^\)]+\)/ig);
      if (matchs) {
        matchs.forEach(s => {
          const paths = s.match(/\(([^\)]+)\)/);
          const url = paths ? paths[1] : undefined;
          if (url && url.charAt(0) === '.') {
            code = code.replace(s, s.replace(url, assetPublicPath + url.replace(/^\.{1,2}\//, '')));
          }
        });
      }
      return code;
    }
    return code;
  });
  next();
});

use(simpleSandboxMidware, {
  winVariable(key) {
    // 设置这几个变量，模拟 micro-app 环境，因为借用的他们的微应用。
    // 这样，应用执行时会导出 bootstrap/mount/unmount
    if (key === '__MICRO_APP_ENVIRONMENT__') return true;
    if (key === '__MICRO_APP_PUBLIC_PATH__') return entry;
    if (key === '__MICRO_APP_NAME__') return 'vue2';
  }
});

use(midwareSingleSpa);

start({ baseHistoryType: HistoryType.HASH });