import {c as createComponent,a as renderTemplate,h as defineScriptVars,u as unescapeHTML,r as renderComponent,d as addAttribute,m as maybeRenderHead}from'./chunk-Div6EpxG.js';import {a as $$Icon}from'./chunk-BqqG3N9l.js';import'./chunk-BBKQStYD.js';var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$UpdateNotice = createComponent(($$result, $$props, $$slots) => {
  const noticeTitle = "\u7F51\u7AD9\u66F4\u65B0\u516C\u544A";
  const noticeDate = "2026-02-28";
  const noticeBody = "\u{1F389} \u7F51\u7AD9\u529F\u80FD\u66F4\u65B0\n\n- \u65B0\u589E\u81EA\u5B9A\u4E49\u53F3\u952E\u83DC\u5355\u529F\u80FD\n- \u4F18\u5316\u6587\u7AE0\u52A0\u5BC6 UI \u8BBE\u8BA1\n- \u6DFB\u52A0\u5206\u7C7B\u548C\u6807\u7B7E\u9875\u9762\n- \u6539\u8FDB\u8BF4\u8BF4\u754C\u9762\u7011\u5E03\u6D41\u5E03\u5C40";
  const noticeId = `notice-${noticeDate}-${noticeTitle}`;
  function markdownToHtml(md) {
    const lines = md.split("\n");
    let result = [];
    let inList = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          result.push('<ul class="list-disc pl-4 space-y-1 my-2">');
          inList = true;
        }
        result.push(`<li class="text-sm">${trimmed.substring(2)}</li>`);
      } else if (trimmed === "") {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<p class="text-sm mb-1">${trimmed}</p>`);
      }
    }
    if (inList) {
      result.push("</ul>");
    }
    return result.join("");
  }
  const noticeHtml = markdownToHtml(noticeBody);
  return renderTemplate(_a || (_a = __template(["", '<div id="update-notice" class="fixed top-4 right-4 z-[10001] transform translate-x-full opacity-0 transition-all duration-500 ease-out max-w-[400px] w-[90vw]"', ' data-astro-cid-exqivjh3> <div class="bg-[var(--card-bg)] border border-[var(--line-divider)] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm" data-astro-cid-exqivjh3> <div class="flex items-center justify-between px-5 py-4 border-b border-[var(--line-divider)] bg-gradient-to-r from-[var(--primary)]/5 to-transparent" data-astro-cid-exqivjh3> <div class="flex items-center gap-3" data-astro-cid-exqivjh3> <div class="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center" data-astro-cid-exqivjh3> ', ' </div> <div data-astro-cid-exqivjh3> <h3 class="text-base font-semibold text-90" data-astro-cid-exqivjh3>', '</h3> <p class="text-xs text-50" data-astro-cid-exqivjh3>', '</p> </div> </div> <button onclick="closeUpdateNotice()" class="p-2 rounded-lg hover:bg-[var(--btn-card-bg-hover)] transition-colors text-50 hover:text-75" data-astro-cid-exqivjh3> ', ' </button> </div> <div class="px-5 py-4" data-astro-cid-exqivjh3> <div class="text-75" data-astro-cid-exqivjh3>', '</div> </div> <div class="h-1 bg-[var(--btn-card-bg-hover)]" data-astro-cid-exqivjh3> <div id="notice-progress" class="h-full bg-[var(--primary)] transition-all duration-[10000ms] ease-linear w-full" data-astro-cid-exqivjh3></div> </div> </div> </div> <script>(function(){', "\n  (function() {\n    const notice = document.getElementById('update-notice');\n    const progress = document.getElementById('notice-progress');\n    const STORAGE_KEY = 'last-shown-notice-id';\n    \n    function shouldShowNotice() {\n      const currentId = notice?.dataset.noticeId;\n      if (!currentId) return false;\n      const lastShownId = localStorage.getItem(STORAGE_KEY);\n      return lastShownId !== currentId;\n    }\n    \n    function showNotice() {\n      if (!notice) return;\n      \n      const currentId = notice.dataset.noticeId;\n      if (currentId) {\n        localStorage.setItem(STORAGE_KEY, currentId);\n      }\n      \n      notice.classList.remove('translate-x-full', 'opacity-0');\n      notice.classList.add('translate-x-0', 'opacity-100');\n      \n      if (progress) {\n        setTimeout(() => {\n          progress.style.width = '0%';\n        }, 50);\n      }\n      \n      setTimeout(() => {\n        closeUpdateNotice();\n      }, 10000);\n    }\n    \n    window.closeUpdateNotice = function() {\n      if (!notice) return;\n      notice.classList.add('translate-x-full', 'opacity-0');\n      notice.classList.remove('translate-x-0', 'opacity-100');\n    };\n    \n    window.showUpdateNotice = function() {\n      localStorage.removeItem(STORAGE_KEY);\n      showNotice();\n    };\n    \n    function init() {\n      if (shouldShowNotice()) {\n        setTimeout(showNotice, 1000);\n      }\n    }\n    \n    if (document.readyState === 'loading') {\n      document.addEventListener('DOMContentLoaded', init);\n    } else {\n      init();\n    }\n  })();\n})();<\/script> "])), maybeRenderHead(), addAttribute(noticeId, "data-notice-id"), renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:campaign-rounded", "class": "w-5 h-5 text-[var(--primary)]", "data-astro-cid-exqivjh3": true }), noticeTitle, noticeDate, renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:close-rounded", "class": "w-5 h-5", "data-astro-cid-exqivjh3": true }), unescapeHTML(noticeHtml), defineScriptVars({ noticeId }));
}, "/home/runner/work/AllenBlog/AllenBlog/src/components/UpdateNotice.astro", void 0);export{$$UpdateNotice as default};