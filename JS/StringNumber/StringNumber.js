class StringNumber {
	constructor(n) {
		this.n = StringNumber.CleanNumberString((n || "0").toString());
	}
	static zero() {
		return new StringNumber("0");
	}
	static CleanNumberString(n) {
		if (typeof n === "number") {
			return n.toString();
		} else if (typeof n === "string") {
			n = n.split(/[^0-9\.\-]/g).join("");
			return n === "" ? "0" : n;
		}
		throw new TypeError("[StringNumber.CleanNumberString] Expected parameter n to be a string.");
	}
	static ValidNumberString(n) {
		if (typeof n === "string") {
			return n === n.match(/-?[0-9]+(\.[0-9]+)?/)[0];
		}
		throw new TypeError("[StringNumber.ValidNumberString] Expected parameter n to be a string.");
	}
	static DigitToInt(digit) {
		switch (digit.toString().trim()) {
			case "0":
				return 0;
			case "1":
				return 1;
			case "2":
				return 2;
			case "3":
				return 3;
			case "4":
				return 4;
			case "5":
				return 5;
			case "6":
				return 6;
			case "7":
				return 7;
			case "8":
				return 8;
			case "9":
				return 9;
		}
		throw new Error("[StringNumber.DigitToInt] An error occurred converting a digit to an integer.");
	}
	toNumber() {
		return Number(this.n);
	}
	toString() {
		this.trim();
		return this.n;
	}
	trim() {
		if (Array.isArray(this.n)) {
			this.n = this.n.flatMap(x => x === "" || x === " " ? [] : [x]);
			let negative = false;
			if (this.n.includes("-")) {
				negative = true;
				this.n = this.n.join("").replace("-", "").split("");
			}
			while (this.n[0] === "0") {
				if (this.n[1] === ".") break;
				this.n.splice(0, 1);
			}
			while (this.n[this.n.length - 1] === "0") {
				this.n.splice(this.n.length - 1, 1);
			}
			if (this.n[this.n.length - 1] === ".") {
				this.n.splice(this.n.length - 1, 1);
			}
			this.n = (negative ? "-" : "") + this.n.join("");
		} else if (typeof this.n === "string") {
			this.n = this.n.replace(/\s+/g, "");
			let negative = false;
			if (this.n.includes("-")) {
				negative = true;
				this.n = this.n.replace("-", "");
			}
			this.n = this.n.split("");
			while (this.n[0] === "0") {
				if (this.n[1] === ".") break;
				this.n.splice(0, 1);
			}
			while (this.n.includes(".") && (this.n[this.n.length - 1] === "0" || this.n[this.n.length - 1] === ".")) {
				this.n.splice(this.n.length - 1, 1);
			}
			this.n = (negative ? "-" : "") + this.n.join("");
		} else if (typeof this.n === "number") {
			this.n = this.n.toString();
		} else {
			throw new Error("[StringNumber.prototype.trim] A StringNumber was likely manipulated externally causing an internal error.");
		}
		if (this.n === "") {
			this.n = "0";
		}
		return this;
	}
	equalTo(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			return this.trim().n === other.trim().n;
		}
		throw new TypeError("[StringNumber.prototype.equalTo] Expected parameter other to be a StringNumber, String or Number.");
	}
	notEqualTo(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			return this.trim().n !== other.trim().n;
		}
		throw new TypeError("[StringNumber.prototype.notEqualTo] Expected parameter other to be a StringNumber, String or Number.");
	}
	greaterThan(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			this.n = this.n.split("");
			let _ = other.n.split("");
			if (this.n.includes(".") || _.includes(".")) {
				if (!this.n.includes(".")) {
					this.n.push(".");
				}
				if (!_.includes(".")) {
					_.push(".");
				}
				while (this.n.length - this.n.indexOf(".") < _.length - _.indexOf(".")) {
					this.n.push("0");
				}
				while (this.n.length - this.n.indexOf(".") > _.length - _.indexOf(".")) {
					_.push("0");
				}
			}
			while (this.n.length > _.length) {
				_.splice(0, 0, "0");
			}
			while (this.n.length < _.length) {
				this.n.splice(0, 0, "0");
			}
			this.n = this.n.join("");
			_ = _.join("");
			if (this.n.includes("-") && !_.includes("-")) {
				return false;
			} else if (_.includes("-") && !this.includes("-")) {
				return true;
			}
			const length = Math.min(this.n.length, _.length);
			for (let i = 0; i < length; i++) {
				if (_[i] === ".") {
					continue;
				} else if (StringNumber.DigitToInt(this.n[i]) > StringNumber.DigitToInt(_[i])) {
					this.trim();
					return true;
				} else if (StringNumber.DigitToInt(this.n[i]) < StringNumber.DigitToInt(_[i])) {
					this.trim();
					return false;
				}
			}
			this.trim();
			return this.n.length > _.length;
		}
		throw new TypeError("[StringNumber.prototype.greaterThan] Expected parameter other to be a StringNumber, String or Number.");
	}
	greaterThanOrEqualTo(other) {
		return this.equalTo(other) || this.greaterThan(other);
	}
	lessThan(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			this.n = this.n.split("");
			let _ = other.n.split("");
			if (this.n.includes(".") || _.includes(".")) {
				if (!this.n.includes(".")) {
					this.n.push(".");
				}
				if (!_.includes(".")) {
					_.push(".");
				}
				while (this.n.length - this.n.indexOf(".") < _.length - _.indexOf(".")) {
					this.n.push("0");
				}
				while (this.n.length - this.n.indexOf(".") > _.length - _.indexOf(".")) {
					_.push("0");
				}
			}
			while (this.n.length > _.length) {
				_.splice(0, 0, "0");
			}
			while (this.n.length < _.length) {
				this.n.splice(0, 0, "0");
			}
			this.n = this.n.join("");
			_ = _.join("");
			if (this.n.includes("-") && !_.includes("-")) {
				return true;
			} else if (_.includes("-") && this.includes("-")) {
				return false;
			} else if (this.n.includes("-") && _.includes("-")) {
				this.n = this.n.replace("-", "");
				let _ = this.greaterThan(_.replace("-"), "");
				this.n = "-" + this.n;
				return _;
			}
			const length = Math.min(this.n.length, _.length);
			for (let i = 0; i < length; i++) {
				if (_[i] === ".") {
					continue;
				} else if (StringNumber.DigitToInt(this.n[i]) < StringNumber.DigitToInt(_[i])) {
					this.trim();
					return true;
				} else if (StringNumber.DigitToInt(this.n[i]) > StringNumber.DigitToInt(_[i])) {
					this.trim();
					return false;
				}
			}
			this.trim();
			return this.n.length < _.length;
		}
		throw new TypeError("[StringNumber.prototype.lessThan] Expected parameter other to be a StringNumber, String or Number.");
	}
	lessThanOrEqualTo(other) {
		return this.equalTo(other) || this.lessThan(other);
	}
	round() {
		if (this.n.includes(".")) {
			if (StringNumber.DigitToInt(this.n[this.n.indexOf(".") + 1]) > 4) {
				return this.ceil();
			}
			return this.floor();
		}
		return this;
	}
	floor() {
		if (this.n.includes(".")) {
			this.n = this.n.substr(0, this.n.indexOf("."));
		}
		return this;
	}
	ceil() {
		if (this.n.includes(".")) {
			this.n = this.n.substr(0, this.n.indexOf("."));
			this.add(1);
		}
		return this;
	}
	add(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			if (other.trim().n === 0) {
				return this;
			}
			if (this.trim().n === 0) {
				this.n = other.n;
				return this;
			}
			let negative = false;
			if (other.n.includes("-")) {
				this.subtract(other.n.replace("-", ""));
				return this;
			} else if (this.n.includes("-")) {
				let _ = other.n;
				other.n = this.n.replace("-", "");
				this.n = _;
				this.subtract(other);
				other.n = _;
				return this;
			}
			this.n = "0" + this.n;
			this.n = this.n.split("");
			let _ = other.n.split("");
			if (this.n.includes(".") || _.includes(".")) {
				if (!this.n.includes(".")) {
					this.n.push(".");
				}
				if (!_.includes(".")) {
					_.push(".");
				}
				while (this.n.length - this.n.indexOf(".") < _.length - _.indexOf(".")) {
					this.n.push("0");
				}
				while (this.n.length - this.n.indexOf(".") > _.length - _.indexOf(".")) {
					_.push("0");
				}
			}
			while (this.n.length > _.length) {
				_.splice(0, 0, "0");
			}
			while (this.n.length < _.length) {
				this.n.splice(0, 0, "0");
			}
			let result, toAdd = 0;
			for (let i = 0; i < _.length; i++) {
				if (_[_.length - i - 1] === ".") continue;
				result = StringNumber.DigitToInt(this.n[this.n.length - i - 1]) + StringNumber.DigitToInt(_[_.length - i - 1]);
				result += toAdd;
				toAdd = 0;
				while (result > 9) {
					toAdd++;
					result -= 10;
				}
				this.n[this.n.length - i - 1] = result.toString();
			}
			if (toAdd > 0) {
				this.n.splice(0, 0, toAdd.toString());
			}
			this.n = this.n.join("");
			if (negative) {
				this.n = "-" + this.n;
			}
			return this.trim();
		}
		throw new TypeError("[StringNumber.prototype.add] Expected parameter other to be a StringNumber, String or Number.");
	}
	subtract(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			if (other.n.includes("-")) {
				this.add(other.n.replace("-", ""));
				return this;
			} else if (this.n.includes("-")) {
				this.n = this.n.replace("-", "");
				this.add(other);
				this.n = "-" + this.n;
				return this;
			}
			if (this.equalTo(other)) {
				this.n = "0";
				return this;
			}
			this.n = "0" + this.n;
			let negative = false,
				_;
			if (this.lessThan(other)) {
				negative = true;
				_ = this.n.split("");
				this.n = other.n.split("");
			} else {
				this.n = this.n.split("");
				_ = other.n.split("");
			}
			if (this.n.includes(".") || _.includes(".")) {
				if (!this.n.includes(".")) {
					this.n.push(".");
				}
				if (!_.includes(".")) {
					_.push(".");
				}
				while (this.n.length - this.n.indexOf(".") < _.length - _.indexOf(".")) {
					this.n.push("0");
				}
				while (this.n.length - this.n.indexOf(".") > _.length - _.indexOf(".")) {
					_.push("0");
				}
			}
			while (this.n.length > _.length) {
				_.splice(0, 0, "0");
			}
			while (this.n.length < _.length) {
				this.n.splice(0, 0, "0");
			}
			this.n = this.n.map(x => x === "." ? "." : StringNumber.DigitToInt(x));
			_ = _.map(x => x === "." ? "." : StringNumber.DigitToInt(x));
			let a, b;
			for (let i = 0; i < _.length; i++) {
				b = _[_.length - i - 1];
				if (b === ".") {
					continue;
				}
				if (this.n[this.n.length - i - 1] < b) {
					let borrowIdx = i + 1;
					while (this.n[this.n.length - borrowIdx - 1] === 0 || this.n[this.n.length - borrowIdx - 1] === ".") {
						borrowIdx++;
					}
					while (borrowIdx > i) {
						if (this.n[this.n.length - borrowIdx - 1] === ".") {
							borrowIdx--;
							continue;
						}
						this.n[this.n.length - borrowIdx - 1] -= 1;
						if (this.n[this.n.length - borrowIdx] === ".") {
							this.n[this.n.length - borrowIdx + 1] += 10;
						} else {
							this.n[this.n.length - borrowIdx] += 10;
						}
						borrowIdx--;
					}
				}
				a = this.n[this.n.length - i - 1] - b;
				this.n[this.n.length - i - 1] = a;
			}
			this.n = this.n.map(x => x.toString()).join("");
			this.n = (negative ? "-" : "") + this.n;
			return this.trim();
		}
		throw new TypeError("[StringNumber.prototype.subtract] Expected parameter other to be a StringNumber, String or Number.");
	}
	multiply(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			if (this.trim().n === "0" || other.trim().n === "0") {
				this.n = "0";
				return this;
			}
			let negative = false,
				_;
			if (this.n.includes("-")) {
				negative = !negative;
				this.n = this.n.replace("-", "");
			}
			if (other.n.includes("-")) {
				negative = !negative;
				other.n = other.n.replace("-", "");
			}
			if (this.lessThan(other)) {
				_ = this.n;
				this.n = other.n;
			} else _ = other.n;
			let decimals = 0;
			if (this.n.includes(".")) {
				decimals += this.n.split(".")[1].length;
				this.n = this.n.replace(".", "");
			}
			if (_.includes(".")) {
				decimals += _.split(".")[1].length;
				_ = _.replace(".", "");
			}
			_ = _.split("").map(Number);
			this.n = this.n.split("").map(Number);
			const num = this.n.slice();
			let toAdd = [],
				extra = 0;
			for (let i = 0; i < _.length; i++) {
				this.n = num.slice();
				for (let j = 0; j < num.length; j++) {
					this.n[num.length - j - 1] *= _[_.length - i - 1];
					this.n[num.length - j - 1] += extra;
					extra = 0;
					while (this.n[num.length - j - 1] > 9) {
						this.n[num.length - j - 1] -= 10;
						extra++;
					}
				}
				if (extra > 0) {
					this.n.splice(0, 0, extra);
					extra = 0;
				}
				for (let j = 0; j < i; j++) {
					this.n.push(0);
				}
				toAdd.push(this.n.map(x => x.toString()).join(""));
			}
			this.n = toAdd[0];
			for (let i = 1; i < toAdd.length; i++) this.add(toAdd[i]);
			if (decimals > 0) {
				this.n = this.n.split("");
				this.n.splice(this.n.length - decimals, 0, ".");
				this.n = this.n.join("");
			}
			if (negative) this.n = "-" + this.n;
			return this.trim();
		}
		throw new TypeError("[StringNumber.prototype.multiply] Expected parameter other to be a StringNumber, String or Number.");
	}
	divide(other, overflow = 10) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			if (overflow < 0) {
				overflow = 0;
			}
			if (this.trim().n === "0") {
				return this;
			}
			else if (other.trim().n === "0") {
				throw new Error("Cannot divide by 0.");
			}
			let negative = false,
				_;
			if (this.n.includes("-")) {
				negative = !negative;
				this.n = this.n.replace("-", "");
			}
			if (other.n.includes("-")) {
				negative = !negative;
				other.n = other.n.replace("-", "");
			}
			this.n = this.n.split("");
			_ = other.n;
			let result = "", count, _tempN, remainder = "0";
			for (let i = 0; i < this.n.length; i++) {
				if (this.n[i] === ".") {
					result += ".";
					continue;
				}
				count = 0;
				_tempN = new StringNumber(remainder + this.n[i]);
				while (_tempN.greaterThanOrEqualTo(_)) {
					_tempN.subtract(_);
					count++;
				}
				remainder = _tempN.n;
				result += count.toString();
			}
			if (remainder !== "0") {
				if (!this.n.ibcludes(".")) {
					this.n.push(".");
					result += ".";
				}
				while (overflow > 0) {
					count = 0;
					_tempN = new StringNumber(remainder + "0");
					while (_tempN.greaterThanOrEqualTo(_)) {
						_tempN.subtract(_);
						count++;
					}
					remainder = _tempN.n;
					result += count.toString();
					overflow--;
					if (remainder === "0") {
						break;
					}
				}
			}
			this.n = (negative ? "-" : "") + result;
			return this.trim();
		}
		throw new TypeError("[StringNumber.prototype.divide] Expected parameter other to be a StringNumber, String or Number.");
	}
	modulus(other) {
		if (typeof other === "string" || typeof other === "number") {
			other = new StringNumber(other);
		}
		if (other instanceof StringNumber) {
			while (this.greaterThanOrEqualTo(other)) {
				this.subtract(other);
			}
			return this.trim();
		}
		throw new TypeError("[StringNumber.prototype.modulus] Expected parameter other to be a StringNumber, String or Number.");
	}
	addDigit(digit) {
		if (typeof digit === "string" || typeof digit === "number") {
			digit = new StringNumber(digit);
		}
		if (digit instanceof StringNumber) {
			this.n = this.n + digit.n;
			return this.trim();
		}
		throw new TypeError("[StringNumber.prototype.addDigit] Expected parameter digit to be a StringNumber, String or Number");
	}
	removeLastDigit() {
		this.n = this.n.substr(0, this.n.length - 1);
		return this.trim();
	}
	removeFirstDigit() {
		this.n = this.n.substr(1);
		return this.trim();
	}
}
