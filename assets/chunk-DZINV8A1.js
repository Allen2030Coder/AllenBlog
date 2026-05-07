import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,m as maybeRenderHead,d as addAttribute}from'./chunk-Div6EpxG.js';import {$ as $$MainGridLayout,a as $$Icon,b as $$Index}from'./chunk-BqqG3N9l.js';import albumData from'./chunk-ls5Rh-Y_.js';import $$AlbumCard from'./chunk-Brt1YLbF.js';/* empty css              */const $$Album = createComponent(($$result, $$props, $$slots) => {
  const albums = albumData.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );
  const albumGridClasses = [
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3"
  ].join(" ");
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": "\u76F8\u518C", "description": "\u8BB0\u5F55\u751F\u6D3B\u4E2D\u7684\u7F8E\u597D\u77AC\u95F4", "data-astro-cid-f2wmygel": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32 mb-8" data-astro-cid-f2wmygel> <div class="card-base z-10 px-9 py-6 relative w-full" data-astro-cid-f2wmygel> <h1 class="text-4xl font-bold mb-6 text-neutral-900 dark:text-white" data-astro-cid-f2wmygel>相册</h1> <p class="text-neutral-600 dark:text-neutral-400 mb-8" data-astro-cid-f2wmygel>记录生活中的美好瞬间</p> ${albums.length > 0 ? renderTemplate`<div${addAttribute(`grid ${albumGridClasses} gap-6`, "class")} data-astro-cid-f2wmygel> ${albums.map((album) => renderTemplate`${renderComponent($$result2, "AlbumCard", $$AlbumCard, { "album": album, "data-astro-cid-f2wmygel": true })}`)} </div>` : renderTemplate`<div class="text-center py-16" data-astro-cid-f2wmygel> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:photo-library-outline", "class": "w-16 h-16 mx-auto mb-4 text-neutral-500 dark:text-neutral-400", "data-astro-cid-f2wmygel": true })} <p class="text-neutral-600 dark:text-neutral-400 text-lg" data-astro-cid-f2wmygel>暂无相册内容</p> </div>`} </div> </div>  ${renderComponent($$result2, "Comment", $$Index, { "path": "/album/", "data-astro-cid-f2wmygel": true })} ` })} `;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/album.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/album.astro";
const $$url = "/album/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$Album,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};