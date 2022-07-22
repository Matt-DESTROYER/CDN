let $canvas,$ctx,$player,$platformerRunning=!0,$lastLevel,$previousFrame=0,$previousFrameReading=0,$frameRate=60,$frameCount=0,FPS=0,$levels=[],$persistentObjects=[],currentLevel=0,width,height,$updateCondition=function(){return!0};const Input={},Camera={x:0,y:0},Time={startTime:0,endTime:null,"_dt":0,deltaTime:0,get timeElapsed(){return Date.now()-Time.startTime},get now(){return Date.now()}},Statistics={deaths:0,get millisecondsElapsed(){return Date.now()-Time.startTime},get secondsElapsed(){return(Date.now()-Time.startTime)/1e3},get minutesElapsed(){return(Date.now()-Time.startTime)/6e4},get millisecondsToFinish(){return null===Time.endTime?null:Time.endTime-Time.startTime},get secondsToFinish(){return null===Time.endTime?null:(Time.endTime-Time.startTime)/1e3},get minutesToFinish(){return null===Time.endTime?null:(Time.endTime-Time.startTime)/6e4}};function fullscreen(){$canvas&&("requestFullscreen"in $canvas?$canvas.requestFullscreen():"webkitRequestFullscreen"in $canvas?$canvas.webkitRequestFullscreen():"msRequestFullscreen"in $canvas&&$canvas.msRequestFullscreen())}function addStyles(b){let a=document.createElement("style");"styleSheet"in a?a.styleSheet.cssText=b:a.appendChild(document.createTextNode(b)),document.querySelector("head").appendChild(a)}let keyDown,keyUp,keyPress,mouseDown,mouseUp,mouseClick,mouseMove,touchStart,touchMove,touchCancel,touchEnd;keyDown=keyUp=keyPress=mouseDown=mouseUp=mouseClick=mouseMove=touchStart=touchMove=touchCancel=touchEnd=function(){};class Platformer{static Start(a=$levels.length){if($lastLevel=a,$ctx){if(0===$levels.length)throw new Error("[Platformer Error] No levels. (Create at least one level new Level(objects))");if(!$player)throw new Error("[Platformer Error] No player. (Create a player before calling Start new Player(x, y, width, height, colour))");new Level([new PObject(0,200,new RectangleMesh(150,25),"black",1)]),Time.startTime=Date.now(),$levels[0].start(),window.addEventListener("keydown",function(a){Input[(a=a||window.event).keyCode]=!0,Input[a.key.toString().toUpperCase()]=!0,Input.keyCode=a.keyCode,Input.key=a.key,keyDown()}),window.addEventListener("keyup",function(a){Input[(a=a||window.event).keyCode]=!1,Input[a.key.toString().toUpperCase()]=!1,keyUp()}),window.addEventListener("keypress",function(a){a=a||window.event,keyPress()}),window.addEventListener("mousedown",function(a){a=a||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;let b=$canvas.getBoundingClientRect();Input.mouseX=a.clientX-b.left,Input.mouseY=a.clientY-b.top,Input.mouseDown=!0,mouseDown()}),window.addEventListener("mouseup",function(a){a=a||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;let b=$canvas.getBoundingClientRect();Input.mouseX=a.clientX-b.left,Input.mouseY=a.clientY-b.top,Input.mouseDown=!1,mouseUp()}),window.addEventListener("click",function(a){a=a||window.event,mouseClick()}),window.addEventListener("mousemove",function(a){a=a||window.event,Input.pmouseX=Input.mouseX,Input.pmouseY=Input.mouseY;let b=$canvas.getBoundingClientRect();Input.mouseX=a.clientX-b.left,Input.mouseY=a.clientY-b.top,mouseMove()}),window.addEventListener("touchstart",function(a){(a=a||window.event).preventDefault();let b=$canvas.getBoundingClientRect();Input.mouseX=a.changedTouches[0].clientX-b.left,Input.mouseY=a.changedTouches[0].clientY-b.top,Input.mouseDown=!0,touchStart()}),window.addEventListener("touchmove",function(a){(a=a||window.event).preventDefault();let b=$canvas.getBoundingClientRect();Input.mouseX=a.changedTouches[0].clientX-b.left,Input.mouseY=a.changedTouches[0].clientY-b.top,touchMove()}),window.addEventListener("touchcancel",function(a){(a=a||window.event).preventDefault();let b=$canvas.getBoundingClientRect();Input.mouseX=a.changedTouches[0].clientX-b.left,Input.mouseY=a.changedTouches[0].clientY-b.top,Input.mouseDown=!1,touchCancel()}),window.addEventListener("touchend",function(a){(a=a||window.event).preventDefault();let b=$canvas.getBoundingClientRect();Input.mouseX=a.changedTouches[0].clientX-b.left,Input.mouseY=a.changedTouches[0].clientY-b.top,Input.mouseDown=!1,touchEnd()}),window.requestAnimationFrame(Platformer.Update)}else throw new Error("[Platformer Error] No context. (Call Platformer.initCanvas(id, ?fullscreen))")}static get width(){return $canvas.width}static get height(){return $canvas.height}static End(){Time.endTime=Date.now()}static Stop(){$platformerRunning=!1}static UpdateCondition(a){$updateCondition=a}static Update(a){Time.deltaTime=a-$previousFrame,$frameCount++,a-$previousFrameReading>=1e3&&(FPS=$frameCount,$frameCount=0,$previousFrameReading=a),a-$previousFrame>=1e3/$frameRate&&(void 0===$levels[currentLevel]&&Platformer.Stop(),$updateCondition()&&($levels[currentLevel].update(),$persistentObjects.forEach(a=>a.update()),$player.physicsTick(),$player.update()),Platformer.Render(),$previousFrame=a,Time._dt=a),$platformerRunning&&window.requestAnimationFrame(Platformer.Update)}static Render(){this._backgroundColour?($ctx.fillStyle=this._backgroundColour,$ctx.beginPath(),$ctx.rect(0,0,$canvas.width,$canvas.height),$ctx.fill(),$ctx.closePath()):$ctx.clearRect(0,0,$canvas.width,$canvas.height),$levels[currentLevel].render(),$persistentObjects.forEach(a=>a.render()),$player.render()}static Reset(){currentLevel=0,Time.startTime=Date.now(),Time.endTime=null,Time._dt=0,$player.die(),Camera.x=Camera.y=0,Statistics.deaths=0,$levels[0].start()}static initCanvas(a=null,d=!0,b=null,c=null){return a?$canvas="string"==typeof a?document.getElementById(a):a:($canvas=document.createElement("canvas"),(document.body||document.querySelector("body")).appendChild($canvas)),fullscreen?($canvas.width=window.innerWidth,$canvas.height=window.innerHeight,$canvas.style.position="absolute",$canvas.style.left=0,$canvas.style.top=0,addStyles("*{margin:0px;overflow:hidden;}"),window.addEventListener("resize",function(){$canvas.width=window.innerWidth,$canvas.height=window.innerHeight})):(b&&(width=b),c&&(height=c)),width=$canvas.width,height=$canvas.height,$ctx=$canvas.getContext("2d"),$ctx.lineWidth=0,$canvas}static background(a){this._backgroundColour=a}}class EventListener{constructor(a,b){this.name=a,this.func=b}clone(){return new EventListener(this.name,this.func)}}class Vector2{constructor(a,b){this.x=a,this.y=b}getX(){return this.x}getY(){return this.y}setX(a){this.x=a}setY(a){this.y=a}add(a){this.x+=a.x,this.y+=a.y}sub(a){this.x-=a.x,this.y-=a.y}mult(a){this.x*=a.x,this.y*=a.y}div(a){this.x/=a.x,this.y/=a.y}dist(a){return Math.sqrt(Math.pow(a.x-this.x,2)+Math.pow(a.y-this.y,2))}dot(a){return this.x*a.x+this.y*a.y}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let a=Math.sqrt(this.x*this.x+this.y*this.y);return[this.x/a,this.y/a]}array(){return[this.x,this.y]}static dist(a,b){return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2))}static dot(a,b){return a.x*b.x+a.y*b.y}static array(a){return[a.x,a.y]}static Zero(){return new Vector2(0,0)}}let Point=Vector2;class Line{constructor(a,b){this.point1=a,this.point2=b,this.x1=a.x,this.y1=a.y,this.x2=b.x,this.y2=b.y}pointOnLine(a){let b=(this.y2-this.y1)/(this.x2-this.x1),c=this.y1-b*this.x1;return a.y===b*a.x+c}pointInLine(a){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(a)&&a.x>=this.x1&&a.x<=this.x2&&a.y>=this.y1&&a.y<=this.y2:this.pointOnLine(a)&&a.x>=this.x1&&a.x<=this.x2&&a.y>=this.y2&&a.y<=this.y1:this.y1<this.y2?this.pointOnLine(a)&&a.x>=this.x2&&a.x<=this.x1&&a.y>=this.y1&&a.y<=this.y2:this.pointOnLine(a)&&a.x>=this.x2&&a.x<=this.x1&&a.y>=this.y2&&a.y<=this.y1}intersects(a){if(this.pointInLine(a.point1)||this.pointInLine(a.point2))return!0;let b=(this.x2-this.x1)*(a.y2-a.y1)-(a.x2-a.x1)*(this.y2-this.y1);if(0===b)return!1;let c=((a.y2-a.y1)*(a.x2-this.x1)+(a.x1-a.x2)*(a.y2-this.y1))/b,d=((this.y1-this.y2)*(a.x2-this.x1)+(this.x2-this.x1)*(a.y2-this.y1))/b;return c>0&&c<1&&d>0&&d<1}}class PolygonMesh{constructor(a){this.lines=[],this.maxX=0;for(let b=0;b<a.length-1;b++)this.maxX+=Math.abs(a[b].x),this.maxX+=Math.abs(a[b+1].x),this.lines.push(new Line(a[b],a[b+1]));this.lines.push(new Line(a[a.length-1],a[0])),this.maxX*=10}changeX(a){this.lines.forEach(b=>{b.x1+=a,b.x2+=a}),this.maxX+=a}changeY(a){this.lines.forEach(b=>{b.y1+=a,b.y2+=a})}move(a,b){this.changeX(a),this.changeY(b)}getMidpoint(){let a=new Vector2(0,0);return this.lines.forEach(b=>a.add({x:b.x1,y:b.y1})),a.x/=this.lines.length,a.y/=this.lines.length,a}resetMesh(){let _=this.getMidpoint();this.move(-_.x,-_.y)}rotate(b){let a=this.getMidpoint();this.changeX(-a.x),this.changeY(-a.y),this.lines.forEach(a=>{let c=a.x1,d=a.y1;a.x1=c*Math.cos(b)-d*Math.sin(b),a.y1=c*Math.sin(b)+d*Math.cos(b),this.maxX=Math.max(this.maxX,a.x1),c=a.x2,d=a.y2,a.x2=c*Math.cos(b)-d*Math.sin(b),a.y2=c*Math.sin(b)+d*Math.cos(b),this.maxX=Math.max(this.maxX,a.x2)}),this.changeX(a.x),this.changeY(a.y)}pointInPolygon(c){let d=new Line(c,new Vector2(10*this.maxX,c.y)),a=!1;for(let b=0;b<this.lines.length;b++)this.lines[b].intersects(d)&&(a=!a);return a}collision(a){for(let b=0;b<this.lines.length;b++)if(a.pointInPolygon(new Vector2(this.lines[b].x1,this.lines[b].y1)))return!0;for(let c=0;c<a.lines.length;c++)if(this.pointInPolygon(new Vector2(a.lines[c].x1,a.lines[c].y1)))return!0;return!1}render(b){$ctx.fillStyle=b,$ctx.beginPath(),$ctx.moveTo(this.lines[0].x1,this.lines[0].y1);for(let a=0;a<this.lines.length;a++)$ctx.lineTo(this.lines[a].x2,this.lines[a].y2);$ctx.lineTo(this.lines[0].x1,this.lines[0].y1),$ctx.fill(),$ctx.closePath()}}class RectangleMesh extends PolygonMesh{constructor(a,b,c=!0){c?super([new Vector2(-a/2,-b/2),new Vector2(a/2,-b/2),new Vector2(a/2,b/2),new Vector2(-a/2,b/2)]):super([new Vector2(0,0),new Vector2(a,0),new Vector2(a,b),new Vector2(0,b)])}}class PObject{constructor(a,b,c,d,e){this.x=a,this.y=b,this._mesh=c,this.colour=d,this.type=e,this.eventListeners=[]}get color(){return this.color}set color(a){this.colour=a}get mesh(){return this._mesh}set mesh(a){this._mesh=a}get collidesWithPlayer(){$player.readyMesh(),this._mesh.move(this.x,this.y);let _=$player._mesh.collision(this._mesh);return $player.resetMesh(),this._mesh.move(-this.x,-this.y),_}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}start(){this.eventListeners.forEach(a=>{"start"===a.name&&a.func(this)})}update(){this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}rotate(a){this._mesh.rotate(a)}render(){$ctx.fillStyle=this.colour,this._mesh.move(this.x-Camera.x,this.y-Camera.y),this._mesh.render(),this._mesh.move(-(this.x-Camera.x),-(this.y-Camera.y)),this.eventListeners.forEach(a=>{"render"===a.name&&a.func(this)})}}class PText{constructor(a,b,c,d,e,f){this.message=a,this.font=b,this.size=c,this.x=d,this.y=e,this.type=0,this.colour=f,this.eventListeners=[]}get color(){return this.colour}set color(a){this.colour=a}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}start(){this.eventListeners.forEach(a=>{"start"===a.name&&a.func(this)})}update(){this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}render(){$ctx.fillStyle=this.colour,$ctx.font=this.size+"px "+this.font,$ctx.fillText(this.message,this.x-Camera.x,this.y-Camera.y),this.eventListeners.forEach(a=>{"render"===a.name&&a.func(this)})}}class CustomPObject{constructor(a,b){this.x=a,this.y=b,this.eventListeners=[]}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}start(){this.eventListeners.forEach(a=>{"start"===a.name&&a.func(this)})}update(){this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}render(){this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}}class PersistentPObject{constructor(a,b){this.x=a,this.y=b,this.eventListeners=[],$persistentObjects.push(this)}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}start(){this.eventListeners.forEach(a=>{"start"===a.name&&a.func(this)})}update(){this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}render(){this.eventListeners.forEach(a=>{"render"===a.name&&a.func(this)})}}class Level{constructor(a){this._objects=a,this.eventListeners=[],$levels.push(this)}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}start(){this._objects.forEach(a=>a.start()),this.eventListeners.forEach(a=>{"start"===a.name&&a.func(this)})}update(){this._objects.forEach(a=>a.update()),this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}render(){this._objects.forEach(a=>a.render()),this.eventListeners.forEach(a=>{"render"===a.name&&a.func(this)})}}class Player{constructor(a,b,c,d,e=!1){this.x=a,this.y=b,this._startX=a,this._startY=b,this._mesh=c,this.colour=d,this.xVel=0,this.velocityMultiplier=1,this.resistance=.8,this.yVel=0,this.gravityMultiplier=1,this.gravity=1,this.wallJump=e,this.inWater=!1,this.touchingGround=!1,this.objectsColliding=[],this._0dir=1,this.eventListeners=[],$player=this}get mesh(){return this._mesh}get colour(){return this._colour}set colour(a){this._colour=a}get midPoint(){this.readyMesh();let _=this._mesh.getMidpoint();return this.resetMesh(),_}addEventListener(a,b){return a instanceof EventListener?this.eventListeners.push(a):this.eventListeners.push(new EventListener(a,b)),this}removeEventListener(a,e=!1){if(a instanceof EventListener){for(let b=0;b<this.eventListeners.length;b++)if(this.eventListeners[b]===a){if(!e)return this.eventListeners.splice(b,1)[0];this.eventListeners.splice(b,1)}}else if("function"==typeof a){for(let c=0;c<this.eventListeners.length;c++)if(this.eventListeners[c].func===a){if(!e)return this.eventListeners.splice(c,1)[0];this.eventListeners.splice(c,1)}}else if("string"==typeof a){for(let d=0;d<this.eventListeners.length;d++)if(this.eventListeners[d].name===a){if(!e)return this.eventListeners.splice(d,1)[0];this.eventListeners.splice(d,1)}}}update(){this.eventListeners.forEach(a=>{"update"===a.name&&a.func(this)})}readyMesh(){this._mesh.move(this.x,this.y)}resetMesh(){this._mesh.resetMesh()}jump(a=14,b=4){this.touchingGround&&!this.inWater?(this.yVel=-a,this.eventListeners.forEach(a=>{"jump"===a.name&&a.func(this)})):this.inWater&&(this.yVel=-b)}addXForce(a){this.xVel+=a}addYForce(a){this.yVek+=a}addForce(a,b){this.xVel+=a,this.yVel-=b}reset(){this.x=this._startX,this.y=this._startY,this.xVel=0,this.yVel=0,this.eventListeners.forEach(a=>{"reset"===a.name&&a.func(this)})}die(){this.reset(),Statistics.deaths++,this.eventListeners.forEach(a=>{"death"===a.name&&a.func(this)})}rotate(a){this._mesh.rotate(a)}collides(a){this.readyMesh(),a._mesh.move(a.x,a.y);let b=this._mesh.collision(a._mesh);return this.resetMesh(),a._mesh.move(-a.x,-a.y),b}collisionX(){let a=Math.sign(this.xVel);$levels[currentLevel]._objects.forEach(b=>{if(b.type>0){for(this.readyMesh(),b._mesh.move(b.x,b.y);this._mesh.collision(b._mesh);){switch(this.resetMesh(),b.type){case 1:0===a?1===this._0dir&&(this.readyMesh(),this._mesh.getMidpoint().x>=b._mesh.getMidpoint().x?this.x+=1:this.x-=1,this.resetMesh(),this._0dir=0):this.x-=a,!this.inWater&&this.wallJump&&(Input[87]||Input[38]||Input[32]||Input.mouseDown)?(1===a?this.xVel=-16:this.xVel=16,this.yVel=-12):this.xVel=0;break;case 3:this.x-=a;break;case 4:this.xVel*=.4,this.xVel>2?this.xVel=2:this.xVel< -2&&(this.xVel=-2),b._mesh.resetMesh();return}this.readyMesh()}this.resetMesh(),b._mesh.resetMesh()}})}collisionY(){let a=Math.sign(this.yVel);$levels[currentLevel]._objects.forEach(b=>{if(b.type>0){for(this.readyMesh(),b._mesh.move(b.x,b.y);this._mesh.collision(b._mesh);){switch(this.resetMesh(),b.type){case 1:0===a?0===this._0dir&&(this.readyMesh(),this._mesh.getMidpoint().y>b._mesh.getMidpoint().y?this.y++:this.y--,this.resetMesh(),this._0dir=1):this.y-=a,this.yVel=0;break;case 3:this.y-=a,1===a?this.yVel=-24:this.yVel=0;break;case 4:this.yVel*=.4,this.yVel>2?this.yVel=2:this.yVel< -2&&(this.yVel=-2),b._mesh.resetMesh();return}this.readyMesh()}this.resetMesh(),b._mesh.resetMesh()}})}physicsTick(){this.yVel+=this.gravity*this.gravityMultiplier,this.yVel>50?this.yVel=50:this.yVel< -50&&(this.yVel=-50),this.xVel*=this.resistance*this.velocityMultiplier,this.xVel>50?this.xVel=50:this.xVel< -50&&(this.xVel=-50),this.objectsColliding=[];let c=this.objectsColliding,a=this.inWater,b=this.touchingGround;this.inWater=this.touchingGround=!1,this.x+=this.xVel,this.y+=this.yVel,$levels[currentLevel]._objects.forEach(a=>{if(a.type>0){if(this.readyMesh(),a._mesh.move(a.x,a.y),this._mesh.collision(a._mesh)){switch(a.type){case 1:this.yVel>=0&&(this.touchingGround=!0);break;case 2:this.resetMesh(),a._mesh.resetMesh(),this.die();return;case 4:this.inWater=!0;break;case 9:currentLevel++,this.resetMesh(),a._mesh.resetMesh(),this.reset(),this.eventListeners.forEach(a=>{"levelup"===a.name&&a.func(this)}),$levels[currentLevel].start(),currentLevel===$lastLevel&&Platformer.End();return}c.includes(a)||c.push(a)}this.resetMesh(),a._mesh.resetMesh()}}),this.x-=this.xVel,this.collisionY(),this.x+=this.xVel,this.collisionX(),(0!==this._mesh.x||0!==this._mesh.y)&&this.resetMesh(),this.objectsColliding.forEach(a=>{this.eventListeners.forEach(b=>{"collision"===b.name&&b.func(this,a)})}),this.inWater!==a&&(this.inWater?this.eventListeners.forEach(a=>{"waterenter"===a.name&&a.func(this)}):this.eventListeners.forEach(a=>{"waterexit"===a.name&&a.func(this)})),this.touchingGround!==b&&(this.touchingGround?this.eventListeners.forEach(a=>{"groundenter"===a.name&&a.func(this)}):this.eventListeners.forEach(a=>{"groundexit"===a.name&&a.func(this)}))}render(){this.colour instanceof Image&&this.colour.complete?$ctx.drawImage(this.colour,this.x-Camera.x-this.colour.width/2,this.y-Camera.y-this.colour.height/2):(this._mesh.move(this.x-Camera.x,this.y-Camera.y),this._mesh.render(this.colour),this._mesh.move(-(this.x-Camera.x),-(this.y-Camera.y))),this.eventListeners.forEach(a=>{"render"===a.name&&a.func(this)})}}function frameRate(a=60){$frameRate=a}function dist(a,b,c,d){return Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2))}function degreesToRadians(a){return a*Math.PI/180}function radiansToDegrees(a){return 180*a/Math.PI}const pi=Math.PI,pow=(a,b=2)=>a**b,log=Math.log,sqrt=Math.sqrt,round=Math.round,floor=a=>~~a,ceil=Math.ceil,min=Math.min,max=Math.max,abs=Math.abs,sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan,Randomiser=function(){function a(c){let d=[];for(let b=0;b<c.length;b++)Array.isArray(c[b])?d.push(a(c[b])):d.push(c[b]);return d}return String.prototype.shuffle=function(){let a=this.split(""),b="";for(;a.length>0;)b+=a.splice(~~(Math.random()*a.length),1)[0];return b},Array.prototype.shuffle=function(e){let a=[],d=[];if(e)for(let b=0;b<this.length;b++)Array.isArray(this[b])?a.push(this[b].shuffle()):a.push(this[b]);else for(let c=0;c<this.length;c++)a.push(this[c]);for(;a.length>0;)d.push(a.splice(~~(Math.random()*a.length),1)[0]);return d},String.prototype.pick=function(){return this[~~(Math.random()*this.length)]},Array.prototype.pick=function(b){let a=this;return b&&(a=a.flat(1/0)),a[~~(Math.random()*a.length)]},{int:function(a,b=null){return null===b?~~(Math.random()*a):a===b?a:(a>b&&([a,b]=[b,a]),Math.round(Math.random()*(b-a))+a)},float:function(a,b=null){return null===b?Math.random()*a:a===b?a:(a>b&&([a,b]=[b,a]),Math.random()*(b-a)+a)},string:function(a,d){let b="";for(let c=0;c<d;c++)b+=a[~~(Math.random()*a.length)];return b},array:function(a,d){let b=[];for(let c=0;c<d;c++)b.push(a[~~(Math.random()*a.length)]);return b},shuffle:function i(b,j=!1){if(Array.isArray(b)){let c=[];if(j)for(let d=0;d<b.length;d++)Array.isArray(b[d])?c.push(i(b[d])):c.push(b[d]);else for(let e=0;e<b.length;e++)Array.isArray(b[e])?c.push(a(b[e])):c.push(b[e]);let g=[];for(;c.length>0;)g.push(c.splice(~~(Math.random()*c.length),1)[0]);return g}if("string"==typeof b){let f=b.split(""),h="";for(;f.length>0;)h+=f.splice(~~(Math.random()*f.length),1)[0];return h}return null},pick:function(a,b=!0){return"string"==typeof a?a[~~(Math.random()*a.length)]:Array.isArray(a)?(b&&(a=a.flat(1/0)),a[~~(Math.random()*a.length)]):null}}}();function constrain(a,b,c){return a<b?b:a>c?c:a}function clamp(a,b,c){return a<b?b:a>c?c:a}function lerp(a,c,b){return b<0?b=0:b>1&&(b=1),c>a&&([a,c]=[c,a]),a+(c-a)*b}console.log("Loaded Randomiser.js by Matthew James"),console.log("Loaded PlatformerJS by Matthew James")
