/*
 * MattDESTROYER's/Matthew James's
 * 2D Platformer Engine!
 * 
 * Version: v1.0
 * 
 * Coming Soon:
 *  - Polygon meshes for more complex
 *    objects and collisions
 */

let $canvas, $ctx, $player, $previousFrame = Date.now(), $previousFrameReading = Date.now(), $frameRate = 60, $frameCount = 0, FPS = 0, $levels = [], currentLevel = 0, width, height;

let Input = {},
	Camera = {
		x: 0,
		y: 0
	},
	Time = {
		_dt: 0,
		get deltaTime() {
			return Date.now() - this._dt;
		}
	};

let keyDown, keyUp, keyPress, mouseDown, mouseUp, mouseClick, mouseMove;
keyDown = keyUp = keyPress = mouseDown = mouseUp = mouseClick = mouseMove = function () { };
let mouseX, mouseY, pmouseX, pmouseY;
document.addEventListener("keydown", function (e) {
	e = e || window.event;
	Input[e.keyCode] = true;
	Input[e.key.toString().toUpperCase()] = true;
	Input.keyCode = e.keyCode;
	Input.key = e.key;
	keyDown();
});
document.addEventListener("keyup", function (e) {
	e = e || window.event;
	Input[e.keyCode] = false;
	Input[e.key.toString().toUpperCase()] = false;
	keyUp();
});
document.addEventListener("keypress", function (e) {
	e = e || window.event;
	keyPress();
});
document.addEventListener("mousedown", function (e) {
	e = e || window.event;
	mouseDown();
});
document.addEventListener("mouseup", function (e) {
	e = e || window.event;
	mouseUp();
});
document.addEventListener("click", function (e) {
	e = e || window.event;
	mouseClick();
});
document.addEventListener("mousemove", function (e) {
	e = e || window.event;
	let rect = $canvas.getBoundingClientRect();
	pmouseX = mouseX;
	pmouseY = mouseY;
	mouseX = e.clientx - rect.left;
	mouseY = e.clienty - rect.top;
	mouseMove();
});

class Platformer {
	static Start() {
		if ($ctx) {
			if ($levels.length < 1) {
				throw "Platformer Error: No levels. (Create at least one level new Level(objects))";
			} else if (!$player) {
				throw "Platformer Error: No player. (Create a player before calling Start new Player(x, y, width, height, colour))";
			}
			window.requestAnimationFrame(Platformer.Update);
		} else {
			throw "Platformer Error: No context. (Call Platformer.initCanvas(id, ?fullscreen))";
		}
	}
	static Update() {
		$frameCount++;
		if (Date.now() - $previousFrameReading >= 1000) {
			FPS = $frameCount;
			$frameCount = 0;
		}
		if (Date.now() - $previousFrame >= 1000 / $frameRate) {
			$player.physicsTick();
			$player.update();
			Platformer.Render();
			$previousFrame = Date.now();
		}
		Time._dt = Date.now();
		window.requestAnimationFrame(Platformer.Update);
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

class RectangleMesh {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	static collision(x1, y1, mesh1, x2, y2, mesh2) {
		return (x1 < x2 + mesh2.width && x1 + mesh1.width > x2 && y1 < y2 + mesh2.height && y1 + mesh1.height > y2);
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
		let det = (this.x2 - this.x1) * (other.y2 - other.y1) - (other.x2 - other.x1) * (this.y2 - this.y1);
		if (det === 0) {
			return false;
		}
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
			this.maxX = max(this.maxX, points[i].x);
			this.maxX = max(this.maxX, points[i + 1].x);
			this.lines.push(new Line(points[i], points[i + 1]));
		}
		this.lines.push(new Line(points[points.length - 1], points[0]));
		this.maxX = abs(this.maxX);
	}
	changeX(distance) {
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].x1 += distance;
			this.lines[i].x2 += distance;
		}
		this.maxX += distance;
	}
	changeY(distance) {
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].y1 += distance;
			this.lines[i].y2 += distance;
		}
	}
	move(xDist, yDist) {
		this.changeX(xDist);
		this.changeY(yDist);
	}
	getMidpoint() {
		let midpoint = new Vector2(0, 0);
		for (let i = 0; i < this.lines.length; i++) {
			midpoint.x += this.lines[i].x1;
			midpoint.y += this.lines[i].y1;
		}
		midpoint.x /= this.lines.length;
		midpoint.y /= this.lines.length;
		return midpoint;
	}
	rotate(degree) {
		let mid = this.getMidpoint();
		this.changeX(-mid.x);
		this.changeY(-mid.y);
		for (let i = 0; i < this.lines.length; i++) {
			let x = this.lines[i].x1, y = this.lines[i].y1;
			this.lines[i].x1 = x * cos(degree) - y * sin(degree);
			this.lines[i].y1 = x * sin(degree) + y * cos(degree);
			this.maxX = max(this.maxX, this.lines[i].x1);
			x = this.lines[i].x2;
			y = this.lines[i].y2;
			this.lines[i].x2 = x * cos(degree) - y * sin(degree);
			this.lines[i].y2 = x * sin(degree) + y * cos(degree);
			this.maxX = max(this.maxX, this.lines[i].x2);
		}
		this.changeX(mid.x);
		this.changeY(mid.y);
	}
	pointInPolygon(point) {
		let _testLine = new Line(point, new Vector2(this.maxX * 2 + 1, point.y));
		let result = false;
		for (let i = 0; i < this.lines.length; i++) {
			if (this.lines[i].intersects(_testLine)) {
				result = !result;
			}
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
		ctx.fillStyle = colour;
		ctx.beginPath();
		ctx.moveTo(this.lines[0].x1, this.lines[0].y1);
		for (let i = 0; i < this.lines.length; i++) {
			ctx.lineTo(this.lines[i].x2, this.lines[i].y2);
		}
		ctx.lineTo(this.lines[0].x1, this.lines[0].y1);
		ctx.closePath();
	}
}

