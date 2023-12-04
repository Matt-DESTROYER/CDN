const Fraction = function (numerator, denominator) {
	if (typeof numerator === "number" && typeof denominator === "number") {
		if (numerator !== ~~numerator || denominator !== ~~denominator) {
			throw new TypeError("[Fraction] Fractions can only be made up of whole numbers.");
		}
		this.numerator = numerator;
		this.denominator = denominator;
	} else {
		throw new TypeError("[Fraction] Expected input to be of type 'number'.");
	}
};
Fraction.prototype.simplify = function () {
	for (let i = Math.min(this.numerator, this.denominator); i > 1; i--) {
		if (this.numerator % i === 0 && this.denominator % i === 0) {
			this.numerator /= i;
			this.denominator /= i;
			return this;
		}
	}
	return this;
};
Fraction.prototype.add = function (fraction, denominator) {
	if (fraction instanceof Fraction) {
		if (this.denominator !== fraction.denominator) {
			this.numerator = this.numerator * fraction.denominator + fraction.numerator * this.denominator;
			this.denominator *= fraction.denominator;
		} else {
			this.numerator = this.numerator + fraction.numerator;
		}
		return this;
	} else if (denominator && typeof fraction === "number" && typeof denominator === "number") {
		if (fraction !== ~~fraction || denominator !== ~~denominator) {
			throw new TypeError("[Fraction.prototype.add] Fractions can only be made up of whole numbers.");
		}
		if (this.denominator !== denominator) {
			this.numerator = this.numerator * denominator + fraction * this.denominator;
			this.denominator *= denominator;
		} else {
			this.numerator = this.numerator + fraction;
		}
		return this;
	}
	throw new Error("[Fraction.prototype.add] Invalid input.");
};
Fraction.prototype.subtract = function (fraction, denominator) {
	if (fraction instanceof Fraction) {
		if (this.denominator !== fraction.denominator) {
			this.numerator = this.numerator * fraction.denominator - fraction.numerator * this.denominator;
			this.denominator *= fraction.denominator;
		} else {
			this.numerator = this.numerator - fraction.numerator;
		}
		return this;
	} else if (denominator && typeof fraction === "number" && typeof denominator === "number") {
		if (fraction !== ~~fraction || denominator !== ~~denominator) {
			throw new TypeError("[Fraction.prototype.subtract] Fractions can only be made up of whole numbers.");
		}
		if (this.denominator !== denominator) {
			this.numerator = this.numerator * denominator - fraction * this.denominator;
			this.denominator *= denominator;
		} else {
			this.numerator = this.numerator - fraction;
		}
		return this;
	}
	throw new Error("[Fraction.prototype.subtract] Invalid input.");
};
Fraction.prototype.multiply = function (fraction, denominator) {
	if (fraction instanceof Fraction) {
		this.numerator *= fraction.numerator;
		this.denominator *= fraction.denominator;
		return this;
	} else if (denominator && typeof fraction === "number" && typeof denominator === "number") {
		if (fraction !== ~~fraction || denominator !== ~~denominator) {
			throw new TypeError("[Fraction.prototype.multiply] Fractions can only be made up of whole numbers.");
		}
		this.numerator *= fraction;
		this.denominator *= denominator;
		return this;
	}
	throw new Error("[Fraction.prototype.multiply] Invalid input.");
};
Fraction.prototype.divide = function (fraction, denominator) {
	if (fraction instanceof Fraction) {
		this.numerator *= fraction.denominator;
		this.denominator *= fraction.numerator;
		return this;
	} else if (denominator && typeof fraction === "number" && typeof denominator === "number") {
		if (fraction !== ~~fraction || denominator !== ~~denominator) {
			throw new TypeError("[Fraction.prototype.divide] Fractions can only be made up of whole numbers.");
		}
		this.numerator *= denominator;
		this.denominator *= fraction;
		return this;
	}
	throw new Error("[Fraction.prototype.divide] Invalid input.");
};
Fraction.prototype.pow = function (exponent) {
	this.numerator = this.numerator ** exponent;
	this.denominator = this.denominator ** exponent;
	return this;
};
Fraction.prototype.sqrt = function () {
	this.numerator = Math.sqrt(this.numerator);
	this.denominator = Math.sqrt(this.denominator);
	return this;
};
Fraction.prototype.toArray = function () {
	return [this.numerator, this.denominator];
};
Fraction.prototype.toString = function () {
	return this.numerator + "/" + this.denominator;
};
console.log("Loaded Fraction.js by Matthew James!");