interface IApiProxies {
  kysj: string;
  tr: string;
}

export interface ISettings {
  maxKeepAlive: number;
  theme: string;
  navbarHeight: number;
  title: string;
  logo: string;
  logoTitle: string;
  apiProxies: IApiProxies;
  sanyiTableId: string;
  timeout: number;
}

const settings: ISettings = {
  maxKeepAlive: 7,
  timeout: 15000,
  theme: '#409EFF',
  navbarHeight: 64,
  sanyiTableId: 'sanyi-table',
  title: process.env.VUE_APP_TITLE,
  logoTitle: '三一外语',
  logo: 'https://keyushijian-1257034971.cos.ap-shanghai.myqcloud.com/back-admin/img/sanyi-logo.png',
  apiProxies: {
    kysj: '/api/ms/kysj/',
    tr: '/api/ms/kysj/tr/',
  },
};

export default settings;
