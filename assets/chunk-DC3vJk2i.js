import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate}from'./chunk-Div6EpxG.js';import {b as getSortedPosts,i as i18n,I as I18nKey}from'./chunk-Dz7Rnveg.js';import {$ as $$MainGridLayout}from'./chunk-BqqG3N9l.js';const $$Archive = createComponent(async ($$result, $$props, $$slots) => {
  const sortedPosts = await getSortedPosts();
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.archive) }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ArchivePanel", null, { "sortedPosts": sortedPosts, "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "@components/ArchivePanel.svelte", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/archive.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/archive.astro";
const $$url = "/archive/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$Archive,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};