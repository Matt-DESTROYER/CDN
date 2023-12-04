export default class Point {
	constructor(x, y) {
		if (y === undefined) {
			this.x = x;
			this.y = x;
		} else {
			this.x = x;
			this.y = y;
		}
	}
	add(other, y) {
		if (other instanceof Point) {
			this.x += other.x;
			this.y += other.y;
			return this;
		} else if (typeof other === "number" && typeof y === "number") {
			this.x += other;
			this.y += y;
			return this;
		} else {
			this.x += other;
			this.y += other;
			return this;
		}
	}
	subtract(other, y) {
		if (other instanceof Point) {
			this.x -= other.x;
			this.y -= other.y;
			return this;
		} else if (typeof other === "number" && typeof y === "number") {
			this.x -= other;
			this.y -= y;
			return this;
		} else {
			this.x -= other;
			this.y -= other;
			return this;
		}
	}
	multiply(other, y) {
		if (other instanceof Point) {
			this.x *= other.x;
			this.y *= other.y;
			return this;
		} else if (typeof other === "number" && typeof y === "number") {
			this.x *= other;
			this.y *= y;
			return this;
		} else {
			this.x *= other;
			this.y *= other;
			return this;
		}
	}
	divide(other, y) {
		if (other instanceof Point) {
			this.x /= other.x;
			this.y /= other.y;
			return this;
		} else if (typeof other === "number" && typeof y === "number") {
			this.x /= other;
			this.y /= y;
			return this;
		} else {
			this.x /= other;
			this.y /= other;
			return this;
		}
	}
	equals(other, y) {
		if (other instanceof Point) {
			return  this.x === other.x && this.y === other.y;
		} else if (typeof other === "number" && typeof y === "number") {
			return this.x === other && this.y === y;
		} else {
			return this.x === other && this.y === other;
		}
	}
	dist(other, y) {
		if (other instanceof Point) {
			return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
		} else if (other === "number" && y === "number") {
			return Math.sqrt(Math.pow(this.x - other, 2) + Math.pow(this.y - y, 2));
		} else {
			return Math.sqrt(Math.pow(this.x - other, 2) + Math.pow(this.y - other, 2));
		}
	}
	dot(other, y) {
		if (other instanceof Point) {
			return this.x * other.x + this.y * other.y;
		} else if (other === "number" && y === "number") {
			return this.x * other + this.y * y;
		} else {
			return this.x * other + this.y * other;
		}
	}
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize() {
		const mag = Math.sqrt(this.x * this.x + this.y * this.y);
		if (mag > 0) {
			this.divide(mag, mag);
		}
		return this;
	}
	limit(max) {
		if (this.magnitude() > max) {
			this.normalize();
			this.multiply(max, max);
		}
		return this;
	}
	heading(degrees = true) {
		if (degrees) {
			return -Math.atan2(-this.y, this.x) * 180 / Math.PI;
		} else {
			return -Math.atan2(-this.y, this.x) * 180 / Math.PI;
		}
	}
	angleBetween(other, y, degrees = true) {
		if (other instanceof Point) {
			return Math.atan2(other.x - this.x, other.y - this.y) * 180 / Math.PI;
		} else if (typeof other === "number" && typeof y === "number") {
			if (degrees) {
				return Math.atan2(other - this.x, y - this.y) * 180 / Math.PI;
			}
		}
	}
	toArray() {
		return [this.x, this.y];
	}
	toString() {
		return this.x + ", " + this.y;
	}
    static dist(x1, y1, x2, y2) {
		if (x1 instanceof Point && y1 instanceof Point) {
			return Math.sqrt(Math.pow(x1.x - y1.x, 2) + Math.pow(x1.y - y1.y, 2));
		} else if (typeof x1 === "number" && typeof y1 === "number" && typeof x2 === "number" && typeof y2 === "number") {
			return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		}
		throw new TypeError("Expected a Point or two numbers to be input.");
	}
}