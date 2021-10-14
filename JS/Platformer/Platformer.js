/*
 * MattDESTROYER's/Matthew James's
 * 2D Platformer Engine!
 * 
 * Version: v2.3.1
 */
let $canvas, $ctx, $player, $platformerRunning = true,
	$lastLevel,
	$previousFrame = Date.now(),
	$previousFrameReading = Date.now(),
	$frameRate = 60,
	$frameCount = 0,
	FPS = 0,
	$levels = [],
	currentLevel = 0,
	width, height;
let Input = {},
	Camera = {
		x: 0,
		y: 0
	},
	Time = {
		startTime: 0,
		endTime: null,
		_dt: 0,
		get timeElapsed() {
			return Date.now() - Time.startTime;
		},
		get deltaTime() {
			return Date.now() - this._dt;
		},
		get now() {
			return Date.now();
		}
	},
	Statistics = {
		deaths: 0,
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
			return Time.endTime;
		},
		get secondsToFinish() {
			return Time.endTime === null ? null : Time.endTime / 1000;
		},
		get minutesToFinish() {
			return Time.endTime === null ? null : Time.endTime / 60000;
		}
	};

function addStyles(css) {
	let style = document.createElement("style");
	style.type = "text/css";
	style.rel = "stylesheet";
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	(document.head || document.getElementsByTagName("head")[0])
	.appendChild(style);
}
let keyDown, keyUp, keyPress, mouseDown, mouseUp, mouseClick, mouseMove;
keyDown = keyUp = keyPress = mouseDown = mouseUp = mouseClick = mouseMove = function() {};
document.addEventListener("keydown", function(e) {
	e = e || window.event;
	Input[e.keyCode] = true;
	Input[e.key.toString()
		.toUpperCase()] = true;
	Input.keyCode = e.keyCode;
	Input.key = e.key;
	keyDown();
});
document.addEventListener("keyup", function(e) {
	e = e || window.event;
	Input[e.keyCode] = false;
	Input[e.key.toString()
		.toUpperCase()] = false;
	keyUp();
});
document.addEventListener("keypress", function(e) {
	e = e || window.event;
	keyPress();
});
document.addEventListener("mousedown", function(e) {
	e = e || window.event;
	mouseDown();
});
document.addEventListener("mouseup", function(e) {
	e = e || window.event;
	mouseUp();
});
document.addEventListener("click", function(e) {
	e = e || window.event;
	mouseClick();
});
document.addEventListener("mousemove", function(e) {
	e = e || window.event;
	Input.pmouseX = Input.mouseX;
	Input.pmouseY = Input.mouseY;
	Input.mouseX = e.x;
	Input.mouseY = e.y;
	mouseMove();
});
class Platformer {
	static Start(lastLevel = $levels.length) {
		$lastLevel = lastLevel;
		if ($ctx) {
			if ($levels.length < 1) throw "Platformer Error: No levels. (Create at least one level new Level(objects))";
			else if (!$player) throw "Platformer Error: No player. (Create a player before calling Start new Player(x, y, width, height, colour))";
			new Level([
				new PObject(0, 200, new RectangleMesh(150, 25), "black", 1)
			]);
			Time.startTime = Date.now();
			$levels[0].start();
			window.requestAnimationFrame(Platformer.Update);
		} else {
			throw "Platformer Error: No context. (Call Platformer.initCanvas(id, ?fullscreen))";
		}
	}
	static End() {
		Time.endTime = Date.now();
	}
	static Stop() {
		$platformerRunning = false;
	}
	static Update() {
		$frameCount++;
		if (Date.now() - $previousFrameReading >= 1000) {
			FPS = $frameCount;
			$frameCount = 0;
			$previousFrameReading = Date.now();
		}
		if (Date.now() - $previousFrame >= 1000 / $frameRate) {
			$levels[currentLevel].update();
			$player.physicsTick();
			$player.update();
			Platformer.Render();
			$previousFrame = Date.now();
		}
		Time._dt = Date.now();
		if ($platformerRunning) {
			if ($levels[currentLevel] === undefined) {
				Platformer.Stop();
			}
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
		$player.render();
	}
	static initCanvas(id, fullscreen = true) {
		$canvas = document.getElementById(id);
		if (fullscreen) {
			$canvas.width = window.innerWidth;
			$canvas.height = window.innerHeight;
			addStyles("*{margin:0px;overflow:hidden;}");
		}
		width = $canvas.width;
		height = $canvas.height;
		$ctx = $canvas.getContext("2d");
		$ctx.lineWidth = 0;
	}
	static background(colour) {
		this._backgroundColour = colour;
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
		return sqrt(pow(point.x - this.x, 2) + pow(point.y - this.y, 2));
	}
	dot(point) {
		return this.x * point.x + this.y * point.y;
	}
	mag() {
		return sqrt(this.x * this.x + this.y * this.y);
	}
	normalize() {
		let mag = sqrt(this.x * this.x + this.y * this.y);
		return [this.x / mag, this.y / mag];
	}
	array() {
		return [this.x, this.y];
	}
	static dist(point1, point2) {
		return sqrt(pow(point2.x - point1.x, 2) + pow(point2.y - point1.y, 2));
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
const Point = Vector2;
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
		this.lines.map(x => {
			x.x1 += distance;
			x.x2 += distance;
		});
		this.maxX += distance;
	}
	changeY(distance) {
		this.lines.map(x => {
			x.y1 += distance;
			x.y2 += distance;
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
			if (this.lines[i].intersects(_testLine)) result = !result;
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
	constructor(x, y, mesh, colour, type, update) {
		this.x = x;
		this.y = y;
		this._mesh = mesh;
		this.colour = colour;
		this.type = type;
		this._doesUpdate = false;
		if (update) {
			this._doesUpdate = true;
			this.update = update;
		}
	}
	get color() {
		return this.color;
	}
	set color(color) {
		this.color = color;
	}
	get width() {
		return this._width;
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
	rotate(degrees) {
		this._mesh.rotate(degrees);
	}
	render() {
		$ctx.fillStyle = this.colour;
		this._mesh.move(this.x - Camera.x, this.y - Camera.y);
		this._mesh.render();
		this._mesh.move(-(this.x - Camera.x), -(this.y - Camera.y));
	}
}
class PText {
	constructor(message, font, size, x, y, colour, update) {
		this.message = message;
		this.font = font;
		this.size = size;
		this.x = x;
		this.y = y;
		this.type = 0;
		this.colour = colour;
		this._doesUpdate = false;
		if (update) {
			this._doesUpdate = true;
			this.update = update;
		}
	}
	get color() {
		return this.colour;
	}
	set color(value) {
		return this.colour;
	}
	render() {
		$ctx.fillStyle = this.colour;
		$ctx.font = this.size + "px " + this.font;
		$ctx.fillText(this.message, this.x - Camera.x, this.y - Camera.y);
	}
}
class CustomPObject {
	constructor(x, y, update = function() {}, render = function() {}) {
		this.x = x;
		this.y = y;
		this._doesUpdate = true;
		this.update = update;
		this.render = render;
	}
}
class Level {
	constructor(objects, start = function() {}, end = function() {}) {
		this._objects = objects;
		this.start = start;
		this.end = end;
		$levels.push(this);
	}
	update() {
		this._objects.forEach(x => {
			if (x._doesUpdate) {
				x.update();
			}
		});
	}
	render() {
		this._objects.forEach(x => x.render());
	}
}
class Player {
	constructor(x, y, mesh, colour, canWalljump = false, update = function() {}) {
		this._x = x;
		this._y = y;
		this._startX = x;
		this._startY = y;
		this._mesh = mesh;
		this._colour = colour;
		this._xVel = 0;
		this.velocityMultiplier = 1;
		this.resistance = 0.8;
		this._yVel = 0;
		this.gravityMultiplier = 1;
		this.gravityIncrease = 1;
		this.wallJump = canWalljump;
		this.inWater = false;
		this.touchingGround = false;
		this.update = update;
		this._0dir = 1;
		$player = this;
	}
	get x() {
		return this._x;
	}
	set x(value) {
		this._x = value;
	}
	get y() {
		return this._y;
	}
	set y(value) {
		this._y = value;
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
	get color() {
		return this._colour;
	}
	set color(color) {
		this._colour = color;
	}
	get midPoint() {
		this.readyMesh();
		let _ = this._mesh.getMidpoint();
		this.resetMesh();
		return _;
	}
	readyMesh() {
		this._mesh.move(this.x, this.y);
	}
	resetMesh() {
		this._mesh.resetMesh();
	}
	jump() {
		if (this.touchingGround) {
			this._yVel = -14;
		} else if (this.inWater) {
			this._yVel = -4;
		}
	}
	addForce(xForce, yForce) {
		this._xVel += xForce;
		this._yVel += yForce;
	}
	reset() {
		this._x = this._startX;
		this._y = this._startY;
		this._xVel = 0;
		this._yVel = 0;
		this.touchingGround = false;
	}
	die() {
		this.reset();
		Statistics.deaths++;
	}
	rotate(degrees) {
		this._mesh.rotate(degrees);
	}
	collides(pObject) {
		this.readyMesh();
		pObject._mesh.move(pObject.x, pObject.y);
		return this._mesh.collision(pObject._mesh);
		this.resetMesh();
		pObject._mesh.move(-pObject.x, -pObject.y);
	}
	changeX(distance) {
		this._x += distance;
	}
	collisionX() {
		let _tempLevel = $levels[currentLevel]._objects;
		let dir = this._xVel > 0 ? 1 : this._xVel < 0 ? -1 : 0;
		this.inWater = false;
		_tempLevel.forEach(x => {
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
									let _ = this._mesh.getMidpoint()
										.x >= x._mesh.getMidpoint()
										.x;
									this.resetMesh();
									if (_) this._x += 1;
									else this._x -= 1;
									this._0dir = 0;
								}
							} else {
								this._x -= dir;
							}
							if (!this.inWater && this.wallJump && (Input[87] || Input[38] || Input[32])) {
								if (dir === 1) this._xVel = -16;
								else this._xVel = 16;
								this._yVel = -12;
							} else this._xVel = 0;
							break;
						case 2:
							this.die();
							break;
						case 3:
							this._x -= dir;
							break;
						case 4:
							this.inWater = true;
							this._xVel *= 0.4;
							if (this._xVel > 2) this._xVel = 2;
							else if (this._xVel < -2) this._xVel = -2;
							x._mesh.resetMesh();
							return;
						case 9:
							$levels[currentLevel].end();
							if (++currentLevel === $lastLevel) {
								Platformer.End();
							}
							$levels[currentLevel].start();
							this.reset();
							break;
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
	changeY(distance) {
		this._y += distance;
	}
	collisionY() {
		let _tempLevel = $levels[currentLevel]._objects;
		this.touchingGround = false;
		let dir = this._yVel > 0 ? 1 : this._yVel < 0 ? -1 : 0;
		_tempLevel.forEach(x => {
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
									let _ = this._mesh.getMidpoint()
										.y > x._mesh.getMidpoint()
										.y;
									this.resetMesh();
									if (_) this._y += 1;
									else this._y -= 1;
									this._0dir = 1;
								}
							} else this._y -= dir;
							if (dir === 1 || this.dir === 0) this.touchingGround = true;
							else this.touchingGround = false;
							this._yVel = 0;
							break;
						case 2:
							this.die();
							break;
						case 3:
							this._y -= dir;
							if (dir === 1) this._yVel = -24;
							else this._yVel = 0;
							this.touchingGround = false;
							break;
						case 4:
							this.inWater = true;
							this._yVel *= 0.4;
							if (this._yVel > 2) this._yVel = 2;
							else if (this._yVel < -2) this._yVel = -2;
							x._mesh.resetMesh();
							return;
						case 9:
							$levels[currentLevel].end();
							if (++currentLevel === $lastLevel) {
								Platformer.End();
							}
							$levels[currentLevel].start();
							this.reset();
							break;
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
		this._yVel += this.gravityIncrease * this.gravityMultiplier;
		if (this._yVel > 50) this._xVel = 50;
		if (this._yVel < -50) this._xVel = -50;
		this.changeY(this._yVel);
		this.collisionY();
		this._xVel *= this.resistance * this.velocityMultiplier;
		if (this._xVel > 50) this._xVel = 50;
		if (this._xVel < -50) this._xVel = -50;
		this.changeX(this._xVel);
		this.collisionX();
		if (this._mesh.x !== 0 || this._mesh.y !== 0) this.resetMesh();
	}
	render() {
		this._mesh.move(this._x - Camera.x, this._y - Camera.y);
		this._mesh.render(this._colour);
		this._mesh.move(-(this._x - Camera.x), -(this._y - Camera.y));
	}
}
// changes the number of frames per second
function frameRate(frames = 60) {
	$frameRate = frames;
}
// returns the distance between two 2D points (x1, y1 and x2, y2)
function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
// convert degrees to radians
function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}
// convert radians to degrees
function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}
// math shortcuts
let pi = Math.PI,
	pow = Math.pow,
	log = Math.log,
	sqrt = Math.sqrt,
	round = Math.round,
	min = Math.min,
	max = Math.max,
	abs = Math.abs,
	sin = Math.sin,
	cos = Math.cos,
	tan = Math.tan,
	asin = Math.asin,
	acos = Math.acos,
	atan = Math.atan;
// generate random number between min and max inclusive
function random(min, max) {
	return Math.random() * (max - min + 1) + min;
}
// generate random whole number between min and max inclusive
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// restrains a number by two numbers
let contrain, clamp;
constrain = clamp = function(num, min, max) {
	if (num < min) return min;
	if (num > max) return max;
	return num;
}
// returns a number between two number
function lerp(value1, value2, amount) {
	if (amount < 0) amount = 0;
	else if (amount > 1) amount = 1;
	return value1 + (value2 - value1) * amount;
}
console.log("Loaded PlatformerJS by MattDESTROYER");
