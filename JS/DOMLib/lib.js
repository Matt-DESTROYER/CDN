function GET(e){return new Promise((t,n)=>{const a=new XMLHttpRequest;a.open("GET",e,!0),a.send(null),a.onreadystatechange=(()=>{if(4===a.readyState&&200===a.status){1!==a.getResponseHeader("Content-Type").indexOf("text")&&t(a.responseText)}else 4===a.readyState&&t(a)})})}function Page(e,t,n,a){this.title=e,this.htmlDirectory=t,this.htmlPartialLoaded=!1,GET(this.htmlDirectory).then(e=>{this.htmlPartial=e,this.htmlPartialLoaded=!0,a.$progress()}),this.jsControllerDirectory=n,this.jsControllerLoaded=!1,GET(this.jsControllerDirectory).then(e=>{this.jsController=e,this.jsControllerLoaded=!0,a.$progress()})}HTMLElement.prototype.event=HTMLElement.prototype.addEventListener;class DOMLibVariable{constructor(e,t,n){this.name=e,this.value=t,this.settings=n}}class DOMLibController{constructor(e){this.name=e,this.Variables=[]}DOM(e,t,n=null){const a=n?n.childNodes:document.getElementsByTagName("body")[0].childNodes;for(let n=0;n<a.length;n++)if(a[n]){if("getAttribute"in a[n]&&a[n].getAttribute(e)&&a[n].getAttribute(e)===t)return a[n];a[n].childNodes.length>0&&this.DOM(e,t,a[n])}return null}CreateVariable(e,t,n){for(let a=0;a<this.Variables.length;a++)if(this.Variables[a].name===e)return this.Variables[a].value=t,this.Variables[a].settings=n,console.warn("["+this.name+"] Called "+this.name+".CreateVariable with the same name ("+e+") as another variable, previous variable overwritten (to set a variable use "+this.name+".SetVariable(name, value))."),this.Variables[a];const a=new DOMLibVariable(e,t||void 0,n||["out"]);return a.settings.includes("in")&&this.DOM("name",a.name)&&(a.value=this.DOM(a.name).textContent),a.settings.includes("out")&&this.DOM("name",a.name)&&(this.DOM("name",a.name).textContent=a.value),this.Variables.push(a),a.value}GetVariable(e){let t=null;for(let n=0;n<this.Variables.length;n++)this.Variables[n].name===e&&(t=this.Variables[n]);return t&&t.settings.includes("in")&&this.DOM("name",t.name)&&(t.value=this.DOM(t.name).textContent),t?t.value:null}SetVariable(e,t){let n=null;for(let a=0;a<this.Variables.length;a++)this.Variables[a].name===e&&(this.Variables[a].value=t,n=this.Variables[a]);return n&&n.settings.includes("out")&&this.DOM("name",n.name)&&(this.DOM("name",n.name).textContent=n.value),n?n.value:null}}class DOMLibInstance{constructor(e){this.$appName=e,this.$pages=[],this.$pageContentLoaded=0,this.Page="",this.onload=(()=>{}),this.Controllers=[];let t=document.getElementsByTagName("title");if(t.length>0)t[0].innerHTML=this.$appName;else{const e=document.createElement("title");e.textContent=this.$appName,document.getElementsByTagName("head")[0].append(e)}}Input(e,t){return new Promise((e,n)=>{const a=document.createElement("div");a.width=window.innerWidth,a.height=window.innerHeight,a.style.opacity=.8,a.style.position="fixed",a.style.top="0px",a.style.left="0px",a.style["z-index"]="1000";const s=document.createElement("h2");a.appendChild(s);const i=document.createElement("input");a.appendChild(i),t.forEach(t=>{const s=document.createElement("button");s.textContent=t,s.addEventListener("click",()=>(function(t){"Ok"===t||"Submit"===t?e(i.value):"Cancel"!==t&&"Close"!==t||n("cancelled by user"),document.getElementsByTagName("body")[0].removeChild(a)})(this.textContent)),a.appendChild(s)}),document.getElementsByTagName("body")[0].appendChild(a)})}$progress(){this.$pageContentLoaded++,this.$pageContentLoaded===2*this.$pages.length&&this.onload()}GetPage(e){for(let t=0;t<this.$pages.length;t++)if(this.$pages[t].title===e)return this.$pages[t];return null}CreatePage(e,t,n){return this.$pages.push(new Page(e,t,n,this))}RefreshAllContent(){this.$pageContentLoaded=0,this.$pages.forEach(e=>new Page(e.title,e.htmlDirectory,e.jsControllerDirectory,this))}Render(e){if(e||""===this.Page||"string"!=typeof this.Page){if(!(this.$pages.length>0))throw new Error("["+this.$appName+"] No pages created, create at least one page before rendering the page.");this.Page=e?this.GetPage(e).title:this.$pages[0].title}const t=this.GetPage(this.Page);if(!t.htmlPartialLoaded||!t.jsControllerLoaded)throw new Error("["+this.$appName+"] Page cannot be rendered, content not yet loaded. (Use "+this.$appName+".onload to ensure page contents are not used before loaded.)");document.getElementsByTagName("body")[0].innerHTML=t.htmlPartial;const n=document.createElement("script");n.textContent="{\n\t"+t.jsController.split("\n").join("\n\t")+"\n}",document.getElementsByTagName("body")[0].appendChild(n)}Controller(e){const t=new DOMLibController(e);return this.Controllers.push(t),t}}const DOMLib={Init:e=>new DOMLibInstance(e)};
