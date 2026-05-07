import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,b as createAstro}from'./chunk-Div6EpxG.js';import $$Pagination from'./chunk-BqoIIqdS.js';import $$PostPage from'./chunk-COjwG2R3.js';import {b as getSortedPosts,P as PAGE_SIZE}from'./chunk-Dz7Rnveg.js';import {$ as $$MainGridLayout}from'./chunk-BqqG3N9l.js';const $$Astro = createAstro("https://blog.fis.ink/");
const getStaticPaths = (async ({ paginate }) => {
  const allBlogPosts = await getSortedPosts();
  return paginate(allBlogPosts, { pageSize: PAGE_SIZE });
});
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const len = page.data.length;
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PostPage", $$PostPage, { "page": page })} ${renderComponent($$result2, "Pagination", $$Pagination, { "class": "mx-auto onload-animation", "page": page, "style": `animation-delay: calc(var(--content-delay) + ${len * 50}ms)` })} ` })}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/[...page].astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/[...page].astro";
const $$url = "/[...page]/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$,file:$$file,getStaticPaths,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};