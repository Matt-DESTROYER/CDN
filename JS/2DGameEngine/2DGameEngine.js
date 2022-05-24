let $canvas,$ctx,width,height,$previousFrame=0,$previousFrameReading=0,$frameRate=60,$frameCount=0,FPS=0,$scenes=[],$currentScene=0;const Input={get mouseToWorldCoordinates(){return new Vector2(this.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,this.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y)}},Time={startTime:0,_dt:0,deltaTime:0,get timeElapsed(){return Date.now()-this.startTime},get now(){return Date.now()}},getHead=()=>document.head||document.getElementsByTagName("head")[0],getBody=()=>document.body||document.getElementsByTagName("body")[0];let head="complete"===document.readyState||"interactive"===document.readyState?getHead():window.addEventListener("load",function(){head=getHead()}),body="complete"===document.readyState||"interactive"===document.readyState?getBody():window.addEventListener("load",function(){body=getBody()});const cursor=e=>$canvas.style.cursor=e,frameRate=(e=60)=>$frameRate=e,dist=(e,t,s,n)=>Math.sqrt(Math.pow(s-e,2)+Math.pow(n-t,2)),degreesToRadians=e=>e*Math.PI/180,radiansToDegrees=e=>180*e/Math.PI,$=e=>document.querySelector(e),Randomiser=(String.prototype.shuffle=function(){const e=this.split("");let t="";for(;e.length>0;)t+=e.splice(~~(Math.random()*e.length),1)[0];return t},Array.prototype.shuffle=function(e){const t=[],s=[];if(e)for(let e=0;e<this.length;e++)this[e]instanceof Array?t.push(this[e].shuffle()):t.push(this[e]);else for(let e=0;e<this.length;e++)t.push(this[e]);for(;t.length>0;)s.push(t.splice(~~(Math.random()*t.length),1)[0]);return s},String.prototype.pick=function(){return this[~~(Math.random()*this.length)]},Array.prototype.pick=function(e){const t=this;return e&&(t=t.flat(1/0)),t[~~(Math.random()*t.length)]},{int:function(e,t=null){return"number"!=typeof t?~~(Math.random()*e):e===t?e:(e>t&&([e,t]=[t,e]),Math.round(Math.random()*(t-e))+e)},float:function(e,t=null){return"number"!=typeof t?Math.random()*e:e===t?e:(e>t&&([e,t]=[t,e]),Math.random()*(t-e)+e)},string:function(e,t){let s="";for(let n=0;n<t;n++)s+=e[~~(Math.random()*e.length)];return s},array:function(e,t){const s=[];for(let n=0;n<t;n++)s.push(e[~~(Math.random()*e.length)]);return s},shuffle:function(e,t=!1){if(e instanceof Array){const s=[],n=[];if(t)for(let t=0;t<e.length;t++)e[t]instanceof Array?s.push(e[t].shuffle()):s.push(e[t]);else for(let t=0;t<e.length;t++)s.push(e[t]);for(;s.length>0;)n.push(s.splice(~~(Math.random()*s.length),1)[0]);return n}if("string"==typeof e){const t=e.split("");let s="";for(;t.length>0;)s+=t.splice(~~(Math.random()*t.length),1)[0];return s}return null},pick:function(e,t=!0){return"string"==typeof e?e[~~(Math.random()*e.length)]:e instanceof Array?(t&&(e=e.flat(1/0)),e[~~(Math.random()*e.length)]):null}});console.log("Loaded Randomiser.js by Matthew James");const constrain=(e,t,s)=>e<t?t:e>s?s:e,clamp=constrain;function lerp(e,t,s){return s<0?s=0:s>1&&(s=1),e+(t-e)*s}const pi=Math.PI,pow=(e,t=2)=>e**t,log=Math.log,sqrt=Math.sqrt,round=Math.round,floor=e=>~~e,ceil=Math.ceil,min=Math.min,max=Math.max,abs=Math.abs,sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan;let keyDown,keyUp,keyPress,mouseDown,mouseUp,mouseClick,mouseMove;keyDown=keyUp=keyPress=mouseDown=mouseUp=mouseClick=mouseMove=function(){return null};const Tools={createCSS:function(e){const t=document.createElement("style");t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),(document.head||document.getElementsByTagName("head")[0]).appendChild(t)},fullscreen:function(){$canvas&&($canvas.requestFullscreen?$canvas.requestFullscreen():$canvas.webkitRequestFullscreen?$canvas.webkitRequestFullscreen():$canvas.msRequestFullscreen&&$canvas.msRequestFullscreen())}},GameEngine={_backgroundColour:"#FFFFFF",Background:function(e){this._backgroundColour=e||"#FFFFFF"},Initialise:function(e=null,t=!0,s=null,n=null){return e?$canvas="string"==typeof e?document.getElementById(e):e:($canvas=document.createElement("canvas"),(document.body||document.getElementsByTagName("body")[0]).appendChild($canvas)),$ctx=$canvas.getContext("2d"),t?($canvas.style.position="absolute",$canvas.style.left=0,$canvas.style.top=0,$canvas.width=width=window.innerWidth,$canvas.height=height=window.innerHeight,Tools.createCSS("*{margin:0px;overflow:hidden;}"),window.addEventListener("resize",function(){$canvas.width=width=window.innerWidth,$canvas.height=height=window.innerHeight})):(null!==s&&($canvas.width=width=s),null!==n&&($canvas.height=height=n)),document.addEventListener("keydown",function(e){e=e||window.event,Input[e.keyCode]=!0,Input[e.key.toString().toUpperCase()]=!0,Input.keyCode=e.keyCode,Input.key=e.key.toString().toUpperCase(),$scenes[$currentScene].children.forEach(e=>{e.enabled&&e.eventListeners.forEach(t=>{"keydown"===t.name&&t.func(e)})}),keyDown()}),document.addEventListener("keyup",function(e){e=e||window.event,Input[e.keyCode]=!1,Input[e.key.toString().toUpperCase()]=!1,$scenes[$currentScene].children.forEach(e=>{e.enabled&&e.eventListeners.forEach(t=>{"keyup"===t.name&&t.func(e)})}),keyUp()}),document.addEventListener("keypress",function(){$scenes[$currentScene].children.forEach(e=>{e.enabled&&e.eventListeners.forEach(t=>{"keypress"===t.name&&t.func(e)})}),keyPress()}),document.addEventListener("mousedown",function(){Input.mouseDown=!0,$scenes[$currentScene].children.forEach(e=>{e.enabled&&e.eventListeners.forEach(t=>{"mousedown"===t.name&&t.func(e)})}),mouseDown()}),document.addEventListener("mouseup",function(){Input.mouseDown=!1,$scenes[$currentScene].children.forEach(e=>{e.enabled&&e.eventListeners.forEach(t=>{"mouseup"===t.name&&t.func(e)})}),mouseUp()}),document.addEventListener("click",function(e){e=e||window.event,$scenes[$currentScene].children.forEach(e=>{e.enabled&&(e.readyMesh(),e.mesh.rotate(e.rotation),e.mesh.pointInPolygon(new Vector2(Input.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,Input.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y))?(e.mesh.rotate(-e.rotation),e.resetMesh(),e.eventListeners.forEach(t=>{"click"===t.name&&t.func(e)})):(e.mesh.rotate(-e.rotation),e.resetMesh()))}),mouseClick()}),document.addEventListener("mousemove",function(e){e=e||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;const t=$canvas.getBoundingClientRect();Input.mouseX=e.clientX-t.left,Input.mouseY=e.clientY-t.top,$scenes[$currentScene].children.forEach(e=>{e.enabled&&e.eventListeners.forEach(t=>{"mousemove"===t.name?t.func(e):Input.mouseDown&&"mousedrag"===t.name&&(e.readyMesh(),e.mesh.rotate(e.rotation),e.mesh.pointInPolygon(new Vector2(Input.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,Input.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y))?(e.mesh.rotate(-e.rotation),e.resetMesh(),t.func(e)):(e.mesh.rotate(-e.rotation),e.resetMesh()))})}),mouseMove()}),$canvas},Start:function(){if(!$ctx)throw new Error("[2D Game Engine] No context. (Call GameEngine.Initialise(canvas?, fullScreen?, width?, height?))");if($scenes.length<1)throw new Error("[2D Game Engine] No scenes. (Create at least one scene new Scene(children, camera))");Time.startTime=Date.now(),GameEngine.Update()},Update:function(e){Time.deltaTime=e-$previousFrame,$frameCount++,e-$previousFrameReading>=1e3&&(FPS=$frameCount,$frameCount=0,$previousFrameReading=e),e-$previousFrame>=1e3/$frameRate&&($scenes[$currentScene].started||$scenes[$currentScene].start(),$scenes[$currentScene].update(),GameEngine.Render(),$previousFrame=e),Time._dt=e,window.requestAnimationFrame(GameEngine.Update)},Render:function(){$ctx.clearRect(0,0,$canvas.width,$canvas.height),this._backgroundColour&&($ctx.fillStyle=this._backgroundColour,$ctx.fillRect(0,0,$canvas.width,$canvas.height)),$scenes[$currentScene].render()}};class Vector2{constructor(e,t){this.x=e,this.y=t}add(e){this.x+=e.x,this.y+=e.y}sub(e){this.x-=e.x,this.y-=e.y}mult(e){this.x*=e.x,this.y*=e.y}div(e){this.x/=e.x,this.y/=e.y}dist(e){return Math.sqrt((e.x-this.x)**2+(e.y-this.y)**2)}dot(e){return this.x*e.x+this.y*e.y}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){const e=Math.sqrt(this.x*this.x+this.y*this.y);return[this.x/e,this.y/e]}toString(){return this.x+", "+this.y}array(){return[this.x,this.y]}clone(){return new Vector2(this.x,this.y)}static dist(e,t){return Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2)}static dot(e,t){return e.x*t.x+e.y*t.y}static array(e){return[e.x,e.y]}static Zero(){return new Vector2(0,0)}}class Point extends Vector2{constructor(e,t){super(e,t)}}class Line{constructor(e,t){this.point1=e,this.point2=t}get x1(){return this.point1.x}set x1(e){return this.point1.x=e}get y1(){return this.point1.y}set y1(e){return this.point1.y=e}get x2(){return this.point2.x}set x2(e){return this.point2.x=e}get y2(){return this.point2.y}set y2(e){return this.point2.y=e}pointOnLine(e){const t=(this.y2-this.y1)/(this.x2-this.x1),s=this.y1-t*this.x1;return e.y===t*e.x+s}pointInLine(e){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(e)&&e.x>=this.x1&&e.x<=this.x2&&e.y>=this.y1&&e.y<=this.y2:this.pointOnLine(e)&&e.x>=this.x1&&e.x<=this.x2&&e.y>=this.y2&&e.y<=this.y1:this.y1<this.y2?this.pointOnLine(e)&&e.x>=this.x2&&e.x<=this.x1&&e.y>=this.y1&&e.y<=this.y2:this.pointOnLine(e)&&e.x>=this.x2&&e.x<=this.x1&&e.y>=this.y2&&e.y<=this.y1}intersects(e){if(this.pointInLine(e.point1)||this.pointInLine(e.point2))return!0;const t=(this.x2-this.x1)*(e.y2-e.y1)-(e.x2-e.x1)*(this.y2-this.y1);if(0===t)return!1;const s=((e.y2-e.y1)*(e.x2-this.x1)+(e.x1-e.x2)*(e.y2-this.y1))/t,n=((this.y1-this.y2)*(e.x2-this.x1)+(this.x2-this.x1)*(e.y2-this.y1))/t;return s>0&&s<1&&n>0&&n<1}clone(){return new Line(this.point1.clone(),this.point2.clone())}}class PolygonMesh{constructor(e){this.lines=[],this.maxX=0;for(let t=0;t<e.length-1;t++)this.maxX+=Math.abs(e[t].x),this.maxX+=Math.abs(e[t+1].x),this.lines.push(new Line(e[t],e[t+1]));this.lines.push(new Line(e[e.length-1],e[0])),this.maxX*=10}changeX(e){this.lines.forEach(t=>(t.x1+=e,t.x2+=e,t.point1.x+=e,t.point2.x+=e,t)),this.maxX+=e}changeY(e){this.lines.forEach(t=>(t.y1+=e,t.y2+=e,t.point1.y+=e,t.point2.y+=e,t))}move(e,t){this.changeX(e),this.changeY(t)}getMidpoint(){const e=new Vector2(0,0);return this.lines.forEach(t=>e.add(t.point1)),e.x/=this.lines.length,e.y/=this.lines.length,e}resetMesh(){const e=this.getMidpoint();this.move(-e.x,-e.y)}rotate(e){const t=this.getMidpoint();this.changeX(-t.x),this.changeY(-t.y),this.lines.forEach(t=>{let s=t.x1,n=t.y1;t.x1=s*Math.cos(e)-n*Math.sin(e),t.y1=s*Math.sin(e)+n*Math.cos(e),this.maxX=Math.max(this.maxX,t.x1),s=t.x2,n=t.y2,t.x2=s*Math.cos(e)-n*Math.sin(e),t.y2=s*Math.sin(e)+n*Math.cos(e),this.maxX=Math.max(this.maxX,t.x2)}),this.changeX(t.x),this.changeY(t.y)}pointInPolygon(e){const t=new Line(e,new Vector2(10*this.maxX,e.y));let s=!1;return this.lines.forEach(e=>s=e.intersects(t)?!s:s),s}collision(e){for(let t=0;t<this.lines.length;t++)if(e.pointInPolygon(new Vector2(this.lines[t].x1,this.lines[t].y1)))return!0;for(let t=0;t<e.lines.length;t++)if(this.pointInPolygon(new Vector2(e.lines[t].x1,e.lines[t].y1)))return!0;return!1}render(e){$ctx.fillStyle=e,$ctx.beginPath(),$ctx.moveTo(this.lines[0].x1,this.lines[0].y1),this.lines.forEach(e=>$ctx.lineTo(e.x2,e.y2)),$ctx.lineTo(this.lines[0].x1,this.lines[0].y1),$ctx.fill(),$ctx.closePath()}clone(){for(let e=0;e<this.lines.length;e++)this.points.push(this.lines[e].point1);return new PolygonMesh([])}}class RectangleMesh extends PolygonMesh{constructor(e,t,s=!0){super(s?[new Vector2(-e/2,-t/2),new Vector2(e/2,-t/2),new Vector2(e/2,t/2),new Vector2(-e/2,t/2)]:[new Vector2(0,0),new Vector2(e,0),new Vector2(e,t),new Vector2(0,t)])}}class EventListener{constructor(e,t){this.name=e,this.func=t}clone(){return new EventListener(name,func)}}class GameObject{constructor(e,t,s,n,i){this.x=e,this.y=t,this.xVel=0,this.resistance=.8,this.resistanceMultiplier=1,this.yVel=0,this.gravity=!1,this.gravityMultiplier=1,this.mesh=s,this.colour=n,this.rotation=0,this.layer=1,this.enabled=!0,this.tag=null,this.collides=i,this.collidingWith=[],this.eventListeners=[],this.children=[]}appendChild(e){return this.children.includes(e)?null:this.children.push(e)}removeChild(e){return-1!==this.children.indexOf(e)?this.children.splice(this.children.indexOf(e),1)[0]:null}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}start(){this.eventListeners.forEach(e=>{"start"===e.name&&e.func(this)})}readyMesh(){this.mesh.move(this.x,this.y)}resetMesh(){this.mesh.move(-this.x,-this.y)}collision(e){this.readyMesh(),this.mesh.rotate(this.rotation);const t=this.mesh.collision(e);return this.mesh.rotate(-this.rotation),this.resetMesh(),t}rotate(e){this.rotation+=e}setRotation(e){this.rotation=e}setX(e){this.x=e}setY(e){this.y=e}setPosition(e,t){this.x=e,this.y=t}addXForce(e){this.xVel+=e}addYForce(e){this.yVel-=e}addForce(e,t){this.xVel+=e,this.yVel-=t}setXForce(e){this.xVel=e}setYForce(e){this.yVel=e}setForce(e,t){this.xVel=e,this.yVel=t}changeX(e){this.x+=e,this.enabled&&this.collides&&(e=Math.sign(e),$scenes[$currentScene].children.forEach(t=>{if(t!==this)if(t.readyMesh(),t.mesh.rotate(t.rotation),this.collision(t.mesh)){for(0===e&&(this.readyMesh(),this.mesh.rotate(this.rotation),e=this.mesh.midPoint().x>t.mesh.midPoint().x?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(t.mesh);)this.x-=e;this.xVel=0,t.mesh.rotate(-t.rotation),t.resetMesh()}else t.mesh.rotate(-t.rotation),t.resetMesh()}))}changeY(e){e=-e,this.y+=e,this.enabled&&this.collides&&(e=Math.sign(e),$scenes[$currentScene].children.forEach(t=>{if(t!==this)if(t.readyMesh(),t.mesh.rotate(t.rotation),this.collision(t.mesh)){for(0===e&&(this.readyMesh(),this.mesh.rotate(this.rotation),e=this.mesh.midPoint().y>t.mesh.midPoint().y?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(t.mesh);)this.y-=e;this.yVel=0,t.mesh.rotate(-t.rotation),t.resetMesh()}else t.mesh.rotate(-t.rotation),t.resetMesh()}))}physics(){this.enabled&&(this.gravity?this.yVel+=this.gravityMultiplier:this.yVel*=this.resistance*this.resistanceMultiplier,this.collides&&(this.x+=this.xVel,this.y+=this.yVel,$scenes[$currentScene].children.forEach(e=>{e!==this&&(e.readyMesh(),e.mesh.rotate(e.rotation),this.collision(e.mesh)?this.collidingWith.includes(e)||this.collidingWith.push(e):this.collidingWith.includes(e)&&this.collidingWith.splice(this.collidingWith.indexOf(e),1),e.mesh.rotate(-e.rotation),e.resetMesh())}),this.x-=this.xVel,this.y-=this.yVel),this.changeY(-this.yVel),this.xVel*=this.resistance*this.resistanceMultiplier,this.changeX(this.xVel),this.collidingWith.forEach(e=>{this.eventListeners.forEach(t=>{"collision"===t.name&&t.func(this,e)})}))}render(){this.colour instanceof Image&&this.colour.complete?$ctx.drawImage(this.colour,this.x-this.colour.width/2,this.y-this.colour.height/2):"function"==typeof this.colour?this.colour(this.x,this.y):(this.readyMesh(),this.mesh.rotate(this.rotation),this.mesh.render(this.colour),this.mesh.rotate(-this.rotation),this.resetMesh())}clone(){const e=new GameObject(this.x,this.y,this.polymesh,this.colour,this.collides,this.eventListeners,this.children);return e.xVel=this.xVel,e.resistance=this.resistance,e.resistanceMultiplier=this.resistanceMultiplier,e.yVel=this.yVel,e.gravity=this.gravity,e.gravityMultiplier=this.gravityMultiplier,e.rotation=this.rotation,e.layer=this.layer,e.enabled=this.enabled,e.collidingWith=this.collidingWith.slice(),e}}class Camera{constructor(e,t){this.x=e,this.y=t,this.eventListeners=[]}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}smoothMove(e,t,s){this.x=lerp(this.x,e,s),this.y=lerp(this.y,t,s)}clone(){return new Camera(this.x,this.y)}}class Scene{constructor(e,t){this.children=e,this.camera=t,this.started=!1,this.eventListeners=[],$scenes.push(this)}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}start(){this.camera.eventListeners.forEach(e=>{"start"===e.name&&e.func(this.camera)}),this.children.forEach(e=>{e.enabled&&e.eventListeners.forEach(t=>{"start"===t.name&&t.func(e)})}),this.eventListeners.forEach(e=>{"start"===e.name&&e.func(this)}),this.started=!0}update(){this.camera.eventListeners.forEach(e=>{"update"===e.name&&e.func(this.camera)}),this.children.sort((e,t)=>e.layer<t.layer?-1:1),this.children.forEach(e=>{e.physics(),e.enabled&&e.eventListeners.forEach(t=>{"update"===t.name&&t.func(e)})}),this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}render(){$ctx.translate($canvas.width/2-this.camera.x,$canvas.height/2-this.camera.y),this.children.forEach(e=>{e.enabled&&(e.render(),e.eventListeners.forEach(t=>{"render"===t.name&&t.func(e)}))}),$ctx.translate(-($canvas.width/2-this.camera.x),-($canvas.height/2-this.camera.y))}clone(){return new Scene(this.children.map(e=>e.clone()),this.camera.clone())}}console.log("Loaded 2DGameEngineJS by Matthew James");
