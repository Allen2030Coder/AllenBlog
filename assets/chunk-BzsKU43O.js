function TwikooStats($$renderer, $$props) {
	$$renderer.component(($$renderer) => {

		$$renderer.push(`<div class="pb-4 card-base card-shadow onload-animation" style="animation-delay: 250ms"><div class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:left-[-16px] before:top-[5.5px]">访问统计</div> <div class="px-4 overflow-hidden">`);

		{
			$$renderer.push('<!--[-->');
			$$renderer.push(`<div class="text-sm py-2" style="color: var(--text-tertiary)"><div class="flex items-center justify-center"><svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 加载中...</div></div>`);
		}

		$$renderer.push(`<!--]--></div></div>`);
	});
}export{TwikooStats as default};