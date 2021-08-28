function add(t,e){if("number"!=typeof t||"number"!=typeof e)throw TypeError();return t+e}function subtract(t,e){if("number"!=typeof t||"number"!=typeof e)throw TypeError();return t-e}function multiply(t,e){if("number"!=typeof t||"number"!=typeof e)throw TypeError();return t*e}function divide(t,e){if("number"!=typeof t||"number"!=typeof e)throw TypeError();return t/e}function dist(t,e,i,s){return Math.sqrt(Math.pow(i-t,2)+Math.pow(s-e,2))}function dist3D(t,e,i,s,n,h){return Math.sqrt(Math.pow(s-t,2)+Math.pow(n-e,2)+Math.pow(h-i,2))}function degreesToRadians(t){return t*Math.PI/180}function radiansToDegrees(t){return 180*t/Math.PI}var pi=Math.PI,pow=Math.pow,sqrt=Math.sqrt,round=Math.round,floor=Math.floor,ceil=Math.ceil,sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan;function abs(t){return t instanceof Array?t.map(t=>abs(t)):t<0?-t:t}function min(){let t=1/0;if(1===arguments.length&&arguments[0]instanceof Array)arguments[0].forEach(e=>t=e<t?e:t);else if(arguments.length>1)for(let e=0;e<arguments.length;e++)arguments[e]instanceof Array&&(arguments[e]=arguments[e]=min(arguments[e])),arguments[e]<t&&(t=arguments[e]);return t===1/0?NaN:t}function max(){let t=-1/0;if(1===arguments.length&&arguments[0]instanceof Array)arguments[0].forEach(e=>t=e>t?e:t);else if(arguments.length>1)for(let e=0;e<arguments.length;e++)arguments[e]instanceof Array&&(arguments[e]=arguments[e]=min(arguments[e])),arguments[e]>t&&(t=arguments[e]);return t===-1/0?NaN:t}function random(t,e){return Math.random()*(e-t)+t}function randomInt(t,e){return Math.floor(Math.random()*(e-t))+t}function isPrime(t){if(t<2)return!1;if(2===t)return!0;if(t%2==0)return!1;if(t<10)return 3===t||5===t||7===t;for(var e=3;e<Math.floor(Math.sqrt(t));e+=2)if(t%e==0)return!1;return!0}function lerp(t,e,i){return i<0?i=0:i>1&&(i=1),t+(e-t)*i}function constrain(t,e,i){return t>e?e:t<i?i:t}class Vector2{constructor(t,e){this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}add(t){this.x+=t.x,this.y+=t.y}sub(t){this.x-=t.x,this.y-=t.y}mult(t){this.x*=t.x,this.y*=t.y}div(t){this.x/=t.x,this.y/=t.y}dist(t){return Math.sqrt(Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2))}dot(t){return this.x*t.x+this.y*t.y}mag(){return sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=sqrt(this.x*this.x+this.y*this.y);return[this.x/t,this.y/t]}array(){return[this.x,this.y]}static dist(t,e){return sqrt(pow(e.x-t.x,2)+pow(e.y-t.y,2))}static dot(t,e){return t.x*e.x+t.y*e.y}static array(t){return[t.x,t.y]}static Zero(){return new Vector2(0,0)}}class Vector3{constructor(t,e,i){this.x=t,this.y=e,this.z=i}getX(){return this.x}getY(){return this.y}getZ(){return this.z}setX(t){this.x=t}setY(t){this.y=t}setZ(t){this.z=t}add(t){this.x+=t.x,this.y+=t.y,this.z+=t.z}sub(t){this.x-=t.x,this.y-=t.y,this.z-=t.z}mult(t){this.x*=t.x,this.y*=t.y,this.z*=t.z}div(t){this.x/=t.x,this.y/=t.y,this.z/=t.z}dist(t){return sqrt(pow(t.x-this.x,2)+pow(t.y-this.y,2)+pow(t.z-this.z,2))}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}mag(){return sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}normalize(){let t=sqrt(this.x*this.x+this.y*this.y+this.z*this.z);return[this.x/t,this.y/t,this.z/t]}array(){return[this.x,this.y,this.z]}static dist(t,e){return sqrt(pow(e.x-t.x,2)+pow(e.y-t.y,2)+pow(e.z-t.z,2))}static dot(t,e){return t.x*e.x+t.y*e.y+t.z*e.z}static array(t){return[t.x,t.y,t.z]}static Zero(){return new Vector3(0,0,0)}}class Color{constructor(t,e,i,s=1){this.r=t,this.g=e,this.b=i,this.a=s}toString(){return"rgba("+this.r+","+this.g+","+this.b+","+this.a+")"}getRed(){return this.r}getGreen(){return this.g}getBlue(){return this.b}getAlpha(){return this.a}setRed(t=0){this.r=t}setGreen(t=0){this.g=t}setBlue(t=0){this.b=t}setAlpha(t=1){this.a=t}}class Line{constructor(t,e){this.point1=t,this.point2=e,this.x1=t.x,this.y1=t.y,this.x2=e.x,this.y2=e.y}pointOnLine(t){let e=(this.y2-this.y1)/(this.x2-this.x1),i=this.y1-e*this.x1;return t.y===e*t.x+i}pointInLine(t){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(t)&&t.x>=this.x1&&t.x<=this.x2&&t.y>=this.y1&&t.y<=this.y2:this.pointOnLine(t)&&t.x>=this.x1&&t.x<=this.x2&&t.y>=this.y2&&t.y<=this.y1:this.y1<this.y2?this.pointOnLine(t)&&t.x>=this.x2&&t.x<=this.x1&&t.y>=this.y1&&t.y<=this.y2:this.pointOnLine(t)&&t.x>=this.x2&&t.x<=this.x1&&t.y>=this.y2&&t.y<=this.y1}intersects(t){if(this.pointInLine(t.point1)||this.pointInLine(t.point2))return!0;let e=(this.x2-this.x1)*(t.y2-t.y1)-(t.x2-t.x1)*(this.y2-this.y1);if(0===e)return!1;let i=((t.y2-t.y1)*(t.x2-this.x1)+(t.x1-t.x2)*(t.y2-this.y1))/e,s=((this.y1-this.y2)*(t.x2-this.x1)+(this.x2-this.x1)*(t.y2-this.y1))/e;return i>0&&i<1&&s>0&&s<1}}class Rectangle{constructor(t,e,i,s,n=new Color(0,0,0,0),h=function(){$ctx.fillStyle=n.string,$ctx.rect(this.x,this.y,this.w,this.h)}){this.x=t,this.y=e,this.width=i,this.w=i,this.height=s,this.h=s,this.color=n,this.render=h}getX(){return this.x}getY(){return this.y}getWidth(){return this.width}getHeight(){return this.height}setX(t=0){this.x=t}setY(t=0){this.y=t}setWidth(t=0){this.width=t,this.w=t}setHeight(t=0){this.height=t,this.h=t}changeX(t=0){this.x+=t}changeY(t=0){this.y+=t}changeWidth(t=0){this.width+=t,this.w+=t}changeHeight(t=0){this.height+=t,this.h+=t}}class Polygon{constructor(t){this.lines=[],this.maxX=0;for(let e=0;e<t.length-1;e++)this.maxX=Math.max(this.maxX,t[e].x),this.maxX=Math.max(this.maxX,t[e+1].x),this.lines.push(new Line(t[e],t[e+1]));this.lines.push(new Line(t[t.length-1],t[0])),this.maxX=abs(this.maxX)}pointInPolygon(t){let e=new Line(t,new Vector2(2*this.maxX+1,t.y)),i=!1;for(let t=0;t<this.lines.length;t++)this.lines[t].intersects(e)&&(i=!i);return i}collision(t){for(let e=0;e<this.lines.length;e++)if(t.pointInPolygon(new Vector2(this.lines[e].x1,this.lines[e].y1)))return!0;for(let e=0;e<t.lines.length;e++)if(this.pointInPolygon(new Vector2(t.lines[e].x1,t.lines[e].y1)))return!0;return!1}changeX(t){for(let e=0;e<this.lines.length;e++)this.lines[e].x1+=t,this.lines[e].x2+=t;this.maxX+=t}changeY(t){for(let e=0;e<this.lines.length;e++)this.lines[e].y1+=t,this.lines[e].y2+=t}getMidpoint(){let t=new Vector2(0,0);for(let e=0;e<this.lines.length;e++)t.x+=this.lines[e].x1,t.y+=this.lines[e].y1;return t.x/=this.lines.length,t.y/=this.lines.length,t}rotate(t){let e=this.getMidpoint();this.changeX(-e.x),this.changeY(-e.y);for(let e=0;e<this.lines.length;e++){let i=this.lines[e].x1,s=this.lines[e].y1;this.lines[e].x1=i*Math.cos(t)-s*Math.sin(t),this.lines[e].y1=i*Math.sin(t)+s*Math.cos(t),this.maxX=Math.max(this.maxX,this.lines[e].x1),i=this.lines[e].x2,s=this.lines[e].y2,this.lines[e].x2=i*Math.cos(t)-s*Math.sin(t),this.lines[e].y2=i*Math.sin(t)+s*Math.cos(t),this.maxX=Math.max(this.maxX,this.lines[e].x2)}this.changeX(e.x),this.changeY(e.y)}render(t="black"){$ctx.beginPath(),$ctx.fillStyle=t,$ctx.moveTo(this.lines[0].x1,this.lines[0].y1);for(let t=0;t<this.lines.length;t++)$ctx.lineTo(this.lines[t].x2,this.lines[t].y2);$ctx.lineTo(this.lines[0].x2,this.lines[0].y2),$ctx.fill(),$ctx.closePath()}}let $=t=>document.querySelector(t);function getID(t){return document.getElementById(t)}function getCTX(t){return document.getElementById(t).getContext("2d")}function getText(t){return document.getElementById(t).textContent}function getInner(t){return document.getElementById(t).innerHTML}function getOuter(t){return document.getElementById(t).outerHTML}var $canvas,$ctx,width,height,pmouseX,pmouseY,mouseX,mouseY,mousePressed,keyCode,key,keyPressed,mouseMove,mouseDown,mouseUp,mouseClick,keyDown,keyUp,keyPress,Input={};function createCanvas(t=400,e=400){($canvas=document.createElement("canvas")).setAttribute("id","canvas"),document.body.appendChild($canvas),$canvas.width=t,$canvas.height=e,width=$canvas.width,height=$canvas.height,$ctx=$canvas.getContext("2d"),$canvas.addEventListener("mousemove",t=>{let e=$canvas.getBoundingClientRect();pmouseX=mouseX,pmouseY=mouseY,mouseX=t.clientx-e.left,mouseY=t.clienty-e.top,mouseMove()}),$canvas.addEventListener("mousedown",t=>{mousePressed=!0,mouseDown()}),$canvas.addEventListener("mouseup",t=>{mousePressed=!1,mouseUp()}),$canvas.addEventListener("click",t=>{mouseClick()}),$canvas.addEventListener("keydown",t=>{Input[t.keyCode]=!0,Input[t.key]=!0,Input.keyCode=t.keyCode,Input.key=t.key,Input.keyPressed=!0,keyDown()}),$canvas.addEventListener("keyup",t=>{Input[t.keyCode]=!1,Input[t.key]=!1,t.keyCode===keyCode&&(Input.keyPressed=!1),keyUp()})}keyPressed=mouseMove=mouseDown=mouseUp=mouseClick=keyDown=keyUp=keyPress=function(){};let sw=1;function strokeweight(){return $ctx.lineWidth}function noStroke(){$ctx.lineWidth=0}function strokeWeight(t){$ctx.lineWidth=t}function fill(t,e,i,s=1){$ctx.fillStyle=t instanceof Color?"rgba("+color.r+", "+color.g+", "+color.b+", "+color.a+")":"rgba("+t+", "+green+", "+i+", "+s+")"}function stroke(t,e,i,s=1){$ctx.strokeStyle=t instanceof Color?"rgba("+color.r+", "+color.g+", "+color.b+", "+color.a+")":"rgba("+t+", "+green+", "+i+", "+s+")"}function rect(t,e,i,s){$ctx.beginPath(),$ctx.rect(t,e,i,s),$ctx.fill(),strokeweight()||$ctx.stroke(),$ctx.closePath()}function point(t,e){$ctx.beginPath(),$ctx.moveTo(t,e),$ctx.lineTo(t+1,e+1),$ctx.closePath()}function circle(t,e,i){$ctx.beginPath(),arc(t,e,i,0,2*Math.PI),$ctx.fill(),strokeweight()||$ctx.stroke(),$ctx.closePath()}function arc(t,e,i,s,n){$ctx.beginPath(),$ctx.arc(t,e,i,degreesToRadians(s),degreesToRadians(n)),$ctx.fill(),strokeweight()||$ctx.stroke(),$ctx.closePath()}function ellipse(t,e,i,s){$ctx.beginPath(),$ctx.ellipse(100,100,i,s,0,0,2*Math.PI),$ctx.fill(),$ctx.stroke(),strokeweight()||$ctx.stroke(),$ctx.closePath()}function triangle(t,e,i,s,n,h){$ctx.beginPath(),$ctx.moveTo(t,e),$ctx.lineTo(i,s),$ctx.lineTo(n,h),$ctx.lineTo(t,e),$ctx.lineTo(i,s),$ctx.fill(),strokeweight()||$ctx.stroke(),$ctx.closePath()}function quad(t,e,i,s,n,h,r,o){$ctx.beginPath(),$ctx.moveTo(t,e),$ctx.lineTo(i,s),$ctx.lineTo(n,h),$ctx.lineTo(r,o),$ctx.lineTo(t,e),$ctx.lineTo(i,s),$ctx.fill(),strokeweight()||$ctx.stroke(),$ctx.closePath()}function line(t,e,i,s){$ctx.beginPath(),$ctx.moveTo(t,e),$ctx.lineTo(i,s);let n=0;0!==strokeWeight()&&(n=strokeweight(),$ctx.strokeWeight=1),$ctx.stroke(),$ctx.strokeWeight=n,$ctx.closePath()}function text(t,e,i){$ctx.beginPath(),$ctx.fillText(t,e,i),$ctx.closePath()}function textSize(t){$ctx.font=$ctx.font.replace(/\d+px/,t+"px")}function background(t,e,i,s=1){t instanceof Color?($ctx.openPath(),fill(color),$ctx.rect(0,0,$canvas.width,$canvas.height),$ctx.fill(),$ctx.closePath()):($ctx.openPath(),fill(t,e,i,s),$ctx.rect(0,0,$canvas.width,$canvas.height),$ctx.fill(),$ctx.closePath())}function clear(){$ctx.beginPath(),$ctx.clearRect(0,0,$canvas.width,$canvas.height),$ctx.closePath()}function rotate(t){$ctx.rotate(degreesToRadians(t))}console.log("Loaded ExtraJS by MattDESTROYER");
