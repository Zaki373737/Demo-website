(function(){
  // Lightweight SPA navigation: fetches target page and replaces <main> content
  const contentSelector = 'main';

  function isInternalHref(href){
    try{ const url = new URL(href, location.href); return url.origin === location.origin; }catch(e){return false}
  }

  async function fetchAndSwap(href, addHistory=true){
    try{
      const res = await fetch(href, {cache:'no-store'});
      if(!res.ok){ location.href = href; return; }
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newMain = doc.querySelector(contentSelector);
      const curMain = document.querySelector(contentSelector);
      if(newMain && curMain){
        curMain.innerHTML = newMain.innerHTML;
        // update title
        if(doc.title) document.title = doc.title;
        // run optional per-page initializer
        if(typeof window.onFragmentLoad === 'function'){
          try{ window.onFragmentLoad(); }catch(err){console.error('onFragmentLoad error', err)}
        }
        if(addHistory) history.pushState({url:href}, '', href);
        return;
      }
      // fallback if no <main>
      location.href = href;
    }catch(err){
      console.error('Navigation fetch failed', err);
      location.href = href;
    }
  }

  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;
    if(href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
    if(!isInternalHref(href)) return;
    // allow ctrl/cmd clicks, new tab
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    fetchAndSwap(href);
  });

  window.addEventListener('popstate', (e)=>{
    const url = (e.state && e.state.url) || location.href;
    fetchAndSwap(url, false);
  });

  // Expose noop hook for pages that need to re-init JS after fragment load
  window.onFragmentLoad = window.onFragmentLoad || function(){};
})();
