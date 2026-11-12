# 当前博客约定

本站已迁移至 Astro + vhAstro-Theme；根目录的 `package.json`、`astro.config.mjs` 和 `src/config.ts` 是当前构建与站点配置。`hugo.yaml`、`themes/`、`public/` 是迁移前保留资料，不用于当前正式部署。

- 仓库 `pamir-yuan/pushpushblog`，生产分支 `main`。
- 正式站 `https://pamiryuan.pages.dev/`，Cloudflare Pages 项目 `pamiryuan`。
- 原文与图片继续放在 `content/post/<folder>/`，正文文件为 `index.md`；保留原 slug 和发布日期。
- 正文支持原有 Hugo front matter（含分类数组）；新文章应显式设置英文 slug。
- 构建：`npm ci`，然后 `npm run build`；输出 `dist`；用 `npm run check:site` 检查链接、资源、搜索、RSS 和文章日期。
- `src/content/blog/`、`site-assets/p/`、`.astro/`、`dist/` 是生成物，不提交。不得手工修改生成内容来替代源文修改。
- 发布文章后仍按最终提交 SHA 核对 `pamiryuan` 的 Cloudflare 部署，并验收正式文章 URL、首页、`/index.xml`、图片和旧链接。另一个旧 Pages 项目仍使用 Hugo，不能用它的状态替代当前正式站。
- 只提交任务相关文件；不要将当前文章中的历史 Hugo 示例随主题迁移改写成作者未曾写过的内容。
