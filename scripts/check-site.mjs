import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as cheerio from 'cheerio';
import matter from 'gray-matter';
const dist = path.resolve('dist');
const origin = 'https://pamiryuan.pages.dev';
const errors = [];
const htmlFiles = [];
async function walk(dir) {
  for (const item of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) await walk(file);
    else if (file.endsWith('.html')) htmlFiles.push(file);
  }
}
await walk(dist);
for (const file of htmlFiles) {
  const $ = cheerio.load(await fs.readFile(file, 'utf8'));
  const route = '/' + path.relative(dist, file).replace(/index\.html$/, '');
  for (const el of $('a[href], img[src], script[src], link[rel="stylesheet"]')) {
    const ref = $(el).attr('href') || $(el).attr('src');
    if (!ref || /^(data:|mailto:|javascript:|tel:)/.test(ref)) continue;
    const url = new URL(ref, origin + route);
    if (url.origin !== origin) continue;
    if (url.pathname.startsWith('/tags/')) continue; // preserved through _redirects
    const local = path.join(dist, decodeURIComponent(url.pathname));
    try {
      const stat = await fs.stat(local);
      if (stat.isDirectory()) await fs.access(path.join(local, 'index.html'));
    } catch { errors.push(`${route}: missing ${ref}`); }
  }
}
const search = JSON.parse(await fs.readFile(path.join(dist, 'vh-search.json'), 'utf8'));
let count = 0;
for (const item of await fs.readdir('content/post')) {
  const { data } = matter(await fs.readFile(`content/post/${item}/index.md`, 'utf8'));
  if (data.draft) continue;
  count++;
  const match = search.find(post => post.title === data.title);
  assert.ok(match, `Missing post from search: ${data.title}`);
  const $ = cheerio.load(await fs.readFile(path.join(dist, decodeURIComponent(match.url), 'index.html'), 'utf8'));
  assert.equal($('article > header h1').text(), data.title);
  assert.equal($('meta[property="og:image"]').attr('content')?.startsWith(origin), true);
  assert.equal(new Date(JSON.parse($('script[type="application/ld+json"]').html()).datePublished).valueOf(), new Date(data.date).valueOf());
}
assert.equal(search.length, count, 'Unexpected template or draft posts in search');
assert.equal(cheerio.load(await fs.readFile('dist/index.xml', 'utf8'), { xmlMode: true })('item').length, count);
assert.deepEqual(errors, [], 'Broken internal links/assets');
console.log(`PASS: ${count} real posts, ${htmlFiles.length} pages; internal links, images, dates, search and RSS verified.`);
