let $canvas,$ctx,$previousFrame=0,$previousFrameReading=0,$frameRate=60,$frameCount=0,FPS=0,$scenes=[],$currentScene=0,width,height;const Input={get mouseToWorldCoordinates(){return new Vector2(this.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,this.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y)}},Time={startTime:0,"_dt":0,deltaTime:0,get timeElapsed(){return Date.now()-this.startTime},get now(){return Date.now()}},getHead=()=>document.head||document.querySelector("head"),getBody=()=>document.body||document.querySelector("body");let head,body;("complete"===document.readyState||"interactive"===document.readyState)&&(head=getHead(),body=getBody()),window.addEventListener("load",function(){head=getHead(),body=getBody()});const cursor=a=>$canvas.style.cursor=a,frameRate=(a=60)=>$frameRate=a,dist=(a,b,c,d)=>Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2)),degreesToRadians=a=>a*Math.PI/180,radiansToDegrees=a=>180*a/Math.PI,$=_=>document.querySelector(_),Randomiser=function(){function a(c){let d=[];for(let b=0;b<c.length;b++)Array.isArray(c[b])?d.push(a(c[b])):d.push(c[b]);return d}return String.prototype.shuffle=function(){let a=this.split(""),b="";for(;a.length>0;)b+=a.splice(~~(Math.random()*a.length),1)[0];return b},Array.prototype.shuffle=function(e){let a=[],d=[];if(e)for(let b=0;b<this.length;b++)Array.isArray(this[b])?a.push(this[b].shuffle()):a.push(this[b]);else for(let c=0;c<this.length;c++)a.push(this[c]);for(;a.length>0;)d.push(a.splice(~~(Math.random()*a.length),1)[0]);return d},String.prototype.pick=function(){return this[~~(Math.random()*this.length)]},Array.prototype.pick=function(b){let a=this;return b&&(a=a.flat(1/0)),a[~~(Math.random()*a.length)]},{int:function(a,b=null){return null===b?~~(Math.random()*a):a===b?a:(a>b&&([a,b]=[b,a]),Math.round(Math.random()*(b-a))+a)},float:function(a,b=null){return null===b?Math.random()*a:a===b?a:(a>b&&([a,b]=[b,a]),Math.random()*(b-a)+a)},string:function(a,d){let b="";for(let c=0;c<d;c++)b+=a[~~(Math.random()*a.length)];return b},array:function(a,d){let b=[];for(let c=0;c<d;c++)b.push(a[~~(Math.random()*a.length)]);return b},shuffle:function i(b,j=!1){if(Array.isArray(b)){let c=[];if(j)for(let d=0;d<b.length;d++)Array.isArray(b[d])?c.push(i(b[d])):c.push(b[d]);else for(let e=0;e<b.length;e++)Array.isArray(b[e])?c.push(a(b[e])):c.push(b[e]);let g=[];for(;c.length>0;)g.push(c.splice(~~(Math.random()*c.length),1)[0]);return g}if("string"==typeof b){let f=b.split(""),h="";for(;f.length>0;)h+=f.splice(~~(Math.random()*f.length),1)[0];return h}return null},pick:function(a,b=!0){return"string"==typeof a?a[~~(Math.random()*a.length)]:Array.isArray(a)?(b&&(a=a.flat(1/0)),a[~~(Math.random()*a.length)]):null}}}();console.log("Loaded Randomiser.js by Matthew James");const constrain=(a,b,c)=>a<b?b:a>c?c:a,clamp=constrain;function lerp(b,c,a){return a<0?a=0:a>1&&(a=1),b+(c-b)*a}const pi=Math.PI,pow=(a,b=2)=>a**b,log=Math.log,sqrt=Math.sqrt,round=Math.round,floor=a=>~~a,ceil=Math.ceil,min=Math.min,max=Math.max,abs=Math.abs,sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan;let keyDown,keyUp,keyPress,mouseDown,mouseUp,mouseClick,mouseMove;keyDown=keyUp=keyPress=mouseDown=mouseUp=mouseClick=mouseMove=function(){return null};const Tools={createCSS:function(b){let a=document.createElement("style");a.styleSheet?a.styleSheet.cssText=b:a.appendChild(document.createTextNode(b)),(document.head||document.getElementsByTagName("head")[0]).appendChild(a)},fullscreen:function(){$canvas&&($canvas.requestFullscreen?$canvas.requestFullscreen():$canvas.webkitRequestFullscreen?$canvas.webkitRequestFullscreen():$canvas.msRequestFullscreen&&$canvas.msRequestFullscreen())}},GameEngine={_backgroundColour:"#FFFFFF",Background:function(a){this._backgroundColour=a||"#FFFFFF"},Initialise:function(a=null,d=!0,b=null,c=null){return a?$canvas="string"==typeof a?document.getElementById(a):a:($canvas=document.createElement("canvas"),(document.body||document.getElementsByTagName("body")[0]).appendChild($canvas)),$ctx=$canvas.getContext("2d"),d?($canvas.style.position="absolute",$canvas.style.left=0,$canvas.style.top=0,$canvas.width=width=window.innerWidth,$canvas.height=height=window.innerHeight,Tools.createCSS("*{margin:0px;overflow:hidden;}"),window.addEventListener("resize",function(){$canvas.width=width=window.innerWidth,$canvas.height=height=window.innerHeight})):(null!==b&&($canvas.width=width=b),null!==c&&($canvas.height=height=c)),window.addEventListener("keydown",function(a){Input[(a=a||window.event).keyCode]=!0,Input[a.key.toString().toUpperCase()]=!0,Input.keyCode=a.keyCode,Input.key=a.key.toString().toUpperCase(),$scenes[$currentScene].children.forEach(a=>{a.enabled&&a.eventListeners.forEach(b=>{"keydown"===b.name&&b.func(a)})}),keyDown()}),window.addEventListener("keyup",function(a){Input[(a=a||window.event).keyCode]=!1,Input[a.key.toString().toUpperCase()]=!1,$scenes[$currentScene].children.forEach(a=>{a.enabled&&a.eventListeners.forEach(b=>{"keyup"===b.name&&b.func(a)})}),keyUp()}),window.addEventListener("keypress",function(){$scenes[$currentScene].children.forEach(a=>{a.enabled&&a.eventListeners.forEach(b=>{"keypress"===b.name&&b.func(a)})}),keyPress()}),window.addEventListener("mousedown",function(a){a=a||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;let b=$canvas.getBoundingClientRect();Input.mouseX=a.clientX-b.left,Input.mouseY=a.clientY-b.top,Input.mouseDown=!0,$scenes[$currentScene].children.forEach(a=>{a.enabled&&a.eventListeners.forEach(b=>{"mousedown"===b.name&&b.func(a)})}),mouseDown()}),window.addEventListener("mouseup",function(a){a=a||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;let b=$canvas.getBoundingClientRect();Input.mouseX=a.clientX-b.left,Input.mouseY=a.clientY-b.top,Input.mouseDown=!1,$scenes[$currentScene].children.forEach(a=>{a.enabled&&a.eventListeners.forEach(b=>{"mouseup"===b.name&&b.func(a)})}),mouseUp()}),window.addEventListener("click",function(a){a=a||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;let b=$canvas.getBoundingClientRect();Input.mouseX=a.clientX-b.left,Input.mouseY=a.clientY-b.top,$scenes[$currentScene].children.forEach(a=>{a.enabled&&(a.readyMesh(),a.mesh.rotate(a.rotation),a.mesh.pointInPolygon(new Vector2(Input.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,Input.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y))?(a.mesh.rotate(-a.rotation),a.resetMesh(),a.eventListeners.forEach(b=>{"click"===b.name&&b.func(a)})):(a.mesh.rotate(-a.rotation),a.resetMesh()))}),mouseClick()}),window.addEventListener("mousemove",function(a){a=a||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;let b=$canvas.getBoundingClientRect();Input.mouseX=a.clientX-b.left,Input.mouseY=a.clientY-b.top,$scenes[$currentScene].children.forEach(a=>{a.enabled&&a.eventListeners.forEach(b=>{"mousemove"===b.name?b.func(a):Input.mouseDown&&"mousedrag"===b.name&&(a.readyMesh(),a.mesh.rotate(a.rotation),a.mesh.pointInPolygon(new Vector2(Input.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,Input.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y))?(a.mesh.rotate(-a.rotation),a.resetMesh(),b.func(a)):(a.mesh.rotate(-a.rotation),a.resetMesh()))})}),mouseMove()}),$canvas},Start:function(){if($ctx){if($scenes.length<1)throw new Error("[2D Game Engine] No scenes. (Create at least one scene new Scene(children, camera))");Time.startTime=Date.now(),GameEngine.Update()}else throw new Error("[2D Game Engine] No context. (Call GameEngine.Initialise(canvas?, fullScreen?, width?, height?))")},Update:function(a){Time.deltaTime=a-$previousFrame,$frameCount++,a-$previousFrameReading>=1e3&&(FPS=$frameCount,$frameCount=0,$previousFrameReading=a),a-$previousFrame>=1e3/$frameRate&&($scenes[$currentScene].started||$scenes[$currentScene].start(),$scenes[$currentScene].update(),GameEngine.Render(),$previousFrame=a),Time._dt=a,window.requestAnimationFrame(GameEngine.Update)},Render:function(){$ctx.clearRect(0,0,$canvas.width,$canvas.height),this._backgroundColour&&($ctx.fillStyle=this._backgroundColour,$ctx.fillRect(0,0,$canvas.width,$canvas.height)),$scenes[$currentScene].render()}};class Vector2{constructor(a,b){this.x=a,this.y=b}add(a){this.x+=a.x,this.y+=a.y}sub(a){this.x-=a.x,this.y-=a.y}mult(a){this.x*=a.x,this.y*=a.y}div(a){this.x/=a.x,this.y/=a.y}dist(a){return Math.sqrt((a.x-this.x)**2+(a.y-this.y)**2)}dot(a){return this.x*a.x+this.y*a.y}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let a=Math.sqrt(this.x*this.x+this.y*this.y);return[this.x/a,this.y/a]}toString(){return this.x+", "+this.y}array(){return[this.x,this.y]}clone(){return new Vector2(this.x,this.y)}static dist(a,b){return Math.sqrt((b.x-a.x)**2+(b.y-a.y)**2)}static dot(a,b){return a.x*b.x+a.y*b.y}static array(a){return[a.x,a.y]}static Zero(){return new Vector2(0,0)}}class Point extends Vector2{constructor(a,b){super(a,b)}}class Line{constructor(a,b){this.point1=a,this.point2=b}get x1(){return this.point1.x}set x1(a){this.point1.x=a}get y1(){return this.point1.y}set y1(a){this.point1.y=a}get x2(){return this.point2.x}set x2(a){this.point2.x=a}get y2(){return this.point2.y}set y2(a){this.point2.y=a}pointOnLine(a){let b=(this.y2-this.y1)/(this.x2-this.x1),c=this.y1-b*this.x1;return a.y===b*a.x+c}pointInLine(a){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(a)&&a.x>=this.x1&&a.x<=this.x2&&a.y>=this.y1&&a.y<=this.y2:this.pointOnLine(a)&&a.x>=this.x1&&a.x<=this.x2&&a.y>=this.y2&&a.y<=this.y1:this.y1<this.y2?this.pointOnLine(a)&&a.x>=this.x2&&a.x<=this.x1&&a.y>=this.y1&&a.y<=this.y2:this.pointOnLine(a)&&a.x>=this.x2&&a.x<=this.x1&&a.y>=this.y2&&a.y<=this.y1}intersects(a){if(this.pointInLine(a.point1)||this.pointInLine(a.point2))return!0;let b=(this.x2-this.x1)*(a.y2-a.y1)-(a.x2-a.x1)*(this.y2-this.y1);if(0===b)return!1;let c=((a.y2-a.y1)*(a.x2-this.x1)+(a.x1-a.x2)*(a.y2-this.y1))/b,d=((this.y1-this.y2)*(a.x2-this.x1)+(this.x2-this.x1)*(a.y2-this.y1))/b;return c>0&&c<1&&d>0&&d<1}clone(){return new Line(this.point1.clone(),this.point2.clone())}}class PolygonMesh{constructor(a){this.lines=[],this.maxX=0;for(let b=0;b<a.length-1;b++)this.maxX+=Math.abs(a[b].x),this.maxX+=Math.abs(a[b+1].x),this.lines.push(new Line(a[b],a[b+1]));this.lines.push(new Line(a[a.length-1],a[0])),this.maxX*=10}changeX(b){for(let a=0;a<this.lines.length;a++)this.lines[a].point1.x+=b,this.lines[a].point2.x+=b;this.maxX+=b}changeY(b){for(let a=0;a<this.lines.length;a++)this.lines[a].point1.y+=b,this.lines[a].point2.y+=b}move(a,b){this.changeX(a),this.changeY(b)}getMidpoint(){let a=new Vector2(0,0);for(let b=0;b<this.lines.length;b++)a.add(this.lines[b].point1);return a.x/=this.lines.length,a.y/=this.lines.length,a}resetMesh(){let a=this.getMidpoint();this.move(-a.x,-a.y)}rotate(b){let e=this.getMidpoint();this.changeX(-e.x),this.changeY(-e.y);for(let a=0;a<this.lines.length;a++){let c=this.lines[a].point1.x,d=this.lines[a].point1.y;this.lines[a].point1.x=c*Math.cos(b)-d*Math.sin(b),this.lines[a].point1.y=c*Math.sin(b)+d*Math.cos(b),c=this.lines[a].point2.x,d=this.lines[a].point2.y,this.lines[a].point2.x=c*Math.cos(b)-d*Math.sin(b),this.lines[a].point2.y=c*Math.sin(b)+d*Math.cos(b),this.maxX=Math.max(this.maxX,this.lines[a].point1.x,this.lines[a].point2.x)}this.changeX(e.x),this.changeY(e.y)}pointInPolygon(c){let d=new Line(c,new Vector2(10*this.maxX,c.y)),a=!1;for(let b=0;b<this.lines.length;b++)a=this.lines[b].intersects(d)?!a:a;return a}collision(a){for(let b=0;b<this.lines.length;b++)if(a.pointInPolygon(new Vector2(this.lines[b].x1,this.lines[b].y1)))return!0;for(let c=0;c<a.lines.length;c++)if(this.pointInPolygon(new Vector2(a.lines[c].x1,a.lines[c].y1)))return!0;return!1}render(b){$ctx.fillStyle=b,$ctx.beginPath(),$ctx.moveTo(this.lines[0].point1.x,this.lines[0].point1.y);for(let a=0;a<this.lines.length;a++)$ctx.lineTo(this.lines[a].point2.x,this.lines[a].point2.y);$ctx.lineTo(this.lines[0].point1.x,this.lines[0].point1.y),$ctx.fill(),$ctx.closePath()}clone(){for(let a=0;a<this.lines.length;a++)this.points.push(this.lines[a].point1.clone());return new PolygonMesh([])}}class RectangleMesh extends PolygonMesh{constructor(a,b,c=!0){c?super([new Vector2(-a/2,-b/2),new Vector2(a/2,-b/2),new Vector2(a/2,b/2),new Vector2(-a/2,b/2)]):super([new Vector2(0,0),new Vector2(a,0),new Vector2(a,b),new Vector2(0,b)])}}class EventListener{constructor(a,b){this.name=a,this.func=b}clone(){return new EventListener(this.name,this.func)}}class GameObject{constructor(a,b,c,d,e){this.x=a,this.y=b,this.xVel=0,this.resistance=.8,this.resistanceMultiplier=1,this.yVel=0,this.gravity=!1,this.gravityMultiplier=1,this.mesh=c,this.colour=d,this.rotation=0,this.layer=1,this.enabled=!0,this.tag=null,this.collides=e,this.collidingWith=[],this.eventListeners=[],this.children=[]}appendChild(a){return this.children.includes(a)?null:this.children.push(a)}removeChild(a){return -1!==this.children.indexOf(a)?this.children.splice(this.children.indexOf(a),1)[0]:null}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}start(){for(let a=0;a<this.eventListeners.length;a++)"start"===this.eventListeners[a].name&&this.eventListeners[a].func(this)}readyMesh(){this.mesh.move(this.x,this.y)}resetMesh(){this.mesh.move(-this.x,-this.y)}collision(a){this.readyMesh(),this.mesh.rotate(this.rotation);let b=this.mesh.collision(a);return this.mesh.rotate(-this.rotation),this.resetMesh(),b}rotate(a){this.rotation+=a}setRotation(a){this.rotation=a}setX(a){this.x=a}setY(a){this.y=a}setPosition(a,b){this.x=a,this.y=b}addXForce(a){this.xVel+=a}addYForce(a){this.yVel-=a}addForce(a,b){this.xVel+=a,this.yVel-=b}setXForce(a){this.xVel=a}setYForce(a){this.yVel=a}setForce(a,b){this.xVel=a,this.yVel=b}changeX(a){this.x+=a,this.enabled&&this.collides&&(a=Math.sign(a),$scenes[$currentScene].children.forEach(b=>{if(b!==this){if(b.readyMesh(),b.mesh.rotate(b.rotation),this.collision(b.mesh)){for(0===a&&(this.readyMesh(),this.mesh.rotate(this.rotation),a=this.mesh.midPoint().x>b.mesh.midPoint().x?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(b.mesh);)this.x-=a;this.xVel=0}b.mesh.rotate(-b.rotation),b.resetMesh()}}))}changeY(a){a=-a,this.y+=a,this.enabled&&this.collides&&(a=Math.sign(a),$scenes[$currentScene].children.forEach(b=>{if(b!==this){if(b.readyMesh(),b.mesh.rotate(b.rotation),this.collision(b.mesh)){for(0===a&&(this.readyMesh(),this.mesh.rotate(this.rotation),a=this.mesh.midPoint().y>b.mesh.midPoint().y?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(b.mesh);)this.y-=a;this.yVel=0}b.mesh.rotate(-b.rotation),b.resetMesh()}}))}physics(){if(this.enabled){if(this.gravity?this.yVel+=this.gravityMultiplier:this.yVel*=this.resistance*this.resistanceMultiplier,this.xVel*=this.resistance*this.resistanceMultiplier,this.collides){this.x+=this.xVel,this.y+=this.yVel;for(let c=0;c<$scenes[$currentScene].children.length;c++){let a=$scenes[$currentScene].children[c];a!==this&&(a.readyMesh(),a.mesh.rotate(a.rotation),this.collision(a.mesh)?this.collidingWith.includes(a)||this.collidingWith.push(a):this.collidingWith.includes(a)&&this.collidingWith.splice(this.collidingWith.indexOf(a),1),a.rotate(-a.rotation),a.resetMesh())}this.x-=this.xVel,this.y-=this.yVel}this.changeY(-this.yVel),this.changeX(this.xVel);for(let d=0;d<this.collidingWith.length;d++)for(let b=0;b<this.eventListeners.length;b++)"collision"===this.eventListeners[b].name&&this.eventListeners[b].func(this,this.collidingWith[d])}}render(){this.colour instanceof Image&&this.colour.complete?$ctx.drawImage(this.colour,this.x-this.colour.width/2,this.y-this.colour.height/2):"function"==typeof this.colour?this.colour(this.x,this.y,this.rotation):(this.readyMesh(),this.mesh.rotate(this.rotation),this.mesh.render(this.colour),this.mesh.rotate(-this.rotation),this.resetMesh())}clone(){let a=new GameObject(this.x,this.y,this.mesh.clone(),this.colour,this.collides,this.eventListeners.map(a=>a.clone()),this.children.slice());return a.xVel=this.xVel,a.resistance=this.resistance,a.resistanceMultiplier=this.resistanceMultiplier,a.yVel=this.yVel,a.gravity=this.gravity,a.gravityMultiplier=this.gravityMultiplier,a.rotation=this.rotation,a.layer=this.layer,a.enabled=this.enabled,a.collidingWith=this.collidingWith.slice(),a}}class Camera{constructor(a,b){this.x=a,this.y=b,this.eventListeners=[]}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}smoothMove(b,c,a){this.x=lerp(this.x,b,a),this.y=lerp(this.y,c,a)}clone(){return new Camera(this.x,this.y)}}class Scene{constructor(a,b){this.children=a,this.camera=b,this.started=!1,this.eventListeners=[],$scenes.push(this)}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}start(){for(let b=0;b<this.camera.eventListeners;b++)"start"===this.camera.eventListeners[b].name&&this.camera.eventListeners[b].func(this.camera);for(let a=0;a<this.children.length;a++)if(this.children[a].enabled)for(let c=0;c<this.children[a].eventListeners.length;c++)"start"===this.children[a].eventListeners[c].name&&this.children[a].eventListeners[c].func(this.children[a]);for(let d=0;d<this.eventListeners.length;d++)"start"===this.eventListeners[d].name&&this.eventListeners[d].func(this);this.started=!0}update(){this.camera.eventListeners.forEach(a=>{"update"===a.name&&a.func(this.camera)}),this.children.sort((a,b)=>a.layer<b.layer?-1:1),this.children.forEach(a=>{a.physics(),a.enabled&&a.eventListeners.forEach(b=>{"update"===b.name&&b.func(a)})}),this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}render(){$ctx.save(),$ctx.translate($canvas.width/2-this.camera.x,$canvas.height/2-this.camera.y),this.children.forEach(a=>{a.enabled&&(a.render(),a.eventListeners.forEach(b=>{"render"===b.name&&b.func(a)}))}),$ctx.restore()}clone(){let a=new Scene(this.children.map(a=>a.clone()),this.camera.clone());return a.started=this.started,a.eventListeners=this.eventListeners.map(a=>a.clone()),a}}console.log("Loaded 2DGameEngineJS by Matthew James")
