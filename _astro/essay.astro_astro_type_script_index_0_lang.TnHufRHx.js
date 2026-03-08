window.commentOnPost=function(a){const t=a.dataset.content;console.log("commentOnPost called with content:",t);const o=document.getElementById("comments-section");o?(console.log("Found comments section, scrolling..."),o.scrollIntoView({behavior:"smooth"})):(console.log("Comments section not found, scrolling to bottom..."),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})),setTimeout(()=>{console.log("Trying to find textarea...");const e=document.querySelector(".el-textarea__inner")||document.querySelector("#twikoo textarea")||document.querySelector("textarea");e&&t?(console.log("Found textarea:",e),e.value=`> ${t}

`,e.focus(),e.dispatchEvent(new Event("input",{bubbles:!0})),console.log("Content filled into textarea")):(console.log("Textarea not found, trying again..."),setTimeout(()=>{const n=document.querySelector(".el-textarea__inner")||document.querySelector("textarea");n&&t?(console.log("Found textarea on retry:",n),n.value=`> ${t}

`,n.focus(),n.dispatchEvent(new Event("input",{bubbles:!0})),console.log("Content filled into textarea on retry")):console.log("Textarea still not found")},500))},800)};async function f(){const a=document.getElementById("essays-container");if(!(!a||a.dataset.needsFetch!=="true"))try{console.log("Client-side fetching Ech0 posts...");const t=await fetch("https://say.allen2030.com/rss",{headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"},mode:"cors",credentials:"omit"});if(!t.ok)throw new Error(`Failed to fetch: ${t.status}`);const o=await t.text();console.log("Client-side RSS response length:",o.length);const e=b(o);if(console.log("Client-side parsed entries:",e.length),e.length>0){try{localStorage.setItem("ech0PostsCache",JSON.stringify({data:e,timestamp:Date.now()}))}catch(n){console.warn("Failed to cache Ech0 posts:",n)}y(e)}}catch(t){console.error("Client-side fetch error:",t);try{const o=localStorage.getItem("ech0PostsCache");if(o){const e=JSON.parse(o);Date.now()-e.timestamp<1440*60*1e3&&(console.log("Using cached Ech0 posts on client"),y(e.data))}}catch(o){console.warn("Failed to read cached Ech0 posts:",o)}}}function b(a){const t=/<entry>([\s\S]*?)<\/entry>/g,o=[];let e=null;for(;e=t.exec(a),e!==null;){const n=e[1],l=n.match(/<updated>([\s\S]*?)<\/updated>/),m=l?l[1]:"",s=n.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);let g=(s?s[1]:"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");const u=[],h=/<img[^>]+src="([^"]+)"/g;let c=null;for(;c=h.exec(g),c!==null;)u.push(c[1]);const p=g.replace(/<[^>]*>/g,"").trim(),d=[],v=/<category[^>]*term="([^"]+)"/g;let i=null;for(;i=v.exec(n),i!==null;)d.push(i[1]);const x=new Date(m).toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});o.push({content:p||"[图片]",time:x,images:u,tags:d})}return o}function y(a){const t=document.getElementById("essays-container");if(!t)return;const o=document.querySelector(".essay-item img"),e=document.querySelector(".essay-item .font-medium"),n=o?o.src:"/favicon/favicon-light-128.png",l=e?e.textContent:"Allen",m=a.map((s,w)=>{const h=[...(s.content.match(/#[^\s#]+/g)||[]).map(r=>r.replace("#","")),...s.tags||[]],c=[...new Set(h)].slice(0,3),p=c.length>0,d=s.content.replace(/#[^\s#]+/g,"").trim(),v=s.images&&s.images.length>0?`
                <div class="essay-images mb-3">
                    <div class="grid gap-2 ${s.images.length===1?"grid-cols-1":"grid-cols-2"}">
                        ${s.images.slice(0,4).map((r,x)=>`
                            <div class="rounded-lg overflow-hidden bg-[var(--btn-card-bg-hover)] aspect-video">
                                <img 
                                    src="${r}" 
                                    alt="瞬间图片 ${x+1}"
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    loading="lazy"
                                />
                            </div>
                        `).join("")}
                    </div>
                </div>
            `:"",i=p?c.map(r=>`<span class="px-2 py-1 bg-[var(--btn-card-bg-hover)] rounded-md text-xs text-75">${r}</span>`).join(""):'<span class="px-2 py-1 bg-[var(--btn-card-bg-hover)] rounded-md text-xs text-50">无标签</span>';return`
                <div class="essay-item break-inside-avoid bg-[var(--card-bg)] rounded-xl p-4 shadow-sm border border-[var(--line-divider)] transition-all hover:shadow-md" style="animation-delay: ${w*.1}s">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-full overflow-hidden bg-[var(--btn-card-bg-hover)] flex-shrink-0">
                            <img 
                                src="${n}" 
                                alt="${l}"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-1">
                                <span class="font-medium text-90 text-sm truncate">${l}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                            </div>
                            <div class="text-xs text-50">${s.time}</div>
                        </div>
                    </div>
                    
                    <div class="essay-content text-90 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                        ${d}
                    </div>
                    
                    ${v}
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1 flex-wrap">
                            ${i}
                        </div>
                        
                        <button 
                            class="flex items-center gap-1 text-xs text-75 hover:text-primary transition-colors p-1 rounded hover:bg-[var(--btn-card-bg-hover)]"
                            data-content="${s.content.replace(/"/g,"&quot;")}"
                            onclick="window.commentOnPost(this)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `}).join("");t.innerHTML=m}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{f()}):f();setTimeout(f,100);
