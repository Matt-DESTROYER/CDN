const Randomiser=function(){function a(c){let d=[];for(let b=0;b<c.length;b++)Array.isArray(c[b])?d.push(a(c[b])):d.push(c[b]);return d}return String.prototype.shuffle=function(){let a=this.split(""),b="";for(;a.length>0;)b+=a.splice(~~(Math.random()*a.length),1)[0];return b},Array.prototype.shuffle=function(e){let a=[],d=[];if(e)for(let b=0;b<this.length;b++)Array.isArray(this[b])?a.push(this[b].shuffle()):a.push(this[b]);else for(let c=0;c<this.length;c++)a.push(this[c]);for(;a.length>0;)d.push(a.splice(~~(Math.random()*a.length),1)[0]);return d},String.prototype.pick=function(){return this[~~(Math.random()*this.length)]},Array.prototype.pick=function(b){let a=this;return b&&(a=a.flat(1/0)),a[~~(Math.random()*a.length)]},{int:function(a,b=null){return"number"!=typeof b?~~(Math.random()*a):a===b?a:(a>b&&([a,b]=[b,a]),Math.round(Math.random()*(b-a))+a)},float:function(a,b=null){return"number"!=typeof b?Math.random()*a:a===b?a:(a>b&&([a,b]=[b,a]),Math.random()*(b-a)+a)},string:function(a,d){let b="";for(let c=0;c<d;c++)b+=a[~~(Math.random()*a.length)];return b},array:function(a,d){let b=[];for(let c=0;c<d;c++)b.push(a[~~(Math.random()*a.length)]);return b},shuffle:function i(b,j=!1){if(Array.isArray(b)){let c=[];if(j)for(let d=0;d<b.length;d++)Array.isArray(b[d])?c.push(i(b[d])):c.push(b[d]);else for(let e=0;e<b.length;e++)Array.isArray(b[e])?c.push(a(b[e])):c.push(b[e]);let g=[];for(;c.length>0;)g.push(c.splice(~~(Math.random()*c.length),1)[0]);return g}if("string"==typeof b){let f=b.split(""),h="";for(;f.length>0;)h+=f.splice(~~(Math.random()*f.length),1)[0];return h}return null},pick:function(a,b=!0){return"string"==typeof a?a[~~(Math.random()*a.length)]:Array.isArray(a)?(b&&(a=a.flat(1/0)),a[~~(Math.random()*a.length)]):null}}}();console.log("Loaded Randomiser.js by Matthew James")
