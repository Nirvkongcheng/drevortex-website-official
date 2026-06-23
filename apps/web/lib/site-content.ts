export type NavItem = {
  href: string;
  label: string;
};

export type CaseItem = {
  title: string;
  category: string;
  summary: string;
  tags: string[];
};

export const navItems: NavItem[] = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我们" },
  { href: "/services", label: "服务业务" },
  { href: "/cases", label: "案例展示" },
  { href: "/contact", label: "联系我们" },
];

export const homeStats = [
  { value: "200+", label: "服务客户", detail: "以技术驱动交付质量，以长期维护标准治理官网和数字化项目。" },
  { value: "98%", label: "满意度", detail: "围绕视觉还原、交付效率与稳定性建立持续可复用的方法。" },
  { value: "50+", label: "合作客户", detail: "覆盖品牌官网、网页制作、小程序开发与设计服务场景。" },
  { value: "36个月", label: "持续服务", detail: "从项目启动、迭代到上线后的运营支持保持连续响应。" },
];

export const homeReasons = [
  {
    index: "01",
    title: "技术驱动",
    description:
      "以前后端一体化能力承接官网、后台、内容系统与数据库基础设施，不再把展示层和数据链路缠死在一起。",
  },
  {
    index: "02",
    title: "品质交付",
    description:
      "从设计 token、组件层、接口层到部署策略统一治理，确保页面表现、可维护性和后续扩展都稳定成立。",
  },
  {
    index: "03",
    title: "高端体验",
    description:
      "延续旧站的电影感与科技感，但用克制、可控、企业级的交互节奏重新实现，而不是堆砌华丽特效。",
  },
];

export const serviceHighlights = [
  {
    title: "软件开发",
    eyebrow: "Software Development",
    description: "企业数字化系统、管理后台、业务平台与专属软件能力建设。",
  },
  {
    title: "网页制作",
    eyebrow: "Web Production",
    description: "企业官网、品牌展示站、专题页面与高转化业务页面搭建。",
  },
  {
    title: "小程序开发",
    eyebrow: "Mini Program",
    description: "微信小程序与轻量业务载体设计开发，支持展示、服务与转化。",
  },
];

export const processSteps = [
  "扫描旧站并冻结重建边界",
  "抽象设计系统与公共骨架",
  "重写关键页面结构与动效",
  "接入后端、数据库与后台内容链路",
];

export const casesPreview: CaseItem[] = [
  {
    title: "某电商平台开发",
    category: "开发类",
    summary: "完整电商系统开发，包含用户端、商家端、后台管理，帮助客户销售额提升 30%。",
    tags: ["development", "电商", "30%"],
  },
  {
    title: "企业官网设计",
    category: "网页&小程序",
    summary: "为科技公司打造品牌官网，提升企业形象和在线获客能力，月询盘量超 10 万。 ",
    tags: ["web", "官网", "10万"],
  },
  {
    title: "餐饮小程序",
    category: "网页&小程序",
    summary: "开发在线点餐和会员管理小程序，提升门店运营效率，服务用户超 5000 人。",
    tags: ["mini-program", "餐饮", "5000+"],
  },
];

export const aboutPrinciples = [
  "以梦想为起点，以创新为驱动，把复杂的技术结构整理成可持续运营的商业载体。",
  "坚持克制、准确、长期主义的审美与工程标准，不用短期炫技换后期维护灾难。",
  "强调页面表现、信息结构、真实数据与运维基线必须同时成立。",
];

export const aboutAdvantages = [
  "专业团队",
  "技术领先",
  "服务完善",
  "创新驱动",
  "品质保证",
  "合作共赢",
];

export const serviceCategories = [
  {
    title: "核心业务",
    items: ["软件开发", "网页制作", "微信小程序开发", "Logo商标＆设计"],
  },
  {
    title: "延伸服务",
    items: ["商用图片设计", "互联网咨询", "界面优化", "品牌表达"],
  },
  {
    title: "交付方式",
    items: ["定制开发", "全程技术支持", "快速交付上线", "长期维护"],
  },
];

export const caseCategories = ["全部案例", "开发类", "网页&小程序", "Logo商标＆商用图片设计"];

export const contactDetails = [
  { label: "地址", value: "XXX" },
  { label: "电话", value: "XXX" },
  { label: "邮箱", value: "drevortex@163.com" },
  { label: "工作时间", value: "周一至周五 9:00 - 18:00" },
];

export const footerGroups = [
  {
    title: "站点导航",
    links: navItems,
  },
  {
    title: "核心能力",
    links: [
      { href: "/services", label: "软件开发" },
      { href: "/services", label: "网页制作" },
      { href: "/services", label: "微信小程序开发" },
    ],
  },
];
