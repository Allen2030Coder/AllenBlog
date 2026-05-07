import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,b as createAstro,m as maybeRenderHead}from'./chunk-Div6EpxG.js';import {$ as $$MainGridLayout,a as $$Icon,b as $$Index}from'./chunk-BqqG3N9l.js';import albumData from'./chunk-ls5Rh-Y_.js';import $$ImageGrid from'./chunk-xLGJtSEu.js';const $$Astro = createAstro("https://blog.fis.ink/");
async function getStaticPaths() {
  return albumData.map((album) => ({
    params: { slug: album.slug },
    props: { album }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { album } = Astro2.props;
  if (!album) {
    throw new Error("Album not found");
  }
  ({
    slug: `album-${album.slug}`,
    data: {
      title: album.title,
      customSlug: `album/${album.slug}`
    }
  });
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": album.title, "description": album.description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32 mb-8"> <div class="card-base z-10 px-9 py-6 relative w-full"> <!-- 返回按钮和标题 --> <div class="flex items-center gap-4 mb-6"> <a href="/album/" class="btn-card w-10 h-10 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:arrow-back", "class": "text-xl" })} </a> <div> <h1 class="text-3xl font-bold text-neutral-800 dark:text-neutral-200">${album.title}</h1> <p class="text-neutral-600 dark:text-neutral-400 mt-2 text-base">${album.description}</p> </div> </div> <!-- 相册信息 --> <div class="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-[var(--line-divider)]"> <!-- 图片数量 --> <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:photo-camera", "class": "text-lg" })} <span>${album.images.length} 张图片</span> </div> <!-- 创建时间 --> <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:calendar-today", "class": "text-lg" })} <span>${new Date(album.created).toLocaleDateString("zh-CN")}</span> </div> <!-- 标签 --> <div class="flex flex-wrap gap-2"> ${album.tags.map((tag) => renderTemplate`<span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm rounded-full hover:bg-[var(--btn-card-bg-hover)] transition-colors">
#${tag} </span>`)} </div> </div> <!-- 图片网格 --> ${renderComponent($$result2, "ImageGrid", $$ImageGrid, { "images": album.images })} </div> </div>  ${renderComponent($$result2, "Comment", $$Index, { "path": `/album/${Astro2.params.slug}/` })} ` })}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/album/[slug].astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/album/[slug].astro";
const $$url = "/album/[slug]/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$slug,file:$$file,getStaticPaths,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};