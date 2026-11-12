import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
const root = process.cwd();
const content = path.join(root, 'content/post');
const generated = path.join(root, 'src/content/blog');
const assets = path.join(root, 'site-assets/p');
await fs.rm(generated, { recursive: true, force: true });
await fs.rm(assets, { recursive: true, force: true });
await fs.mkdir(generated, { recursive: true });
const slugs = new Set();
for (const dir of await fs.readdir(content, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const bundle = path.join(content, dir.name);
  const file = path.join(bundle, 'index.md');
  const { data, content: body } = matter(await fs.readFile(file, 'utf8'));
  if (data.draft === true) continue;
  // Hugo's default slug is the lowercased title when no explicit slug exists.
  const slug = String(data.slug || data.title.toLowerCase().replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-|-$/g, ''));
  if (!slug || slug.includes('/') || slug === '.' || slug === '..' || slugs.has(slug)) throw new Error(`Invalid or duplicate slug: ${slug}`);
  slugs.add(slug);
  const target = path.join(assets, slug);
  await fs.mkdir(target, { recursive: true });
  for (const item of await fs.readdir(bundle, { withFileTypes: true })) {
    if (item.name !== 'index.md') await fs.cp(path.join(bundle, item.name), path.join(target, item.name), { recursive: true });
  }
  const image = data.image || '';
  const cover = !image ? '/assets/images/home-banner.webp' : /^(https?:|\/)/.test(image) ? image : `/p/${slug}/${image}`;
  const meta = {
    title: data.title, date: new Date(data.date).toISOString(),
    ...(data.lastmod ? { updated: new Date(data.lastmod).toISOString() } : {}),
    categories: Array.isArray(data.categories) ? data.categories[0] || '技术笔记' : data.categories || '技术笔记',
    tags: data.tags || [], id: slug, cover, description: data.description || ''
  };
  const normalizedBody = body.replace(/(!\[[^\]]*\]\()([^\s)]+)([^)]*\))/g, (match, before, url, after) => /^(?:[a-z]+:|\/|#)/i.test(url) ? match : `${before}/p/${slug}/${url}${after}`);
  await fs.writeFile(path.join(generated, `${dir.name}.md`), matter.stringify(normalizedBody, meta));
}
console.log(`Prepared ${slugs.size} posts with original URLs and colocated assets.`);
