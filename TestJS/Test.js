class Test{static equals(t,e){if(null===t)return null===e;if(void 0===t)return void 0===e;if(typeof t!=typeof e)return!1;if("object"==typeof t){for(let r in t){if(!e[r])return!1;if(t[r]!==e[r])return!1}for(let r in e){if(!t[r])return!1;if(t[r]!==e[r])return!1}return!0}return t===e}static similar(t,e,r,n=!1){if(typeof t!=typeof e)return!1;if(t instanceof Array){for(;t.length<e.length;)t.push(void 0);for(;t.length>e.length;)e.push(void 0);let n=0,f=0;return t.forEach((t,r)=>{Test.equals(e[r],t)?n++:e.includes(t)&&(n+=.25),f++}),n/f*100>=r}if("number"==typeof t)return Math.max(t,e)-Math.min(t,e)>r;if("string"==typeof t){for(n||(t=t.toLowerCase(),e=e.toLowerCase());t.length<e.length;)t+=" ";for(;t.length>e.length;)e+=" ";let f=0,i=0;return t.split("").forEach((t,r)=>{e[r]===t?f++:e.includes(t)&&(f+=.25),i++}),f/i*100>=r}if("object"==typeof t){let n=0,f=0,i=[];for(const r in t)i.push(r),e[r]&&t[r]===e[r]&&n++,f++;for(const r in e)i.includes(r)||(t[r]&&t[r]===e[r]&&n++,f++);return n/f*100>=r}}}
