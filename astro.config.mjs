import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components"; /* Render the custom directive content */
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive"; /* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { expressiveCodeConfig } from "./src/config.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { LinkCardComponent } from "./src/plugins/rehype-component-link-card.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.fis.ink/",
	base: "/",
	trailingSlash: "always",
	
	// 性能优化配置
	image: {
		remotePatterns: [
			{
				host: "image.allen2030.com",
				protocol: "https",
			},
			{
				host: "say.allen2030.com",
				protocol: "https",
			},
			{
				host: "blogpng.fishcpy.top",
				protocol: "https",
			},
		],
		// 图片格式优化
		formats: ['webp', 'avif', 'png'],
		// 图片质量优化
		quality: 85,
		// 缓存配置
		cacheDir: './node_modules/.astro/image-cache',
		// 允许使用远程图片
		allowUpscale: false,
	},
	
	// 构建优化
	build: {
		// 启用代码分割
		split: true,
		// 资产输出目录
		assets: 'assets',
	},

	integrations: [
		tailwind({
			nesting: true,
		}),
		swup({
			theme: false,
			animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
			// the default value `transition-` cause transition delay
			// when the Tailwind class `transition-all` is used
			containers: ["main", "#toc"],
			smoothScrolling: true,
			cache: true,
			preload: {
				enabled: true,
				throttle: 5,
			},
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true,
		}),
		icon({
			include: {
				"preprocess: vitePreprocess(),": ["*"],
				"fa6-brands": ["*"],
				"fa6-regular": ["*"],
				"fa6-solid": ["*"],
				ic: ["*"],
				"material-symbols": ["*"],
			},
		}),
		expressiveCode({
			themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
			plugins: [
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				pluginLanguageBadge(),
				pluginCustomCopyButton(),
			],
			defaultProps: {
				wrap: true,
				overridesByLang: {
					shellsession: {
						showLineNumbers: false,
					},
				},
			},
			styleOverrides: {
				codeBackground: "var(--codeblock-bg)",
				borderRadius: "0.75rem",
				borderColor: "none",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {
					editorBackground: "var(--codeblock-bg)",
					terminalBackground: "var(--codeblock-bg)",
					terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
					editorTabBarBackground: "var(--codeblock-topbar-bg)",
					editorActiveTabBackground: "none",
					editorActiveTabIndicatorBottomColor: "var(--primary)",
					editorActiveTabIndicatorTopColor: "none",
					editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
					terminalTitlebarBorderBottomColor: "none",
				},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250,
				},
			},
			frames: {
				showCopyToClipboardButton: false,
			},
		}),
		svelte(),
		sitemap(),
	],

	markdown: {
		remarkPlugins: [
			remarkMath,
			remarkReadingTime,
			remarkExcerpt,
			remarkGithubAdmonitionsToDirectives,
			remarkDirective,
			remarkSectionize,
			parseDirectiveNode,
		],
		rehypePlugins: [
			rehypeKatex,
			rehypeSlug,
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: ["nofollow", "noopener", "noreferrer"],
				},
			],
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
						"link-card": LinkCardComponent,
						note: (x, y) => AdmonitionComponent(x, y, "note"),
						tip: (x, y) => AdmonitionComponent(x, y, "tip"),
						important: (x, y) => AdmonitionComponent(x, y, "important"),
						caution: (x, y) => AdmonitionComponent(x, y, "caution"),
						warning: (x, y) => AdmonitionComponent(x, y, "warning"),
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
		],
	},

	vite: {
		build: {
			cssCodeSplit: true,
			minify: 'esbuild',
			esbuild: {
				minify: true,
				minifyIdentifiers: true,
				minifySyntax: true,
				minifyWhitespace: true,
				// 移除控制台输出
				drop: ['console', 'debugger'],
			},
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
					dead_code: true,
					unused: true,
					collapse_vars: true,
					reduce_vars: true,
					// 更多压缩选项
					booleans: true,
					if_return: true,
					join_vars: true,
					loops: true,
					conditionals: true,
				},
				mangle: true,
				output: {
					comments: false,
					beautify: false,
				},
			},
			// 构建性能优化
			cache: true,
			// 输出目录
			outDir: 'dist',
			// 资源目录
			assetsDir: 'assets',
			// 生成 sourcemap
			sourcemap: false,
			// 清空输出目录
			emptyOutDir: true,
			rollupOptions: {
				// 输入配置
				input: {},
				// 输出配置
				output: {
					// 代码分割策略
					manualChunks: {
						'vendor': ['svelte'],
						'icons': ['@iconify/svelte'],
						'photoswipe': ['photoswipe'],
						'expressive-code': ['@expressive-code/core'],
						'katex': ['katex'],
						'markdown-it': ['markdown-it'],
						// 新增：将大型依赖单独打包
						'overlayscrollbars': ['overlayscrollbars'],
						'sanitize-html': ['sanitize-html'],
					},
					// 压缩输出
					compact: true,
					// 文件名哈希
					chunkFileNames: 'assets/chunk-[hash].js',
					entryFileNames: 'assets/entry-[hash].js',
					assetFileNames: 'assets/[hash].[ext]',
				},
				onwarn(warning, warn) {
					// 暂时抑制某些警告
					if (
						warning.message.includes("is dynamically imported by") &&
						warning.message.includes("but also statically imported by")
					) {
						return;
					}
					// 抑制未使用的导入警告
					if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
						return;
					}
					warn(warning);
				},
			},
		},
		// 依赖优化
		optimizeDeps: {
			enable: true,
			include: ['svelte', '@iconify/svelte', 'photoswipe', 'katex', 'markdown-it', 'overlayscrollbars', 'sanitize-html'],
			force: true,
			// 缓存目录
			cacheDir: './node_modules/.vite',
		},
		// SSR 配置
		ssr: {
			noExternal: ['@iconify/svelte'],
			// SSR 外部化
			external: [],
		},
		// 开发服务器优化
		server: {
			https: false,
			port: 4321,
			open: false,
			// 开发服务器缓存
			cacheDir: './node_modules/.vite',
			// 增加 watch 上限
			watch: {
				ignored: ['**/node_modules/**', '**/dist/**'],
				usePolling: false,
			},
		},
		// 预加载策略
		preview: {
			port: 4321,
			https: false,
		},
		// 模块解析优化
		resolve: {
			// 别名配置
			alias: {
				'@': '/src',
				'@components': '/src/components',
				'@utils': '/src/utils',
				'@styles': '/src/styles',
				'@pages': '/src/pages',
				'@layouts': '/src/layouts',
				'@content': '/src/content',
				'@assets': '/src/assets',
				'@constants': '/src/constants',
				'@i18n': '/src/i18n',
				'@plugins': '/src/plugins',
				'@types': '/src/types',
			},
			// 扩展
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mts', '.astro', '.svelte'],
		},
		// 性能优化
		performance: {
			hints: 'warning',
			maxAssetSize: 250000,
			maxEntrypointSize: 250000,
		},
	},

	adapter: vercel(),
});
