// Ech0 API 工具函数

interface EssayData {
	id: number;
	content: string;
	time: string;
	tags: string[];
	images?: string[];
}

/**
 * 格式化日期对象为字符串
 * @param date 日期对象
 * @returns YYYY-MM-DD HH:MM格式的日期时间字符串
 */
function formatDateString(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 格式化日期时间
 * @param dateString ISO日期字符串
 * @returns YYYY-MM-DD HH:MM格式的日期时间字符串
 */
function formatDateTime(dateString: string): string {
	if (!dateString) {
		const now = new Date();
		return formatDateString(now);
	}

	try {
		const date = new Date(dateString);
		return formatDateString(date);
	} catch {
		const now = new Date();
		return formatDateString(now);
	}
}

// 备用数据，当API获取失败时使用
export const fallbackData: EssayData[] = [
	{
		id: 1,
		content: "欢迎来到我的说说页面！",
		time: formatDateTime(new Date().toISOString()),
		tags: ["生活"],
	},
	{
		id: 2,
		content: "这里记录了我的日常分享和思考。",
		time: formatDateTime(new Date().toISOString()),
		tags: ["生活"],
	},
	{
		id: 3,
		content: "刷新页面可以查看最新内容。",
		time: formatDateTime(new Date().toISOString()),
		tags: ["系统"],
	},
];

/**
 * 从Ech0 RSS获取动态数据
 * @param apiUrl Ech0 API地址
 * @returns 转换后的动态数据数组
 */
export async function fetchEch0Posts(apiUrl: string): Promise<EssayData[]> {
	try {
		console.log("Fetching Ech0 posts from:", `${apiUrl}/rss`);

		// 设置更短的超时，确保快速响应
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时，更快响应

		const response = await fetch(`${apiUrl}/rss`, {
			signal: controller.signal,
			headers: {
				Accept: "application/rss+xml, application/xml, text/xml, */*",
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			},
			// 允许跨域请求
			mode: 'cors',
			credentials: 'omit',
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch Ech0 posts: ${response.status} ${response.statusText}`,
			);
		}

		const xmlText = await response.text();
		console.log("RSS response length:", xmlText.length);

		if (!xmlText || xmlText.length === 0) {
			throw new Error("Empty RSS response");
		}

		const data = parseRssData(xmlText);
		console.log("Parsed essays count:", data.length);

		if (data.length === 0) {
			console.warn("No essays found in RSS feed");
			return fallbackData;
		}

		// 只在客户端缓存数据
		if (typeof window !== 'undefined' && window.localStorage) {
			try {
				window.localStorage.setItem('ech0PostsCache', JSON.stringify({
					data,
					timestamp: Date.now()
				}));
			} catch (e) {
				// 本地存储失败不影响主流程
				console.warn("Failed to cache Ech0 posts:", e);
			}
		}

		return data;
	} catch (error) {
		console.error("Error fetching Ech0 posts:", error);
		
		// 尝试从缓存获取数据（只在客户端）
		if (typeof window !== 'undefined' && window.localStorage) {
			try {
				const cached = window.localStorage.getItem('ech0PostsCache');
				if (cached) {
					const parsed = JSON.parse(cached);
					// 检查缓存是否在24小时内
					if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
						console.log("Using cached Ech0 posts");
						return parsed.data;
					}
				}
			} catch (e) {
				// 缓存读取失败，继续使用备用数据
				console.warn("Failed to read cached Ech0 posts:", e);
			}
		}
		
		// 出错时返回备用数据，避免页面显示空白
		return fallbackData;
	}
}

/**
 * 解析RSS XML数据
 * @param xmlText RSS XML文本
 * @returns 转换后的动态数据数组
 */
function parseRssData(xmlText: string): EssayData[] {
	// 使用正则表达式解析RSS数据，避免使用DOMParser（浏览器特有API）
	const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
	const entries: EssayData[] = [];
	let match: RegExpExecArray | null = null;

	let index = 0;
	while (true) {
		match = entryRegex.exec(xmlText);
		if (match === null) break;
		const entryText = match[1];
		index++;

		// 提取更新时间
		const updatedRegex = /<updated>([\s\S]*?)<\/updated>/;
		const updatedMatch = entryText.match(updatedRegex);
		const updated = updatedMatch ? updatedMatch[1] : "";

		// 提取摘要（使用更宽松的正则表达式，支持换行符）
		const summaryRegex = /<summary[^>]*>([\s\S]*?)<\/summary>/i;
		const summaryMatch = entryText.match(summaryRegex);
		const summary = summaryMatch ? summaryMatch[1] : "";

		// 提取纯文本内容
		const content = extractPlainText(summary);

		// 提取图片
		const images = extractImages(summary);

		// 提取标签
		const tags = extractTags(entryText);

		entries.push({
			id: index,
			content,
			time: formatDateTime(updated),
			tags: tags.length > 0 ? tags : ["生活"], // 默认标签
			images: images.length > 0 ? images : undefined,
		});
	}

	// 按ID倒序排列
	return entries.sort((a, b) => b.id - a.id);
}

/**
 * 从HTML中提取纯文本
 * @param html HTML文本
 * @returns 纯文本
 */
function extractPlainText(html: string): string {
	if (!html) return "[无内容]";

	// 解码HTML实体
	const decodedHtml = html
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#34;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&#xA;/g, "\n")
		.replace(/&#xD;/g, "\r")
		.replace(/&#10;/g, "\n")
		.replace(/&#13;/g, "\r");

	// 使用正则表达式移除HTML标签
	const plainText = decodedHtml.replace(/<[^>]*>/g, "").trim();

	// 如果纯文本为空，说明可能是纯图片的说说，返回一个占位符
	return plainText || "[图片]";
}

/**
 * 从HTML中提取图片URL
 * @param html HTML文本
 * @returns 图片URL数组
 */
function extractImages(html: string): string[] {
	if (!html) return [];

	// 解码HTML实体
	const decodedHtml = html
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#34;/g, '"')
		.replace(/&#39;/g, "'");

	// 使用更宽松的正则表达式提取图片URL
	const imgRegex = /<img[^>]*src=["']([^"']+)["']/gi;
	const images: string[] = [];
	let match: RegExpExecArray | null = null;

	while (true) {
		match = imgRegex.exec(decodedHtml);
		if (match === null) break;
		let url = match[1];

		// 将HTTP URL转换为HTTPS
		if (url.startsWith("http://")) {
			url = url.replace("http://", "https://");
		}

		images.push(url);
	}

	return images;
}



/**
 * 从RSS条目中提取标签
 * @param entryText RSS条目文本
 * @returns 标签数组
 */
function extractTags(entryText: string): string[] {
	const tags: string[] = [];
	const categoryRegex = /<category[^>]*term=["']([^"']+)["']/gi;
	let match: RegExpExecArray | null = null;

	while (true) {
		match = categoryRegex.exec(entryText);
		if (match === null) break;
		tags.push(match[1]);
	}

	return tags;
}
