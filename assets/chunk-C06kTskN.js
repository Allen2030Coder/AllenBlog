import rss from'@astrojs/rss';import {b as getSortedPosts,s as siteConfig}from'./chunk-Dz7Rnveg.js';import MarkdownIt from'markdown-it';import sanitizeHtml from'sanitize-html';const parser = new MarkdownIt();
function stripInvalidXmlChars(str) {
  return str.replace(
    // biome-ignore lint/suspicious/noControlCharactersInRegex: https://www.w3.org/TR/xml/#charsets
    /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
    ""
  );
}
async function GET(context) {
  const blog = await getSortedPosts();
  return rss({
    title: siteConfig.title,
    description: " 非淡泊无以明志，非宁静无以致远",
    site: context.site ?? "https://blog.fis.ink",
    items: blog.map((post) => {
      const content = typeof post.body === "string" ? post.body : String(post.body || "");
      const cleanedContent = stripInvalidXmlChars(content);
      const finalSlug = post.data.customSlug || post.slug;
      return {
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description || "",
        link: `/posts/${finalSlug}/`,
        content: sanitizeHtml(parser.render(cleanedContent), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"])
        })
      };
    }),
    customData: `<language>${siteConfig.lang}</language>`,
    stylesheet: "/rss-style.xsl"
  });
}const _page=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,GET},Symbol.toStringTag,{value:'Module'}));export{_page as _};