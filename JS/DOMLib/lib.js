const DOMLib=function(){function a(a){return new Promise(function(c,d){let b=new XMLHttpRequest;b.open("GET",a,!0),b.send(null),b.onreadystatechange=function(){if(4===b.readyState){if(200===b.status){let a=b.getResponseHeader("Content-Type");1!==a.indexOf("text")?c(b.responseText):c(b.response)}else d(b)}}})}function b(b,c,d,e){this.title=b,this.htmlDirectory=c,this.htmlPartial=null,this.htmlPartialLoaded=!1,a(this.htmlDirectory).then(a=>{this.htmlPartial=a,this.htmlPartialLoaded=!0,e.$progress()}),this.jsControllerDirectory=d,this.jsController=null,this.jsControllerLoaded=!1,a(this.jsControllerDirectory).then(a=>{this.jsController=a,this.jsControllerLoaded=!0,e.$progress()})}function c(a,b,c){this.name=a,this.value=b,this.settings=c}class d{constructor(a){this.name=a,this.Variables=[]}DOM(d,f,e=null,g=null,c=[]){let b=g?g.childNodes:document.childNodes;for(let a=0;a<b.length;a++)b[a]&&((!e||b[a].tagName===e.toUpperCase())&&"getAttribute"in b[a]&&b[a].getAttribute(d)&&b[a].getAttribute(d)===f&&c.push(b[a]),b[a].childNodes.length>0&&this.DOM(d,f,e,b[a],c));return c.length>1?c:1===c.length?c[0]:null}CreateVariable(d,e,f=["out"]){for(let b=0;b<this.Variables.length;b++)if(this.Variables[b].name===d)return this.Variables[b].value=e,this.Variables[b].settings=f,console.warn("[DOMLibController] Called APP.CreateVariable with the same name as another variable ("+d+"), previous variable overwritten (to set a variable use APP.SetVariable(name, value))."),this.Variables[b];let a=new c(d,e,f);return void 0!==a.value&&a.settings.includes("out")&&this.DOM("name",a.name,"variable")&&(this.DOM("name",a.name,"variable").textContent=a.value),a.settings.includes("in")&&this.DOM("name",a.name,"variable")&&(a.value=this.DOM("name",a.name,"variable").textContent),this.Variables.push(a),a.value}GetVariable(b){for(let a=0;a<this.Variables.length;a++)if(this.Variables[a].name===b)return this.Variables[a].settings.includes("in")&&this.DOM("name",this.Variables[a].name,"variable")&&(this.Variables[a].value=this.DOM("name",this.Variables[a].name,"variable").textContent),this.Variables[a];return null}SetVariable(b,c){for(let a=0;a<this.Variables.length;a++)if(this.Variables[a].name===b){this.Variables[a].value=c,this.Variables[a].settings.includes("out")&&this.DOM("name",this.Variables[a].name,"variable")&&(this.DOM("name",this.Variables[a].name,"variable").textContent=this.Variables[a].value);break}return null}}class e{constructor(c){this.$appName=c,this.$pages=[],this.$pageContentLoaded=0,this.Page="",this.onload=function(){},this.Controllers=[];let a=document.getElementsByTagName("title");if(a.length>0)a[0].innerHTML=this.$appName;else{let b=document.createElement("title");b.textContent=this.$appName,document.getElementsByTagName("head")[0].append(b)}}Input(a,b){return new Promise(function(j,k){let g=document.getElementsByTagName("body")[0],d=document.createElement("dialog");d.style["background-color"]="#c8c8c8",d.style["border-radius"]="10px";let e=document.createElement("div");e.style["background-color"]="rgba(0, 0, 0, 0.1)",e.style.position="absolute",e.style.left="0px",e.style.top="0px",e.style.width=g.width,e.style.height=g.height,g.appendChild(e);let h=document.createElement("h2");h.textContent=a,d.appendChild(h),d.appendChild(document.createElement("br"));let i=document.createElement("input");d.appendChild(i),d.appendChild(document.createElement("br")),d.appendChild(document.createElement("br"));for(let f=0;f<b.length;f++){let c=document.createElement("button");c.style["padding-left"]=c.style["padding-right"]="6px",c.style["padding-top"]=c.style["padding-bottom"]="4px",c.style["border-radius"]="6px",c.style.cursor="pointer","Ok"===b[f]||"Submit"===b[f]?(c.style["background-color"]="#1e90ff",c.style.border="2px solid #4682b4",c.style["border-radius"]="4px",c.style.color="#ffffff"):("cancel"===b[f]||"close"===b[f])&&(c.style["background-color"]="#fa7575",c.style.border="2px solid #b55757",c.style["border-radius"]="4px",c.style.color="#ffffff"),c.textContent=b[f],c.addEventListener("click",function(){"Ok"===c.textContent||"Submit"===c.textContent?j(i.value):("Cancel"===c.textContent||"Close"===c.textContent)&&k("cancelled"),g.removeChild(d),g.removeChild(e)}),d.appendChild(c)}g.appendChild(d),d.showModal()})}$progress(){this.$pageContentLoaded++,this.$pageContentLoaded===2*this.$pages.length&&this.onload()}GetPage(b){for(let a=0;a<this.$pages.length;a++)if(this.$pages[a].title===b)return this.$pages[a];return null}CreatePage(a,c,d){return this.$pages.push(new b(a,c,d,this))}RefreshAllContent(){this.$pageContentLoaded=0,this.$pages.forEach(function(a){return a=new b(a.title,a.htmlDirectory,a.jsControllerDirectory,this)})}Render(b){if(b||""===this.Page||"string"!=typeof this.Page){if(this.$pages.length>0)b?this.Page=this.GetPage(b).title:this.Page=this.$pages[0].title;else throw new Error("[APP] No pages created, create at least one page before rendering the page.")}let a=this.GetPage(this.Page);if(!a.htmlPartialLoaded||!a.jsControllerLoaded)throw new Error("[APP] Page cannot be rendered, content not yet loaded. (Use APP.onload to ensure page contents are not used before loaded.)");document.getElementsByTagName("body")[0].innerHTML=a.htmlPartial;let c=document.createElement("script");c.textContent=a.jsController,document.getElementsByTagName("body")[0].appendChild(c)}Controller(b){let a=new d(b);return this.Controllers.push(a),a}}return{Init:function(a){return delete this.Init,new e(a)},GET:a}}();console.log("Loaded DOMLib by Matthew James")
