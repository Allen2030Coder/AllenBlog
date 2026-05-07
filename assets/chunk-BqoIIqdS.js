import {c as createComponent,g as defineStyleVars,m as maybeRenderHead,d as addAttribute,r as renderComponent,a as renderTemplate,b as createAstro}from'./chunk-Div6EpxG.js';import {a as $$Icon}from'./chunk-BqqG3N9l.js';import {u as url,d as cardConfig}from'./chunk-Dz7Rnveg.js';const $$Astro = createAstro("https://blog.fis.ink/");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page, style } = Astro2.props;
  const HIDDEN = -1;
  const className = Astro2.props.class;
  const ADJ_DIST = 2;
  const VISIBLE = ADJ_DIST * 2 + 1;
  let count = 1;
  let l = page.currentPage;
  let r = page.currentPage;
  while (0 < l - 1 && r + 1 <= page.lastPage && count + 2 <= VISIBLE) {
    count += 2;
    l--;
    r++;
  }
  while (0 < l - 1 && count < VISIBLE) {
    count++;
    l--;
  }
  while (r + 1 <= page.lastPage && count < VISIBLE) {
    count++;
    r++;
  }
  let pages = [];
  if (l > 1) pages.push(1);
  if (l === 3) pages.push(2);
  if (l > 3) pages.push(HIDDEN);
  for (let i = l; i <= r; i++) pages.push(i);
  if (r < page.lastPage - 2) pages.push(HIDDEN);
  if (r === page.lastPage - 2) pages.push(page.lastPage - 1);
  if (r < page.lastPage) pages.push(page.lastPage);
  const getPageUrl = (p) => {
    if (p === 1) return "/";
    return `/${p}/`;
  };
  const $$definedVars = defineStyleVars([{ "card-opacity": cardConfig.opacity }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([className, "flex flex-row gap-3 justify-center"], "class:list")}${addAttribute(`${style}; ${$$definedVars}`, "style")} data-astro-cid-owdbjv4j> <a${addAttribute(page.url.prev || "", "href")}${addAttribute(page.url.prev ? "Previous Page" : null, "aria-label")}${addAttribute([
    "btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11",
    { "disabled": page.url.prev == void 0 }
  ], "class:list")} data-astro-cid-owdbjv4j${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:chevron-left-rounded", "class": "text-[1.75rem]", "data-astro-cid-owdbjv4j": true })} </a> <div class="flex flex-row rounded-lg items-center text-neutral-700 dark:text-neutral-300 font-bold"${addAttribute(`${`background-color: color-mix(in srgb, var(--card-bg) calc(var(--card-opacity) * 100%), transparent)`}; ${$$definedVars}`, "style")} data-astro-cid-owdbjv4j> ${pages.map((p) => {
    if (p == HIDDEN)
      return renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:more-horiz", "class": "mx-1", "data-astro-cid-owdbjv4j": true })}`;
    if (p == page.currentPage)
      return renderTemplate`<div class="h-11 w-11 rounded-lg bg-[var(--primary)] flex items-center justify-center
                    font-bold text-white dark:text-black/70" data-astro-cid-owdbjv4j${addAttribute($$definedVars, "style")}> ${p} </div>`;
    return renderTemplate`<a${addAttribute(url(getPageUrl(p)), "href")}${addAttribute(`Page ${p}`, "aria-label")} class="btn-card w-11 h-11 rounded-lg overflow-hidden active:scale-[0.85]" data-astro-cid-owdbjv4j${addAttribute($$definedVars, "style")}>${p}</a>`;
  })} </div> <a${addAttribute(page.url.next || "", "href")}${addAttribute(page.url.next ? "Next Page" : null, "aria-label")}${addAttribute([
    "btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11",
    { "disabled": page.url.next == void 0 }
  ], "class:list")} data-astro-cid-owdbjv4j${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:chevron-right-rounded", "class": "text-[1.75rem]", "data-astro-cid-owdbjv4j": true })} </a> </div> `;
}, "/home/runner/work/AllenBlog/AllenBlog/src/components/control/Pagination.astro", void 0);export{$$Pagination as default};