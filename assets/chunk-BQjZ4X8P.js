import {c as createComponent,g as defineStyleVars,m as maybeRenderHead,d as addAttribute,r as renderComponent,a as renderTemplate,b as createAstro}from'./chunk-Div6EpxG.js';import path from'node:path';import {a as $$Icon,d as $$ImageWrapper}from'./chunk-BqqG3N9l.js';import {n as getDir,i as i18n,I as I18nKey}from'./chunk-Dz7Rnveg.js';import $$PostMeta from'./chunk-NT3N5OuD.js';const $$Astro = createAstro("https://blog.fis.ink/");
const $$PostCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const {
    entry,
    title,
    url,
    published,
    updated,
    tags,
    category,
    image,
    description,
    sticky,
    style
  } = Astro2.props;
  const className = Astro2.props.class;
  const hasCover = image !== void 0 && image !== null && image !== "";
  const isPasswordProtected = entry.data.password !== void 0 && entry.data.password !== "";
  const coverWidth = "28%";
  const { remarkPluginFrontmatter } = await entry.render();
  const $$definedVars = defineStyleVars([{ coverWidth }]);
  return renderTemplate`${renderTemplate`<!-- 网格布局样式 -->
    ${maybeRenderHead()}<div${addAttribute(["card-base flex flex-col w-full rounded-[var(--radius-large)] overflow-hidden relative h-full", className], "class:list")}${addAttribute(`${style}; ${$$definedVars}`, "style")} data-astro-cid-iyiqi2so><a${addAttribute(url, "href")}${addAttribute(title, "aria-label")} class="group block aspect-video overflow-hidden relative" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${sticky && renderTemplate`<div class="absolute top-0 left-0 z-30 bg-[var(--primary)] text-white text-xs font-bold px-2 py-1 rounded-br-md flex items-center gap-1" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:sticky-note-2", "class": "text-xs", "data-astro-cid-iyiqi2so": true })}
置顶
</div>`}${isPasswordProtected && renderTemplate`<div class="absolute top-0 right-0 z-30 bg-[var(--primary)] text-white text-xs font-bold px-2 py-1 rounded-bl-md flex items-center gap-1" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:lock", "class": "text-xs", "data-astro-cid-iyiqi2so": true })}
加密
</div>`}<div class="absolute pointer-events-none z-10 w-full h-full group-hover:bg-black/30 group-active:bg-black/50 transition" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}></div><div class="absolute pointer-events-none z-20 w-full h-full flex items-center justify-center " data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:chevron-right-rounded", "class": "transition opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 text-white text-5xl", "data-astro-cid-iyiqi2so": true })}</div>${hasCover ? renderTemplate`${renderComponent($$result, "ImageWrapper", $$ImageWrapper, { "src": image, "basePath": path.join("content/posts/", getDir(entry.id)), "alt": "Cover Image of the Post", "class": "w-full h-full object-cover", "data-astro-cid-iyiqi2so": true })}` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${isPasswordProtected ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:lock", "class": "text-6xl text-[var(--primary)]/60", "data-astro-cid-iyiqi2so": true })}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:article-outline", "class": "text-6xl text-[var(--primary)]/40", "data-astro-cid-iyiqi2so": true })}`}</div>`}</a><div class="p-6 flex flex-col flex-1" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}><a${addAttribute(url, "href")} class="transition group w-full block font-bold mb-3 text-xl text-90
            hover:text-[var(--primary)] dark:hover:text-[var(--primary)]
            active:text-[var(--title-active)] dark:active:text-[var(--title-active)]
            line-clamp-2
            " data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${title}</a><!-- metadata -->${renderComponent($$result, "PostMetadata", $$PostMeta, { "published": published, "updated": updated, "tags": tags, "category": category, "hideTagsForMobile": true, "hideUpdateDate": true, "url": url, "hideVisitorCount": true, "class": "mb-4", "data-astro-cid-iyiqi2so": true })}<!-- description --><div class="transition text-75 mb-3.5 line-clamp-3 flex-1" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${isPasswordProtected ? renderTemplate`<div class="flex items-center gap-2 text-[var(--primary)]" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:lock", "class": "text-sm", "data-astro-cid-iyiqi2so": true })}<span data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>该文章已加密，需要密码访问</span></div>` : description || remarkPluginFrontmatter.excerpt}</div><!-- word count and read time  -->${!isPasswordProtected && renderTemplate`<div class="text-sm text-black/30 dark:text-white/30 flex gap-4 transition" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}><div data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${remarkPluginFrontmatter.words}${" " + i18n(remarkPluginFrontmatter.words === 1 ? I18nKey.wordCount : I18nKey.wordsCount)}</div><div data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>|</div><div data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${remarkPluginFrontmatter.minutes}${" " + i18n(remarkPluginFrontmatter.minutes === 1 ? I18nKey.minuteCount : I18nKey.minutesCount)}</div></div>`}</div></div>` }`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/components/PostCard.astro", void 0);export{$$PostCard as default};