const Random={int:function(n,t=null){if(null===t)return Math.round(Math.random()*n);if(n===t)return n;if(n>t){const r=t;t=n,n=r}return Math.round(Math.random()*(t-n))+n},float:function(n,t=null){if(null===t)return Math.random()*n;if(n===t)return n;if(n>t){const r=t;t=n,n=r}return Math.random()*(t-n)+n},string:function(n,t=null){null===t&&(t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");let r="";for(let l=0;l<n;l++)r+=t[Math.floor(Math.random()*t.length)];return r},shuffleArray:function(n,t=!1){let r=[],l=[];for(let l=0;l<n.length;l++)n[l]instanceof Array&&t?r.push(Random.shuffle(arrOrStr[l],t)):r.push(n[l]);for(;r.length>0;)l.push(r.splice(Math.floor(Math.random()*r.length),1)[0]);return l},shuffleString:function(n){let t=n.split(""),r="";for(;t.length>0;)r+=t.splice(Math.floor(Math.random()*t.length),1)[0];return r}};
