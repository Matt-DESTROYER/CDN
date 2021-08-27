let $canvas,$ctx,width,height,keyDown,keyUp,keyPress,mouseDown,mouseUp,mouseClick,mouseMove,$previousFrame=Date.now(),$previousFrameReading=Date.now(),$frameRate=60,$frameCount=0,FPS=0,$scenes=[],currentScene=0,Input={},Time={startTime:0,_dt:0,get timeElapsed(){return Date.now()-this.startTime},get deltaTime(){return Date.now()-this._dt},get now(){return Date.now()}};keyDown=keyUp=keyPress=mouseDown=mouseUp=mouseClick=mouseMove=function(){},document.addEventListener("keydown",function(t){t=t||window.event,Input[t.keyCode]=!0,Input[t.key.toString().toUpperCase()]=!0,Input.keyCode=t.keyCode,Input.key=t.key,keyDown()}),document.addEventListener("keyup",function(t){t=t||window.event,Input[t.keyCode]=!1,Input[t.key.toString().toUpperCase()]=!1,keyUp()}),document.addEventListener("keypress",function(t){t=t||window.event,keyPress()}),document.addEventListener("mousedown",function(t){t=t||window.event,mouseDown()}),document.addEventListener("mouseup",function(t){t=t||window.event,mouseUp()}),document.addEventListener("click",function(t){t=t||window.event,mouseClick()}),document.addEventListener("mousemove",function(t){t=t||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY,Input.mouseX=t.x,Input.mouseY=t.y,mouseMove()});class GameEngine{static Start(){if(!$ctx)throw"2D Game Engine Error: No context. (Call GameEngine.initCanvas(id, ?fullscreen))";if($scenes.length<1)throw"2D Game Engine Error: No scenes. (Create at least one level new Level(objects))";Time.startTime=Date.now(),window.requestAnimationFrame(GameEngine.Update)}static Update(){$frameCount++,Date.now()-$previousFrameReading>=1e3&&(FPS=$frameCount,$frameCount=0,$previousFrameReading=Date.now()),Date.now()-$previousFrame>=1e3/$frameRate&&($scenes[currentScene].update(),GameEngine.Render(),$previousFrame=Date.now()),Time._dt=Date.now(),window.requestAnimationFrame(GameEngine.Update)}static Render(){$ctx.clearRect(0,0,$canvas.width,$canvas.height),this._backgroundColour&&($ctx.fillStyle=this._backgroundColour,$ctx.beginPath(),$ctx.rect(0,0,$canvas.width,$canvas.height),$ctx.fill(),$ctx.closePath()),$scenes[currentScene].render()}static initCanvas(t,e=!0){$canvas=document.getElementById(t),e&&($canvas.width=window.innerWidth,$canvas.height=window.innerHeight),width=$canvas.width,height=$canvas.height,($ctx=$canvas.getContext("2d")).lineWidth=0}static background(t){this._backgroundColour=t}}class Vector2{constructor(t,e){this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}add(t){this.x+=t.x,this.y+=t.y}sub(t){this.x-=t.x,this.y-=t.y}mult(t){this.x*=t.x,this.y*=t.y}div(t){this.x/=t.x,this.y/=t.y}dist(t){return sqrt(pow(t.x-this.x,2)+pow(t.y-this.y,2))}dot(t){return this.x*t.x+this.y*t.y}mag(){return sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=sqrt(this.x*this.x+this.y*this.y);return[this.x/t,this.y/t]}array(){return[this.x,this.y]}static dist(t,e){return sqrt(pow(e.x-t.x,2)+pow(e.y-t.y,2))}static dot(t,e){return t.x*e.x+t.y*e.y}static array(t){return[t.x,t.y]}static Zero(){return new Vector2(0,0)}}class Point extends Vector2{constructor(t,e){super(t,e)}}class Line{constructor(t,e){this.point1=t,this.point2=e,this.x1=t.x,this.y1=t.y,this.x2=e.x,this.y2=e.y}pointOnLine(t){let e=(this.y2-this.y1)/(this.x2-this.x1),s=this.y1-e*this.x1;return t.y===e*t.x+s}pointInLine(t){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(t)&&t.x>=this.x1&&t.x<=this.x2&&t.y>=this.y1&&t.y<=this.y2:this.pointOnLine(t)&&t.x>=this.x1&&t.x<=this.x2&&t.y>=this.y2&&t.y<=this.y1:this.y1<this.y2?this.pointOnLine(t)&&t.x>=this.x2&&t.x<=this.x1&&t.y>=this.y1&&t.y<=this.y2:this.pointOnLine(t)&&t.x>=this.x2&&t.x<=this.x1&&t.y>=this.y2&&t.y<=this.y1}intersects(t){if(this.pointInLine(t.point1)||this.pointInLine(t.point2))return!0;let e=(this.x2-this.x1)*(t.y2-t.y1)-(t.x2-t.x1)*(this.y2-this.y1);if(0===e)return!1;let s=((t.y2-t.y1)*(t.x2-this.x1)+(t.x1-t.x2)*(t.y2-this.y1))/e,i=((this.y1-this.y2)*(t.x2-this.x1)+(this.x2-this.x1)*(t.y2-this.y1))/e;return s>0&&s<1&&i>0&&i<1}}class PolygonMesh{constructor(t){this.lines=[],this.maxX=0;for(let e=0;e<t.length-1;e++)this.maxX+=Math.abs(t[e].x),this.maxX+=Math.abs(t[e+1].x),this.lines.push(new Line(t[e],t[e+1]));this.lines.push(new Line(t[t.length-1],t[0])),this.maxX*=10}changeX(t){this.lines.map(e=>{e.x1+=t,e.x2+=t}),this.maxX+=t}changeY(t){this.lines.map(e=>{e.y1+=t,e.y2+=t})}move(t,e){this.changeX(t),this.changeY(e)}getMidpoint(){let t=new Vector2(0,0);return this.lines.forEach(e=>t.add(e.point1)),t.x/=this.lines.length,t.y/=this.lines.length,t}resetMesh(){let t=this.getMidpoint();this.move(-t.x,-t.y)}rotate(t){let e=this.getMidpoint();this.changeX(-e.x),this.changeY(-e.y),this.lines.forEach(e=>{let s=e.x1,i=e.y1;e.x1=s*Math.cos(t)-i*Math.sin(t),e.y1=s*Math.sin(t)+i*Math.cos(t),this.maxX=Math.max(this.maxX,e.x1),s=e.x2,i=e.y2,e.x2=s*Math.cos(t)-i*Math.sin(t),e.y2=s*Math.sin(t)+i*Math.cos(t),this.maxX=Math.max(this.maxX,e.x2)}),this.changeX(e.x),this.changeY(e.y)}pointInPolygon(t){let e=new Line(t,new Vector2(10*this.maxX,t.y)),s=!1;for(let t=0;t<this.lines.length;t++)this.lines[t].intersects(e)&&(s=!s);return s}collision(t){for(let e=0;e<this.lines.length;e++)if(t.pointInPolygon(new Vector2(this.lines[e].x1,this.lines[e].y1)))return!0;for(let e=0;e<t.lines.length;e++)if(this.pointInPolygon(new Vector2(t.lines[e].x1,t.lines[e].y1)))return!0;return!1}render(t){$ctx.fillStyle=t,$ctx.beginPath(),$ctx.moveTo(this.lines[0].x1,this.lines[0].y1);for(let t=0;t<this.lines.length;t++)$ctx.lineTo(this.lines[t].x2,this.lines[t].y2);$ctx.lineTo(this.lines[0].x1,this.lines[0].y1),$ctx.fill(),$ctx.closePath()}}class RectangleMesh extends PolygonMesh{constructor(t,e,s=!0){super(s?[new Vector2(-t/2,-e/2),new Vector2(t/2,-e/2),new Vector2(t/2,e/2),new Vector2(-t/2,e/2)]:[new Vector2(0,0),new Vector2(t,0),new Vector2(t,e),new Vector2(0,e)])}}class GameObject{constructor(t,e,s,i,n=function(){}){this.x=t,this.y=e,this.mesh=s,this.colour=i,this.rotation=0,this.update=n}readyMesh(){this.mesh.move(this.x,this.y)}resetMesh(){this.mesh.resetMesh()}collision(t){this.readyMesh(),t.readyMesh(),this.mesh.rotate(this.rotation),t.mesh.rotate(t.rotation),this.mesh.collision(t),this.mesh.rotate(-this.rotation),t.mesh.rotate(-t.rotation),this.resetMesh(),t.resetMesh()}render(){this.readyMesh(),this.mesh.rotate(this.rotation),this.mesh.render(),this.mesh.rotate(-this.rotation),this.resetMesh()}}class Scene{constructor(t,e){this.gameObjects=t,this.camera=e,$scenes.push(this)}update(){this.camera.update(),this.gameObjects(t=>t.update())}render(){$ctx.translate(this.camera.x,this.camera.y),this.gameObjects(t=>t.render(this.colour)),$ctx.translate(-this.camera.x,-this.camera.y)}}console.log("Loaded 2DGameEngineJS by MattDESTROYER");
