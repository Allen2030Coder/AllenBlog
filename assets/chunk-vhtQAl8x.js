import {c as createComponent,m as maybeRenderHead,u as unescapeHTML,a as renderTemplate}from'./chunk-Div6EpxG.js';const html = () => "<div id=\"friend-circle-lite-root\"></div>\n<script>\n    if (typeof UserConfig === 'undefined') {\n        var UserConfig = {\n            // 填写你的fc Lite地址\n            private_api_url: 'https://fc.allen2030.com/',\n            // 点击加载更多时，一次最多加载几篇文章，默认20\n            page_turning_number: 24,\n            // 头像加载失败时，默认头像地址\n            error_img: 'https://cdn.fis.ink/img/2025/07/22/687f17323321a.png',\n        }\n    }\n</script>\n<link rel=\"stylesheet\" href=\"https://file.fis.ink/css/blog/friend-circle-lite/min.css\">\n<script src=\"https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js\"></script>\n<section><h3 id=\"如何加入\">如何加入<a class=\"anchor\" href=\"#如何加入\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h3><p>如果你想让你的站点出现在朋友圈中，请确保：</p><ul>\n<li>你的站点已经在<a href=\"/friends\">友链页面</a>中</li>\n<li>你的站点提供了有效的RSS订阅源</li>\n<li>你的站点能够正常访问</li>\n</ul></section>";

				const frontmatter = {"minutes":1,"words":130,"excerpt":"如果你想让你的站点出现在朋友圈中，请确保："};
				const file = "/home/runner/work/AllenBlog/AllenBlog/src/content/spec/circle.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});export{Content,Content as default,file,frontmatter,url};