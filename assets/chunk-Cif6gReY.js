import {c as createComponent,m as maybeRenderHead,d as addAttribute,a as renderTemplate,f as renderScript,b as createAstro}from'./chunk-Div6EpxG.js';const $$Astro = createAstro("https://blog.fis.ink/");
const $$AISummary = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AISummary;
  const { content, class: className } = Astro2.props;
  if (!content || content.trim() === "") {
    return null;
  }
  return renderTemplate`${content && renderTemplate`${maybeRenderHead()}<div${addAttribute(["ai-summary", className], "class:list")}><div class="ai-title"><div class="ai-title-left"><i>🤖</i><span class="ai-title-text">AI 摘要</span></div><div class="ai-tag">Allen AI</div></div><div class="ai-explanation"${addAttribute(content, "data-content")}></div></div>`}${renderScript($$result, "/home/runner/work/AllenBlog/AllenBlog/src/components/misc/AISummary.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/AllenBlog/AllenBlog/src/components/misc/AISummary.astro", void 0);export{$$AISummary as default};