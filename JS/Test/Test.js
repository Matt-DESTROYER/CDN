const Test={equals:function(e,t,n=!0){if(null===e)return null===t;if(void 0===e)return void 0===t;if(typeof e!=typeof t)return!1;if(e instanceof Array){if(t instanceof Array==!1)return!1;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}if("string"!=typeof e||n){if("object"==typeof e){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if("object"==typeof e[n]){if(!this.equals(e[n],t[n]))return!1}else if(e[n]!==t[n])return!1;return!0}}else e=e.toLowerCase(),t=t.toLowerCase();return e===t},similar:function(e,t,n,o=!0){if(typeof e!=typeof t)return!1;if(e instanceof Array){for(;e.length<t.length;)e.push(void 0);for(;e.length>t.length;)t.push(void 0);let o=0,r=0;return e.forEach((e,n)=>{Test.equals(t[n],e)?o++:t.includes(e)&&(o+=.25),r++}),o/r*100>=n}if("number"==typeof e)return Math.max(e,t)-Math.min(e,t)>n;if("string"==typeof e){for(o||(e=e.toLowerCase(),t=t.toLowerCase());e.length<t.length;)e+=" ";for(;e.length>t.length;)t+=" ";let r=0,f=0;return e.split("").forEach((e,n)=>{t[n]===e?r++:t.includes(e)&&(r+=.25),f++}),r/f*100>=n}if("object"==typeof e){let o=0,r=0,f=[];for(let n in e)f.push(n),t[n]&&e[n]===t[n]&&o++,r++;for(let n in t)f.includes(n)||(e[n]&&e[n]===t[n]&&o++,r++);return o/r*100>=n}},functionSpeed:function(e,t,n=!1){let o,r=[];for(let n=0;n<t.length;n++)o=Date.now(),t[n]=e(...t[n]),r.push(Date.now()-o);if(n){for(let e=0;e<r.length;e++)console.log("Given the input "+t[e].join(", ")+" the input function took "+r[e]/1e3+" seconds and output "+t[e]);console.log("Average speed: "+r.reduce((e,t)=>e+t)/r.length/1e3+" seconds")}return r}};console.log("Loaded Test.js by Matthew James");
