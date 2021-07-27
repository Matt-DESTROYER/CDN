/*
 * Extra JavaScripts Functions
 *
 *  Includes:
 *   - Handy math shortcuts and functions
 *   - DOM functions
 *   - Canvas functions
 *
 */

/*
 * Math functions
 */

// add function (doubt anyone will need this)
function add(number1, number2) {
	return number1 + number2;
}

// subtract function (doubt anyone will need this)
function subtract(number1, number2) {
	return number1 - number2;
}

// multiply function (doubt anyone will need this)
function multiply(number1, number2) {
	return number1 * number2;
}

// divide function (doubt anyone will need this)
function divide(number1, number2) {
	return number1 / number2;
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// dist() but for 3d points (x1, y1, z1 and x2, y2, z2)
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

// math shortcuts
var pi = Math.PI,
	pow = Math.pow,
	sqrt = Math.sqrt,
	round = Math.round,
	floor = Math.floor,
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

// generate random number between min and max inclusive
function random(min, max) {
	return Math.random() * (max - min) + min;
}

// generate random whole number between min and max inclusive
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// returns true or false depending on whether or not the input is prime
function isPrime(num) {
	if (num < 2) return false;
	else if (num === 2) return true;
	else if (num % 2 === 0) return false;
	else if (num < 10) {
		if (num === 3 || num === 5 || num === 7) return true;
		return false;
	}
	for (var i = 3; i < Math.floor(Math.sqrt(num)); i += 2)
		if (num % i === 0) return false;
	return true;
}

// returns a value between two values
function lerp(value1, value2, amount) {
	if (amount < 0) amount = 0;
	else if (amount > 1) amount = 1;
	return value1 + (value2 - value1) * amount;
}

// constrain
// returns the input value however if it is not between the specifications it will return the highest/lowest possible value
function constrain(value, max, min) {
	if (value > max) return max;
	else if (value < min) return min;
	return value;
}

/*
 * Data types
 */
// handy data type for 2D positions: new Vector2(x, y);
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

// handy data type for 3D positions: Vector3(x, y, z);
class Vector3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getZ() {
		return this.z;
	}
	setX(x) {
		this.x = x;
	}
	setY(y) {
		this.y = y;
	}
	setZ(z) {
		this.z = z;
	}
	add(point) {
		this.x += point.x;
		this.y += point.y;
		this.z += point.z;
	}
	sub(point) {
		this.x -= point.x;
		this.y -= point.y;
		this.z -= point.z;
	}
	mult(point) {
		this.x *= point.x;
		this.y *= point.y;
		this.z *= point.z;
	}
	div(point) {
		this.x /= point.x;
		this.y /= point.y;
		this.z /= point.z;
	}
	dist(point) {
		return sqrt(pow(point.x - this.x, 2) + pow(point.y - this.y, 2) + pow(point.z - this.z, 2));
	}
	dot(point) {
		return this.x * point.x + this.y * point.y + this.z * point.z;
	}
	mag() {
		return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	normalize() {
		let mag = sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return [this.x / mag, this.y / mag, this.z / mag];
	}
	array() {
		return [this.x, this.y, this.z];
	}
	static dist(point1, point2) {
		return sqrt(pow(point2.x - point1.x, 2) + pow(point2.y - point1.y, 2) + pow(point2.z - point1.z, 2));
	}
	static dot(point1, point2) {
		return point1.x * point2.x + point1.y * point2.y + point1.z * point2.z;
	}
	static array(point) {
		return [point.x, point.y, point.z];
	}
	static Zero() {
		return new Vector3(0, 0, 0);
	}
}

// color data type color(r, g, b);
class Color {
	constructor(red, green, blue, alpha = 1) {
		this.r = red;
		this.g = green;
		this.b = blue;
		this.a = alpha;
	}
	toString() {
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	}
	getRed() {
		return this.r;
	}
	getGreen() {
		return this.g;
	}
	getBlue() {
		return this.b;
	}
	getAlpha() {
		return this.a;
	}
	setRed(red = 0) {
		this.r = red;
	}
	setGreen(green = 0) {
		this.g = green;
	}
	setBlue(blue = 0) {
		this.b = blue;
	}
	setAlpha(alpha = 1) {
		this.a = alpha;
	}
}

// line data type line(x1, y1, x2, y2)
class Line {
	constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
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
	intersects = function(other) {
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

// rectangle data type Rectangle(x, y, width, height, color, render)
class Rectangle {
	constructor(x, y, width, height, color = new Color(0, 0, 0, 0), render) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.w = width;
		this.height = height;
		this.h = height;
		this.color = color;
		this.render = render || function() {
			$ctx.fillStyle = color.string;
			$ctx.rect(this.x, this.y, this.w, this.h)
		}
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getWidth() {
		return this.width;
	}
	getHeight() {
		return this.height;
	}
	setX(value = 0) {
		this.x = value;
	}
	setY(value = 0) {
		this.y = value;
	}
	setWidth(value = 0) {
		this.width = value;
		this.w = value;
	}
	setHeight(amount = 0) {
		this.height = amount;
		this.h = amount;
	}
	changeX(amount = 0) {
		this.x += amount;
	}
	changeY(amount = 0) {
		this.y += amount;
	}
	changeWidth(amount = 0) {
		this.width += amount;
		this.w += amount;
	}
	changeHeight(amount = 0) {
		this.height += amount;
		this.h += amount;
	}
}

// polygon data type Polygon(points)
class Polygon {
	constructor(points) {
		this.lines = [];
		this.maxX = 0;
		for (let i = 0; i < points.length - 1; i++) {
			this.maxX = Math.max(this.maxX, points[i].x);
			this.maxX = Math.max(this.maxX, points[i + 1].x);
			this.lines.push(new Line(points[i], points[i + 1]));
		}
		this.lines.push(new Line(points[points.length - 1], points[0]));
		this.maxX = abs(this.maxX);
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
			let x = this.lines[i].x1,
				y = this.lines[i].y1;
			this.lines[i].x1 = x * Math.cos(degree) - y * Math.sin(degree);
			this.lines[i].y1 = x * Math.sin(degree) + y * Math.cos(degree);
			this.maxX = Math.max(this.maxX, this.lines[i].x1);
			x = this.lines[i].x2;
			y = this.lines[i].y2;
			this.lines[i].x2 = x * Math.cos(degree) - y * Math.sin(degree);
			this.lines[i].y2 = x * Math.sin(degree) + y * Math.cos(degree);
			this.maxX = Math.max(this.maxX, this.lines[i].x2);
		}
		this.changeX(mid.x);
		this.changeY(mid.y);
	}
	render(colour = "black") {
		$ctx.beginPath();
		$ctx.fillStyle = colour;
		$ctx.moveTo(this.lines[0].x1, this.lines[0].y1);
		for (let i = 0; i < this.lines.length; i++) {
			$ctx.lineTo(this.lines[i].x2, this.lines[i].y2);
		}
		$ctx.lineTo(this.lines[0].x2, this.lines[0].y2);
		$ctx.fill();
		$ctx.closePath();
	}
}

/*
 * DOM functions
 */
// get element by id
function getID(id) {
	return document.getElementById(id);
}

// get ctx from canvas by id
function getCTX(id) {
	return document.getElementById(id).getContext("2d");
}

// get textContent
function getText(id) {
	return document.getElementById(id).textContent;
}

// get innerHTML
function getInner(id) {
	return document.getElementById(id).innerHTML;
}

// get outer HTML
function getOuter(id) {
	return document.getElementById(id).outerHTML;
}
//}

/*
 * Canvas functions
 */
// create canvas
var $canvas, $ctx, width, height, pmouseX, pmouseY, mouseX, mouseY, mousePressed, keyCode, key, keyPressed, mouseMove, mouseDown, mouseUp, mouseClick, keyDown, keyUp, keyPress, Input = {};
keyPressed = mouseMove = mouseDown = mouseUp = mouseClick = keyDown = keyUp = keyPress = function() {};

function createCanvas(canvasWidth = 400, canvasHeight = 400) {
	$canvas = document.createElement("canvas");
	$canvas.setAttribute("id", "canvas");
	document.body.appendChild($canvas);
	$canvas.width = canvasWidth;
	$canvas.height = canvasHeight;
	width = $canvas.width;
	height = $canvas.height;
	$ctx = $canvas.getContext("2d");
	$canvas.addEventListener("mousemove", e => {
		let rect = $canvas.getBoundingClientRect();
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.clientx - rect.left;
		mouseY = e.clienty - rect.top;
		mouseMove();
	});
	$canvas.addEventListener("mousedown", e => {
		mousePressed = true;
		mouseDown();
	});
	$canvas.addEventListener("mouseup", e => {
		mousePressed = false;
		mouseUp();
	});
	$canvas.addEventListener("click", e => {
		mouseClick();
	});
	$canvas.addEventListener("keydown", e => {
		Input[e.keyCode] = true;
		Input[e.key] = true;
		Input.keyCode = e.keyCode;
		Input.key = e.key;
		Input.keyPressed = true;
		keyDown();
	});
	$canvas.addEventListener("keyup", e => {
		Input[e.keyCode] = false;
		Input[e.key] = false;
		if (e.keyCode === keyCode) {
			Input.keyPressed = false;
		}
		keyUp();
	});
}

// check stroke weight
let sw = 1;

function strokeweight() {
	return $ctx.lineWidth;
}

// noStroke()
function noStroke() {
	$ctx.lineWidth = 0;
}

// strokeWidth(thickness)
function strokeWeight(thickness) {
	$ctx.lineWidth = thickness;
}

// fill(color)
function fill(color) {
	$ctx.fillStyle = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
}

// fill(r, g, b, *a)
function fill(red, gren, blue, alpha = 1) {
	$ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
}

// stroke(color)
function stroke(color) {
	$ctx.strokeStyle = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
}

// stroke(r, g, b, *a)
function stroke(red, gren, blue, alpha = 1) {
	$ctx.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
}

// rectangle at position x, y with width, height
function rect(x, y, width, height) {
	$ctx.beginPath();
	$ctx.rect(x, y, width, height);
	$ctx.fill();
	if (!strokeweight()) {
		$ctx.stroke();
	}
	$ctx.closePath();
}

// square at position x, y with width)
function rect(x, y, width) {
	$ctx.beginPath();
	$ctx.rect(x, y, width, width);
	$ctx.fill();
	if (!strokeweight()) {
		$ctx.stroke();
	}
	$ctx.closePath();
}

// point(x, y)
function point(x, y) {
	$ctx.beginPath();
	$ctx.moveTo(x, y);
	$ctx.lineTo(x + 1, y + 1);
	$ctx.closePath();
}

// circle(x, y, radius)
function circle(x, y, radius) {
	$ctx.beginPath();
	arc(x, y, radius, 0, 2 * Math.PI);
	$ctx.fill();
	if (!strokeweight()) {
		$ctx.stroke();
	}
	$ctx.closePath();
}

// arc(x, y, radius, startDegrees, endDegrees)
function arc(x, y, radius, startDegrees, endDegrees) {
	$ctx.beginPath();
	$ctx.arc(x, y, radius, degreesToRadians(startDegrees), degreesToRadians(endDegrees));
	$ctx.fill();
	if (!strokeweight()) {
		$ctx.stroke();
	}
	$ctx.closePath();
}

// ellipse(x, y, radiusX, radiusY)
function ellipse(x, y, radiusX, radiusY) {
	$ctx.beginPath();
	$ctx.ellipse(100, 100, radiusX, radiusY, 0, 0, 2 * Math.PI);
	$ctx.fill();
	$ctx.stroke();
	if (!strokeweight()) {
		$ctx.stroke();
	}
	$ctx.closePath();
}

// triangle(x1, y1, x2, y2, x3, y3)
function triangle(x1, y1, x2, y2, x3, y3) {
	$ctx.beginPath();
	$ctx.moveTo(x1, y1);
	$ctx.lineTo(x2, y2);
	$ctx.lineTo(x3, y3);
	$ctx.lineTo(x1, y1);
	$ctx.lineTo(x2, y2);
	$ctx.fill();
	if (!strokeweight()) {
		$ctx.stroke();
	}
	$ctx.closePath();
}

// quad(x1, y1, x2, y2, x3, y3, x4, y4)
function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
	$ctx.beginPath();
	$ctx.moveTo(x1, y1);
	$ctx.lineTo(x2, y2);
	$ctx.lineTo(x3, y3);
	$ctx.lineTo(x4, y4);
	$ctx.lineTo(x1, y1);
	$ctx.lineTo(x2, y2);
	$ctx.fill();
	if (!strokeweight()) {
		$ctx.stroke();
	}
	$ctx.closePath();
}

// line(x1, y1, x2, y2)
function line(x1, y1, x2, y2) {
	$ctx.beginPath();
	$ctx.moveTo(x1, y1);
	$ctx.lineTo(x2, y2);
	let strw = 0;
	if (strokeWeight() !== 0) {
		strw = strokeweight();
		$ctx.strokeWeight = 1;
	}
	$ctx.stroke();
	$ctx.strokeWeight = strw;
	$ctx.closePath();
}

// text(message, x, y)
function text(message, x, y) {
	$ctx.beginPath();
	$ctx.fillText(message, x, y);
	$ctx.closePath();
}

// textSize(size)
function textSize(size) {
	$ctx.font = $ctx.font.replace(/\d+px/, size + "px");
}

// background(color)
function background(color) {
	$ctx.openPath();
	fill(color);
	$ctx.rect(0, 0, $canvas.width, $canvas.height);
	$ctx.fill();
	$ctx.closePath();
}

// background(r, g, b, *a)
function background(r, g, b, a = 1) {
	$ctx.openPath();
	fill(r, g, b, a);
	$ctx.rect(0, 0, $canvas.width, $canvas.height);
	$ctx.fill();
	$ctx.closePath();
}

// clear()
function clear() {
	$ctx.beginPath();
	$ctx.clearRect(0, 0, $canvas.width, $canvas.height);
	$ctx.closePath();
}

// rotate(degrees)
function rotate(degrees) {
	$ctx.rotate(degreesToRadians(degrees));
}

console.log("Loaded Extra JS by Matt-DESTROYER");
