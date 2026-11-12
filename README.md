# lichun 的技术博客

正式站：https://pamiryuan.pages.dev/

使用 [Astro](https://astro.build/) 与 [vhAstro-Theme](https://github.com/uxiaohan/vhAstro-Theme)。主题源码基于 `8b81ca1e595e9561f479b7b453a870ede956e52f`，保留 MIT 许可于 `LICENSE.vhAstro`。

## 本地开发

Node.js 22.16 或更高兼容版本：

```sh
npm ci
npm run dev
npm run build
npm run check:site
```

Cloudflare Pages 项目 `pamiryuan`：生产分支 `main`，构建命令 `npm run build`，输出 `dist`。

## 发布文章

继续在 `content/post/<folder>/index.md` 编辑文章，将图片放在文章旁边。原有 Hugo front matter 保持可用：`title`、`date`、`description`、`slug`、`categories`、`tags`、`image`、`lastmod`、`draft`。

`npm run prepare:content` 读取原文，为主题生成临时内容与静态资源；`draft: true` 不发布。生成目录已忽略，不应提交。已有文章地址 `/p/<slug>/` 与订阅地址 `/index.xml` 保留；新的 `/rss.xml` 提供相同订阅内容。

站点信息、导航与横幅在 `src/config.ts`，个性化样式在 `src/styles/Custom.less`。模板自带示例文章、广告和作者统计没有启用。

旧 Hugo 配置和历史生成物保留在仓库中用于回查，正式站只发布 Astro 构建的 `dist/`。
