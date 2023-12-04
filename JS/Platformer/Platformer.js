let $canvas, $ctx, $player, $platformerRunning = true,
	$lastLevel,
	$previousFrame = 0,
	$previousFrameReading = 0,
	$frameRate = 60,
	$frameCount = 0,
	FPS = 0,
	$levels = [],
	$persistentObjects = [],
	currentLevel = 0,
	width, height,
	$updateCondition = function () { return true; };
const Input = {},
	Camera = {
		"x": 0,
		"y": 0
	},
	Time = {
		"startTime": 0,
		"endTime": null,
		"_dt": 0,
		"deltaTime": 0,
		get timeElapsed() {
			return Date.now() - Time.startTime;
		},
		get now() {
			return Date.now();
		}
	},
	Statistics = {
		"deaths": 0,
		get millisecondsElapsed() {
			return Date.now() - Time.startTime;
		},
		get secondsElapsed() {
			return (Date.now() - Time.startTime) / 1000;
		},
		get minutesElapsed() {
			return (Date.now() - Time.startTime) / 60000;
		},
		get millisecondsToFinish() {
			return Time.endTime === null ? null : Time.endTime - Time.startTime;
		},
		get secondsToFinish() {
			return Time.endTime === null ? null : (Time.endTime - Time.startTime) / 1000;
		},
		get minutesToFinish() {
			return Time.endTime === null ? null : (Time.endTime - Time.startTime) / 60000;
		}
	};
