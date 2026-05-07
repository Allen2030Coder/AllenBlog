import {c as createComponent,m as maybeRenderHead,u as unescapeHTML,a as renderTemplate}from'./chunk-Div6EpxG.js';const html = () => "<section><h2 id=\"前情提要\">前情提要<a class=\"anchor\" href=\"#前情提要\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><p>近期我发现在某些场景中,仍需要使用Adobe Flash Player来完成一些操作(如希沃白板、单机游戏等)，但Flash Player已在2020年11月12日正式停止更新，国内的软件源鱼龙混杂，故产生了这篇文章。</p></section>\n<section><h2 id=\"准备\">准备<a class=\"anchor\" href=\"#准备\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><ul>\n<li>一台联网的Windows10/11电脑或MacOS10.15及以上版本的Mac</li>\n<li>一个聪明的脑子</li>\n</ul></section>\n<section><h2 id=\"安装\">安装<a class=\"anchor\" href=\"#安装\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><p>打开<a href=\"https://www.flash.cn/download\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">Adobe Flash Player下载页面</a>，根据自己的操作系统选择下载对应的安装包,这个界面无需安装Flash中心，不需要进行所谓的安全下载。</p><p>打开安装包后直接安装即可，安装完后即可重启电脑开始使用。</p></section>\n<section><h2 id=\"问题\">问题<a class=\"anchor\" href=\"#问题\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><ul>\n<li>安装完成后希沃白板提示版本过久？\n<ul>\n<li>原因：安装时间过于久远，Flash不自动更新，导致版本过久。</li>\n<li>解决方法：打开控制面板删除旧版本Flash Player，打开上文提到的链接，重新安装最新版即可</li>\n</ul>\n</li>\n<li>其他待添加，如遇到问题会对本篇文章有疑问欢迎在评论区指出留言。图片将在文章更新几日后补充！</li>\n</ul></section>";

				const frontmatter = {"title":"Flash使用指南","published":"2026-03-05T00:00:00.000Z","description":"Flash Player使用指南，解决在现代系统中使用Flash的问题","image":"https://image.allen2030.com/i/2026/03/04/69a847c3b6278.webp","tags":["教程"],"category":"Flash Player","draft":false,"lang":"","minutes":1,"words":296,"excerpt":"近期我发现在某些场景中,仍需要使用Adobe Flash Player来完成一些操作(如希沃白板、单机游戏等)，但Flash Player已在2020年11月12日正式停止更新，国内的软件源鱼龙混杂，故产生了这篇文章。"};
				const file = "/home/runner/work/AllenBlog/AllenBlog/src/content/posts/Flash使用指南.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});export{Content,Content as default,file,frontmatter,url};