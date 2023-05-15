"use strict";(self.webpackChunkrishikc_com=self.webpackChunkrishikc_com||[]).push([[513],{3841:function(n,e,a){a.r(e),a.d(e,{Head:function(){return S},default:function(){return j}});var t=a(1151),s=a(7294);function o(n){const e=Object.assign({p:"p",ul:"ul",li:"li",a:"a",h2:"h2",span:"span",code:"code",img:"img",em:"em"},(0,t.ah)(),n.components);return s.createElement(s.Fragment,null,s.createElement(e.p,null,"We all know how valuable and helpful the insights are from lighthouse audits when we’re developing our web applications. But the way most of us check is manually through Chrome dev tools or the lighthouse extension, which in my opinion, is not very productive."),"\n",s.createElement(e.p,null,"For those of us who don’t know, there are mainly four ways of auditing our web application with lighthouse :"),"\n",s.createElement(e.ul,null,"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,"via Chrome dev tools"),"\n"),"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,"Command-line"),"\n"),"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,"NPM module\n( which we are going to use in a while )"),"\n"),"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,s.createElement(e.a,{href:"https://developers.google.com/speed/pagespeed/insights/",target:"_blank",rel:"nofollow noopener noreferrer"},"PageSpeed Insights")),"\n"),"\n"),"\n",s.createElement("hr"),"\n",s.createElement(e.h2,{id:"dependencies",style:{position:"relative"}},"Dependencies",s.createElement(e.a,{href:"#dependencies","aria-label":"dependencies permalink",className:"autolink-header-icon after"},s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",s.createElement(e.p,null,"To programmatically perform lighthouse audits, we can use the ",s.createElement(e.a,{href:"https://www.npmjs.com/package/lighthouse",target:"_blank",rel:"nofollow noopener noreferrer"},"lighthouse npm package"),", ",s.createElement(e.a,{href:"https://mochajs.org/",target:"_blank",rel:"nofollow noopener noreferrer"},"mocha"),", and ",s.createElement(e.a,{href:"https://www.chaijs.com",target:"_blank",rel:"nofollow noopener noreferrer"},"chai")," for writing our tests and ",s.createElement(e.a,{href:"https://www.npmjs.com/package/chrome-launcher",target:"_blank",rel:"nofollow noopener noreferrer"},"chrome-launcher")," for running our lighthouse tests."),"\n",s.createElement(e.p,null,"First, let’s install the above packages as dev dependencies in our project :"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> lighthouse chrome-launcher chai mocha --save-dev</code></pre></div>'}}),"\n",s.createElement(e.h2,{id:"set-up-lighthouse",style:{position:"relative"}},"Set up lighthouse",s.createElement(e.a,{href:"#set-up-lighthouse","aria-label":"set up lighthouse permalink",className:"autolink-header-icon after"},s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",s.createElement(e.p,null,"Now, let’s create a file named ",s.createElement(e.code,null,"lighthouse.tests.js")," in our ",s.createElement(e.code,null,"tests")," directory. We’ll run our lighthouse audits through this file. Here, we’ll import the lighthouse module and chrome launcher that helps us to open our webpage from the local development server and run the audits to test against a minimum threshold that we want our lighthouse scores to be."),"\n",s.createElement(e.p,null,"While this might sound a lot to do, it isn’t much. Here’s what it looks like on actual code :"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="js"><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> lighthouse <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"lighthouse"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> chromeLauncher <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"chrome-launcher"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">launchChromeAndRunLighthouse</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> opts<span class="token punctuation">,</span> conf <span class="token operator">=</span> <span class="token keyword">null</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> chromeLauncher\n    <span class="token punctuation">.</span><span class="token function">launch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">chromeFlags</span><span class="token operator">:</span> opts<span class="token punctuation">.</span>chromeFlags <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">chrome</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      opts<span class="token punctuation">.</span>port <span class="token operator">=</span> chrome<span class="token punctuation">.</span>port<span class="token punctuation">;</span>\n      <span class="token keyword">return</span> <span class="token function">lighthouse</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> opts<span class="token punctuation">,</span> conf<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n        chrome<span class="token punctuation">.</span><span class="token function">kill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> res<span class="token punctuation">.</span>lhr<span class="token punctuation">)</span>\n      <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",s.createElement(e.p,null,"And it is as simple as that. We launch the chrome browser instance with the ",s.createElement(e.code,null,"chromeLauncher.launch")," method and then run lighthouse tests with the site URL and configuration for our audits. After that, we close/kill the chrome instance and return the results. And this is how it looks like when in use :"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="js"><pre class="language-js"><code class="language-js"><span class="token function">launchChromeAndRunLighthouse</span><span class="token punctuation">(</span>testUrl<span class="token punctuation">,</span> opts<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// Results are available in `res`</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",s.createElement(e.h2,{id:"write-the-tests",style:{position:"relative"}},"Write the tests",s.createElement(e.a,{href:"#write-the-tests","aria-label":"write the tests permalink",className:"autolink-header-icon after"},s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",s.createElement(e.p,null,"So now, we can put this call inside our ",s.createElement(e.code,null,"before")," hook for the tests and then have tests for each metric, something like this :"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="js"><pre class="language-js"><code class="language-js"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"Lighthouse Audits"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Timeout doesn\'t need to be same. It can be more or less depending on your project.</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">timeout</span><span class="token punctuation">(</span><span class="token number">50000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> results<span class="token punctuation">;</span>\n  <span class="token function">before</span><span class="token punctuation">(</span><span class="token string">"run test"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">done</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">launchChromeAndRunLighthouse</span><span class="token punctuation">(</span>testUrl<span class="token punctuation">,</span> opts<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token comment">// Extract the results you need for your assertions.</span>\n      <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"performance test"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">done</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// test your performance score against the threshold</span>\n    <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">// Some more tests..</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",s.createElement(e.p,null,"Still looks weird? Don’t worry! Check out this repository for an example setup of ",s.createElement(e.a,{href:"https://github.com/rishichawda/lighthouse-mocha-example",target:"_blank",rel:"nofollow noopener noreferrer"},"lighthouse tests with mocha")," and try that out with your web application!"),"\n",s.createElement(e.p,null,"This method can be applied to automate the tests in continuous integration/deployment environments so that you don’t have to worry about manually auditing your web application and checking whether it meets the minimum satisfactory levels."),"\n",s.createElement("hr"),"\n",s.createElement(e.p,null,"So there you go. That’s all we need to do for automating lighthouse audits for our progressive web applications to make sure they are always worthy of the internet and user’s data packets!"),"\n",s.createElement(e.img,{src:"https://i.imgur.com/bTB3UGn.gif",alt:"Atleast the Son of Odin is happy about his light house tests."}),"\n",s.createElement("br"),"\n",s.createElement(e.p,null,s.createElement(e.em,null,"Did you like this article? Or did I miss something? Is there something that you have that can make it even better?"),"\n",s.createElement(e.em,null,"Please leave a comment below, or you can also contact me through my ",s.createElement(e.a,{href:"/"},"social media profiles"),".")),"\n",s.createElement(e.p,null,s.createElement(e.em,null,"Thank you for reading!")," 😄"),"\n",s.createElement("br"),"\n",s.createElement(e.p,null,"Happy hacking! Cheers! 🎉"))}var l=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?s.createElement(e,n,s.createElement(o,n)):o(n)},c=a(757),p=a(8032),r=a(6573),i=a(3597),u=a(6616),h=a(7896),m=a(4795),d=a(7032),k=a(7356),g=a(8591),f=a(6805),v=a(9129),w=a(289),E=a(2780),y=a(4029),b=a(1790);const x={year:"numeric",month:"long",day:"numeric"},_=n=>{var e,a,t,o,l,d,_,S,j,H,N,L,I,C,T,R,Z,M,A,z,B,D,F;const P=(0,h.useLocation)(),U=s.useRef(null),V=s.useRef(null),W=s.useRef(null),O=(0,b.m_)(n.path),q=(null===(e=n.data.mdx.frontmatter)||void 0===e?void 0:e.hero_image_credit_text)||(null===(a=n.data.mdx.frontmatter)||void 0===a?void 0:a.hero_image_credit_link),G=new Date(null===(t=n.data.mdx.frontmatter)||void 0===t?void 0:t.date).toLocaleString("en-US",x);return s.createElement(m.Z,{showScrollProgress:!0},s.createElement("main",{className:"root-container flex flex-row article-page"},s.createElement(y.Z,{edge:O}),s.createElement("article",{className:"article-content-page-container"},s.createElement("div",{className:"flex flex-col items-center sm:items-start article-header"},s.createElement("figure",null,s.createElement(p.G,{className:"article-header-hero-image w-full h-auto rounded-md dark:brightness-50",alt:(null===(o=n.data.mdx.frontmatter)||void 0===o?void 0:o.hero_image_alt)||"banner_for_"+(null===(l=n.data.mdx.fields)||void 0===l?void 0:l.slug),image:null===(d=n.data.mdx.frontmatter)||void 0===d||null===(_=d.hero_image)||void 0===_||null===(S=_.childImageSharp)||void 0===S?void 0:S.gatsbyImageData}),q?s.createElement("figcaption",null,"Image credits: ",null===(j=n.data.mdx.frontmatter)||void 0===j?void 0:j.hero_image_credit_text,null!==(H=n.data.mdx.frontmatter)&&void 0!==H&&H.hero_image_credit_link?s.createElement(s.Fragment,null," ",s.createElement(c.M,{href:null===(N=n.data.mdx.frontmatter)||void 0===N?void 0:N.hero_image_credit_link,target:"_blank",rel:"nofollow noopener noreferrer"},null===(L=n.data.mdx.frontmatter)||void 0===L?void 0:L.hero_image_credit_link)):null):null),s.createElement("h1",{className:"text-center sm:text-left article-header-title"},null===(I=n.data.mdx.frontmatter)||void 0===I?void 0:I.title),s.createElement("h2",{className:"text-center sm:text-left article-header-subtitle"},null===(C=n.data.mdx.frontmatter)||void 0===C?void 0:C.subtitle),s.createElement("span",{className:"flex flex-wrap items-center justify-center article-header-tags"},null===(T=n.data.mdx.frontmatter)||void 0===T||null===(R=T.tags)||void 0===R?void 0:R.map((n=>s.createElement("span",{key:n},s.createElement(k.Z,{focusable:!1},n))))),s.createElement("div",{className:"inline-flex item-center justify-between w-full text-gray-500 dark:text-gray-400 article-header-info"},s.createElement("div",{className:"inline-flex items-center article-header-info-time"},s.createElement(w.Z,null),s.createElement("span",null,G),"  ",s.createElement("strong",null,"·"),"  ",s.createElement("span",null,null===(Z=n.data.mdx.fields)||void 0===Z||null===(M=Z.timeToRead)||void 0===M?void 0:M.text)),s.createElement("div",{className:"inline-flex flex-row items-center article-header-info-share"},s.createElement(E.Z,{shareRef:U},s.createElement(r.Z,{url:P.href,title:null===(A=n.data.mdx.frontmatter)||void 0===A?void 0:A.title,quote:null===(z=n.data.mdx.frontmatter)||void 0===z?void 0:z.description,ref:U,tabIndex:-1},s.createElement(f.Z,null)),s.createElement("p",{className:"invisible w-0 sm:visible sm:w-fit"},"Share")),s.createElement(E.Z,{shareRef:V},s.createElement(i.Z,{url:P.href,title:null===(B=n.data.mdx.frontmatter)||void 0===B?void 0:B.title,summary:null===(D=n.data.mdx.frontmatter)||void 0===D?void 0:D.description,ref:V,tabIndex:-1},s.createElement(g.Z,null)),s.createElement("p",{className:"invisible w-0 sm:visible sm:w-fit"},"Post")),s.createElement(E.Z,{shareRef:W},s.createElement(u.Z,{url:P.href,title:null===(F=n.data.mdx.frontmatter)||void 0===F?void 0:F.title,ref:W,tabIndex:-1},s.createElement(v.Z,null)),s.createElement("p",{className:"invisible w-0 sm:visible sm:w-fit"},"Tweet"))))),s.createElement("section",{className:"flex flex-col",itemProp:"articleBody"},n.children))))},S=n=>{var e,a,t,o,l;let{data:c,...p}=n;return s.createElement(d.Z,{title:(null===(e=c.mdx.frontmatter)||void 0===e?void 0:e.title)+" | Rishi's blog",description:null===(a=c.mdx.frontmatter)||void 0===a?void 0:a.description,keywords:null===(t=c.mdx.frontmatter)||void 0===t?void 0:t.keywords,image:null===(o=c.mdx.frontmatter)||void 0===o||null===(l=o.hero_image)||void 0===l?void 0:l.publicURL,articleData:c.mdx,type:"NewsArticle"})};function j(n){return s.createElement(_,n,s.createElement(l,n))}}}]);
//# sourceMappingURL=component---src-pages-mdx-fields-slug-tsx-content-file-path-cache-gatsby-source-git-content-articles-automate-lighthouse-audits-progressive-web-app-index-mdx-c74180a57aa52b97a267.js.map