import {f as fallback,e as ensure_array_like,a as escape_html,b as attr,c as bind_props}from'./chunk-DxGxG4u5.js';import {i as i18n,I as I18nKey,g as getPostUrlBySlug}from'./chunk-Dz7Rnveg.js';function ArchivePanel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let tags = fallback($$props['tags'], () => [], true);
		let categories = fallback($$props['categories'], () => [], true);
		let sortedPosts = fallback($$props['sortedPosts'], () => [], true);

		function getPostUrl(post) {
			const finalSlug = post.data.customSlug || post.slug;

			return getPostUrlBySlug(finalSlug);
		}

		let groups = [];

		function formatDate(date) {
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");

			return `${month}-${day}`;
		}

		function formatTag(tagList) {
			return tagList.map((t) => `#${t}`).join(" ");
		}

		$$renderer.push(`<div class="card-base px-8 py-6"><!--[-->`);

		const each_array = ensure_array_like(groups);

		for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
			let group = each_array[$$index_1];

			$$renderer.push(`<div><div class="flex flex-row w-full items-center h-[3.75rem]"><div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">${escape_html(group.year)}</div> <div class="w-[15%] md:w-[10%]"><div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div></div> <div class="w-[70%] md:w-[80%] transition text-left text-neutral-600 dark:text-neutral-400">${escape_html(group.posts.length)} ${escape_html(i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount))}</div></div> <!--[-->`);

			const each_array_1 = ensure_array_like(group.posts);

			for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
				let post = each_array_1[$$index];

				$$renderer.push(`<a${attr('href', getPostUrl(post))}${attr('aria-label', post.data.title)} class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"><div class="flex flex-row justify-start items-center h-full"><div class="w-[15%] md:w-[10%] transition text-sm text-right text-neutral-600 dark:text-neutral-400">${escape_html(formatDate(post.data.published))}</div> <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center"><div class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5 bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)] outline outline-4 z-50 outline-[var(--card-bg)] group-hover:outline-[var(--btn-plain-bg-hover)] group-active:outline-[var(--btn-plain-bg-active)]"></div></div> <div class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)] text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden">${escape_html(post.data.title)}</div> <div class="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30">${escape_html(formatTag(post.data.tags))}</div></div></a>`);
			}

			$$renderer.push(`<!--]--></div>`);
		}

		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { tags, categories, sortedPosts });
	});
}export{ArchivePanel as default};