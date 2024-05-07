"use strict";

let $canvas, $ctx,
	$previousFrame = 0,
	$previousFrameReading = 0,
	$frameRate = 60,
	$frameCount = 0,
	FPS = 0,
	$scenes = [],
	$currentScene = 0,
	width, height;
const Input = {
	get mouseToWorldCoordinates() {
		return new Vector2(this.mouseX - $canvas.width / 2 + $scenes[$currentScene].camera.x, this.mouseY - $canvas.height / 2 + $scenes[$currentScene].camera.y);
	}
};
const Time = {
	startTime: 0,
	_dt: 0,
	deltaTime: 0,
	get timeElapsed() {
		return Date.now() - this.startTime;
	},
	get now() {
		return Date.now();
	}
};
const getHead = () => document.head || document.querySelector("head");
const getBody = () => document.body || document.querySelector("body");
let head, body;
if (document.readyState === "complete" || document.readyState === "interactive") {
	head = getHead();
	body = getBody();
}
window.addEventListener("load", function () {
	head = getHead();
	body = getBody();
});
const cursor = cursor_style => $canvas.style.cursor = cursor_style;
const frameRate = (frames = 60) => $frameRate = frames;
const dist = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
const degreesToRadians = degrees => degrees * Math.PI / 180;
const radiansToDegrees = radians => radians * 180 / Math.PI;
const $ = _ => document.querySelector(_);
const Randomiser = (function () { function a(c) { let d = []; for (let b = 0; b < c.length; b++)Array.isArray(c[b]) ? d.push(a(c[b])) : d.push(c[b]); return d } return String.prototype.shuffle = function () { let a = this.split(""), b = ""; for (; a.length > 0;)b += a.splice(~~(Math.random() * a.length), 1)[0]; return b }, Array.prototype.shuffle = function (e) { let a = [], d = []; if (e) for (let b = 0; b < this.length; b++)Array.isArray(this[b]) ? a.push(this[b].shuffle()) : a.push(this[b]); else for (let c = 0; c < this.length; c++)a.push(this[c]); for (; a.length > 0;)d.push(a.splice(~~(Math.random() * a.length), 1)[0]); return d }, String.prototype.pick = function () { return this[~~(Math.random() * this.length)] }, Array.prototype.pick = function (b) { let a = this; return b && (a = a.flat(1 / 0)), a[~~(Math.random() * a.length)] }, { int: function (a, b = null) { return null === b ? ~~(Math.random() * a) : a === b ? a : (a > b && ([a, b] = [b, a]), Math.round(Math.random() * (b - a)) + a) }, float: function (a, b = null) { return null === b ? Math.random() * a : a === b ? a : (a > b && ([a, b] = [b, a]), Math.random() * (b - a) + a) }, string: function (a, d) { let b = ""; for (let c = 0; c < d; c++)b += a[~~(Math.random() * a.length)]; return b }, array: function (a, d) { let b = []; for (let c = 0; c < d; c++)b.push(a[~~(Math.random() * a.length)]); return b }, shuffle: function i(b, j = !1) { if (Array.isArray(b)) { let c = []; if (j) for (let d = 0; d < b.length; d++)Array.isArray(b[d]) ? c.push(i(b[d])) : c.push(b[d]); else for (let e = 0; e < b.length; e++)Array.isArray(b[e]) ? c.push(a(b[e])) : c.push(b[e]); let g = []; for (; c.length > 0;)g.push(c.splice(~~(Math.random() * c.length), 1)[0]); return g } if ("string" == typeof b) { let f = b.split(""), h = ""; for (; f.length > 0;)h += f.splice(~~(Math.random() * f.length), 1)[0]; return h } return null }, pick: function (a, b = !0) { return "string" == typeof a ? a[~~(Math.random() * a.length)] : Array.isArray(a) ? (b && (a = a.flat(1 / 0)), a[~~(Math.random() * a.length)]) : null } } })(); console.log("Loaded Randomiser.js by Matthew James");
const constrain = (num, min, max) => num < min ? min : max;
const clamp = constrain;
function lerp(value1, value2, amount) {
	if (amount < 0) {
		amount = 0;
	} else if (amount > 1) {
		amount = 1;
	}
	return value1 + (value2 - value1) * amount;
}
const pi = Math.PI,
	pow = (base, exponent = 2) => base ** exponent,
	log = Math.log,
	sqrt = Math.sqrt,
	round = Math.round,
	floor = (number) => ~~number,
	ceil = Math.ceil,
	min = Math.min,
	max = Math.max,
	abs = Math.abs,
	sin = Math.sin,
	cos = Math.cos,
	tan = Math.tan,
	asin = Math.asin,
	acos = Math.acos,
	atan = Math.atan;
