import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,f as renderScript,a as renderTemplate,b as createAstro,m as maybeRenderHead,d as addAttribute}from'./chunk-Div6EpxG.js';import {$ as $$MainGridLayout,a as $$Icon}from'./chunk-BqqG3N9l.js';import entertainmentData from'./chunk-CMmUmA_F.js';/* empty css              */const $$Astro = createAstro("https://blog.fis.ink/");
const $$Chronobox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Chronobox;
  const groupedItems = entertainmentData.reduce(
    (acc, item) => {
      const type = item.type || "\u5176\u4ED6";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    },
    {}
  );
  Object.keys(groupedItems).forEach((type) => {
    groupedItems[type].sort((a, b) => b.id - a.id);
  });
  const statusCounts = entertainmentData.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {}
  );
  function getStarRating(rating) {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
  function getStatusColor(status) {
    switch (status) {
      case "\u5728\u770B":
        return "bg-blue-500 text-white";
      case "\u770B\u8FC7":
        return "bg-green-500 text-white";
      case "\u60F3\u770B":
        return "bg-yellow-500 text-white";
      case "\u6401\u7F6E":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  }
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": "\u65F6\u95F4\u76D2", "description": "\u8BB0\u5F55\u89C2\u770B\u7684\u756A\u5267\u3001\u7535\u5F71\u7B49\u5185\u5BB9", "data-astro-cid-tbo2rv7f": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32 mb-8" data-astro-cid-tbo2rv7f> <div class="card-base z-10 px-9 py-6 relative w-full" data-astro-cid-tbo2rv7f> <h1 class="text-4xl font-bold mb-6 text-neutral-900 dark:text-white" data-astro-cid-tbo2rv7f>时间盒</h1> <p class="text-neutral-600 dark:text-neutral-400 mb-6" data-astro-cid-tbo2rv7f>记录观看的番剧、电影等内容</p> <!-- 统计信息和筛选 --> <div class="flex flex-wrap gap-4 mb-8" data-astro-cid-tbo2rv7f> <button class="filter-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--line-divider)] hover:bg-[var(--btn-card-bg)] transition-colors cursor-pointer active" data-status="all" data-astro-cid-tbo2rv7f> <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300" data-astro-cid-tbo2rv7f>全部</span> <span class="text-lg font-bold text-neutral-900 dark:text-white" data-astro-cid-tbo2rv7f>${entertainmentData.length}</span> </button> ${Object.entries(statusCounts).map(([status, count]) => renderTemplate`<button class="filter-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--line-divider)] hover:bg-[var(--btn-card-bg)] transition-colors cursor-pointer"${addAttribute(status, "data-status")} data-astro-cid-tbo2rv7f> <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300" data-astro-cid-tbo2rv7f>${status}</span> <span class="text-lg font-bold text-neutral-900 dark:text-white" data-astro-cid-tbo2rv7f>${count}</span> </button>`)} </div> ${Object.entries(groupedItems).map(([type, typeItems]) => renderTemplate`<div class="mb-12"${addAttribute(type, "data-category")} data-astro-cid-tbo2rv7f> <h2 class="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2" data-astro-cid-tbo2rv7f> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:play-circle", "class": "w-6 h-6", "data-astro-cid-tbo2rv7f": true })} ${type} <span class="text-sm font-normal text-neutral-500 dark:text-neutral-400" data-astro-cid-tbo2rv7f>(${typeItems.length})</span> </h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-tbo2rv7f> ${typeItems.map((item) => renderTemplate`<div class="entertainment-card bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-sm border border-[var(--line-divider)] transition-all hover:shadow-lg duration-300 flex"${addAttribute(item.status, "data-status")} data-astro-cid-tbo2rv7f> <!-- 封面图片 --> <div class="relative w-32 h-48 flex-shrink-0 overflow-hidden bg-zinc-200 dark:bg-zinc-800" data-astro-cid-tbo2rv7f> ${item.url ? renderTemplate`<a${addAttribute(item.url, "href")} target="_blank" rel="noopener noreferrer" class="block w-full h-full relative group" data-astro-cid-tbo2rv7f> <img${addAttribute(item.cover, "src")}${addAttribute(item.title, "alt")} class="w-full h-full object-cover" loading="lazy" data-astro-cid-tbo2rv7f> <!-- 链接指示器 --> <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center" data-astro-cid-tbo2rv7f> <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2" data-astro-cid-tbo2rv7f> <svg class="w-5 h-5" style="color: var(--text-secondary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-tbo2rv7f> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-astro-cid-tbo2rv7f></path> </svg> </div> </div> </a>` : renderTemplate`<img${addAttribute(item.cover, "src")}${addAttribute(item.title, "alt")} class="w-full h-full object-cover" loading="lazy" data-astro-cid-tbo2rv7f>`} <!-- 状态标签 --> <div${addAttribute(`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`, "class")} data-astro-cid-tbo2rv7f> ${item.status} </div> <!-- 年份 --> <div class="absolute bottom-2 left-2 px-2 py-1 rounded bg-black bg-opacity-70 text-white text-xs" data-astro-cid-tbo2rv7f> ${item.year} </div> </div> <!-- 内容信息 --> <div class="p-4 flex-1 flex flex-col" data-astro-cid-tbo2rv7f> ${item.url ? renderTemplate`<a${addAttribute(item.url, "href")} target="_blank" rel="noopener noreferrer" class="block group" data-astro-cid-tbo2rv7f> <h3 class="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-1 group-hover:text-[var(--primary)] transition-colors" data-astro-cid-tbo2rv7f> ${item.title} </h3> </a>` : renderTemplate`<h3 class="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-1" data-astro-cid-tbo2rv7f> ${item.title} </h3>`} <!-- 评分 --> <div class="flex items-center gap-1 mb-2" data-astro-cid-tbo2rv7f> <span class="text-sm text-neutral-600 dark:text-neutral-400" data-astro-cid-tbo2rv7f>评分:</span> <div class="flex items-center gap-0.5" data-astro-cid-tbo2rv7f> ${getStarRating(item.rating).map((filled) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": filled ? "material-symbols:star" : "material-symbols:star-outline", "class": `w-4 h-4 ${filled ? "text-yellow-400" : ""}`, "style": filled ? {} : { color: "var(--text-tertiary)" }, "data-astro-cid-tbo2rv7f": true })}`)} </div> </div> <!-- 描述 --> <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3 flex-1" data-astro-cid-tbo2rv7f> ${item.description} </p> <!-- 标签 --> <div class="flex flex-wrap gap-1 mt-auto" data-astro-cid-tbo2rv7f> ${item.tags.map((tag) => renderTemplate`<span class="px-2 py-1 text-xs rounded-full bg-[var(--btn-card-bg)] text-neutral-600 dark:text-neutral-400 border border-[var(--line-divider)]" data-astro-cid-tbo2rv7f> ${tag} </span>`)} </div> </div> </div>`)} </div> </div>`)} </div> </div> ` })}  ${renderScript($$result, "/home/runner/work/AllenBlog/AllenBlog/src/pages/chronobox.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/chronobox.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/chronobox.astro";
const $$url = "/chronobox/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$Chronobox,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};