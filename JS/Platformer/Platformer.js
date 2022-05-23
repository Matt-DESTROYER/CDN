let $canvas,$ctx,$player,$lastLevel,width,height,$platformerRunning=!0,$previousFrame=0,$previousFrameReading=0,$frameRate=60,$frameCount=0,FPS=0,$levels=[],$persistentObjects=[],currentLevel=0,$updateCondition=function(){return!0};const Input={},Camera={x:0,y:0},Time={startTime:0,endTime:null,_dt:0,deltaTime:0,get timeElapsed(){return Date.now()-Time.startTime},get now(){return Date.now()}},Statistics={deaths:0,get millisecondsElapsed(){return Date.now()-Time.startTime},get secondsElapsed(){return(Date.now()-Time.startTime)/1e3},get minutesElapsed(){return(Date.now()-Time.startTime)/6e4},get millisecondsToFinish(){return null===Time.endTime?null:Time.endTime-Time.startTime},get secondsToFinish(){return null===Time.endTime?null:(Time.endTime-Time.startTime)/1e3},get minutesToFinish(){return null===Time.endTime?null:(Time.endTime-Time.startTime)/6e4}};function fullscreen(){$canvas&&("requestFullscreen"in $canvas?$canvas.requestFullscreen():"webkitRequestFullscreen"in $canvas?$canvas.webkitRequestFullscreen():"msRequestFullscreen"in $canvas&&$canvas.msRequestFullscreen())}function addStyles(e){const t=document.createElement("style");"styleSheet"in t?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)}let keyDown,keyUp,keyPress,mouseDown,mouseUp,mouseClick,mouseMove;keyDown=keyUp=keyPress=mouseDown=mouseUp=mouseClick=mouseMove=function(){};class Platformer{static Start(e=$levels.length){if($lastLevel=e,!$ctx)throw new Error("[Platformer Error] No context. (Call Platformer.initCanvas(id, ?fullscreen))");if(0===$levels.length)throw new Error("[Platformer Error] No levels. (Create at least one level new Level(objects))");if(!$player)throw new Error("[Platformer Error] No player. (Create a player before calling Start new Player(x, y, width, height, colour))");new Level([new PObject(0,200,new RectangleMesh(150,25),"black",1)]),Time.startTime=Date.now(),$levels[0].start(),document.addEventListener("keydown",function(e){e=e||window.event,Input[e.keyCode]=!0,Input[e.key.toString().toUpperCase()]=!0,Input.keyCode=e.keyCode,Input.key=e.key,keyDown()}),document.addEventListener("keyup",function(e){e=e||window.event,Input[e.keyCode]=!1,Input[e.key.toString().toUpperCase()]=!1,keyUp()}),document.addEventListener("keypress",function(e){e=e||window.event,keyPress()}),document.addEventListener("mousedown",function(e){e=e||window.event,Input.mouseDown=!0,mouseDown()}),document.addEventListener("mouseup",function(e){e=e||window.event,Input.mouseDown=!1,mouseUp()}),document.addEventListener("click",function(e){e=e||window.event,mouseClick()}),document.addEventListener("mousemove",function(e){e=e||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;const t=$canvas.getBoundingClientRect();Input.mouseX=e.clientX-t.left,Input.mouseY=e.clientY-t.top,mouseMove()}),window.requestAnimationFrame(Platformer.Update)}static get width(){return $canvas.width}static get height(){return $canvas.height}static End(){Time.endTime=Date.now()}static Stop(){$platformerRunning=!1}static UpdateCondition(e){$updateCondition=e}static Update(e){Time.deltaTime=e-$previousFrame,$frameCount++,e-$previousFrameReading>=1e3&&(FPS=$frameCount,$frameCount=0,$previousFrameReading=e),e-$previousFrame>=1e3/$frameRate&&(void 0===$levels[currentLevel]&&Platformer.Stop(),$updateCondition()&&($levels[currentLevel].update(),$persistentObjects.forEach(e=>e.update()),$player.physicsTick(),$player.update()),Platformer.Render(),$previousFrame=e,Time._dt=e),$platformerRunning&&window.requestAnimationFrame(Platformer.Update)}static Render(){this._backgroundColour?($ctx.fillStyle=this._backgroundColour,$ctx.beginPath(),$ctx.rect(0,0,$canvas.width,$canvas.height),$ctx.fill(),$ctx.closePath()):$ctx.clearRect(0,0,$canvas.width,$canvas.height),$levels[currentLevel].render(),$persistentObjects.forEach(e=>e.render()),$player.render()}static Reset(){currentLevel=0,Time.startTime=Date.now(),Time.endTime=null,Time._dt=0,$player.die(),Camera.x=Camera.y=0,Statistics.deaths=0,$levels[0].start()}static initCanvas(e=null,t=!0,s=null,i=null){return e?$canvas="string"==typeof e?document.getElementById(e):e:($canvas=document.createElement("canvas"),(document.body||document.getElementsByTagName("body")[0]).appendChild($canvas)),fullscreen?($canvas.width=window.innerWidth,$canvas.height=window.innerHeight,$canvas.style.position="absolute",$canvas.style.left=0,$canvas.style.top=0,addStyles("*{margin:0px;overflow:hidden;}"),window.addEventListener("resize",function(){$canvas.width=window.innerWidth,$canvas.height=window.innerHeight})):(s&&(width=s),i&&(height=i)),width=$canvas.width,height=$canvas.height,($ctx=$canvas.getContext("2d")).lineWidth=0,$canvas}static background(e){this._backgroundColour=e}}class EventListener{constructor(e,t){this.name=e,this.func=t}clone(){return new EventListener(this.name,this.func)}}class Vector2{constructor(e,t){this.x=e,this.y=t}getX(){return this.x}getY(){return this.y}setX(e){this.x=e}setY(e){this.y=e}add(e){this.x+=e.x,this.y+=e.y}sub(e){this.x-=e.x,this.y-=e.y}mult(e){this.x*=e.x,this.y*=e.y}div(e){this.x/=e.x,this.y/=e.y}dist(e){return Math.sqrt(Math.pow(e.x-this.x,2)+Math.pow(e.y-this.y,2))}dot(e){return this.x*e.x+this.y*e.y}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y);return[this.x/e,this.y/e]}array(){return[this.x,this.y]}static dist(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}static dot(e,t){return e.x*t.x+e.y*t.y}static array(e){return[e.x,e.y]}static Zero(){return new Vector2(0,0)}}let Point=Vector2;class Line{constructor(e,t){this.point1=e,this.point2=t,this.x1=e.x,this.y1=e.y,this.x2=t.x,this.y2=t.y}pointOnLine(e){let t=(this.y2-this.y1)/(this.x2-this.x1),s=this.y1-t*this.x1;return e.y===t*e.x+s}pointInLine(e){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(e)&&e.x>=this.x1&&e.x<=this.x2&&e.y>=this.y1&&e.y<=this.y2:this.pointOnLine(e)&&e.x>=this.x1&&e.x<=this.x2&&e.y>=this.y2&&e.y<=this.y1:this.y1<this.y2?this.pointOnLine(e)&&e.x>=this.x2&&e.x<=this.x1&&e.y>=this.y1&&e.y<=this.y2:this.pointOnLine(e)&&e.x>=this.x2&&e.x<=this.x1&&e.y>=this.y2&&e.y<=this.y1}intersects(e){if(this.pointInLine(e.point1)||this.pointInLine(e.point2))return!0;let t=(this.x2-this.x1)*(e.y2-e.y1)-(e.x2-e.x1)*(this.y2-this.y1);if(0===t)return!1;let s=((e.y2-e.y1)*(e.x2-this.x1)+(e.x1-e.x2)*(e.y2-this.y1))/t,i=((this.y1-this.y2)*(e.x2-this.x1)+(this.x2-this.x1)*(e.y2-this.y1))/t;return s>0&&s<1&&i>0&&i<1}}class PolygonMesh{constructor(e){this.lines=[],this.maxX=0;for(let t=0;t<e.length-1;t++)this.maxX+=Math.abs(e[t].x),this.maxX+=Math.abs(e[t+1].x),this.lines.push(new Line(e[t],e[t+1]));this.lines.push(new Line(e[e.length-1],e[0])),this.maxX*=10}changeX(e){this.lines.forEach(t=>{t.x1+=e,t.x2+=e}),this.maxX+=e}changeY(e){this.lines.forEach(t=>{t.y1+=e,t.y2+=e})}move(e,t){this.changeX(e),this.changeY(t)}getMidpoint(){let e=new Vector2(0,0);return this.lines.forEach(t=>e.add({x:t.x1,y:t.y1})),e.x/=this.lines.length,e.y/=this.lines.length,e}resetMesh(){let e=this.getMidpoint();this.move(-e.x,-e.y)}rotate(e){let t=this.getMidpoint();this.changeX(-t.x),this.changeY(-t.y),this.lines.forEach(t=>{let s=t.x1,i=t.y1;t.x1=s*Math.cos(e)-i*Math.sin(e),t.y1=s*Math.sin(e)+i*Math.cos(e),this.maxX=Math.max(this.maxX,t.x1),s=t.x2,i=t.y2,t.x2=s*Math.cos(e)-i*Math.sin(e),t.y2=s*Math.sin(e)+i*Math.cos(e),this.maxX=Math.max(this.maxX,t.x2)}),this.changeX(t.x),this.changeY(t.y)}pointInPolygon(e){let t=new Line(e,new Vector2(10*this.maxX,e.y)),s=!1;for(let e=0;e<this.lines.length;e++)this.lines[e].intersects(t)&&(s=!s);return s}collision(e){for(let t=0;t<this.lines.length;t++)if(e.pointInPolygon(new Vector2(this.lines[t].x1,this.lines[t].y1)))return!0;for(let t=0;t<e.lines.length;t++)if(this.pointInPolygon(new Vector2(e.lines[t].x1,e.lines[t].y1)))return!0;return!1}render(e){$ctx.fillStyle=e,$ctx.beginPath(),$ctx.moveTo(this.lines[0].x1,this.lines[0].y1);for(let e=0;e<this.lines.length;e++)$ctx.lineTo(this.lines[e].x2,this.lines[e].y2);$ctx.lineTo(this.lines[0].x1,this.lines[0].y1),$ctx.fill(),$ctx.closePath()}}class RectangleMesh extends PolygonMesh{constructor(e,t,s=!0){super(s?[new Vector2(-e/2,-t/2),new Vector2(e/2,-t/2),new Vector2(e/2,t/2),new Vector2(-e/2,t/2)]:[new Vector2(0,0),new Vector2(e,0),new Vector2(e,t),new Vector2(0,t)])}}class PObject{constructor(e,t,s,i,n){this.x=e,this.y=t,this._mesh=s,this.colour=i,this.type=n,this.eventListeners=[]}get color(){return this.color}set color(e){this.colour=e}get mesh(){return this._mesh}set mesh(e){this._mesh=e}get collidesWithPlayer(){$player.readyMesh(),this._mesh.move(this.x,this.y);let e=$player._mesh.collision(this._mesh);return $player.resetMesh(),this._mesh.move(-this.x,-this.y),e}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}start(){this.eventListeners.forEach(e=>{"start"===e.name&&e.func(this)})}update(){this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}rotate(e){this._mesh.rotate(e)}render(){$ctx.fillStyle=this.colour,this._mesh.move(this.x-Camera.x,this.y-Camera.y),this._mesh.render(),this._mesh.move(-(this.x-Camera.x),-(this.y-Camera.y)),this.eventListeners.forEach(e=>{"render"===e.name&&e.func(this)})}}class PText{constructor(e,t,s,i,n,r,h){this.message=e,this.font=t,this.size=s,this.x=i,this.y=n,this.type=0,this.colour=r,this.eventListeners=[]}get color(){return this.colour}set color(e){return this.colour=e}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}start(){this.eventListeners.forEach(e=>{"start"===e.name&&e.func(this)})}update(){this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}render(){$ctx.fillStyle=this.colour,$ctx.font=this.size+"px "+this.font,$ctx.fillText(this.message,this.x-Camera.x,this.y-Camera.y),this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}}class CustomPObject{constructor(e,t){this.x=e,this.y=t,this.eventListeners=[]}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}start(){this.eventListeners.forEach(e=>{"start"===e.name&&e.func(this)})}update(){this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}render(){this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}}class PersistentPObject{constructor(e,t){this.x=e,this.y=t,this.eventListeners=[],$persistentObjects.push(this)}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}start(){this.eventListeners.forEach(e=>{"start"===e.name&&e.func(this)})}update(){this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}render(){this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}}class Level{constructor(e){this._objects=e,this.eventListeners=[],$levels.push(this)}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}start(){this.eventListeners.forEach(e=>{"start"===e.name&&e.func(this)})}update(){this._objects.forEach(e=>{e.update()}),this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}render(){this._objects.forEach(e=>e.render()),this.eventListeners.forEach(e=>{"render"===e.name&&e.func(this)})}}class Player{constructor(e,t,s,i,n=!1){this.x=e,this.y=t,this._startX=e,this._startY=t,this._mesh=s,this.colour=i,this.xVel=0,this.velocityMultiplier=1,this.resistance=.8,this.yVel=0,this.gravityMultiplier=1,this.gravity=1,this.wallJump=n,this.inWater=!1,this.touchingGround=!1,this.objectsColliding=[],this.eventListeners=[],this._0dir=1,$player=this}get mesh(){return this._mesh}get colour(){return this._colour}set colour(e){this._colour=e}get midPoint(){this.readyMesh();let e=this._mesh.getMidpoint();return this.resetMesh(),e}update(){this.eventListeners.forEach(e=>{"update"===e.name&&e.func(this)})}render(){this.eventListeners.forEach(e=>{"render"===e.name&&e.func(this)})}addEventListener(e,t){return e instanceof EventListener?this.eventListeners.push(e):this.eventListeners.push(new EventListener(e,t)),this}removeEventListener(e,t=!1){if(e instanceof EventListener){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s]===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("function"==typeof e){for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].func===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}else if("string"==typeof e)for(let s=0;s<this.eventListeners.length;s++)if(this.eventListeners[s].name===e){if(!t)return this.eventListeners.splice(s,1)[0];this.eventListeners.splice(s,1)}}readyMesh(){this._mesh.move(this.x,this.y)}resetMesh(){this._mesh.resetMesh()}jump(e=14,t=4){this.touchingGround&&!this.inWater?this.yVel=-e:this.inWater&&(this.yVel=-t),this.eventListeners.forEach(e=>{"jump"===e.name&&e.func(this)})}addForce(e,t){this.xVel+=e,this.yVel-=t}reset(){this.x=this._startX,this.y=this._startY,this.xVel=0,this.yVel=0,this.eventListeners.forEach(e=>{"reset"===e.name&&e.func(this)})}die(){this.reset(),Statistics.deaths++,this.eventListeners.forEach(e=>{"death"===e.name&&e.func(this)})}rotate(e){this._mesh.rotate(e),this.eventListeners.forEach(e=>{"rotate"===e.name&&e.func(this)})}collides(e){return this.readyMesh(),e._mesh.move(e.x,e.y),this._mesh.collision(e._mesh)}collisionX(){let e=Math.sign(this._xVel);$levels[currentLevel]._objects.forEach(t=>{if(t.type>0){for(this.readyMesh(),t._mesh.move(t.x,t.y);this._mesh.collision(t._mesh);){switch(this.resetMesh(),t.type){case 1:if(0===e){if(1===this._0dir){this.readyMesh();const e=this._mesh.getMidpoint().x>=t._mesh.getMidpoint().x;this.resetMesh(),e?this.x+=1:this.x-=1,this._0dir=0}}else this.x-=e;!this.inWater&&this.wallJump&&(Input[87]||Input[38]||Input[32]||Input.mouseDown)?(this.xVel=1===e?-16:16,this.yVel=-12):this.xVel=0;break;case 3:this.x-=e;break;case 4:return this.inWater=!0,this.xVel*=.4,this.xVel>2?this.xVel=2:this.xVel<-2&&(this.xVel=-2),void t._mesh.resetMesh()}this.readyMesh()}this.resetMesh(),t._mesh.resetMesh()}})}collisionY(){let e=Math.sign(this.yVel);$levels[currentLevel]._objects.forEach(t=>{if(t.type>0){for(this.readyMesh(),t._mesh.move(t.x,t.y);this._mesh.collision(t._mesh);){switch(this.resetMesh(),t.type){case 1:if(0===e){if(0===this._0dir){this.readyMesh();const e=this._mesh.getMidpoint().y>t._mesh.getMidpoint().y;this.resetMesh(),e?this.y++:this.y--,this._0dir=1}}else this.y-=e;this.yVel=0;break;case 3:this.y-=e,this.yVel=1===e?-24:0;break;case 4:return this.yVel*=.4,this.yVel>2?this.yVel=2:this.yVel<-2&&(this.yVel=-2),void t._mesh.resetMesh()}this.readyMesh()}this.resetMesh(),t._mesh.resetMesh()}})}physicsTick(){this.yVel+=this.gravity*this.gravityMultiplier,this.yVel>50?this.yVel=50:this.yVel<-50&&(this.yVel=-50),this.xVel*=this.resistance*this.velocityMultiplier,this.xVel>50?this.xVel=50:this.xVel<-50&&(this.xVel=-50),this.objectsColliding=[];const e=this.objectsColliding,t=this.inWater,s=this.touchingGround;this.inWater=!1,this.touchingGround=!1,this.x+=this.xVel,this.y+=this.yVel,$levels[currentLevel]._objects.forEach(t=>{if(t.type>0){if(this.readyMesh(),t._mesh.move(t.x,t.y),this._mesh.collision(t._mesh))switch(e.includes(t)||e.push(t),t.type){case 1:this.yVel>=0&&(this.touchingGround=!0);break;case 2:return this.resetMesh(),t._mesh.resetMesh(),void this.die();case 4:this.inWater=!0;break;case 9:return $levels[currentLevel].end(),++currentLevel===$lastLevel&&Platformer.End(),this.resetMesh(),t._mesh.resetMesh(),this.reset(),this.eventListeners.forEach(e=>{"levelup"===e.name&&e.func(this)}),void $levels[currentLevel].start()}this.resetMesh(),t._mesh.resetMesh()}}),this.x-=this.xVel,this.collisionY(),this.x+=this.xVel,this.collisionX(),0===this._mesh.x&&0===this._mesh.y||this.resetMesh(),this.objectsColliding.forEach(e=>{this.eventListeners.forEach(t=>{"collision"===t.name&&t.func(this,e)})}),this.inWater&&!t?this.eventListeners.forEach(e=>{"waterenter"===e.name&&e.func(this)}):!this.inWater&&t&&this.eventListeners.forEach(e=>{"waterexit"===e.name&&e.func(this)}),this.touchingGround&&!s?this.eventListeners.forEach(e=>{"groundenter"===e.name&&e.func(this)}):!this.touhcingGround&&s&&this.eventListeners.forEach(e=>{"groundexit"===e.name&&e.func(this)})}render(){this.colour instanceof Image&&this.colour.complete?$ctx.drawImage(this.colour,this.x-Camera.x-this.colour.width/2,this.y-Camera.y-this.colour.height/2):null===this.colour?this._render(this.x-Camera.x,this.y-Camera.y):(this._mesh.move(this.x-Camera.x,this.y-Camera.y),this._mesh.render(this.colour),this._mesh.move(-(this.x-Camera.x),-(this.y-Camera.y))),this.eventListeners.forEach(e=>{"render"===e.name&&e.func(this)})}}function frameRate(e=60){$frameRate=e}function dist(e,t,s,i){return Math.sqrt(Math.pow(s-e,2)+Math.pow(i-t,2))}function degreesToRadians(e){return e*Math.PI/180}function radiansToDegrees(e){return 180*e/Math.PI}let pi=Math.PI,pow=(e,t=2)=>e**t,log=Math.log,sqrt=Math.sqrt,round=Math.round,min=Math.min,max=Math.max,abs=Math.abs,sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan;const Randomiser=(String.prototype.shuffle=function(){const e=this.split("");let t="";for(;e.length>0;)t+=e.splice(~~(Math.random()*e.length),1)[0];return t},Array.prototype.shuffle=function(e){const t=[],s=[];if(e)for(let e=0;e<this.length;e++)this[e]instanceof Array?t.push(this[e].shuffle()):t.push(this[e]);else for(let e=0;e<this.length;e++)t.push(this[e]);for(;t.length>0;)s.push(t.splice(~~(Math.random()*t.length),1)[0]);return s},String.prototype.pick=function(){return this[~~(Math.random()*this.length)]},Array.prototype.pick=function(e){const t=this;return e&&(t=t.flat(1/0)),t[~~(Math.random()*t.length)]},{int:function(e,t=null){return"number"!=typeof t?~~(Math.random()*e):e===t?e:(e>t&&([e,t]=[t,e]),Math.round(Math.random()*(t-e))+e)},float:function(e,t=null){return"number"!=typeof t?Math.random()*e:e===t?e:(e>t&&([e,t]=[t,e]),Math.random()*(t-e)+e)},string:function(e,t){let s="";for(let i=0;i<t;i++)s+=e[~~(Math.random()*e.length)];return s},array:function(e,t){const s=[];for(let i=0;i<t;i++)s.push(e[~~(Math.random()*e.length)]);return s},shuffle:function(e,t=!1){if(e instanceof Array){const s=[],i=[];if(t)for(let t=0;t<e.length;t++)e[t]instanceof Array?s.push(e[t].shuffle()):s.push(e[t]);else for(let t=0;t<e.length;t++)s.push(e[t]);for(;s.length>0;)i.push(s.splice(~~(Math.random()*s.length),1)[0]);return i}if("string"==typeof e){const t=e.split("");let s="";for(;t.length>0;)s+=t.splice(~~(Math.random()*t.length),1)[0];return s}return null},pick:function(e,t=!0){return"string"==typeof e?e[~~(Math.random()*e.length)]:e instanceof Array?(t&&(e=e.flat(1/0)),e[~~(Math.random()*e.length)]):null}});function constrain(e,t,s){return e<t?t:e>s?s:e}function clamp(e,t,s){return e<t?t:e>s?s:e}function lerp(e,t,s){return s<0?s=0:s>1&&(s=1),e+(t-e)*s}console.log("Loaded Randomiser.js by Matthew James"),console.log("Loaded PlatformerJS by Matthew James");
