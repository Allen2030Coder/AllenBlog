import {c as createComponent,m as maybeRenderHead,u as unescapeHTML,a as renderTemplate}from'./chunk-Div6EpxG.js';const html = () => "<p>🎉 网站功能更新</p>\n<ul>\n<li>修复自定义右键判断有误问题</li>\n<li>修复文章解密后不显示分类的显示问题</li>\n<li>修复说说页面在生产环境中的显示问题</li>\n<li>新文章发布！</li>\n</ul>";

				const frontmatter = {"title":"v0.7.3网站更新公告","date":"2026-03-05","minutes":1,"words":59,"excerpt":"🎉 网站功能更新"};
				const file = "/home/runner/work/AllenBlog/AllenBlog/src/content/notice/update.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});export{Content,Content as default,file,frontmatter,url};