let keyDown, keyUp, keyPress, mouseDown, mouseUp, mouseClick, mouseMove;
keyDown = keyUp = keyPress = mouseDown = mouseUp = mouseClick = mouseMove = function () { return null; };
const Tools = {
	createCSS: function (css) {
		const style = document.createElement("style");
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		(document.head || document.getElementsByTagName("head")[0]).appendChild(style);
	},
	fullscreen: function () {
		if ($canvas) {
			if ($canvas.requestFullscreen) {
				$canvas.requestFullscreen();
			} else if ($canvas.webkitRequestFullscreen) {
				$canvas.webkitRequestFullscreen();
			} else if ($canvas.msRequestFullscreen) {
				$canvas.msRequestFullscreen();
			}
		}
	}
}
const GameEngine = {
	_backgroundColour: "#FFFFFF",
	Background: function (colour) {
		this._backgroundColour = colour || "#FFFFFF";
	},
	Initialise: function (canvas = null, fullScreen = true, _width = null, _height = null) {
		if (!canvas) {
			$canvas = document.createElement("canvas");
			(document.body || document.getElementsByTagName("body")[0]).appendChild($canvas);
		} else if (typeof canvas === "string") {
			$canvas = document.getElementById(canvas);
		} else {
			$canvas = canvas;
		}
		$ctx = $canvas.getContext("2d");
		if (fullScreen) {
			$canvas.style.position = "absolute";
			$canvas.style.left = 0;
			$canvas.style.top = 0;
			$canvas.width = width = window.innerWidth;
			$canvas.height = height = window.innerHeight;
			Tools.createCSS("*{margin:0px;overflow:hidden;}");
			window.addEventListener("resize", function () {
				$canvas.width = width = window.innerWidth;
				$canvas.height = height = window.innerHeight;
			});
		} else {
			if (_width !== null) {
				$canvas.width = width = _width;
			}
			if (_height !== null) {
				$canvas.height = height = _height;
			}
		}
		window.addEventListener("keydown", function (e) {
			e = e || window.event;
			Input[e.keyCode] = true;
			Input[e.key.toString().toUpperCase()] = true;
			Input.keyCode = e.keyCode;
			Input.key = e.key.toString().toUpperCase();
			$scenes[$currentScene].children.forEach((x) => {
				if (x.enabled) {
					x.eventListeners.forEach((y) => {
						if (y.name === "keydown") {
							y.func(x);
						}
					});
				}
			});
			keyDown();
		});
		window.addEventListener("keyup", function (e) {
			e = e || window.event;
			Input[e.keyCode] = false;
			Input[e.key.toString().toUpperCase()] = false;
			$scenes[$currentScene].children.forEach((x) => {
				if (x.enabled) {
					x.eventListeners.forEach((y) => {
						if (y.name === "keyup") {
							y.func(x);
						}
					});
				}
			});
			keyUp();
		});
		window.addEventListener("keypress", function () {
			$scenes[$currentScene].children.forEach((x) => {
				if (x.enabled) {
					x.eventListeners.forEach((y) => {
						if (y.name === "keypress") {
							y.func(x);
						}
					});
				}
			});
			keyPress();
		});
		window.addEventListener("mousedown", function (e) {
			e = e || window.event;
			Input.pmouseX = Input.mouseX;
			Input.pmouseY = Input.mouseY;
			const rect = $canvas.getBoundingClientRect();
			Input.mouseX = e.clientX - rect.left;
			Input.mouseY = e.clientY - rect.top;
			Input.mouseDown = true;
			$scenes[$currentScene].children.forEach((x) => {
				if (x.enabled) {
					x.eventListeners.forEach((y) => {
						if (y.name === "mousedown") {
							y.func(x);
						}
					});
				}
			});
			mouseDown();
		});
		window.addEventListener("mouseup", function (e) {
			e = e || window.event;
			Input.pmouseX = Input.mouseX;
			Input.pmouseY = Input.mouseY;
			const rect = $canvas.getBoundingClientRect();
			Input.mouseX = e.clientX - rect.left;
			Input.mouseY = e.clientY - rect.top;
			Input.mouseDown = false;
			$scenes[$currentScene].children.forEach(x => {
				if (x.enabled) {
					x.eventListeners.forEach(y => {
						if (y.name === "mouseup") {
							y.func(x);
						}
					});
				}
			});
			mouseUp();
		});
		window.addEventListener("click", function (e) {
			e = e || window.event;
			Input.pmouseX = Input.mouseX;
			Input.pmouseY = Input.mouseY;
			const rect = $canvas.getBoundingClientRect();
			Input.mouseX = e.clientX - rect.left;
			Input.mouseY = e.clientY - rect.top;
			$scenes[$currentScene].children.forEach(x => {
				if (x.enabled) {
					x.readyMesh();
					x.mesh.rotate(x.rotation);
					if (x.mesh.pointInPolygon(new Vector2(Input.mouseX - $canvas.width / 2 + $scenes[$currentScene].camera.x, Input.mouseY - $canvas.height / 2 + $scenes[$currentScene].camera.y))) {
						x.mesh.rotate(-x.rotation);
						x.resetMesh();
						x.eventListeners.forEach(y => {
							if (y.name === "click") {
								y.func(x);
							}
						});
					} else {
						x.mesh.rotate(-x.rotation);
						x.resetMesh();
					}
				}
			});
			mouseClick();
		});
		window.addEventListener("mousemove", function (e) {
			e = e || window.event;
			Input.pmouseX = Input.mouseX;
			Input.pmouseY = Input.mouseY;
			const rect = $canvas.getBoundingClientRect();
			Input.mouseX = e.clientX - rect.left;
			Input.mouseY = e.clientY - rect.top;
			$scenes[$currentScene].children.forEach(x => {
				if (x.enabled) {
					x.eventListeners.forEach(y => {
						if (y.name === "mousemove") {
							y.func(x);
						} else if (Input.mouseDown && y.name === "mousedrag") {
							x.readyMesh();
							x.mesh.rotate(x.rotation);
							if (x.mesh.pointInPolygon(new Vector2(Input.mouseX - $canvas.width / 2 + $scenes[$currentScene].camera.x, Input.mouseY - $canvas.height / 2 + $scenes[$currentScene].camera.y))) {
								x.mesh.rotate(-x.rotation);
								x.resetMesh();
								y.func(x);
							} else {
								x.mesh.rotate(-x.rotation);
								x.resetMesh();
							}
						}
					});
				}
			});
			mouseMove();
		});
		return $canvas;
	},
	Start: function () {
		if ($ctx) {
			if ($scenes.length < 1) {
				throw new Error("[2D Game Engine] No scenes. (Create at least one scene new Scene(children, camera))");
			}
			Time.startTime = Date.now();
			GameEngine.Update();
		} else {
			throw new Error("[2D Game Engine] No context. (Call GameEngine.Initialise(canvas?, fullScreen?, width?, height?))");
		}
	},
	Update: function (currentFrame) {
		Time.deltaTime = currentFrame - $previousFrame;
		$frameCount++;
		if (currentFrame - $previousFrameReading >= 1000) {
			FPS = $frameCount;
			$frameCount = 0;
			$previousFrameReading = currentFrame;
		}
		if (currentFrame - $previousFrame >= 1000 / $frameRate) {
			if (!$scenes[$currentScene].started) $scenes[$currentScene].start();
			$scenes[$currentScene].update();
			GameEngine.Render();
			$previousFrame = currentFrame;
		}
		Time._dt = currentFrame;
		window.requestAnimationFrame(GameEngine.Update);
	},
	Render: function () {
		$ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		if (this._backgroundColour) {
			$ctx.fillStyle = this._backgroundColour;
			$ctx.fillRect(0, 0, $canvas.width, $canvas.height);
		}
		$scenes[$currentScene].render();
	}
};
class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(point) {
		this.x += point.x;
		this.y += point.y;
	}
	sub(point) {
		this.x -= point.x;
		this.y -= point.y;
	}
	mult(point) {
		this.x *= point.x;
		this.y *= point.y;
	}
	div(point) {
		this.x /= point.x;
		this.y /= point.y;
	}
	dist(point) {
		return Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2);
	}
	dot(point) {
		return this.x * point.x + this.y * point.y;
	}
	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize() {
		const mag = Math.sqrt(this.x * this.x + this.y * this.y);
		return [this.x / mag, this.y / mag];
	}
	toString() {
		return this.x + ", " + this.y;
	}
	array() {
		return [this.x, this.y];
	}
	clone() {
		return new Vector2(this.x, this.y);
	}
	static dist(point1, point2) {
		return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
	}
	static dot(point1, point2) {
		return point1.x * point2.x + point1.y * point2.y;
	}
	static array(point) {
		return [point.x, point.y];
	}
	static zero() {
		return new Vector2(0, 0);
	}
}
class Point extends Vector2 {
	constructor(x, y) {
		super(x, y);
	}
}
class Line {
	constructor(point1, point2) {
		this.point1 = point1;
		this.point2 = point2;
	}
	get x1() {
		return this.point1.x;
	}
	set x1(value) {
		this.point1.x = value;
	}
	get y1() {
		return this.point1.y;
	}
	set y1(value) {
		this.point1.y = value;
	}
	get x2() {
		return this.point2.x;
	}
	set x2(value) {
		this.point2.x = value;
	}
	get y2() {
		return this.point2.y;
	}
	set y2(value) {
		this.point2.y = value;
	}
	pointOnLine(point) {
		const m = (this.y2 - this.y1) / (this.x2 - this.x1);
		const c = this.y1 - m * this.x1;
		return point.y === m * point.x + c;
	}
	pointInLine(point) {
		if (this.x1 < this.x2) {
			if (this.y1 < this.y2) {
				return this.pointOnLine(point) && (point.x >= this.x1 && point.x <= this.x2) && (point.y >= this.y1 && point.y <= this.y2);
			}
			return this.pointOnLine(point) && (point.x >= this.x1 && point.x <= this.x2) && (point.y >= this.y2 && point.y <= this.y1);
		}
		if (this.y1 < this.y2) {
			return this.pointOnLine(point) && (point.x >= this.x2 && point.x <= this.x1) && (point.y >= this.y1 && point.y <= this.y2);
		}
		return this.pointOnLine(point) && (point.x >= this.x2 && point.x <= this.x1) && (point.y >= this.y2 && point.y <= this.y1);
	}
	intersects(other) {
		if (this.pointInLine(other.point1) || this.pointInLine(other.point2)) {
			return true;
		}
		const det = (this.x2 - this.x1) * (other.y2 - other.y1) - (other.x2 - other.x1) * (this.y2 - this.y1);
		if (det === 0) {
			return false;
		}
		const lambda = ((other.y2 - other.y1) * (other.x2 - this.x1) + (other.x1 - other.x2) * (other.y2 - this.y1)) / det;
		const gamma = ((this.y1 - this.y2) * (other.x2 - this.x1) + (this.x2 - this.x1) * (other.y2 - this.y1)) / det;
		return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
	}
	clone() {
		return new Line(this.point1.clone(), this.point2.clone());
	}
}
class PolygonMesh {
	constructor(points) {
		this.lines = [];
		this.maxX = 0;
		for (let i = 0; i < points.length - 1; i++) {
			this.maxX += Math.abs(points[i].x);
			this.maxX += Math.abs(points[i + 1].x);
			this.lines.push(new Line(points[i], points[i + 1]));
		}
		this.maxX += Math.abs(points[points.length - 1]);
		this.lines.push(new Line(points[points.length - 1], points[0]));
		this.maxX *= 10;
	}
	changeX(distance) {
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].point1.x += distance;
			this.lines[i].point2.x += distance;
		}
		this.maxX += Math.abs(distance);
	}
	changeY(distance) {
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].point1.y += distance;
			this.lines[i].point2.y += distance;
		}
	}
	move(xDist, yDist) {
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].point1.x += xDist;
			this.lines[i].point1.y += yDist;
			this.lines[i].point2.x += xDist;
			this.lines[i].point2.y += yDist;
		}
	}
	getMidpoint() {
		const midpoint = new Vector2(0, 0);
		for (let i = 0; i < this.lines.length; i++) {
			midpoint.add(this.lines[i].point1);
		}
		midpoint.x /= this.lines.length;
		midpoint.y /= this.lines.length;
		return midpoint;
	}
	resetMesh() {
		const mid = this.getMidpoint();
		this.move(-mid.x, -mid.y);
	}
	rotate(degree) {
		const mid = this.getMidpoint();
		this.move(-mid.x, -mid.y);
		for (let i = 0; i < this.lines.length; i++) {
			let x = this.lines[i].point1.x, y = this.lines[i].point1.y;
			this.lines[i].point1.x = x * Math.cos(degree) - y * Math.sin(degree);
			this.lines[i].point1.y = x * Math.sin(degree) + y * Math.cos(degree);
			x = this.lines[i].point2.x;
			y = this.lines[i].point2.y;
			this.lines[i].point2.x = x * Math.cos(degree) - y * Math.sin(degree);
			this.lines[i].point2.y = x * Math.sin(degree) + y * Math.cos(degree);
			this.maxX = Math.max(this.maxX, this.lines[i].point1.x, this.lines[i].point2.x);
		}
		this.move(mid.x, mid.y);
	}
	pointInPolygon(point) {
		const _testLine = new Line(point, new Vector2(this.maxX * 10, point.y));
		let result = false;
		for (let i = 0; i < this.lines.length; i++) {
			result = this.lines[i].intersects(_testLine) ? !result : result;
		}
		return result;
	}
	collision(other) {
		for (let i = 0; i < this.lines.length; i++) {
			if (other.pointInPolygon(new Vector2(this.lines[i].x1, this.lines[i].y1))) {
				return true;
			}
		}
		for (let i = 0; i < other.lines.length; i++) {
			if (this.pointInPolygon(new Vector2(other.lines[i].x1, other.lines[i].y1))) {
				return true;
			}
		}
		return false;
	}
	render(colour) {
		$ctx.fillStyle = colour;
		$ctx.beginPath();
		$ctx.moveTo(this.lines[0].point1.x, this.lines[0].point1.y);
		for (let i = 0; i < this.lines.length; i++) {
			$ctx.lineTo(this.lines[i].point2.x, this.lines[i].point2.y);
		}
		$ctx.lineTo(this.lines[0].point1.x, this.lines[0].point1.y);
		$ctx.fill();
		$ctx.closePath();
	}
	clone() {
		const points = [];
		for (let i = 0; i < this.lines.length; i++) {
			this.points.push(this.lines[i].point1.clone());
		}
		return new PolygonMesh(points);
	}
}
class RectangleMesh extends PolygonMesh {
	constructor(rectWidth, rectHeight, centered = true) {
		if (centered) {
			super([
				new Vector2(-rectWidth / 2, -rectHeight / 2),
				new Vector2(rectWidth / 2, -rectHeight / 2),
				new Vector2(rectWidth / 2, rectHeight / 2),
				new Vector2(-rectWidth / 2, rectHeight / 2)
			]);
		} else {
			super([
				new Vector2(0, 0),
				new Vector2(rectWidth, 0),
				new Vector2(rectWidth, rectHeight),
				new Vector2(0, rectHeight)
			]);
		}
	}
}
class EventListener {
	constructor(name, func) {
		this.name = name;
		this.func = func;
	}
	clone() {
		return new EventListener(this.name, this.func);
	}
}
class EventDriven {
	constructor() {
		this.eventListeners = [];
	}
	addEventListener(eventListener, func) {
		if (eventListener instanceof EventListener) {
			this.eventListeners.push(eventListener);
		} else {
			this.eventListeners.push(new EventListener(eventListener, func));
		}
		return this;
	}
	on(...args) {
		this.addEventListener(...args);
	}
	removeEventListener(eventListener, removeAll = false) {
		if (eventListener instanceof EventListener) {
			for (let i = 0; i < this.eventListeners.length; i++) {
				if (this.eventListeners[i] === eventListener) {
					if (removeAll) {
						this.eventListeners.splice(i, 1);
					} else {
						return this.eventListeners.splice(i, 1)[0];
					}
				}
			}
		} else if (typeof eventListener === "function") {
			for (let i = 0; i < this.eventListeners.length; i++) {
				if (this.eventListeners[i].func === eventListener) {
					if (removeAll) {
						this.eventListeners.splice(i, 1);
					} else {
						return this.eventListeners.splice(i, 1)[0];
					}
				}
			}
		} else if (typeof eventListener === "string") {
			for (let i = 0; i < this.eventListeners.length; i++) {
				if (this.eventListeners[i].name === eventListener) {
					if (removeAll) {
						this.eventListeners.splice(i, 1);
					} else {
						return this.eventListeners.splice(i, 1)[0];
					}
				}
			}
		}
		return null;
	}
}
class GameObject extends EventDriven {
	constructor(x, y, polymesh, colour, collides) {
		super();
		this.x = x;
		this.y = y;
		this.xVel = 0;
		this.resistance = 0.8;
		this.resistanceMultiplier = 1;
		this.yVel = 0;
		this.gravity = false;
		this.gravityMultiplier = 1;
		this.mesh = polymesh;
		this.colour = colour;
		this.rotation = 0;
		this.layer = 1;
		this.enabled = true;
		this.tag = null;
		this.collides = collides;
		this.collidingWith = [];
		this.children = [];
	}
	appendChild(child) {
		if (!this.children.includes(child)) {
			return this.children.push(child);
		}
		return null;
	}
	removeChild(child) {
		if (this.children.indexOf(child) !== -1) {
			return this.children.splice(this.children.indexOf(child), 1)[0];
		}
		return null;
	}
	start() {
		for (let i = 0; i < this.eventListeners.length; i++) {
			if (this.eventListeners[i].name === "start") {
				this.eventListeners[i].func(this);
			}
		}
	}
	readyMesh() {
		this.mesh.move(this.x, this.y);
	}
	resetMesh() {
		this.mesh.move(-this.x, -this.y);
	}
	collision(mesh) {
		this.readyMesh();
		this.mesh.rotate(this.rotation);
		const _result = this.mesh.collision(mesh);
		this.mesh.rotate(-this.rotation);
		this.resetMesh();
		return _result;
	}
	rotate(degrees) {
		this.rotation += degrees;
	}
	setRotation(degrees) {
		this.rotation = degrees;
	}
	setX(position) {
		this.x = position;
	}
	setY(position) {
		this.y = position;
	}
	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}
	addXForce(x) {
		this.xVel += x;
	}
	addYForce(y) {
		this.yVel -= y;
	}
	addForce(x, y) {
		this.xVel += x;
		this.yVel -= y;
	}
	setXForce(x) {
		this.xVel = x;
	}
	setYForce(y) {
		this.yVel = y;
	}
	setForce(x, y) {
		this.xVel = x;
		this.yVel = y;
	}
	changeX(distance) {
		this.x += distance;
		if (this.enabled && this.collides) {
			distance = Math.sign(distance);
			$scenes[$currentScene].children.forEach(x => {
				if (x !== this && x.collides) {
					x.readyMesh();
					x.mesh.rotate(x.rotation);
					if (this.collision(x.mesh)) {
						if (distance === 0) {
							this.readyMesh();
							this.mesh.rotate(this.rotation);
							distance = this.mesh.midPoint().x > x.mesh.midPoint().x ? 1 : -1;
							this.mesh.rotate(-this.rotation);
							this.resetMesh();
						}
						while (this.collision(x.mesh)) {
							this.x -= distance;
						}
						this.xVel = 0;
					}
					x.mesh.rotate(-x.rotation);
					x.resetMesh();
				}
			});
		}
	}
	changeY(distance) {
		distance = -distance;
		this.y += distance;
		if (this.enabled && this.collides) {
			distance = Math.sign(distance);
			$scenes[$currentScene].children.forEach(x => {
				if (x !== this && x.collides) {
					x.readyMesh();
					x.mesh.rotate(x.rotation);
					if (this.collision(x.mesh)) {
						if (distance === 0) {
							this.readyMesh();
							this.mesh.rotate(this.rotation);
							distance = this.mesh.midPoint().y > x.mesh.midPoint().y ? 1 : -1;
							this.mesh.rotate(-this.rotation);
							this.resetMesh();
						}
						while (this.collision(x.mesh)) {
							this.y -= distance;
						}
						this.yVel = 0;
					}
					x.mesh.rotate(-x.rotation);
					x.resetMesh();
				}
			});
		}
	}
	physics() {
		if (this.enabled) {
			if (this.gravity) {
				this.yVel += this.gravityMultiplier;
			} else {
				this.yVel *= this.resistance * this.resistanceMultiplier;
			}
			this.xVel *= this.resistance * this.resistanceMultiplier;
			if (this.collides) {
				this.x += this.xVel;
				this.y += this.yVel;
				for (let i = 0; i < $scenes[$currentScene].children.length; i++) {
					const _gameObj = $scenes[$currentScene].children[i];
					if (_gameObj !== this && _gameObj.collides) {
						_gameObj.readyMesh();
						_gameObj.mesh.rotate(_gameObj.rotation);
						if (this.collision(_gameObj.mesh)) {
							if (!this.collidingWith.includes(_gameObj)) {
								this.collidingWith.push(_gameObj);
							}
						} else if (this.collidingWith.includes(_gameObj)) {
							this.collidingWith.splice(this.collidingWith.indexOf(_gameObj), 1);
						}
						_gameObj.rotate(-_gameObj.rotation);
						_gameObj.resetMesh();
					}
				}
				this.x -= this.xVel;
				this.y -= this.yVel;
			}
			this.changeY(-this.yVel);
			this.changeX(this.xVel);
			for (let i = 0; i < this.collidingWith.length; i++) {
				for (let j = 0; j < this.eventListeners.length; j++) {
					if (this.eventListeners[j].name === "collision") {
						this.eventListeners[j].func(this, this.collidingWith[i]);
					}
				}
			}
		}
	}
	render() {
		if (this.colour instanceof Image && this.colour.complete) {
			$ctx.drawImage(this.colour, this.x - this.colour.width / 2, this.y - this.colour.height / 2);
		} else if (typeof this.colour === "function") {
			this.colour(this.x, this.y, this.rotation);
		} else {
			this.readyMesh();
			this.mesh.rotate(this.rotation);
			this.mesh.render(this.colour);
			this.mesh.rotate(-this.rotation);
			this.resetMesh();
		}
	}
	clone() {
		const res = new GameObject(this.x, this.y, this.mesh.clone(), this.colour, this.collides, this.eventListeners.map((eventListener) => eventListener.clone()), this.children.slice());
		res.xVel = this.xVel;
		res.resistance = this.resistance;
		res.resistanceMultiplier = this.resistanceMultiplier;
		res.yVel = this.yVel;
		res.gravity = this.gravity;
		res.gravityMultiplier = this.gravityMultiplier;
		res.rotation = this.rotation;
		res.layer = this.layer;
		res.enabled = this.enabled;
		res.collidingWith = this.collidingWith.slice();
		return res;
	}
}
class Camera extends EventDriven {
	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
	}
	smoothMove(x, y, lerpAmount) {
		this.x = lerp(this.x, x, lerpAmount);
		this.y = lerp(this.y, y, lerpAmount);
	}
	clone() {
		return new Camera(this.x, this.y);
	}
}
class Scene extends EventDriven {
	constructor(children, camera) {
		super();
		this.children = children;
		this.camera = camera;
		this.started = false;
		$scenes.push(this);
	}
	start() {
		for (let i = 0; i < this.camera.eventListeners; i++) {
			if (this.camera.eventListeners[i].name === "start") {
				this.camera.eventListeners[i].func(this.camera);
			}
		}
		for (let i = 0; i < this.children.length; i++) {
			if (this.children[i].enabled) {
				for (let j = 0; j < this.children[i].eventListeners.length; j++) {
					if (this.children[i].eventListeners[j].name === "start") {
						this.children[i].eventListeners[j].func(this.children[i]);
					}
				}
			}
		}
		for (let i = 0; i < this.eventListeners.length; i++) {
			if (this.eventListeners[i].name === "start") {
				this.eventListeners[i].func(this);
			}
		}
		this.started = true;
	}
	update() {
		this.camera.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this.camera);
			}
		});
		this.children.sort((a, b) => a.layer < b.layer ? -1 : 1);
		this.children.forEach(x => {
			x.physics();
			if (x.enabled) {
				x.eventListeners.forEach((eventListener) => {
					if (eventListener.name === "update") {
						eventListener.func(x);
					}
				});
			}
		});
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
	render() {
		$ctx.save();
		$ctx.translate($canvas.width / 2 - this.camera.x, $canvas.height / 2 - this.camera.y);
		this.children.forEach(x => {
			if (x.enabled) {
				x.render();
				x.eventListeners.forEach((eventListener) => {
					if (eventListener.name === "render") {
						eventListener.func(x);
					}
				});
			}
		});
		$ctx.restore();
	}
	clone() {
		const scene = new Scene(this.children.map((child) => child.clone()), this.camera.clone());
		scene.started = this.started;
		scene.eventListeners = this.eventListeners.map((eventListener) => eventListener.clone());
		return scene;
	}
}
console.log("Loaded 2DGameEngineJS by Matthew James");
