import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,m as maybeRenderHead}from'./chunk-Div6EpxG.js';import {a as getEntry,r as renderEntry,i as i18n,I as I18nKey}from'./chunk-Dz7Rnveg.js';import $$Markdown from'./chunk-KQVJ-xAv.js';import $$Countdown from'./chunk-GsGKu4Bf.js';import {$ as $$MainGridLayout}from'./chunk-BqqG3N9l.js';const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const aboutPost = await getEntry("spec", "about");
  if (!aboutPost) {
    throw new Error("About page content not found");
  }
  const { Content } = await renderEntry(aboutPost);
  const startDate = "2026-1-1";
  const targetDate = "2036-1-1";
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.about), "description": i18n(I18nKey.about) }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32"> <div class="card-base z-10 px-9 py-6 relative w-full "> ${renderComponent($$result2, "Markdown", $$Markdown, { "class": "mt-2" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })} <div class="countdown-section mt-12 pt-8 border-t border-[var(--border)]"> ${renderComponent($$result2, "Countdown", $$Countdown, { "startDate": startDate, "targetDate": targetDate, "title": "\u5171\u8D74\u5341\u5E74\u4E4B\u7EA6" })} <p class="text-center mt-4 italic text-[var(--text-2)] text-lg md:text-xl dark:text-white/95 dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
Allen2030 blog
</p> </div> </div> </div> ` })}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/about.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/about.astro";
const $$url = "/about/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$About,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};