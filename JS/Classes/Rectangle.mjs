import Point from "https://Matt-DESTROYER.github.io/CDN/JS/Classes/Point.mjs";
import Polygon from "https://Matt-DESTROYER.github.io/CDN/JS/Classes/Polygon.mjs";

export default class Rectangle extends Polygon {
	constructor(x, y, width, height) {
		super([
			new Point(x, y),
			new Point(x + width, y),
			new Point(x + width, y + height),
			new Point(x, y + height)
		]);
	}
	get p1() {
		return this.points[0];
	}
	set p1(value) {
		this.points[0] = value;
	}
	get p2() {
		return this.points[1];
	}
	set p2(value) {
		this.points[1] = value;
	}
	get p3() {
		return this.points[2];
	}
	set p3(value) {
		this.points[2] = value;
	}
	get p4() {
		return this.points[3];
	}
	set p4(value) {
		this.points[3] = value;
	}
	get x1() {
		return this.points[0].x;
	}
	set x1(value) {
		this.points[0].x = value;
	}
	get y1() {
		return this.points[0].y;
	}
	set y1(value) {
		this.points[0].y = value;
	}
	get x2() {
		return this.points[1].x;
	}
	set x2(value) {
		this.points[0].x = value;
	}
	get y2() {
		return this.points[1].y;
	}
	set y2(value) {
		this.points[1].y = value;
	}
	get x3() {
		return this.points[2].x;
	}
	set x3(value) {
		this.points[0].x = value;
	}
	get y3() {
		return this.points[2].y;
	}
	set y3(value) {
		this.points[2].y = value;
	}
	get x4() {
		return this.points[3].x;
	}
	set x4(value) {
		this.points[0].x = value;
	}
	get y4() {
		return this.points[3].y;
	}
	set y4(value) {
		this.points[3].y = value;
	}
	get x() {
		return this.points[0].x;
	}
	set x(value) {
		const translation = value - this.points[0].x;
		this.points[0].x += translation;
		this.points[1].x += translation;
		this.points[2].x += translation;
		this.points[3].x += translation;
	}
	get y() {
		return this.points[0].y
	}
	set y(value) {
		const translation = value - this.points[0].y;
		this.points[0].y += translation;
		this.points[1].y += translation;
		this.points[2].y += translation;
		this.points[3].y += translation;
	}
	get width() {
		return this.points[1].x - this.points[0].x;
	}
	set width(value) {
		const translation = value - (this.points[1].x - this.points[0].x);
		this.points[1].x += translation;
		this.points[2].x += translation;
	}
	get height() {
		return this.points[2].y - this.points[0].y;
	}
	set height(value) {
		const translation = value - (this.points[3].y - this.points[0].y);
		this.points[2].y += translation;
		this.points[3].y += translation;
	}
}
