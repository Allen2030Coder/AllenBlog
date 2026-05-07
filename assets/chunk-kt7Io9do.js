import {c as createComponent,m as maybeRenderHead,u as unescapeHTML,a as renderTemplate,l as spreadAttributes}from'./chunk-Div6EpxG.js';import {g as getImage}from'./chunk-CrPWmWAc.js';const images = async function(html) {
					const imageSources = {};
					
					{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "https://cdn\\.fis\\.ink/cdn/2025/08/24/68aaa04bd2296\\.webp" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "https://cdn.fis.ink/cdn/2025/08/24/68aaa04bd2296.webp" + '_' + occurrenceCounter;
													const props = JSON.parse(match[1].replace(/&#x22;/g, '"').replace(/&#x27;/g, "'"));
													imageSources[matchKey] = await getImage(props);
													occurrenceCounter++;
											}
									}
					return imageSources;
			};

		async function updateImageReferences(html) {
			const imageSources = await images(html);

			return html.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm, (full, imagePath) => {
				const decodedImagePath = JSON.parse(imagePath.replace(/&#x22;/g, '"'));

				// Use the 'index' property for each image occurrence
				const srcKey = decodedImagePath.src + '_' + decodedImagePath.index;

				if (imageSources[srcKey].srcSet && imageSources[srcKey].srcSet.values.length > 0) {
					imageSources[srcKey].attributes.srcset = imageSources[srcKey].srcSet.attribute;
				}

				const { index, ...attributesWithoutIndex } = imageSources[srcKey].attributes;

				return spreadAttributes({
					src: imageSources[srcKey].src,
					...attributesWithoutIndex,
				});
			});
		}

		const html = async () => await updateImageReferences("<section><h1 id=\"事件经过\">事件经过<a class=\"anchor\" href=\"#事件经过\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h1><p>我在2025.8.17日下午使用trae的SOLO模式并使用SOLO Builder智能体开发vue3的<a href=\"https://github.com/fishcpy/homepage\" target=\"_blank\">个人主页</a>，模型使用的是Claude 4。<br>\n起初在预览环境没有问题，但是我将整个项目上传到github并部署到vercel时右下角却出现SOLO模式的广告组件。<br>\n<img __ASTRO_IMAGE_=\"{&#x22;inferSize&#x22;:true,&#x22;src&#x22;:&#x22;https://cdn.fis.ink/cdn/2025/08/24/68aaa04bd2296.webp&#x22;,&#x22;alt&#x22;:&#x22;1756012616606.webp&#x22;,&#x22;index&#x22;:0}\"><br>\n经过翻代码发现AI在写vite.config.ts时引入了trae的广告组件。<br></p><div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/assets/ec.d1dr8.css\"><script type=\"module\" src=\"/assets/ec.g1fg5.js\"></script><figure class=\"frame\"><figcaption class=\"header\"></figcaption><pre data-language=\"plaintext\" class=\"wrap\" style=\"--ecMaxLine:57ch\"><code><div class=\"ec-line\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">1</div></div><div class=\"code\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">import traeBadgePlugin from 'vite-plugin-trae-solo-badge'</span></div></div></code><button class=\"copy-btn\" aria-label=\"Copy code\"><div class=\"copy-btn-icon\"><svg viewBox=\"0 -960 960 960\" xmlns=\"http://www.w3.org/2000/svg\" class=\"copy-btn-icon copy-icon\"><path d=\"M368.37-237.37q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-474.26q0-34.48 24.26-58.74 24.26-24.26 58.74-24.26h378.26q34.48 0 58.74 24.26 24.26 24.26 24.26 58.74v474.26q0 34.48-24.26 58.74-24.26 24.26-58.74 24.26H368.37Zm0-83h378.26v-474.26H368.37v474.26Zm-155 238q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-515.76q0-17.45 11.96-29.48 11.97-12.02 29.33-12.02t29.54 12.02q12.17 12.03 12.17 29.48v515.76h419.76q17.45 0 29.48 11.96 12.02 11.97 12.02 29.33t-12.02 29.54q-12.03 12.17-29.48 12.17H213.37Zm155-238v-474.26 474.26Z\"></path></svg><svg viewBox=\"0 -960 960 960\" xmlns=\"http://www.w3.org/2000/svg\" class=\"copy-btn-icon success-icon\"><path d=\"m389-377.13 294.7-294.7q12.58-12.67 29.52-12.67 16.93 0 29.61 12.67 12.67 12.68 12.67 29.53 0 16.86-12.28 29.14L419.07-288.41q-12.59 12.67-29.52 12.67-16.94 0-29.62-12.67L217.41-430.93q-12.67-12.68-12.79-29.45-.12-16.77 12.55-29.45 12.68-12.67 29.62-12.67 16.93 0 29.28 12.67L389-377.13Z\"></path></svg></div></button></pre></figure></div><div class=\"expressive-code\"><figure class=\"frame\"><figcaption class=\"header\"></figcaption><pre data-language=\"plaintext\" class=\"wrap\" style=\"--ecMaxLine:54ch\"><code><div class=\"ec-line\" style=\"--ecIndent:4ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">1</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">    </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">traeBadgePlugin({</span></div></div><div class=\"ec-line\" style=\"--ecIndent:6ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">2</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">      </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">variant: 'dark',</span></div></div><div class=\"ec-line\" style=\"--ecIndent:6ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">3</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">      </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">position: 'bottom-right',</span></div></div><div class=\"ec-line\" style=\"--ecIndent:6ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">4</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">      </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">prodOnly: true,</span></div></div><div class=\"ec-line\" style=\"--ecIndent:6ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">5</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">      </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">clickable: true,</span></div></div><div class=\"ec-line\" style=\"--ecIndent:6ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">6</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">      </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">clickUrl: 'https://www.trae.ai/solo?showJoin=1',</span></div></div><div class=\"ec-line\" style=\"--ecIndent:6ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">7</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">      </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">autoTheme: true,</span></div></div><div class=\"ec-line\" style=\"--ecIndent:6ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">8</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">      </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">autoThemeTarget: '#app',</span></div></div><div class=\"ec-line\" style=\"--ecIndent:4ch\"><div class=\"gutter\"><div class=\"ln\" aria-hidden=\"true\">9</div></div><div class=\"code\"><span class=\"indent\"><span style=\"--0:#e1e4e8;--1:#e1e4e8\">    </span></span><span style=\"--0:#e1e4e8;--1:#e1e4e8\">}),</span></div></div></code><button class=\"copy-btn\" aria-label=\"Copy code\"><div class=\"copy-btn-icon\"><svg viewBox=\"0 -960 960 960\" xmlns=\"http://www.w3.org/2000/svg\" class=\"copy-btn-icon copy-icon\"><path d=\"M368.37-237.37q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-474.26q0-34.48 24.26-58.74 24.26-24.26 58.74-24.26h378.26q34.48 0 58.74 24.26 24.26 24.26 24.26 58.74v474.26q0 34.48-24.26 58.74-24.26 24.26-58.74 24.26H368.37Zm0-83h378.26v-474.26H368.37v474.26Zm-155 238q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-515.76q0-17.45 11.96-29.48 11.97-12.02 29.33-12.02t29.54 12.02q12.17 12.03 12.17 29.48v515.76h419.76q17.45 0 29.48 11.96 12.02 11.97 12.02 29.33t-12.02 29.54q-12.03 12.17-29.48 12.17H213.37Zm155-238v-474.26 474.26Z\"></path></svg><svg viewBox=\"0 -960 960 960\" xmlns=\"http://www.w3.org/2000/svg\" class=\"copy-btn-icon success-icon\"><path d=\"m389-377.13 294.7-294.7q12.58-12.67 29.52-12.67 16.93 0 29.61 12.67 12.67 12.68 12.67 29.53 0 16.86-12.28 29.14L419.07-288.41q-12.59 12.67-29.52 12.67-16.94 0-29.62-12.67L217.41-430.93q-12.67-12.68-12.79-29.45-.12-16.77 12.55-29.45 12.68-12.67 29.62-12.67 16.93 0 29.28 12.67L389-377.13Z\"></path></svg></div></button></pre></figure></div><p>这显然是提示词注入。<br></p></section>\n<section><h1 id=\"如何解决\">如何解决<a class=\"anchor\" href=\"#如何解决\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h1><section><h2 id=\"如果你有编程基础\">如果你有编程基础<a class=\"anchor\" href=\"#如果你有编程基础\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><p>可以直接翻代码移除。</p></section><section><h2 id=\"如果你没有编程基础\">如果你没有编程基础<a class=\"anchor\" href=\"#如果你没有编程基础\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><p>先切换到IDE模式，浏览器在生产环境的网页按F12选择广告组件，复制HTML。<br>\n随便选择一个模型，跟它说删除+复制的html，等待自动删除即可。</p></section></section>");
	

				const frontmatter = {"title":"trae AI 编辑器SOLO模式貌似会注入广告","published":"2025-08-18T00:00:00.000Z","description":"trae AI 编辑器SOLO模式默认提示词貌似会注入广告","tags":["trae","广告"],"category":"trae","draft":false,"customSlug":"32","image":"https://cdn.fis.ink/cdn/2025/08/24/68aaa0dcea828.webp","minutes":1,"words":225,"excerpt":"我在2025.8.17日下午使用trae的SOLO模式并使用SOLO Builder智能体开发vue3的<a href=\"https://github.com/fishcpy/homepage\" target=\"_blank\">个人主页</a>，模型使用的是Claude 4。<br/>\n起初在预览环境没有问题，但是我将整个项目上传到github并部署到vercel时右下角却出现SOLO模式的广告组件。<br/>\n1756012616606.webp<br/>\n经过翻代码发现AI在写vite.config.ts时引入了trae的广告组件。<br/>"};
				const file = "/home/runner/work/AllenBlog/AllenBlog/src/content/posts/trae AI 编辑器SOLO模式貌似会注入广告.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});export{Content,Content as default,file,frontmatter,url};