class PObject {
	constructor(x, y, width, height, colour, type, update) {
		this.x = x;
		this.y = y;
		this._width = width;
		this._height = height
		this._mesh = new RectangleMesh(this.width, this.height);
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
	get height() {
		return this._height;
	}
	set width(value) {
		this._width = value;
		this._mesh = new RectangleMesh(this._width, this._height);
	}
	set height(value) {
		this._height = value;
		this._mesh = new RectangleMesh(this._width, this._height);
	}
	render() {
		$ctx.fillStyle = this.colour;
		$ctx.fillRect(this.x - Camera.x, this.y - Camera.y, this.width, this.height);
	}
}

class PText {
	constructor(message, font, fontSize, x, y, colour, type, update) {
		this.message = message;
		this.font = font;
		this.fontSize = fontSize;
		this.x = x;
		this.y = y;
		this.colour = colour;
		this.type = type;
		this._doesUpdate = false;
		if (update) {
			this._doesUpdate = true;
			this.update = update;
		}
	}
	render() {
		$ctx.fillStyle = this.colour;
		$ctx.font = this.fontSize + "px " + this.font;
		$ctx.fillText(this.message, this.x - Camera.x, this.y - Camera.y);
	}
}

class CustomPObject {
	constructor(x, y, update = function () { }, render = function () { }) {
		this.x = x;
		this.y = y;
		this._doesUpdate = true;
		this.update = update;
		this.render = render;
	}
}

class Level {
	constructor(objects) {
		this._objects = objects;
		$levels.push(this);
	}
	update() {
		this._objects.map(x => {
			if (x._doesUpdate) x.update();
		});
	}
	render() {
		this._objects.map(x => x.render());
	}
}

class Player {
	constructor(x, y, width, height, colour, canWalljump = false, update = function () { }) {
		this._x = x;
		this._y = y;
		this._startX = x;
		this._startY = y;
		this._width = width;
		this._height = height;
		this._mesh = new RectangleMesh(width, height);
		this._colour = colour;
		this._xVel = 0;
		this.velocityMultiplier = 1;
		this.resistance = 0.8;
		this._yVel = 0;
		this.gravityMultiplier = 1;
		this.gravityIncrease = 1;
		this.wallJump = canWalljump;
		this.touchingGround = false;
		this.update = update;
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
	get width() {
		return this._width;
	}
	set width(value) {
		this._width = value;
		this._mesh = new RectangleMesh(this._width, this._height);
	}
	get height() {
		return this._height;
	}
	set height(value) {
		this._height = value;
		this._mesh = new RectangleMesh(this._width, this._height);
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
	changeX(distance) {
		this._x += distance;
		let _tempLevel = $levels[currentLevel]._objects;
		_tempLevel.map(x => {
			if (x.type > 0) {
				while (RectangleMesh.collision(this._x, this._y, this._mesh, x.x, x.y, x._mesh)) {
					switch (x.type) {
						case 1:
							this._x -= distance / Math.abs(distance);
							if (!this.inWater && this.wallJump && (Input[87] || Input[38] || Input[32])) {
								if (this._xVel > 0) {
									this._xVel = -16;
								} else {
									this._xVel = 16;
								}
								this._yVel = -12;
							} else {
								this._xVel = 0;
							}
							break;
						case 2:
							this.reset();
							break;
						case 3:
							this._x -= distance / Math.abs(distance);
							break;
						case 4:
							this.inWater = true;
							this._xVel *= 0.4;
							return;
						case 9:
							currentLevel++;
							this.reset();
							break;
						default:
							break;
					}
				}
			}
		});
	}
	changeY(distance) {
		this._y += distance;
		let _tempLevel = $levels[currentLevel]._objects;
		this.touchingGround = false;
		this.inWater = false;
		_tempLevel.map(x => {
			if (x.type > 0) {
				while (RectangleMesh.collision(this._x, this._y, this._mesh, x.x, x.y, x._mesh)) {
					switch (x.type) {
						case 1:
							this._y -= distance / Math.abs(distance);
							if (this._yVel > 0) {
								this.touchingGround = true;
							} else {
								this.touchingGround = false;
							}
							this._yVel = 0;
							break;
						case 2:
							this.reset();
							break;
						case 3:
							this._y -= distance / Math.abs(distance);
							if (this._yVel > 0) {
								this._yVel = -24;
							} else {
								this._yVel = 0;
							}
							this.touchingGround = false;
							break;
						case 4:
							this.inWater = true;
							this._yVel *= 0.4;
							return;
						case 9:
							currentLevel++;
							this.reset();
							break;
						default:
							break;
					}
				}
			}
		});
	}
	physicsTick() {
		this._xVel *= this.resistance * this.velocityMultiplier;
		this.changeX(this._xVel);
		this._yVel += this.gravityIncrease * this.gravityMultiplier;
		this.changeY(this._yVel);
	}
	render() {
		$ctx.fillStyle = this._colour;
		$ctx.fillRect(this._x - Camera.x, this._y - Camera.y, this._width, this._height);
		$ctx.beginPath();
		$ctx.closePath();
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

// dist() but for 3D points (x1, y1, z1 and x2, y2, z2)
function dist3D(x1, y1, z1, x2, y2, z2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

// convert degrees to radians
function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

// convert radians to degrees
function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}

// shortcuts
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

// generate random number between min and max
function random(min, max) {
	return Math.random() * (max - min) + min;
}

// generate random whole number between min and max
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// returns true or false depending on whether or not the input is prime
function isPrime(num) {
	if (num < 2) {
		return false;
	} else if (num === 2) {
		return true;
	} else if (num % 2 === 0) {
		return false;
	} else if (num < 10) {
		if (num === 3 || num === 5 || num === 7) {
			return true;
		}
		return false;
	}
	for (var i = 3; i < Math.floor(Math.sqrt(num)); i += 2) {
		if (num % i === 0) {
			return false;
		}
	}
	return true;
}

// restrains a number by two numbers
let contrain, clamp;
constrain = clamp = function (num, min, max) {
	if (num < min) return min;
	if (num > max) return max;
	return num;
}

// returns a number between two number
function lerp(value1, value2, amount) {
	if (amount < 0) {
		amount = 0;
	} else if (amount > 1) {
		amount = 1;
	}
	return value1 + (value2 - value1) * amount;
}
