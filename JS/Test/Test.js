const Test=(function(){let a=function(b,c,f=!0){if(null===b)return null===c;if(void 0===b)return void 0===c;if(isNaN(b))return isNaN(c);if(typeof b!=typeof c)return!1;if(Array.isArray(b)){if(!Array.isArray(c)||b.length!==c.length)return!1;for(let e=0;e<b.length;e++)if(b[e]!==c[e])return!1;return!0}if("string"!=typeof b||f){if("object"==typeof b){if(Object.keys(b).length!==Object.keys(c).length)return!1;for(let d in b)if(Array.isArray(b[d])&&!a(b[d],c[d])||"object"==typeof b[d]&&!a(b[d],c[d])||b[d]!==c[d])return!1;return!0}}else b=b.toLowerCase(),c=c.toLowerCase();return b===c};return{equals:a,similar:function(b,c,d,j=!0){if(typeof b!=typeof c)return!1;if(Array.isArray(b)){for(;b.length<c.length;)b.push(void 0);for(;b.length>c.length;)c.push(void 0);let k=0,l=0;return b.forEach((b,d)=>{a(c[d],b)?k++:c.includes(b)&&(k+=.25),l++}),k/l*100>=d}if("number"==typeof b)return Math.max(b,c)-Math.min(b,c)>d;if("string"==typeof b){for(j||(b=b.toLowerCase(),c=c.toLowerCase());b.length<c.length;)b+=" ";for(;b.length>c.length;)c+=" ";let m=0,n=0;return b.split("").forEach((a,b)=>{c[b]===a?m++:c.includes(a)&&(m+=.25),n++}),m/n*100>=d}if("object"==typeof b){let g=0,h=0,i=[];for(let e in b)i.push(e),c[e]&&b[e]===c[e]&&g++,h++;for(let f in c)!i.includes(f)&&(b[f]&&b[f]===c[f]&&g++,h++);return g/h*100>=d}throw new TypeError("[Test.similar] Unexpected input type...")},functionSpeed:function(h,c,i=!1){let a=[],e=[],f,g;for(let d=0;d<c.length;d++)f=Date.now(),g=h(...c[d]),a.push(Date.now()-f),e.push(g);if(i){for(let b=0;b<a.length;b++)console.log("Given the input "+c[b].join(", ")+" the input function took "+a[b]/1e3+" seconds and output "+e[b]);console.log("Average speed: "+a.reduce((a,b)=>a+b)/a.length/1e3+" seconds")}return a}}})();console.log("Loaded Test.js by Matthew James")
