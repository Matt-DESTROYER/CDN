const Randomiser={int:function(n,t=null){return"number"!=typeof t?~~(Math.random()*n):n===t?n:(n>t&&([n,t]=[t,n]),Math.round(Math.random()*(t-n))+n)},float:function(n,t=null){return"number"!=typeof t?Math.random()*n:n===t?n:(n>t&&([n,t]=[t,n]),Math.random()*(t-n)+n)},string:function(n,t=null){"string"!=typeof t&&(t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");let r="";for(let o=0;o<n;o++)r+=t[~~(Math.random()*t.length)];return r},array:function(n,t){const r=[];for(let o=0;o<n;o++)r.push(t[~~(Math.random()*t.length)]);return r},shuffleArray:function(n,t=!1){const r=[],o=[];for(let o=0;o<n.length;o++)t&&n[o]instanceof Array?r.push(this.shuffleArray(n[o],t)):r.push(n[o]);for(;r.length>0;)o.push(r.splice(~~(Math.random()*r.length),1)[0]);return o},shuffleString:function(n){const t=n.split("");let r="";for(;t.length>0;)r+=t.splice(~~(Math.random()*t.length),1)[0];return r},pick:function(n,t=!0){return"string"==typeof n?n[~~(Math.random()*n.length)]:n instanceof Array?(t&&(n=n.flat(1/0)),n[~~(Math.random()*n.length)]):void 0}};console.log("Loaded Randomiser.js by Matthew James");
