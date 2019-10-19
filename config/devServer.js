module.exports = {
  proxy: {
    '/api/ms/kysj/tr': {
      target: 'http://kysj.chinanorth.cloudapp.chinacloudapi.cn:7001/TopTeacherService.svc/',
      pathRewrite: {
        '^/api/ms/kysj/tr': '',
      },
    },
    '/api/ms/kysj': {
      target: 'http://101.201.152.49:9999/ExamineService.svc/',
      pathRewrite: {
        '^/api/ms/kysj': '',
      },
    },
    '/cos': {
      target: 'http://101.201.152.49:9009/sts-auth',
      pathRewrite: {
        '^/cos': '',
      },
    },
  },
};
