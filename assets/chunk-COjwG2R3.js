import {c as createComponent,m as maybeRenderHead,d as addAttribute,r as renderComponent,a as renderTemplate,b as createAstro}from'./chunk-Div6EpxG.js';import {l as layoutConfig,m as getPostUrl}from'./chunk-Dz7Rnveg.js';import $$PostCard from'./chunk-BQjZ4X8P.js';const $$Astro = createAstro("https://blog.fis.ink/");
const $$PostPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostPage;
  const { page } = Astro2.props;
  let delay = 0;
  const interval = 50;
  const gridClasses = `grid grid-cols-${layoutConfig.postList.grid.columns.sm} md2:grid-cols-${layoutConfig.postList.grid.columns.md2} md:grid-cols-${layoutConfig.postList.grid.columns.md} lg:grid-cols-${layoutConfig.postList.grid.columns.lg} ${layoutConfig.postList.grid.gap}` ;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["transition rounded-[var(--radius-large)] mb-4", "bg-transparent p-0" , gridClasses], "class:list")}> ${page.data.map((entry) => renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "entry": entry, "title": entry.data.title, "tags": entry.data.tags, "category": entry.data.category, "published": entry.data.published, "updated": entry.data.updated, "url": getPostUrl(entry), "image": entry.data.image, "description": entry.data.description, "draft": entry.data.draft, "sticky": entry.data.sticky, "class:list": "onload-animation", "style": `animation-delay: calc(var(--content-delay) + ${delay++ * interval}ms);` })}`)} </div>`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/components/PostPage.astro", void 0);export{$$PostPage as default};