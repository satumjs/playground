export default {
  server: {
    hmr: {
      protocol: 'wss',
      // 此处需要修改对应的 fork 地址
      host: 'vitejs-vite-pl7bhf--3000.local.webcontainer.io',
    },
    cors: { origin: '*' },
  },
};
