module.exports = {
  proxy: {
    '/api/ms/kysj/tr': {
      target: 'http://kysj.chinanorth.cloudapp.chinacloudapi.cn:7001/TopTeacherService.svc/',
      pathRewrite: {
        '^/api/ms/kysj/tr': '',
      },
    },
    '/api/ms/kysj': {
      target: 'http://123.57.240.146:9999/ExamineService.svc/',
      pathRewrite: {
        '^/api/ms/kysj': '',
      },
    },
    '/api/getCosAuth': {
      target: 'http://123.57.240.146:9009/sts-auth',
      pathRewrite: {
        '^/api/getCosAuth': '',
      },
    },
  },
};
