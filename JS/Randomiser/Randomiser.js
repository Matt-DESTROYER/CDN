const Random={int:function(t,n=null){if(null===n)return Math.floor(Math.random()*t);if(t===n)return t;if(t>n){const r=n;n=t,t=r}return Math.floor(Math.random()*(n-t))+t},float:function(t,n=null){if(null===n)return Math.random()*t;if(t===n)return t;if(t>n){const r=n;n=t,t=r}return Math.random()*(n-t)+t},string:function(t,n=null){null===n&&(n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");let r="";for(let o=0;o<t;o++)r+=n[Math.floor(Math.random()*n.length)];return r},shuffleArray:function(t,n=!1){let r=[],o=[];for(let o=0;o<t.length;o++)t[o]instanceof Array&&n?r.push(this.shuffle(t[o],n)):r.push(t[o]);for(;r.length>0;)o.push(r.splice(Math.floor(Math.random()*r.length),1)[0]);return o},shuffleString:function(t){let n=t.split(""),r="";for(;n.length>0;)r+=n.splice(Math.floor(Math.random()*n.length),1)[0];return r},pickArray:function(t,n=!0){let r=Math.floor(Math.random()*t.length);return t[r]instanceof Array&&n?this.pick(t[r]):t[r]},pickString:function(t){return t[Math.floor(Math.random()*t.length)]}};
