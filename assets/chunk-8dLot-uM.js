import'./chunk-BBKQStYD.js';import {c as createComponent,r as renderComponent,a as renderTemplate,m as maybeRenderHead,d as addAttribute}from'./chunk-Div6EpxG.js';import {$ as $$MainGridLayout,a as $$Icon}from'./chunk-BqqG3N9l.js';import {k as getTagList,b as getSortedPosts}from'./chunk-Dz7Rnveg.js';/* empty css              */const $$Tags = createComponent(async ($$result, $$props, $$slots) => {
  const tags = await getTagList();
  const posts = await getSortedPosts();
  const tagsWithPosts = tags.map((tag) => {
    const tagPosts = posts.filter((post) => {
      return post.data.tags && post.data.tags.includes(tag.name);
    });
    return {
      ...tag,
      posts: tagPosts
    };
  });
  const sortedTags = tagsWithPosts.sort((a, b) => b.posts.length - a.posts.length);
  const maxCount = Math.max(...sortedTags.map((t) => t.posts.length), 1);
  const minCount = Math.min(...sortedTags.map((t) => t.posts.length), 1);
  function getTagSize(count) {
    if (maxCount === minCount) return 1;
    const normalized = (count - minCount) / (maxCount - minCount);
    return 0.85 + normalized * 0.3;
  }
  function getTagOpacity(count) {
    if (maxCount === minCount) return 1;
    const normalized = (count - minCount) / (maxCount - minCount);
    return 0.6 + normalized * 0.4;
  }
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": "\u6587\u7AE0\u6807\u7B7E", "description": "\u6309\u6807\u7B7E\u6D4F\u89C8\u6587\u7AE0", "data-astro-cid-ocnyvbpf": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32" data-astro-cid-ocnyvbpf> <div class="card-base z-10 px-6 md:px-9 py-6 relative w-full" data-astro-cid-ocnyvbpf> <h1 class="text-4xl font-bold mb-2 text-neutral-900 dark:text-white" data-astro-cid-ocnyvbpf>文章标签</h1> <p class="text-neutral-500 dark:text-neutral-400 mb-8" data-astro-cid-ocnyvbpf>共 ${sortedTags.length} 个标签，${posts.length} 篇文章</p> <!-- 标签云 --> <div class="flex flex-wrap gap-3 mb-10" data-astro-cid-ocnyvbpf> ${sortedTags.map((tag, index) => {
    const size = getTagSize(tag.posts.length);
    const opacity = getTagOpacity(tag.posts.length);
    return renderTemplate`<a${addAttribute(`/archive/?tag=${encodeURIComponent(tag.name)}`, "href")} class="group relative inline-flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-full border border-[var(--line-divider)] transition-all duration-300 hover:shadow-md hover:border-[var(--primary)]/30 hover:-translate-y-0.5"${addAttribute(`
                                animation: fadeInUp 0.5s ease-out ${index * 0.05}s both;
                                font-size: ${size}rem;
                                opacity: ${opacity};
                            `, "style")} data-astro-cid-ocnyvbpf> <!-- 背景渐变 --> <div class="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" data-astro-cid-ocnyvbpf></div> <span class="relative z-10 text-90 group-hover:text-[var(--primary)] transition-colors" data-astro-cid-ocnyvbpf>
#${tag.name} </span> <span class="relative z-10 text-xs text-50 bg-[var(--btn-card-bg-hover)] px-1.5 py-0.5 rounded-full" data-astro-cid-ocnyvbpf> ${tag.posts.length} </span> </a>`;
  })} </div> <!-- 标签详细列表 --> <div class="border-t border-[var(--line-divider)] pt-8" data-astro-cid-ocnyvbpf> <h2 class="text-xl font-semibold text-90 mb-6" data-astro-cid-ocnyvbpf>标签详情</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-ocnyvbpf> ${sortedTags.map((tag, index) => renderTemplate`<div class="group bg-[var(--card-bg)] rounded-xl p-4 border border-[var(--line-divider)] transition-all duration-300 hover:shadow-md hover:border-[var(--primary)]/20"${addAttribute(`animation: fadeInUp 0.5s ease-out ${index * 0.08 + 0.3}s both;`, "style")} data-astro-cid-ocnyvbpf> <div class="flex items-start justify-between mb-3" data-astro-cid-ocnyvbpf> <a${addAttribute(`/archive/?tag=${encodeURIComponent(tag.name)}`, "href")} class="flex items-center gap-2 text-[var(--primary)] hover:underline" data-astro-cid-ocnyvbpf> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:tag-rounded", "class": "w-4 h-4", "data-astro-cid-ocnyvbpf": true })} <span class="font-medium" data-astro-cid-ocnyvbpf>${tag.name}</span> </a> <span class="text-xs text-50 bg-[var(--btn-card-bg-hover)] px-2 py-1 rounded-full" data-astro-cid-ocnyvbpf> ${tag.posts.length} 篇
</span> </div> <!-- 文章列表 --> <div class="space-y-2" data-astro-cid-ocnyvbpf> ${tag.posts.slice(0, 3).map((post) => renderTemplate`<a${addAttribute(`/posts/${post.data.customSlug || post.slug}/`, "href")} class="block text-sm text-75 hover:text-[var(--primary)] transition-colors truncate" data-astro-cid-ocnyvbpf> ${post.data.title} </a>`)} ${tag.posts.length > 3 && renderTemplate`<a${addAttribute(`/archive/?tag=${encodeURIComponent(tag.name)}`, "href")} class="block text-xs text-30 hover:text-50 transition-colors" data-astro-cid-ocnyvbpf>
还有 ${tag.posts.length - 3} 篇文章...
</a>`} </div> </div>`)} </div> </div> <!-- 空状态 --> ${sortedTags.length === 0 && renderTemplate`<div class="text-center py-16" data-astro-cid-ocnyvbpf> <div class="w-16 h-16 rounded-full bg-[var(--btn-card-bg-hover)] flex items-center justify-center mx-auto mb-4" data-astro-cid-ocnyvbpf> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:label-off-outline-rounded", "class": "w-8 h-8 text-50", "data-astro-cid-ocnyvbpf": true })} </div> <p class="text-50 text-lg" data-astro-cid-ocnyvbpf>暂无标签</p> </div>`} <!-- 底部间距 --> <div class="h-8" data-astro-cid-ocnyvbpf></div> </div> </div> ` })} `;
}, "/home/runner/work/AllenBlog/AllenBlog/src/pages/tags.astro", void 0);

const $$file = "/home/runner/work/AllenBlog/AllenBlog/src/pages/tags.astro";
const $$url = "/tags/";const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:$$Tags,file:$$file,url:$$url},Symbol.toStringTag,{value:'Module'}));export{_page as _};