import Point from "https://Matt-DESTROYER.github.io/CDN/JS/Classes/Point.mjs";
import Line from "https://Matt-DESTROYER.github.io/CDN/JS/Classes/Line.mjs";

export default class Polygon {
	constructor(points) {
		this.points = points;
	}
	minX() {
		return Math.min(...this.points.map((point) => point.x));
	}
	minY() {
		return Math.min(...this.points.map((point) => point.y));
	}
	maxX() {
		return Math.max(...this.points.map((point) => point.x));
	}
	maxY() {
		return Math.max(...this.points.map((point) => point.y));
	}
	translate(x, y) {
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].add(x, y);
		}
		return this;
	}
	getMidpoint() {
		const midpoint = new Point(0, 0);
		for (let i = 0; i < this.points.length; i++) {
			midpoint.add(this.points[i])
		}
		midpoint.divide(this.points.length);
		return midpoint;
	}
	rotate(degree) {
		degree *= Math.PI / 180;
		const midpoint = this.getMidpoint();
		for (let i = 0; i < this.points.length; i++) {
			const x = this.points[i].x - midpoint.x, y = this.points[i].y - midpoint.y;
			this.points[i].x = x * Math.cos(degree) - y * Math.sin(degree) + midpoint.x;
			this.points[i].y = x * Math.sin(degree) + y * Math.cos(degree) + midpoint.y;
		}
		return this;
	}
	pointInPolygon(point, maxX = null) {
		if (maxX === null) {
			maxX = this.points[0].x;
			for (let i = 1; i < this.points.length; i++) {
				if (this.points[i].x > maxX) {
					maxX = this.points[i].x;
				}
			}
		}
		const ray = new Line(point, new Point(maxX, point.y));
		let result = false;
		for (let i = 1; i < this.points.length; i++) {
			if (ray.intersects(new Line(this.points[i - 1], this.points[i]))) {
				result = !result;
			}
		}
		return result;
	}
	collides(polygon) {
		let maxX = this.points[0].x;
		for (let i = 1; i < this.points.length; i++) {
			if (this.points[i].x > maxX) {
				maxX = this.points[i].x;
			}
		}
		for (let i = 0; i < polygon.points.length; i++) {
			if (polygon.points[i].x > maxX) {
				maxX = polygon.points[i].x;
			}
		}
		if (maxX < 0) {
			maxX = -maxX;
		} else if (maxX === 0) {
			maxX = 1;
		}
		maxX *= 10;
		for (let i = 0; i < this.points.length; i++) {
			if (polygon.pointInPolygon(this.points[i], maxX)) {
				return true;
			}
		}
		for (let i = 0; i < polygon.points.length; i++) {
			if (this.pointInPolygon(polygon.points[i], maxX)) {
				return true;
			}
		}
		return false;
	}
}