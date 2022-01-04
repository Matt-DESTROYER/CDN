function GET(e){return new Promise((t,n)=>{const s=new XMLHttpRequest;s.open("GET",e,!0),s.send(null),s.onreadystatechange=(()=>{if(4===s.readyState&&200===s.status){1!==s.getResponseHeader("Content-Type").indexOf("text")&&t(s.responseText)}else 4===s.readyState&&t(s)})})}function Page(e,t,n,s){this.title=e,this.htmlDirectory=t,this.htmlPartialLoaded=!1,GET(this.htmlDirectory).then(e=>{this.htmlPartial=e,this.htmlPartialLoaded=!0,s.$progress()}),this.jsControllerDirectory=n,this.jsControllerLoaded=!1,GET(this.jsControllerDirectory).then(e=>{this.jsController=e,this.jsControllerLoaded=!0,s.$progress()})}HTMLElement.prototype.event=HTMLElement.prototype.addEventListener;class DOMLibVariable{constructor(e,t,n){this.name=e,this.value=t,this.settings=n}}class DOMLibController{constructor(e){this.name=e,this.Variables=[]}DOM(e,t=null){const n=t?t.childNodes:document.getElementsByTagName("body")[0].childNodes;for(let t=0;t<n.length;t++)if(n[t]){if("getAttribute"in n[t]&&n[t].getAttribute("name")===e)return n[t];n[t].childNodes.length>0&&DOM(e,n[t])}return null}CreateVariable(e,t,n){return this.Variables.push(new DOMLibVariable(e,t||void 0,n||["out"])).value}GetVariable(e){let t=null;for(let n=0;n<this.Variables.length;n++)this.Variables[n].name===e&&(t=this.Variables[n]);return t&&t.settings.includes("in")&&this.DOM(t.name)&&(t.value=this.DOM(t.name).textContent),t?t.value:null}SetVariable(e,t){let n=null;for(let s=0;s<this.Variables.length;s++)this.Variables[s].name===e&&(this.Variables[s].value=t,n=this.Variables[s]);return n&&n.settings.includes("out")&&this.DOM(n.name)&&(this.DOM(n.name).textContent=n.value),n?n.value:null}}class DOMLibInstance{constructor(e){this.$appName=e,this.$pages=[],this.$pageContentLoaded=0,this.Page="",this.onload=(()=>{}),this.Controllers=[];let t=document.getElementsByTagName("title");if(t.length>0)t[0].innerHTML=this.$appName;else{const e=document.createElement("title");e.textContent=this.$appName,document.getElementsByTagName("head")[0].append(e)}}$progress(){this.$pageContentLoaded++,this.$pageContentLoaded===2*this.$pages.length&&this.onload()}GetPage(e){for(let t=0;t<this.$pages.length;t++)if(this.$pages[t].title===e)return this.$pages[t];return null}CreatePage(e,t,n){return this.$pages.push(new Page(e,t,n,this))}RefreshAllContent(){this.$pageContentLoaded=0,this.$pages.forEach(function(e){return new Page(e.title,e.htmlDirectory,e.jsControllerDirectory,this)})}Render(e){if(e||!this.Page){if(!(this.$pages.length>0))throw new Error("["+this.$appName+"] No pages created, create at least one page before rendering the page.");this.Page=e?this.GetPage(e).title:this.$pages[0].title}const t=this.GetPage(this.Page);if(!t.htmlPartialLoaded||!t.jsControllerLoaded)throw new Error("["+this.$appName+"] Page cannot be rendered, content not yet loaded. (Use "+this.$appName+".onload to ensure page contents are not used before loaded.)");document.getElementsByTagName("body")[0].innerHTML=t.htmlPartial;const n=document.createElement("script");n.textContent=t.jsController,document.getElementsByTagName("body")[0].append(n)}Controller(e){const t=new DOMLibController(e);return this.Controllers.push(t),t}}const DOMLib={Init:function(e){return new DOMLibInstance(e)}};
