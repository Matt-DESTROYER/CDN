const GET=e=>new Promise((t,s)=>{const r=new XMLHttpRequest;r.open("GET",e,!0),r.send(null),r.onreadystatechange=(()=>{if(4===r.readyState&&200===r.status){1!==r.getResponseHeader("Content-Type").indexOf("text")&&t(r.responseText)}})});class Page{constructor(e,t,s){this.title=e,this.htmlDirectory=t,GET(this.htmlDirectory).then(e=>this.htmlPartial=e),this.jsControllerDirectory=s,GET(this.jsControllerDirectory).then(e=>this.jsController=e)}}const DOMLib={Init:e=>({$appName:e,$pages:[],GetPage:e=>{for(let t=0;t<$pages.length;t++)if($pages[t].title===e)return $pages[t];return null},Page:"",CreatePage:(e,t,s)=>this.$pages.push(new Page(e,t,s)),Render:e=>{if(!(this.$pages.length>0))throw new Error("["+this.$appName+"] No pages created, create at least one page before rendering the page.");this.Page=this.$pages.includes(e)?e:this.$pages[0];let t=this.GetPage(this.Page);document.getElementByTagName("body")[0].innerHTML=t.htmlPartial+"\n<script>"+t.jsController+"<\/script>"}})};
