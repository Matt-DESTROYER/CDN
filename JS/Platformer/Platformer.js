let $canvas,$ctx,$player,$lastLevel,width,height,keyDown,keyUp,keyPress,mouseDown,mouseUp,mouseClick,mouseMove,$platformerRunning=!0,$previousFrame=Date.now(),$previousFrameReading=Date.now(),$frameRate=60,$frameCount=0,FPS=0,$levels=[],$persistentObjects=[],currentLevel=0,Input={},Camera={x:0,y:0},Time={startTime:0,endTime:null,_dt:0,get timeElapsed(){return Date.now()-Time.startTime},get deltaTime(){return Date.now()-this._dt},get now(){return Date.now()}},Statistics={deaths:0,get millisecondsElapsed(){return Date.now()-Time.startTime},get secondsElapsed(){return(Date.now()-Time.startTime)/1e3},get minutesElapsed(){return(Date.now()-Time.startTime)/6e4},get millisecondsToFinish(){return Time.endTime},get secondsToFinish(){return null===Time.endTime?null:Time.endTime/1e3},get minutesToFinish(){return null===Time.endTime?null:Time.endTime/6e4}};function addStyles(t){let e=document.createElement("style");e.type="text/css",e.rel="stylesheet",e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t)),(document.head||document.getElementsByTagName("head")[0]).appendChild(e)}keyDown=keyUp=keyPress=mouseDown=mouseUp=mouseClick=mouseMove=function(){},document.addEventListener("keydown",function(t){t=t||window.event,Input[t.keyCode]=!0,Input[t.key.toString().toUpperCase()]=!0,Input.keyCode=t.keyCode,Input.key=t.key,keyDown()}),document.addEventListener("keyup",function(t){t=t||window.event,Input[t.keyCode]=!1,Input[t.key.toString().toUpperCase()]=!1,keyUp()}),document.addEventListener("keypress",function(t){t=t||window.event,keyPress()}),document.addEventListener("mousedown",function(t){t=t||window.event,mouseDown()}),document.addEventListener("mouseup",function(t){t=t||window.event,mouseUp()}),document.addEventListener("click",function(t){t=t||window.event,mouseClick()}),document.addEventListener("mousemove",function(t){t=t||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY,Input.mouseX=t.x,Input.mouseY=t.y,mouseMove()});class Platformer{static Start(t=$levels.length){if($lastLevel=t,!$ctx)throw"Platformer Error: No context. (Call Platformer.initCanvas(id, ?fullscreen))";if($levels.length<1)throw"Platformer Error: No levels. (Create at least one level new Level(objects))";if(!$player)throw"Platformer Error: No player. (Create a player before calling Start new Player(x, y, width, height, colour))";new Level([new PObject(0,200,new RectangleMesh(150,25),"black",1)]),Time.startTime=Date.now(),$levels[0].start(),window.requestAnimationFrame(Platformer.Update)}static End(){Time.endTime=Date.now()}static Stop(){$platformerRunning=!1}static Update(){$frameCount++,Date.now()-$previousFrameReading>=1e3&&(FPS=$frameCount,$frameCount=0,$previousFrameReading=Date.now()),Date.now()-$previousFrame>=1e3/$frameRate&&(void 0===$levels[currentLevel]&&Platformer.Stop(),$levels[currentLevel].update(),$persistentObjects.forEach(t=>t.update()),$player.physicsTick(),$player.update(),Platformer.Render(),$previousFrame=Date.now()),Time._dt=Date.now(),$platformerRunning&&window.requestAnimationFrame(Platformer.Update)}static Render(){this._backgroundColour?($ctx.fillStyle=this._backgroundColour,$ctx.beginPath(),$ctx.rect(0,0,$canvas.width,$canvas.height),$ctx.fill(),$ctx.closePath()):$ctx.clearRect(0,0,$canvas.width,$canvas.height),$levels[currentLevel].render(),$persistentObjects.forEach(t=>t.render()),$player.render()}static initCanvas(t,e=!0){$canvas=document.getElementById(t),e&&($canvas.width=window.innerWidth,$canvas.height=window.innerHeight,addStyles("*{margin:0px;overflow:hidden;}")),width=$canvas.width,height=$canvas.height,($ctx=$canvas.getContext("2d")).lineWidth=0}static background(t){this._backgroundColour=t}}class Vector2{constructor(t,e){this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}add(t){this.x+=t.x,this.y+=t.y}sub(t){this.x-=t.x,this.y-=t.y}mult(t){this.x*=t.x,this.y*=t.y}div(t){this.x/=t.x,this.y/=t.y}dist(t){return sqrt(pow(t.x-this.x,2)+pow(t.y-this.y,2))}dot(t){return this.x*t.x+this.y*t.y}mag(){return sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=sqrt(this.x*this.x+this.y*this.y);return[this.x/t,this.y/t]}array(){return[this.x,this.y]}static dist(t,e){return sqrt(pow(e.x-t.x,2)+pow(e.y-t.y,2))}static dot(t,e){return t.x*e.x+t.y*e.y}static array(t){return[t.x,t.y]}static Zero(){return new Vector2(0,0)}}const Point=Vector2;class Line{constructor(t,e){this.point1=t,this.point2=e,this.x1=t.x,this.y1=t.y,this.x2=e.x,this.y2=e.y}pointOnLine(t){let e=(this.y2-this.y1)/(this.x2-this.x1),s=this.y1-e*this.x1;return t.y===e*t.x+s}pointInLine(t){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(t)&&t.x>=this.x1&&t.x<=this.x2&&t.y>=this.y1&&t.y<=this.y2:this.pointOnLine(t)&&t.x>=this.x1&&t.x<=this.x2&&t.y>=this.y2&&t.y<=this.y1:this.y1<this.y2?this.pointOnLine(t)&&t.x>=this.x2&&t.x<=this.x1&&t.y>=this.y1&&t.y<=this.y2:this.pointOnLine(t)&&t.x>=this.x2&&t.x<=this.x1&&t.y>=this.y2&&t.y<=this.y1}intersects(t){if(this.pointInLine(t.point1)||this.pointInLine(t.point2))return!0;let e=(this.x2-this.x1)*(t.y2-t.y1)-(t.x2-t.x1)*(this.y2-this.y1);if(0===e)return!1;let s=((t.y2-t.y1)*(t.x2-this.x1)+(t.x1-t.x2)*(t.y2-this.y1))/e,i=((this.y1-this.y2)*(t.x2-this.x1)+(this.x2-this.x1)*(t.y2-this.y1))/e;return s>0&&s<1&&i>0&&i<1}}class PolygonMesh{constructor(t){this.lines=[],this.maxX=0;for(let e=0;e<t.length-1;e++)this.maxX+=Math.abs(t[e].x),this.maxX+=Math.abs(t[e+1].x),this.lines.push(new Line(t[e],t[e+1]));this.lines.push(new Line(t[t.length-1],t[0])),this.maxX*=10}changeX(t){this.lines.map(e=>{e.x1+=t,e.x2+=t}),this.maxX+=t}changeY(t){this.lines.map(e=>{e.y1+=t,e.y2+=t})}move(t,e){this.changeX(t),this.changeY(e)}getMidpoint(){let t=new Vector2(0,0);return this.lines.forEach(e=>t.add({x:e.x1,y:e.y1})),t.x/=this.lines.length,t.y/=this.lines.length,t}resetMesh(){let t=this.getMidpoint();this.move(-t.x,-t.y)}rotate(t){let e=this.getMidpoint();this.changeX(-e.x),this.changeY(-e.y),this.lines.forEach(e=>{let s=e.x1,i=e.y1;e.x1=s*Math.cos(t)-i*Math.sin(t),e.y1=s*Math.sin(t)+i*Math.cos(t),this.maxX=Math.max(this.maxX,e.x1),s=e.x2,i=e.y2,e.x2=s*Math.cos(t)-i*Math.sin(t),e.y2=s*Math.sin(t)+i*Math.cos(t),this.maxX=Math.max(this.maxX,e.x2)}),this.changeX(e.x),this.changeY(e.y)}pointInPolygon(t){let e=new Line(t,new Vector2(10*this.maxX,t.y)),s=!1;for(let t=0;t<this.lines.length;t++)this.lines[t].intersects(e)&&(s=!s);return s}collision(t){for(let e=0;e<this.lines.length;e++)if(t.pointInPolygon(new Vector2(this.lines[e].x1,this.lines[e].y1)))return!0;for(let e=0;e<t.lines.length;e++)if(this.pointInPolygon(new Vector2(t.lines[e].x1,t.lines[e].y1)))return!0;return!1}render(t){$ctx.fillStyle=t,$ctx.beginPath(),$ctx.moveTo(this.lines[0].x1,this.lines[0].y1);for(let t=0;t<this.lines.length;t++)$ctx.lineTo(this.lines[t].x2,this.lines[t].y2);$ctx.lineTo(this.lines[0].x1,this.lines[0].y1),$ctx.fill(),$ctx.closePath()}}class RectangleMesh extends PolygonMesh{constructor(t,e,s=!0){super(s?[new Vector2(-t/2,-e/2),new Vector2(t/2,-e/2),new Vector2(t/2,e/2),new Vector2(-t/2,e/2)]:[new Vector2(0,0),new Vector2(t,0),new Vector2(t,e),new Vector2(0,e)])}}class PObject{constructor(t,e,s,i,h,n){this.x=t,this.y=e,this._mesh=s,this.colour=i,this.type=h,this._doesUpdate=!1,n&&(this._doesUpdate=!0,this.update=n)}get color(){return this.color}set color(t){this.color=t}get width(){return this._width}get mesh(){return this._mesh}set mesh(t){this._mesh=t}get collidesWithPlayer(){$player.readyMesh(),this._mesh.move(this.x,this.y);let t=$player._mesh.collision(this._mesh);return $player.resetMesh(),this._mesh.move(-this.x,-this.y),t}rotate(t){this._mesh.rotate(t)}render(){$ctx.fillStyle=this.colour,this._mesh.move(this.x-Camera.x,this.y-Camera.y),this._mesh.render(),this._mesh.move(-(this.x-Camera.x),-(this.y-Camera.y))}}class PText{constructor(t,e,s,i,h,n,r){this.message=t,this.font=e,this.size=s,this.x=i,this.y=h,this.type=0,this.colour=n,this._doesUpdate=!1,r&&(this._doesUpdate=!0,this.update=r)}get color(){return this.colour}set color(t){return this.colour}render(){$ctx.fillStyle=this.colour,$ctx.font=this.size+"px "+this.font,$ctx.fillText(this.message,this.x-Camera.x,this.y-Camera.y)}}class CustomPObject{constructor(t,e,s=function(){},i=function(){}){this.x=t,this.y=e,this._doesUpdate=!0,this.update=s,this.render=i}}class PersistentPObject{constructor(t,e,s=function(){},i=function(){}){this.x=t,this.y=e,this.update=s,this.render=i,$persistentObjects.push(this)}}class Level{constructor(t,e=function(){},s=function(){}){this._objects=t,this.start=e,this.end=s,$levels.push(this)}update(){this._objects.forEach(t=>{t._doesUpdate&&t.update()})}render(){this._objects.forEach(t=>t.render())}}class Player{constructor(t,e,s,i,h=!1,n=function(){}){this._x=t,this._y=e,this._startX=t,this._startY=e,this._mesh=s,this._colour=i,this._xVel=0,this.velocityMultiplier=1,this.resistance=.8,this._yVel=0,this.gravityMultiplier=1,this.gravityIncrease=1,this.wallJump=h,this.inWater=!1,this.touchingGround=!1,this.update=n,this._0dir=1,$player=this}get x(){return this._x}set x(t){this._x=t}get y(){return this._y}set y(t){this._y=t}get mesh(){return this._mesh}get colour(){return this._colour}set colour(t){this._colour=t}get color(){return this._colour}set color(t){this._colour=t}get midPoint(){this.readyMesh();let t=this._mesh.getMidpoint();return this.resetMesh(),t}readyMesh(){this._mesh.move(this.x,this.y)}resetMesh(){this._mesh.resetMesh()}jump(){this.touchingGround?this._yVel=-14:this.inWater&&(this._yVel=-4)}addForce(t,e){this._xVel+=t,this._yVel+=e}reset(){this._x=this._startX,this._y=this._startY,this._xVel=0,this._yVel=0,this.touchingGround=!1}die(){this.reset(),Statistics.deaths++}rotate(t){this._mesh.rotate(t)}collides(t){return this.readyMesh(),t._mesh.move(t.x,t.y),this._mesh.collision(t._mesh)}changeX(t){this._x+=t}collisionX(){let t=$levels[currentLevel]._objects,e=this._xVel>0?1:this._xVel<0?-1:0;this.inWater=!1,t.forEach(t=>{if(t.type>0){for(this.readyMesh(),t._mesh.move(t.x,t.y);this._mesh.collision(t._mesh);){switch(this.resetMesh(),t.type){case 1:if(0===e){if(1===this._0dir){this.readyMesh();let e=this._mesh.getMidpoint().x>=t._mesh.getMidpoint().x;this.resetMesh(),e?this._x+=1:this._x-=1,this._0dir=0}}else this._x-=e;!this.inWater&&this.wallJump&&(Input[87]||Input[38]||Input[32])?(this._xVel=1===e?-16:16,this._yVel=-12):this._xVel=0;break;case 2:this.die();break;case 3:this._x-=e;break;case 4:return this.inWater=!0,this._xVel*=.4,this._xVel>2?this._xVel=2:this._xVel<-2&&(this._xVel=-2),void t._mesh.resetMesh();case 9:$levels[currentLevel].end(),++currentLevel===$lastLevel&&Platformer.End(),$levels[currentLevel].start(),this.reset()}this.readyMesh()}this.resetMesh(),t._mesh.resetMesh()}})}changeY(t){this._y+=t}collisionY(){let t=$levels[currentLevel]._objects;this.touchingGround=!1;let e=this._yVel>0?1:this._yVel<0?-1:0;t.forEach(t=>{if(t.type>0){for(this.readyMesh(),t._mesh.move(t.x,t.y);this._mesh.collision(t._mesh);){switch(this.resetMesh(),t.type){case 1:if(0===e){if(0===this._0dir){this.readyMesh();let e=this._mesh.getMidpoint().y>t._mesh.getMidpoint().y;this.resetMesh(),e?this._y+=1:this._y-=1,this._0dir=1}}else this._y-=e;1===e||0===this.dir?this.touchingGround=!0:this.touchingGround=!1,this._yVel=0;break;case 2:this.die();break;case 3:this._y-=e,this._yVel=1===e?-24:0,this.touchingGround=!1;break;case 4:return this.inWater=!0,this._yVel*=.4,this._yVel>2?this._yVel=2:this._yVel<-2&&(this._yVel=-2),void t._mesh.resetMesh();case 9:$levels[currentLevel].end(),++currentLevel===$lastLevel&&Platformer.End(),$levels[currentLevel].start(),this.reset()}this.readyMesh()}this.resetMesh(),t._mesh.resetMesh()}})}physicsTick(){this._yVel+=this.gravityIncrease*this.gravityMultiplier,this._yVel>50&&(this._xVel=50),this._yVel<-50&&(this._xVel=-50),this.changeY(this._yVel),this.collisionY(),this._xVel*=this.resistance*this.velocityMultiplier,this._xVel>50&&(this._xVel=50),this._xVel<-50&&(this._xVel=-50),this.changeX(this._xVel),this.collisionX(),0===this._mesh.x&&0===this._mesh.y||this.resetMesh()}render(){this._mesh.move(this._x-Camera.x,this._y-Camera.y),this._mesh.render(this._colour),this._mesh.move(-(this._x-Camera.x),-(this._y-Camera.y))}}function frameRate(t=60){$frameRate=t}function dist(t,e,s,i){return Math.sqrt(Math.pow(s-t,2)+Math.pow(i-e,2))}function degreesToRadians(t){return t*Math.PI/180}function radiansToDegrees(t){return 180*t/Math.PI}let contrain,clamp,pi=Math.PI,pow=Math.pow,log=Math.log,sqrt=Math.sqrt,round=Math.round,min=Math.min,max=Math.max,abs=Math.abs,sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan;function random(t,e){return Math.random()*(e-t+1)+t}function randomInt(t,e){return Math.floor(Math.random()*(e-t+1))+t}function lerp(t,e,s){return s<0?s=0:s>1&&(s=1),t+(e-t)*s}constrain=clamp=function(t,e,s){return t<e?e:t>s?s:t},console.log("Loaded PlatformerJS by MattDESTROYER");
