interface SearchItem { title: string; url: string; content: string }
let searchJson: SearchItem[] | null = null;
async function searchFn(value: string) {
  searchJson ??= await fetch('/vh-search.json').then(res => { if (!res.ok) throw new Error('Search unavailable'); return res.json(); });
  const list = document.querySelector('.vh-header .vh-search-list');
  if (!list) return;
  list.replaceChildren();
  const needle = value.trim().toLocaleLowerCase();
  if (!needle) return;
  const found = searchJson!.filter(item => item.content.toLocaleLowerCase().includes(needle));
  if (!found.length) { list.textContent = '没有找到相关文章'; return; }
  for (const item of found) {
    const link = document.createElement('a'); link.className = 'vh-search-item'; link.href = item.url;
    const title = document.createElement('span'); title.className = 'vh-ellipsis'; title.textContent = item.title;
    const summary = document.createElement('p'); summary.className = 'vh-ellipsis line-3';
    const start = Math.max(0, item.content.toLocaleLowerCase().indexOf(needle) - 35);
    summary.textContent = item.content.slice(start, start + 150);
    link.append(title, summary); list.append(link);
  }
}
function vhSearchInit() {
  const button = document.querySelector<HTMLButtonElement>('.vh-header .search-btn');
  const panel = document.querySelector<HTMLElement>('.vh-header .vh-search');
  const input = panel?.querySelector<HTMLInputElement>('input');
  if (!button || !panel || !input || button.dataset.searchBound) return;
  button.dataset.searchBound = 'true';
  button.addEventListener('click', () => { panel.classList.add('active'); input.focus(); });
  panel.querySelector('main')?.addEventListener('click', event => event.stopPropagation());
  panel.addEventListener('click', () => panel.classList.remove('active'));
  input.addEventListener('keydown', event => { if (event.key === 'Escape') { panel.classList.remove('active'); button.focus(); } });
  input.addEventListener('input', () => { void searchFn(input.value); });
}
export { searchFn, vhSearchInit };
