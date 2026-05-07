import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,m as maybeRenderHead,d as addAttribute}from'./chunk-Div6EpxG.js';import {a as getEntry,r as renderEntry,i as i18n,I as I18nKey,l as layoutConfig}from'./chunk-Dz7Rnveg.js';import $$Markdown from'./chunk-KQVJ-xAv.js';import items from'./chunk-C8u-LNTq.js';import {$ as $$MainGridLayout}from'./chunk-BqqG3N9l.js';const $$Friends = createComponent(async ($$result, $$props, $$slots) => {
  const friendsPost = await getEntry("spec", "friends");
  if (!friendsPost) {
    throw new Error("Friends page content not found");
  }
  const { Content } = await renderEntry(friendsPost);
  const friendsGridClasses = [
    `grid-cols-${layoutConfig.friends.grid.columns.sm}`,
    `md:grid-cols-${layoutConfig.friends.grid.columns.md}`,
    `lg:grid-cols-${layoutConfig.friends.grid.columns.lg}`
  ].join(" ");
  const groupedItems = items.reduce(
    (acc, item) => {
      const category = item.category || "\u5176\u4ED6";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {}
  );
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.friends), "description": i18n(I18nKey.friends) }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32"> <div class="card-base z-10 px-9 py-6 relative w-full "> <h1 class="text-4xl font-bold mb-6 text-neutral-900 dark:text-white">${i18n(I18nKey.friends)}</h1> ${Object.entries(groupedItems).map(([category, categoryItems]) => renderTemplate`<div class="mb-8"> <h2 class="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">${category}</h2> <div${addAttribute(`grid ${friendsGridClasses} ${layoutConfig.friends.grid.gap}`, "class")}> ${categoryItems.map((item) => renderTemplate`<div class="flex flex-nowrap items-stretch h-28 gap-4 rounded-[var(--radius-large)]"> <div class="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-900"> <img${addAttribute(item.imgurl, "src")} alt="站点头像" class="w-full h-full object-cover"> </div> <div class="grow w-full"> <div class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 mb-1">${item.title}</div> <div class="text-neutral-600 dark:text-neutral-400 text-sm font-medium">${item.desc}</div> <div${addAttribute(["items-center", { "flex": true, "hidden md:flex": false }], "class:list")}> <div class="flex flex-row flex-nowrap items-center"> ${item.tags && item.tags.length > 0 && item.tags.map((tag, i) => renderTemplate`<div${addAttribute([{ "hidden": i == 0 }, "mx-1.5 text-[var(--meta-divider)] text-sm"], "class:list")}>
/
</div>
                                            <span class="transition text-neutral-600 dark:text-neutral-400 text-sm font-medium"> ${tag} </span>`)} ${!(item.tags && item.tags.length > 0) && renderTemplate`<div class="transition text-neutral-600 dark:text-neutral-400 text-sm font-medium">${i18n(I18nKey.noTags)}</div>`} </div> </div> </div> <a${addAttribute(item.siteurl, "href")}${addAttribute(item.openInNewTab ? "_blank" : "_self", "target")}${addAttribute(item.openInNewTab ? "noopener noreferrer" : void 0, "rel")} class="flex btn-regular w-[3.25rem] rounded-lg bg-[var(--enter-btn-bg)] hover:bg-[var(--enter-btn-bg-hover)] active:bg-[var(--enter-btn-bg-active)] active:scale-95"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="transition text-[var(--primary)] text-4xl mx-auto iconify iconify--material-symbols" width="1em" height="1em" viewBox="0 0 24 24"> <path fill="currentColor" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"></path> </svg> </a> </div>`)} </div> </div>`)} ${renderComponent($$result2, "Markdown", $$Markdown, { "class": "mt-2" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })} </div> </div> ` })}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/friends.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/friends.astro";
const $$url = "/friends/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$Friends,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};