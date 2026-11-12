import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import swup from '@swup/astro';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import { remarkNote, addClassNames } from './src/plugins/markdown.custom';
import SITE_INFO from './src/config';
export default defineConfig({
  site: SITE_INFO.Site,
  trailingSlash: 'always',
  publicDir: './site-assets',
  build: { assets: 'vh_static' },
  integrations: [swup({ theme: false, animationClass: 'vh-animation-', containers: ['.main-inner>.main-inner-content', '.vh-header>.main'], smoothScrolling: true, progress: true, cache: true, accessibility: true, updateHead: true, globalInstance: true }), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, remarkNote],
    rehypePlugins: [[rehypeKatex, { output: 'mathml', strict: false }], rehypeSlug, addClassNames],
    syntaxHighlight: 'shiki', shikiConfig: { theme: 'github-light' }
  },
  vite: { resolve: { alias: { '@': path.resolve('./src') } } },
  devToolbar: { enabled: false }
});
