import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,m as maybeRenderHead}from'./chunk-Div6EpxG.js';import {a as getEntry,r as renderEntry,i as i18n,I as I18nKey}from'./chunk-Dz7Rnveg.js';import {$ as $$MainGridLayout,b as $$Index}from'./chunk-BqqG3N9l.js';import $$Markdown from'./chunk-KQVJ-xAv.js';const $$Circle = createComponent(async ($$result, $$props, $$slots) => {
  const circlePost = await getEntry("spec", "circle");
  if (!circlePost) {
    throw new Error("Circle page content not found");
  }
  const { Content } = await renderEntry(circlePost);
  ({
    data: {
      title: i18n(I18nKey.friendsCircle)
    }
  });
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.circle), "description": i18n(I18nKey.circle) }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32"> <div class="card-base z-10 px-9 py-6 relative w-full"> ${renderComponent($$result2, "Markdown", $$Markdown, { "class": "mt-2" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })} </div> </div> ${renderComponent($$result2, "Comment", $$Index, { "path": "/circle/" })} ` })}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/circle.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/circle.astro";
const $$url = "/circle/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$Circle,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};