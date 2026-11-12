import { getCollection } from 'astro:content';
import * as cheerio from 'cheerio';
export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.hide);
  return Response.json(posts.map(post => ({
    title: post.data.title, url: `/p/${post.data.id}/`,
    content: post.data.title + ' ' + cheerio.load(post.rendered?.html || post.body || '').text()
  })));
}
