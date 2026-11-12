export default () => {
  document.querySelectorAll<HTMLImageElement>('img[data-vh-lz-src]').forEach(img => {
    img.src = img.dataset.vhLzSrc || img.src;
    img.removeAttribute('data-vh-lz-src');
    img.classList.add('loaded');
  });
};
