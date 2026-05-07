import {b as attr,e as ensure_array_like,a as escape_html}from'./chunk-DxGxG4u5.js';import {u as url,i as i18n,I as I18nKey}from'./chunk-Dz7Rnveg.js';import {I as Icon,h as html}from'./chunk-BHC_GRC-.js';import'./chunk-BBKQStYD.js';function Search($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let keywordMobile = "";
    let result = [];
    [
      {
        url: url("/"),
        meta: { title: "This Is a Fake Search Result" },
        excerpt: "Because the search cannot work in the <mark>dev</mark> environment."
      },
      {
        url: url("/"),
        meta: { title: "If You Want to Test the Search" },
        excerpt: "Try running <mark>npm build && npm preview</mark> instead."
      }
    ];
    $$renderer2.push(`<button aria-label="Search Panel" id="search-switch" class="btn-plain scale-animation rounded-lg w-11 h-11 mr-2 active:scale-90">`);
    Icon($$renderer2, { icon: "material-symbols:search", class: "text-[1.25rem]" });
    $$renderer2.push(`<!----></button> <div id="search-panel" class="float-panel float-panel-closed search-panel search-panel-glass fixed md:w-[30rem] w-[90vw] top-20 left-1/2 transform -translate-x-1/2 shadow-2xl rounded-2xl p-2 z-50 svelte-1wah7ro"><div id="search-bar-inside" class="flex relative transition-all items-center h-11 rounded-xl search-bar-glass svelte-1wah7ro">`);
    Icon($$renderer2, {
      icon: "material-symbols:search",
      class: "absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
    });
    $$renderer2.push(`<!----> <input${attr("placeholder", i18n(I18nKey.search))}${attr("value", keywordMobile)} class="pl-10 absolute inset-0 text-sm bg-transparent outline-0 text-black/50 dark:text-white/50 svelte-1wah7ro"/></div> <!--[-->`);
    const each_array = ensure_array_like(result);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", item.url)} class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"><div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">${escape_html(item.meta.title)}`);
      Icon($$renderer2, {
        icon: "fa6-solid:chevron-right",
        class: "transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]"
      });
      $$renderer2.push(`<!----></div> <div class="transition text-sm text-neutral-600 dark:text-neutral-400">${html(item.excerpt)}</div></a>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}export{Search as default};