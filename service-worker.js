if(!self.define){let e,c={};const a=(a,i)=>(a=new URL(a+".js",i).href,c[a]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=c,document.head.appendChild(e)}else e=a,importScripts(a),c()})).then((()=>{let e=c[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(c[t])return;let o={};const r=e=>a(e,t),s={module:{uri:t},exports:o,require:r};c[t]=Promise.all(i.map((e=>s[e]||r(e)))).then((e=>(n(...e),o)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"cbt-app"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/chat-cbt/css/app.004ad02d.css",revision:null},{url:"/chat-cbt/favicon/android-chrome-192x192.png",revision:"207e317d53a62a5d2054471e6e12a225"},{url:"/chat-cbt/favicon/android-chrome-512x512.png",revision:"f9e3470a75a4b1cfaa8defca42221ba0"},{url:"/chat-cbt/favicon/apple-touch-icon.png",revision:"5c3bcf1fb344f33794961092d3071a24"},{url:"/chat-cbt/favicon/browserconfig.xml",revision:"7d5687eb48064a332d2ae8a86607b94f"},{url:"/chat-cbt/favicon/favicon-16x16.png",revision:"d60340825aee1afffd9a421bcc3b0b8c"},{url:"/chat-cbt/favicon/favicon-32x32.png",revision:"3dab5e3f69c7f4443f80a91928216e80"},{url:"/chat-cbt/favicon/mstile-150x150.png",revision:"4b6d921a4afc837b59a2959b6354f215"},{url:"/chat-cbt/favicon/safari-pinned-tab.svg",revision:"1a65577cbdcce3574a09aa9bae5970c7"},{url:"/chat-cbt/favicon/site.webmanifest",revision:"35f3698d1ef7a7459be6ec9005be6466"},{url:"/chat-cbt/index.html",revision:"e95695aaab1905dc045392c6b612d0bc"},{url:"/chat-cbt/js/app.42ee3bde.js",revision:null},{url:"/chat-cbt/js/chunk-vendors.b8db82d2.js",revision:null},{url:"/chat-cbt/manifest.json",revision:"a009722d206bce74b55ef0a0afd8ab71"},{url:"/chat-cbt/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
