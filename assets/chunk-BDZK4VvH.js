import {c as createComponent,m as maybeRenderHead,u as unescapeHTML,a as renderTemplate}from'./chunk-Div6EpxG.js';const html = () => "<section><h1 id=\"留言板\">留言板<a class=\"anchor\" href=\"#留言板\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h1></section>";

				const frontmatter = {"minutes":1,"words":3,"excerpt":""};
				const file = "/home/runner/work/AllenBlog/AllenBlog/src/content/spec/comments.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});export{Content,Content as default,file,frontmatter,url};