const GET=e=>new Promise((t,o)=>{const s=new XMLHttpRequest;s.open("GET",e,!0),s.send(null),s.onreadystatechange=(()=>{if(4===s.readyState&&200===s.status){1!==s.getResponseHeader("Content-Type").indexOf("text")&&t(s.responseText)}else 4===s.readyState&&t(s)})});class Page{constructor(e,t,o,s){this.title=e,this.htmlDirectory=t,this.htmlPartialLoaded=!1,GET(this.htmlDirectory).then(e=>{this.htmlPartial=e,this.htmlPartialLoaded=!0,s.pageComponentsLoaded++,console.log(this.htmlDirectory+" loaded")}),this.jsControllerDirectory=o,this.jsControllerLoaded=!1,GET(this.jsControllerDirectory).then(e=>{this.jsController=e,this.jsControllerLoaded=!0,s.pageComponentsLoaded++,console.log(this.jsControllerDirectory+" loaded")})}}class DOMLibInstance{constructor(e){this.$appName=e,this.$pages=[],this.$pageComponentsLoaded=0,this.Page="",this.onload=(()=>{});let t=document.getElementsByTagName("title");if(t.length>0)t[0].innerHTML=this.$appName;else{let e=document.createElement("title");e.textContent=this.$appName,document.getElementsByTagName("head")[0].append(e)}}get pagesComponentsLoaded(){return this.$pageComponentsLoaded}set pagesComponentsLoaded(e){return this.$pageComponentsLoaded=e,this.$pageComponentsLoaded===2*this.$pages.length&&(this.onload(),console.log("All content loaded")),this.$pageComponentsLoaded}GetPage(e){for(let t=0;t<this.$pages.length;t++)if(this.$pages[t].title===e)return this.$pages[t];return null}CreatePage(e,t,o){return this.$pages.push(new Page(e,t,o,this))}Render(e){if(!(this.$pages.length>0))throw new Error("["+this.$appName+"] No pages created, create at least one page before rendering the page.");this.Page=this.GetPage(e).title||this.$pages[0].title;const t=this.GetPage(this.Page);if(!t.htmlPartialLoaded||!t.jsControllerLoaded)throw new Error("["+this.$appName+"] Page cannot be rendered, content not yet loaded. (Use "+this.$appName+".onload to ensure page contents are not used before loaded.)");document.getElementsByTagName("body")[0].innerHTML=t.htmlPartial+"\n<script>"+t.jsController+"<\/script>"}}const DOMLib={Init:e=>new DOMLibInstance(e)};
