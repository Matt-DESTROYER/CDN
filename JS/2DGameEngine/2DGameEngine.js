let $canvas,$ctx,width,height,$previousFrame=Date.now(),$previousFrameReading=Date.now(),$frameRate=60,$frameCount=0,FPS=0,$scenes=[],$currentScene=0,Input={get mouseToWorldCoordinates(){return new Vector2(this.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,this.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y)}},Time={startTime:0,_dt:0,get timeElapsed(){return Date.now()-this.startTime},get deltaTime(){return Date.now()-this._dt},get now(){return Date.now()}};const cursor=e=>$canvas.style.cursor=e,frameRate=(e=60)=>$frameRate=e,dist=(e,t,s,n)=>Math.sqrt(Math.pow(s-e,2)+Math.pow(n-t,2)),degreesToRadians=e=>e*Math.PI/180,radiansToDegrees=e=>180*e/Math.PI,$=e=>document.querySelector(e),random=(e,t)=>Math.random()*(t-e+1)+e,randomInt=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,contrain=(e,t,s)=>e<t?t:e>s?s:e,clamp=(e,t,s)=>e<t?t:e>s?s:e;function lerp(e,t,s){return s<0?s=0:s>1&&(s=1),e+(t-e)*s}const pi=Math.PI,pow=Math.pow,log=Math.log,sqrt=Math.sqrt,round=Math.round,min=Math.min,max=Math.max,abs=Math.abs,sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan;let keyDown,keyUp,keyPress,mouseDown,mouseUp,mouseClick,mouseMove;keyDown=keyUp=keyPress=mouseDown=mouseUp=mouseClick=mouseMove=function(){};const Tools={createCSS:function(e){let t=document.createElement("style");t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)},fullscreen:function(){$canvas&&($canvas.requestFullscreen?$canvas.requestFullscreen():$canvas.webkitRequestFullscreen?$canvas.webkitRequestFullscreen():$canvas.msRequestFullscreen&&$canvas.msRequestFullscreen())}},GameEngine={_backgroundColour:"#FFFFFF",Background:function(e){this._backgroundColour=e||"#FFFFFF"},Initialise:function(e=null,t=!0,s=null,n=null){null!=e&&!1!==e&&""!==e||(e=document.createElement("canvas"),document.getElementsByTagName("body")[0].appendChild(e)),$ctx=($canvas=e).getContext("2d"),t?($canvas.width=window.innerWidth,$canvas.height=window.innerHeight,Tools.createCSS("*{margin:0px;overflow:hidden;}"),window.addEventListener("resize",function(){$canvas.width=window.innerWidth,$canvas.height=window.innerHeight})):(s>=window.innerWidth?$canvas.width=window.innerWidth:$canvas.width=s,n>=window.innerHeight?$canvas.height=window.innerHeight:$canvas.height=n),document.addEventListener("keydown",function(e){e=e||window.event,Input[e.keyCode]=!0,Input[e.key.toString().toUpperCase()]=!0,Input.keyCode=e.keyCode,Input.key=e.key.toString().toUpperCase(),$scenes[$currentScene].gameObjects.forEach(e=>e.eventListeners.forEach(t=>{"keydown"===t.name&&t.func(e)})),keyDown()}),document.addEventListener("keyup",function(e){e=e||window.event,Input[e.keyCode]=!1,Input[e.key.toString().toUpperCase()]=!1,$scenes[$currentScene].gameObjects.forEach(e=>e.eventListeners.forEach(t=>{"keyup"===t.name&&t.func(e)})),keyUp()}),document.addEventListener("keypress",function(){$scenes[$currentScene].gameObjects.forEach(e=>e.eventListeners.forEach(t=>{"keypress"===t.name&&t.func(e)})),keyPress()}),document.addEventListener("mousedown",function(){Input.mouseDown=!0,$scenes[$currentScene].gameObjects.forEach(e=>e.eventListeners.forEach(t=>{"mousedown"===t.name&&t.func(e)})),mouseDown()}),document.addEventListener("mouseup",function(){Input.mouseDown=!1,$scenes[$currentScene].gameObjects.forEach(e=>e.eventListeners.forEach(t=>{"mouseup"===t.name&&t.func(e)})),mouseUp()}),document.addEventListener("click",function(e){e=e||window.event,$scenes[$currentScene].gameObjects.forEach(e=>{e.readyMesh(),e.mesh.rotate(e.rotation),e.mesh.pointInPolygon(new Vector2(Input.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,Input.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y))?(e.mesh.rotate(-e.rotation),e.resetMesh(),e.eventListeners.forEach(t=>{"click"===t.name&&t.func(e)})):(e.mesh.rotate(-e.rotation),e.resetMesh())}),mouseClick()}),document.addEventListener("mousemove",function(e){e=e||window.event;let t=$canvas.getBoundingClientRect();Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY,Input.mouseX=e.clientX-t.left,Input.mouseY=e.clientY-t.top,$scenes[$currentScene].gameObjects.forEach(e=>e.eventListeners.forEach(t=>{"mousemove"===t.name?t.func(e):"mousedrag"===t.name&&(e.readyMesh(),e.mesh.rotate(e.rotation),Input.mouseDown&&e.mesh.pointInPolygon(new Vector2(Input.mouseX-$canvas.width/2+$scenes[$currentScene].camera.x,Input.mouseY-$canvas.height/2+$scenes[$currentScene].camera.y))&&(e.mesh.rotate(-e.rotation),e.resetMesh(),t.func(e)))})),mouseMove()})},Start:function(){if(!$ctx)throw new Error("[2D Game Engine] No context. (Call GameEngine.initCanvas(id, ?fullscreen))");if($scenes.length<1)throw new Error("[2D Game Engine] No scenes. (Create at least one scene new Scene(gameObjects, camera))");Time.startTime=Date.now(),GameEngine.Update()},Update:function(){$frameCount++,Date.now()-$previousFrameReading>=1e3&&(FPS=$frameCount,$frameCount=0,$previousFrameReading=Date.now()),Date.now()-$previousFrame>=1e3/$frameRate&&($scenes[$currentScene].started||$scenes[$currentScene].start(),$scenes[$currentScene].update(),GameEngine.Render(),$previousFrame=Date.now()),Time._dt=Date.now(),window.requestAnimationFrame(GameEngine.Update)},Render:function(){$ctx.clearRect(0,0,$canvas.width,$canvas.height),this._backgroundColour&&($ctx.fillStyle=this._backgroundColour,$ctx.beginPath(),$ctx.rect(0,0,$canvas.width,$canvas.height),$ctx.fill(),$ctx.closePath()),$scenes[$currentScene].render()}};class Vector2{constructor(e,t){this.x=e,this.y=t}add(e){this.x+=e.x,this.y+=e.y}sub(e){this.x-=e.x,this.y-=e.y}mult(e){this.x*=e.x,this.y*=e.y}div(e){this.x/=e.x,this.y/=e.y}dist(e){return Math.sqrt(Math.pow(e.x-this.x,2)+Math.pow(e.y-this.y,2))}dot(e){return this.x*e.x+this.y*e.y}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y);return[this.x/e,this.y/e]}toString(){return this.x+", "+this.y}array(){return[this.x,this.y]}static dist(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}static dot(e,t){return e.x*t.x+e.y*t.y}static array(e){return[e.x,e.y]}static Zero(){return new Vector2(0,0)}}class Point extends Vector2{constructor(e,t){super(e,t)}}class Line{constructor(e,t){this.point1=e,this.point2=t,this.x1=e.x,this.y1=e.y,this.x2=t.x,this.y2=t.y}pointOnLine(e){let t=(this.y2-this.y1)/(this.x2-this.x1),s=this.y1-t*this.x1;return e.y===t*e.x+s}pointInLine(e){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(e)&&e.x>=this.x1&&e.x<=this.x2&&e.y>=this.y1&&e.y<=this.y2:this.pointOnLine(e)&&e.x>=this.x1&&e.x<=this.x2&&e.y>=this.y2&&e.y<=this.y1:this.y1<this.y2?this.pointOnLine(e)&&e.x>=this.x2&&e.x<=this.x1&&e.y>=this.y1&&e.y<=this.y2:this.pointOnLine(e)&&e.x>=this.x2&&e.x<=this.x1&&e.y>=this.y2&&e.y<=this.y1}intersects(e){if(this.pointInLine(e.point1)||this.pointInLine(e.point2))return!0;const t=(this.x2-this.x1)*(e.y2-e.y1)-(e.x2-e.x1)*(this.y2-this.y1);if(0===t)return!1;const s=((e.y2-e.y1)*(e.x2-this.x1)+(e.x1-e.x2)*(e.y2-this.y1))/t,n=((this.y1-this.y2)*(e.x2-this.x1)+(this.x2-this.x1)*(e.y2-this.y1))/t;return s>0&&s<1&&n>0&&n<1}}class PolygonMesh{constructor(e){this.lines=[],this.maxX=0;for(let t=0;t<e.length-1;t++)this.maxX+=Math.abs(e[t].x),this.maxX+=Math.abs(e[t+1].x),this.lines.push(new Line(e[t],e[t+1]));this.lines.push(new Line(e[e.length-1],e[0])),this.maxX*=10}changeX(e){this.lines.forEach(t=>(t.x1+=e,t.x2+=e,t.point1.x+=e,t.point2.x+=e,t)),this.maxX+=e}changeY(e){this.lines.forEach(t=>(t.y1+=e,t.y2+=e,t.point1.y+=e,t.point2.y+=e,t))}move(e,t){this.changeX(e),this.changeY(t)}getMidpoint(){let e=new Vector2(0,0);return this.lines.forEach(t=>e.add(t.point1)),e.x/=this.lines.length,e.y/=this.lines.length,e}resetMesh(){let e=this.getMidpoint();this.move(-e.x,-e.y)}rotate(e){let t=this.getMidpoint();this.changeX(-t.x),this.changeY(-t.y),this.lines.forEach(t=>{let s=t.x1,n=t.y1;t.x1=s*Math.cos(e)-n*Math.sin(e),t.y1=s*Math.sin(e)+n*Math.cos(e),this.maxX=Math.max(this.maxX,t.x1),s=t.x2,n=t.y2,t.x2=s*Math.cos(e)-n*Math.sin(e),t.y2=s*Math.sin(e)+n*Math.cos(e),this.maxX=Math.max(this.maxX,t.x2)}),this.changeX(t.x),this.changeY(t.y)}pointInPolygon(e){let t=new Line(e,new Vector2(10*this.maxX,e.y)),s=!1;return this.lines.forEach(e=>s=e.intersects(t)?!s:s),s}collision(e){for(let t=0;t<this.lines.length;t++)if(e.pointInPolygon(new Vector2(this.lines[t].x1,this.lines[t].y1)))return!0;for(let t=0;t<e.lines.length;t++)if(this.pointInPolygon(new Vector2(e.lines[t].x1,e.lines[t].y1)))return!0;return!1}render(e){$ctx.fillStyle=e,$ctx.beginPath(),$ctx.moveTo(this.lines[0].x1,this.lines[0].y1),this.lines.forEach(e=>$ctx.lineTo(e.x2,e.y2)),$ctx.lineTo(this.lines[0].x1,this.lines[0].y1),$ctx.fill(),$ctx.closePath()}}class RectangleMesh extends PolygonMesh{constructor(e,t,s=!0){super(s?[new Vector2(-e/2,-t/2),new Vector2(e/2,-t/2),new Vector2(e/2,t/2),new Vector2(-e/2,t/2)]:[new Vector2(0,0),new Vector2(e,0),new Vector2(e,t),new Vector2(0,t)])}}class EventListener{constructor(e,t){this.name=e,this.func=t}}class GameObject{constructor(e,t,s,n,i,a=[]){this.x=e,this.y=t,this.mesh=s,this.colour=n,this.rotation=0,this.layer=1,this.enabled=!0,this.collides=i,this.eventListeners=a}addEventListener(e,t){e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t))}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}readyMesh(){this.mesh.move(this.x,this.y)}resetMesh(){this.mesh.move(-this.x,-this.y)}collision(e){this.readyMesh(),this.mesh.rotate(this.rotation);let t=this.mesh.collision(e);return this.mesh.rotate(-this.rotation),this.resetMesh(),t}rotate(e){this.rotation+=e}setRotation(e){this.rotation=e}setX(e){this.x=e}setY(e){this.y=e}changeX(e){this.x+=e,this.collides&&(e/=Math.abs(e),$scenes[$currentScene].gameObjects.forEach(t=>{if(t!==this)if(t.readyMesh(),t.mesh.rotate(t.rotation),this.collision(t.mesh)){for(0===e&&(this.readyMesh(),this.mesh.rotate(this.rotation),e=this.mesh.midPoint().x>t.mesh.midPoint().x?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(t.mesh);)this.x-=e;t.mesh.rotate(-t.rotation),t.resetMesh(),this.eventListeners.forEach(e=>{"collision"===e.name&&e.func(e)})}else t.mesh.rotate(-t.rotation),t.resetMesh()}))}changeY(e){this.y+=e,this.collides&&(e/=Math.abs(e),$scenes[$currentScene].gameObjects.forEach(t=>{if(t!==this)if(t.readyMesh(),t.mesh.rotate(t.rotation),this.collision(t.mesh)){for(0===e&&(this.readyMesh(),this.mesh.rotate(this.rotation),e=this.mesh.midPoint().y>t.mesh.midPoint().y?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(t.mesh);)this.y-=e;t.mesh.rotate(-t.rotation),t.resetMesh(),this.eventListeners.forEach(e=>{"collision"===e.name&&e.func(t)})}else t.mesh.rotate(-t.rotation),t.resetMesh()}))}render(){this.readyMesh(),this.mesh.rotate(this.rotation),this.mesh.render(this.colour),this.mesh.rotate(-this.rotation),this.resetMesh()}}class Camera{constructor(e,t,s=function(){},n=function(){}){this.x=e,this.y=t,this.start=s,this.update=n}smoothMove(e,t,s){this.x=lerp(this.x,e,s),this.y=lerp(this.y,t,s)}}class Scene{constructor(e,t){this.gameObjects=e,this.camera=t,this.started=!1,$scenes.push(this)}start(){this.camera.start(),this.gameObjects.forEach(e=>{e.eventListeners.forEach(t=>{"start"===t.name&&t.func(e)})}),this.started=!0}update(){this.camera.update(),this.gameObjects.sort((e,t)=>e.layer<t.layer?-1:1),this.gameObjects.forEach(e=>{e.eventListeners.forEach(t=>{"update"===t.name&&t.func(e)})})}render(){$ctx.translate($canvas.width/2-this.camera.x,$canvas.height/2-this.camera.y),this.gameObjects.forEach(e=>{e.enabled&&e.render()}),$ctx.translate(-($canvas.width/2-this.camera.x),-($canvas.height/2-this.camera.y))}}console.log("Loaded 2DGameEngineJS by MattDESTROYER");
