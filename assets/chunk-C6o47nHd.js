import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,m as maybeRenderHead}from'./chunk-Div6EpxG.js';import {a as getEntry,r as renderEntry,i as i18n,I as I18nKey}from'./chunk-Dz7Rnveg.js';import {$ as $$MainGridLayout,b as $$Index}from'./chunk-BqqG3N9l.js';import $$Markdown from'./chunk-KQVJ-xAv.js';const $$Comments = createComponent(async ($$result, $$props, $$slots) => {
  const commentsPost = await getEntry("spec", "comments");
  if (!commentsPost) {
    throw new Error("Comments page content not found");
  }
  const { Content } = await renderEntry(commentsPost);
  ({
    data: {
      title: i18n(I18nKey.comments)}
  });
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": "\u7559\u8A00\u677F", "description": "\u7559\u8A00\u677F" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32"> <div class="card-base z-10 px-9 py-6 relative w-full "> ${renderComponent($$result2, "Markdown", $$Markdown, { "class": "mt-2" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })} </div> </div> ${renderComponent($$result2, "Comment", $$Index, { "path": "/comments/" })} ` })}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/comments.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/comments.astro";
const $$url = "/comments/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$Comments,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};