export default {
  Title: 'lichun 的技术博客',
  Site: 'https://pamiryuan.pages.dev',
  Subtitle: '记录代码、AI 与实践',
  Description: 'lichun 的技术博客，记录 Go 后端开发、AI Agent 和学习实践。',
  Author: 'lichun',
  Avatar: '/assets/images/avatar.jpg',
  Motto: 'Golang 后端程序员，正在学习 DL',
  Cover: '/assets/images/home-banner.webp',
  Tips: '',
  TypeWriteList: ['记录代码、AI 与实践。', '把想法写下来，把流程跑通。'],
  CreateTime: '2026-01-19',
  HomeBanner: {
    enable: true, HomeHeight: '33rem', PageHeight: '18rem',
    background: "linear-gradient(0deg, #101b2a66, #101b2a22), url('/assets/images/home-banner.webp') no-repeat center 60%/cover"
  },
  Theme: {
    '--vh-main-color': '#0b9f96', '--vh-font-color': '#34495e',
    '--vh-aside-width': '280px', '--vh-main-radius': '0.88rem', '--vh-main-max-width': '1380px'
  },
  Navs: [
    { text: '归档', link: '/archives/', icon: 'Nav_archives' },
    { text: '关于', link: '/about/', icon: 'Nav_about' },
    { text: 'RSS', link: '/index.xml', icon: 'Nav_rss' },
    { text: 'GitHub', link: 'https://github.com/pamir-yuan', icon: 'WebSite_github', target: true }
  ],
  WebSites: [{ text: 'GitHub', link: 'https://github.com/pamir-yuan', icon: 'WebSite_github' }],
  AsideShow: { WebSitesShow: true, CategoriesShow: true, TagsShow: true, recommendArticleShow: true },
  DNSOptimization: [],
  vhMusicApi: '',
  Comment: { Twikoo: { enable: false, envId: '' }, Waline: { enable: false, serverURL: '' } },
  HanAnalytics: { enable: false, server: '', siteId: '' },
  GoogleAds: { ad_Client: '', asideAD_Slot: '', articleAD_Slot: '' },
  Reward: { AliPay: '', WeChat: '' },
  SeoPush: { enable: false, serverApi: '', paramsName: 'url' },
  ScrollSpeed: 666
};
