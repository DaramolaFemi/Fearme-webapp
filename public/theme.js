(() => {
  let saved;
  try { saved = localStorage.getItem('femi-theme'); } catch { /* Storage may be disabled. */ }
  const theme = saved === 'light' || saved === 'dark' ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#201c27' : '#f3f0e8');
})();
