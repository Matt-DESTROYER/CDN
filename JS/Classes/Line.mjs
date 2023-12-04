import Point from "https://Matt-DESTROYER.github.io/CDN/JS/Classes/Point.mjs";

export default class Line {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
	get x1() {
		return this.p1.x;
	}
	set x1(value) {
		return this.p1.x = value;
	}
	get x2() {
		return this.p2.x;
	}
	set x2(value) {
		return this.p2.x = value;
	}
	get y1() {
		return this.p1.y;
	}
	set y1(value) {
		return this.p1.y = value;
	}
	get y2() {
		return this.p2.y;
	}
	set y2(value) {
		return this.p2.y = value;
	}
	intersects(line) {
		const den = (this.p1.x - this.p2.x) * (line.p1.y - line.p2.y) - (this.p1.y - this.p2.y) * (line.p1.x - line.p2.x);
		if (den === 0) {
			return false;
		}
		const t = ((this.p1.x - line.p1.x) * (line.p1.y - line.p2.y) - (this.p1.y - line.p1.y) * (line.p1.x - line.p2.x)) / den;
		const u = ((this.p1.x - line.p1.x) * (this.p1.y - this.p2.y) - (this.p1.y - line.p1.y) * (this.p1.x - this.p2.x)) / den;
		return t >= 0 && t <= 1 && u >= 0 && u <= 1;
	}
	pointOfIntersection(line) {
		const den = (this.p1.x - this.p2.x) * (line.p1.y - line.p2.y) - (this.p1.y - this.p2.y) * (line.p1.x - line.p2.x);
		if (den === 0) {
			return null;
		}
		const t = ((this.p1.x - line.p1.x) * (line.p1.y - line.p2.y) - (this.p1.y - line.p1.y) * (line.p1.x - line.p2.x)) / den;
		const u = ((this.p1.x - line.p1.x) * (this.p1.y - this.p2.y) - (this.p1.y - line.p1.y) * (this.p1.x - this.p2.x)) / den;
		return (t >= 0 && t <= 1 && u >= 0 && u <= 1) ? new Point(this.p1.x + t * (this.p2.x - this.p1.x), this.p1.y + t * (this.p2.y - this.p1.y)) : null;
	}
}