function fullscreen() {
	if ($canvas) {
		if ("requestFullscreen" in $canvas) {
			$canvas.requestFullscreen();
		} else if ("webkitRequestFullscreen" in $canvas) {
			$canvas.webkitRequestFullscreen();
		} else if ("msRequestFullscreen" in $canvas) {
			$canvas.msRequestFullscreen();
		}
	}
}
function addStyles(css) {
	const style = document.createElement("style");
	if ("styleSheet" in style) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	document.querySelector("head").appendChild(style);
}
let keyDown, keyUp, keyPress, mouseDown, mouseUp, mouseClick, mouseMove, touchStart, touchMove, touchCancel, touchEnd;
keyDown = keyUp = keyPress = mouseDown = mouseUp = mouseClick = mouseMove = touchStart = touchMove = touchCancel = touchEnd = function () { };
class Platformer {
	static Start(lastLevel = $levels.length) {
		$lastLevel = lastLevel;
		if ($ctx) {
			if ($levels.length === 0) {
				throw new Error("[Platformer Error] No levels. (Create at least one level new Level(objects))");
			} else if (!$player) {
				throw new Error("[Platformer Error] No player. (Create a player before calling Start new Player(x, y, width, height, colour))");
			}
			new Level([
				new PObject(0, 200, new RectangleMesh(150, 25), "black", 1)
			]);
			Time.startTime = Date.now();
			$levels[0].start();
			window.addEventListener("keydown", function (e) {
				e = e || window.event;
				Input[e.keyCode] = true;
				Input[e.key.toString().toUpperCase()] = true;
				Input.keyCode = e.keyCode;
				Input.key = e.key;
				keyDown();
			});
			window.addEventListener("keyup", function (e) {
				e = e || window.event;
				Input[e.keyCode] = false;
				Input[e.key.toString().toUpperCase()] = false;
				keyUp();
			});
			window.addEventListener("keypress", function (e) {
				e = e || window.event;
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
				mouseUp();
			});
			window.addEventListener("click", function (e) {
				e = e || window.event;
				mouseClick();
			});
			window.addEventListener("mousemove", function (e) {
				e = e || window.event;
				Input.pmouseX = Input.mouseX;
				Input.pmouseY = Input.mouseY;
				const rect = $canvas.getBoundingClientRect();
				Input.mouseX = e.clientX - rect.left;
				Input.mouseY = e.clientY - rect.top;
				mouseMove();
			});
			window.addEventListener("touchstart", function (e) {
				e = e || window.event;
				e.preventDefault();
				const rect = $canvas.getBoundingClientRect();
				Input.mouseX = e.changedTouches[0].clientX - rect.left;
				Input.mouseY = e.changedTouches[0].clientY - rect.top;
				Input.mouseDown = true;
				touchStart();
			});
			window.addEventListener("touchmove", function (e) {
				e = e || window.event;
				e.preventDefault();
				const rect = $canvas.getBoundingClientRect();
				Input.mouseX = e.changedTouches[0].clientX - rect.left;
				Input.mouseY = e.changedTouches[0].clientY - rect.top;
				touchMove();
			});
			window.addEventListener("touchcancel", function (e) {
				e = e || window.event;
				e.preventDefault();
				const rect = $canvas.getBoundingClientRect();
				Input.mouseX = e.changedTouches[0].clientX - rect.left;
				Input.mouseY = e.changedTouches[0].clientY - rect.top;
				Input.mouseDown = false;
				touchCancel();
			});
			window.addEventListener("touchend", function (e) {
				e = e || window.event;
				e.preventDefault();
				const rect = $canvas.getBoundingClientRect();
				Input.mouseX = e.changedTouches[0].clientX - rect.left;
				Input.mouseY = e.changedTouches[0].clientY - rect.top;
				Input.mouseDown = false;
				touchEnd();
			});
			window.requestAnimationFrame(Platformer.Update);
		} else {
			throw new Error("[Platformer Error] No context. (Call Platformer.initCanvas(id, ?fullscreen))");
		}
	}
	static get width() {
		return $canvas.width;
	}
	static get height() {
		return $canvas.height;
	}
	static End() {
		Time.endTime = Date.now();
	}
	static Stop() {
		$platformerRunning = false;
	}
	static UpdateCondition(newCondition) {
		$updateCondition = newCondition;
	}
	static Update(currentFrame) {
		Time.deltaTime = currentFrame - $previousFrame;
		$frameCount++;
		if (currentFrame - $previousFrameReading >= 1000) {
			FPS = $frameCount;
			$frameCount = 0;
			$previousFrameReading = currentFrame;
		}
		if (currentFrame - $previousFrame >= 1000 / $frameRate) {
			if ($levels[currentLevel] === undefined) {
				Platformer.Stop();
			}
			if ($updateCondition()) {
				$levels[currentLevel].update();
				$persistentObjects.forEach(x => x.update());
				$player.physicsTick();
				$player.update();
			}
			Platformer.Render();
			$previousFrame = currentFrame;
			Time._dt = currentFrame;
		}
		if ($platformerRunning) {
			window.requestAnimationFrame(Platformer.Update);
		}
	}
	static Render() {
		if (this._backgroundColour) {
			$ctx.fillStyle = this._backgroundColour;
			$ctx.beginPath();
			$ctx.rect(0, 0, $canvas.width, $canvas.height);
			$ctx.fill();
			$ctx.closePath();
		} else {
			$ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		}
		$levels[currentLevel].render();
		$persistentObjects.forEach(x => x.render());
		$player.render();
	}
	static Reset() {
		currentLevel = 0;
		Time.startTime = Date.now();
		Time.endTime = null;
		Time._dt = 0;
		$player.die();
		Camera.x = Camera.y = 0;
		Statistics.deaths = 0;
		$levels[0].start();
	}
	static initCanvas(canvas = null, fullScreen = true, _width = null, _height = null) {
		if (!canvas) {
			$canvas = document.createElement("canvas");
			(document.body || document.querySelector("body")).appendChild($canvas);
		} else if (typeof canvas === "string") {
			$canvas = document.getElementById(canvas);
		} else {
			$canvas = canvas;
		}
		if (fullscreen) {
			$canvas.width = window.innerWidth;
			$canvas.height = window.innerHeight;
			$canvas.style.position = "absolute";
			$canvas.style.left = 0;
			$canvas.style.top = 0;
			addStyles("*{margin:0px;overflow:hidden;}");
			window.addEventListener("resize", function () {
				$canvas.width = window.innerWidth;
				$canvas.height = window.innerHeight;
			});
		} else {
			if (_width) {
				width = _width;
			}
			if (_height) {
				height = _height;
			}
		}
		width = $canvas.width;
		height = $canvas.height;
		$ctx = $canvas.getContext("2d");
		$ctx.lineWidth = 0;
		return $canvas;
	}
	static background(colour) {
		this._backgroundColour = colour;
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
class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	setX(x) {
		this.x = x;
	}
	setY(y) {
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
		return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
	}
	dot(point) {
		return this.x * point.x + this.y * point.y;
	}
	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize() {
		let mag = Math.sqrt(this.x * this.x + this.y * this.y);
		return [this.x / mag, this.y / mag];
	}
	array() {
		return [this.x, this.y];
	}
	static dist(point1, point2) {
		return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}
	static dot(point1, point2) {
		return point1.x * point2.x + point1.y * point2.y;
	}
	static array(point) {
		return [point.x, point.y];
	}
	static Zero() {
		return new Vector2(0, 0);
	}
}
let Point = Vector2;
class Line {
	constructor(point1, point2) {
		this.point1 = point1;
		this.point2 = point2;
		this.x1 = point1.x;
		this.y1 = point1.y;
		this.x2 = point2.x;
		this.y2 = point2.y;
	}
	pointOnLine(point) {
		let m = (this.y2 - this.y1) / (this.x2 - this.x1);
		let c = this.y1 - m * this.x1;
		return point.y === m * point.x + c;
	}
	pointInLine(point) {
		if (this.x1 < this.x2) {
			if (this.y1 < this.y2) return this.pointOnLine(point) && (point.x >= this.x1 && point.x <= this.x2) && (point.y >= this.y1 && point.y <= this.y2);
			return this.pointOnLine(point) && (point.x >= this.x1 && point.x <= this.x2) && (point.y >= this.y2 && point.y <= this.y1);
		}
		if (this.y1 < this.y2) return this.pointOnLine(point) && (point.x >= this.x2 && point.x <= this.x1) && (point.y >= this.y1 && point.y <= this.y2);
		return this.pointOnLine(point) && (point.x >= this.x2 && point.x <= this.x1) && (point.y >= this.y2 && point.y <= this.y1);
	}
	intersects(other) {
		if (this.pointInLine(other.point1) || this.pointInLine(other.point2)) return true;
		let det = (this.x2 - this.x1) * (other.y2 - other.y1) - (other.x2 - other.x1) * (this.y2 - this.y1);
		if (det === 0) return false;
		let lambda = ((other.y2 - other.y1) * (other.x2 - this.x1) + (other.x1 - other.x2) * (other.y2 - this.y1)) / det;
		let gamma = ((this.y1 - this.y2) * (other.x2 - this.x1) + (this.x2 - this.x1) * (other.y2 - this.y1)) / det;
		return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
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
		this.lines.push(new Line(points[points.length - 1], points[0]));
		this.maxX *= 10;
	}
	changeX(distance) {
		this.lines.forEach((line) => {
			line.x1 += distance;
			line.x2 += distance;
		});
		this.maxX += distance;
	}
	changeY(distance) {
		this.lines.forEach((line) => {
			line.y1 += distance;
			line.y2 += distance;
		});
	}
	move(xDist, yDist) {
		this.changeX(xDist);
		this.changeY(yDist);
	}
	getMidpoint() {
		let midpoint = new Vector2(0, 0);
		this.lines.forEach(line => midpoint.add({
			x: line.x1,
			y: line.y1
		}));
		midpoint.x /= this.lines.length;
		midpoint.y /= this.lines.length;
		return midpoint;
	}
	resetMesh() {
		let _ = this.getMidpoint();
		this.move(-_.x, -_.y);
	}
	rotate(degree) {
		let mid = this.getMidpoint();
		this.changeX(-mid.x);
		this.changeY(-mid.y);
		this.lines.forEach(line => {
			let x = line.x1,
				y = line.y1;
			line.x1 = x * Math.cos(degree) - y * Math.sin(degree);
			line.y1 = x * Math.sin(degree) + y * Math.cos(degree);
			this.maxX = Math.max(this.maxX, line.x1);
			x = line.x2;
			y = line.y2;
			line.x2 = x * Math.cos(degree) - y * Math.sin(degree);
			line.y2 = x * Math.sin(degree) + y * Math.cos(degree);
			this.maxX = Math.max(this.maxX, line.x2);
		});
		this.changeX(mid.x);
		this.changeY(mid.y);
	}
	pointInPolygon(point) {
		let _testLine = new Line(point, new Vector2(this.maxX * 10, point.y));
		let result = false;
		for (let i = 0; i < this.lines.length; i++)
			if (this.lines[i].intersects(_testLine)) {
				result = !result;
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
		$ctx.moveTo(this.lines[0].x1, this.lines[0].y1);
		for (let i = 0; i < this.lines.length; i++) {
			$ctx.lineTo(this.lines[i].x2, this.lines[i].y2);
		}
		$ctx.lineTo(this.lines[0].x1, this.lines[0].y1);
		$ctx.fill();
		$ctx.closePath();
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
class PObject {
	constructor(x, y, mesh, colour, type) {
		this.x = x;
		this.y = y;
		this._mesh = mesh;
		this.colour = colour;
		this.type = type;
		this.eventListeners = [];
	}
	get color() {
		return this.color;
	}
	set color(color) {
		this.colour = color;
	}
	get mesh() {
		return this._mesh;
	}
	set mesh(newMesh) {
		this._mesh = newMesh;
	}
	get collidesWithPlayer() {
		$player.readyMesh();
		this._mesh.move(this.x, this.y);
		let _ = $player._mesh.collision(this._mesh);
		$player.resetMesh();
		this._mesh.move(-this.x, -this.y);
		return _;
	}
	addEventListener(eventListener, func) {
		if (eventListener instanceof EventListener) {
			this.eventListeners.push(eventListener);
		} else {
			this.eventListeners.push(new EventListener(eventListener, func));
		}
		return this;
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
	}
	start() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "start") {
				eventListener.func(this);
			}
		});
	}
	update() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
	rotate(degrees) {
		this._mesh.rotate(degrees);
	}
	render() {
		$ctx.fillStyle = this.colour;
		this._mesh.move(this.x - Camera.x, this.y - Camera.y);
		this._mesh.render();
		this._mesh.move(-(this.x - Camera.x), -(this.y - Camera.y));
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "render") {
				eventListener.func(this);
			}
		});
	}
}
class PText {
	constructor(message, font, size, x, y, colour) {
		this.message = message;
		this.font = font;
		this.size = size;
		this.x = x;
		this.y = y;
		this.type = 0;
		this.colour = colour;
		this.eventListeners = [];
	}
	get color() {
		return this.colour;
	}
	set color(value) {
		this.colour = value;
	}
	addEventListener(eventListener, func) {
		if (eventListener instanceof EventListener) {
			this.eventListeners.push(eventListener);
		} else {
			this.eventListeners.push(new EventListener(eventListener, func));
		}
		return this;
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
	}
	start() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "start") {
				eventListener.func(this);
			}
		});
	}
	update() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
	render() {
		$ctx.fillStyle = this.colour;
		$ctx.font = this.size + "px " + this.font;
		$ctx.fillText(this.message, this.x - Camera.x, this.y - Camera.y);
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "render") {
				eventListener.func(this);
			}
		});
	}
}
class CustomPObject {
	constructor(x, y) {
		this.x = x;
		this.y = y;
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
	}
	start() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "start") {
				eventListener.func(this);
			}
		});
	}
	update() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
	render() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
}
class PersistentPObject {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.eventListeners = [];
		$persistentObjects.push(this);
	}
	addEventListener(eventListener, func) {
		if (eventListener instanceof EventListener) {
			this.eventListeners.push(eventListener);
		} else {
			this.eventListeners.push(new EventListener(eventListener, func));
		}
		return this;
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
	}
	start() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "start") {
				eventListener.func(this);
			}
		});
	}
	update() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
	render() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "render") {
				eventListener.func(this);
			}
		});
	}
}
class Level {
	constructor(objects) {
		this._objects = objects;
		this.eventListeners = [];
		$levels.push(this);
	}
	addEventListener(eventListener, func) {
		if (eventListener instanceof EventListener) {
			this.eventListeners.push(eventListener);
		} else {
			this.eventListeners.push(new EventListener(eventListener, func));
		}
		return this;
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
	}
	start() {
		this._objects.forEach((obj) => obj.start());
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "start") {
				eventListener.func(this);
			}
		});
	}
	update() {
		this._objects.forEach(x => x.update());
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
	render() {
		this._objects.forEach((object) => object.render());
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "render") {
				eventListener.func(this);
			}
		});
	}
}
class Player {
	constructor(x, y, mesh, colour, canWalljump = false) {
		this.x = x;
		this.y = y;
		this._startX = x;
		this._startY = y;
		this._mesh = mesh;
		this.colour = colour;
		this.xVel = 0;
		this.velocityMultiplier = 1;
		this.resistance = 0.8;
		this.yVel = 0;
		this.gravityMultiplier = 1;
		this.gravity = 1;
		this.wallJump = canWalljump;
		this.inWater = false;
		this.touchingGround = false;
		this.objectsColliding = [];
		this._0dir = 1;
		this.eventListeners = [];
		$player = this;
	}
	get mesh() {
		return this._mesh;
	}
	get colour() {
		return this._colour;
	}
	set colour(colour) {
		this._colour = colour;
	}
	get midPoint() {
		this.readyMesh();
		let _ = this._mesh.getMidpoint();
		this.resetMesh();
		return _;
	}
	addEventListener(eventListener, func) {
		if (eventListener instanceof EventListener) {
			this.eventListeners.push(eventListener);
		} else {
			this.eventListeners.push(new EventListener(eventListener, func));
		}
		return this;
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
	}
	update() {
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "update") {
				eventListener.func(this);
			}
		});
	}
	readyMesh() {
		this._mesh.move(this.x, this.y);
	}
	resetMesh() {
		this._mesh.resetMesh();
	}
	jump(ground = 14, water = 4) {
		if (this.touchingGround && !this.inWater) {
			this.yVel = -ground;
			this.eventListeners.forEach((eventListener) => {
				if (eventListener.name === "jump") {
					eventListener.func(this);
				}
			});
		} else if (this.inWater) {
			this.yVel = -water;
		}
	}
	addXForce(xForce) {
		this.xVel += xForce;
	}
	addYForce(yForce) {
		this.yVek += yForce;
	}
	addForce(xForce, yForce) {
		this.xVel += xForce;
		this.yVel -= yForce;
	}
	reset() {
		this.x = this._startX;
		this.y = this._startY;
		this.xVel = 0;
		this.yVel = 0;
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "reset") {
				eventListener.func(this);
			}
		});
	}
	die() {
		this.reset();
		Statistics.deaths++;
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "death") {
				eventListener.func(this);
			}
		});
	}
	rotate(degrees) {
		this._mesh.rotate(degrees);
	}
	collides(obj) {
		this.readyMesh();
		obj._mesh.move(obj.x, obj.y);
		const res = this._mesh.collision(obj._mesh);
		this.resetMesh();
		obj._mesh.move(-obj.x, -obj.y);
		return res;
	}
	collisionX() {
		let dir = Math.sign(this.xVel);
		$levels[currentLevel]._objects.forEach(x => {
			if (x.type > 0) {
				this.readyMesh();
				x._mesh.move(x.x, x.y);
				while (this._mesh.collision(x._mesh)) {
					this.resetMesh();
					switch (x.type) {
						case 1:
							if (dir === 0) {
								if (this._0dir === 1) {
									this.readyMesh();
									if (this._mesh.getMidpoint().x >= x._mesh.getMidpoint().x) {
										this.x += 1;
									} else {
										this.x -= 1;
									}
									this.resetMesh();
									this._0dir = 0;
								}
							} else {
								this.x -= dir;
							}
							if (!this.inWater && this.wallJump && (Input[87] || Input[38] || Input[32] || Input.mouseDown)) {
								if (dir === 1) {
									this.xVel = -16;
								} else {
									this.xVel = 16;
								}
								this.yVel = -12;
							} else {
								this.xVel = 0;
							}
							break;
						case 3:
							this.x -= dir;
							break;
						case 4:
							this.xVel *= 0.4;
							if (this.xVel > 2) {
								this.xVel = 2;
							} else if (this.xVel < -2) {
								this.xVel = -2;
							}
							x._mesh.resetMesh();
							return;
						default:
							break;
					}
					this.readyMesh();
				}
				this.resetMesh();
				x._mesh.resetMesh();
			}
		});
	}
	collisionY() {
		let dir = Math.sign(this.yVel);
		$levels[currentLevel]._objects.forEach(x => {
			if (x.type > 0) {
				this.readyMesh();
				x._mesh.move(x.x, x.y);
				while (this._mesh.collision(x._mesh)) {
					this.resetMesh();
					switch (x.type) {
						case 1:
							if (dir === 0) {
								if (this._0dir === 0) {
									this.readyMesh();
									if (this._mesh.getMidpoint().y > x._mesh.getMidpoint().y) {
										this.y++;
									} else {
										this.y--;
									}
									this.resetMesh();
									this._0dir = 1;
								}
							} else {
								this.y -= dir;
							}
							this.yVel = 0;
							break;
						case 3:
							this.y -= dir;
							if (dir === 1) {
								this.yVel = -24;
							} else {
								this.yVel = 0;
							}
							break;
						case 4:
							this.yVel *= 0.4;
							if (this.yVel > 2) {
								this.yVel = 2;
							} else if (this.yVel < -2) {
								this.yVel = -2;
							}
							x._mesh.resetMesh();
							return;
						default:
							break;
					}
					this.readyMesh();
				}
				this.resetMesh();
				x._mesh.resetMesh();
			}
		});
	}
	physicsTick() {
		this.yVel += this.gravity * this.gravityMultiplier;
		if (this.yVel > 50) {
			this.yVel = 50;
		} else if (this.yVel < -50) {
			this.yVel = -50;
		}
		this.xVel *= this.resistance * this.velocityMultiplier;
		if (this.xVel > 50) {
			this.xVel = 50;
		} else if (this.xVel < -50) {
			this.xVel = -50;
		}
		this.objectsColliding = [];
		const _ref = this.objectsColliding, _inwater = this.inWater, _touchingground = this.touchingGround;
		this.inWater = this.touchingGround = false;
		this.x += this.xVel;
		this.y += this.yVel;
		$levels[currentLevel]._objects.forEach(x => {
			if (x.type > 0) {
				this.readyMesh();
				x._mesh.move(x.x, x.y);
				if (this._mesh.collision(x._mesh)) {
					switch (x.type) {
						case 1:
							if (this.yVel >= 0) {
								this.touchingGround = true;
							}
							break;
						case 2:
							this.resetMesh();
							x._mesh.resetMesh();
							this.die();
							return;
						case 4:
							this.inWater = true;
							break;
						case 9:
							currentLevel++;
							this.resetMesh();
							x._mesh.resetMesh();
							this.reset();
							this.eventListeners.forEach((eventListener) => {
								if (eventListener.name === "levelup") {
									eventListener.func(this);
								}
							});
							$levels[currentLevel].start();
							if (currentLevel === $lastLevel) {
								Platformer.End();
							}
							return;
						default:
							break;
					}
					if (!_ref.includes(x)) {
						_ref.push(x);
					}
				}
				this.resetMesh();
				x._mesh.resetMesh();
			}
		});
		this.x -= this.xVel;
		this.collisionY();
		this.x += this.xVel;
		this.collisionX();
		if (this._mesh.x !== 0 || this._mesh.y !== 0) {
			this.resetMesh();
		}
		this.objectsColliding.forEach((object) => {
			this.eventListeners.forEach((eventListener) => {
				if (eventListener.name === "collision") {
					eventListener.func(this, object);
				}
			});
		});
		if (this.inWater !== _inwater) {
			if (this.inWater) {
				this.eventListeners.forEach((eventListener) => {
					if (eventListener.name === "waterenter") {
						eventListener.func(this);
					}
				});
			} else {
				this.eventListeners.forEach((eventListener) => {
					if (eventListener.name === "waterexit") {
						eventListener.func(this);
					}
				});
			}
		}
		if (this.touchingGround !== _touchingground) {
			if (this.touchingGround) {
				this.eventListeners.forEach((eventListener) => {
					if (eventListener.name === "groundenter") {
						eventListener.func(this);
					}
				});
			} else {
				this.eventListeners.forEach((eventListener) => {
					if (eventListener.name === "groundexit") {
						eventListener.func(this);
					}
				});
			}
		}
	}
	render() {
		if (this.colour instanceof Image && this.colour.complete) {
			$ctx.drawImage(this.colour, this.x - Camera.x - this.colour.width / 2, this.y - Camera.y - this.colour.height / 2);
		} else {
			this._mesh.move(this.x - Camera.x, this.y - Camera.y);
			this._mesh.render(this.colour);
			this._mesh.move(-(this.x - Camera.x), -(this.y - Camera.y));
		}
		this.eventListeners.forEach((eventListener) => {
			if (eventListener.name === "render") {
				eventListener.func(this);
			}
		});
	}
}
function frameRate(frames = 60) {
	$frameRate = frames;
}
function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}
function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
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
const Randomiser = (function () { function a(c) { let d = []; for (let b = 0; b < c.length; b++)Array.isArray(c[b]) ? d.push(a(c[b])) : d.push(c[b]); return d } return String.prototype.shuffle = function () { let a = this.split(""), b = ""; for (; a.length > 0;)b += a.splice(~~(Math.random() * a.length), 1)[0]; return b }, Array.prototype.shuffle = function (e) { let a = [], d = []; if (e) for (let b = 0; b < this.length; b++)Array.isArray(this[b]) ? a.push(this[b].shuffle()) : a.push(this[b]); else for (let c = 0; c < this.length; c++)a.push(this[c]); for (; a.length > 0;)d.push(a.splice(~~(Math.random() * a.length), 1)[0]); return d }, String.prototype.pick = function () { return this[~~(Math.random() * this.length)] }, Array.prototype.pick = function (b) { let a = this; return b && (a = a.flat(1 / 0)), a[~~(Math.random() * a.length)] }, { int: function (a, b = null) { return null === b ? ~~(Math.random() * a) : a === b ? a : (a > b && ([a, b] = [b, a]), Math.round(Math.random() * (b - a)) + a) }, float: function (a, b = null) { return null === b ? Math.random() * a : a === b ? a : (a > b && ([a, b] = [b, a]), Math.random() * (b - a) + a) }, string: function (a, d) { let b = ""; for (let c = 0; c < d; c++)b += a[~~(Math.random() * a.length)]; return b }, array: function (a, d) { let b = []; for (let c = 0; c < d; c++)b.push(a[~~(Math.random() * a.length)]); return b }, shuffle: function i(b, j = !1) { if (Array.isArray(b)) { let c = []; if (j) for (let d = 0; d < b.length; d++)Array.isArray(b[d]) ? c.push(i(b[d])) : c.push(b[d]); else for (let e = 0; e < b.length; e++)Array.isArray(b[e]) ? c.push(a(b[e])) : c.push(b[e]); let g = []; for (; c.length > 0;)g.push(c.splice(~~(Math.random() * c.length), 1)[0]); return g } if ("string" == typeof b) { let f = b.split(""), h = ""; for (; f.length > 0;)h += f.splice(~~(Math.random() * f.length), 1)[0]; return h } return null }, pick: function (a, b = !0) { return "string" == typeof a ? a[~~(Math.random() * a.length)] : Array.isArray(a) ? (b && (a = a.flat(1 / 0)), a[~~(Math.random() * a.length)]) : null } } })(); console.log("Loaded Randomiser.js by Matthew James");
function constrain(num, min, max) {
	if (num < min) {
		return min;
	} else if (num > max) {
		return max;
	}
	return num;
}
function clamp(num, min, max) {
	if (num < min) {
		return min;
	} else if (num > max) {
		return max;
	}
	return num;
}
function lerp(value1, value2, amount) {
	if (amount < 0) {
		amount = 0;
	} else if (amount > 1) {
		amount = 1;
	}
	if (value2 > value1) {
		[value1, value2] = [value2, value1];
	}
	return value1 + (value2 - value1) * amount;
}
console.log("Loaded PlatformerJS by Matthew James");