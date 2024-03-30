"use strict";

const Randomiser = (function () {
	String.prototype.shuffle = function () {
		const _temp = this.split("");
		let result = "";
		while (_temp.length > 0) {
			result += _temp.splice(~~(Math.random() * _temp.length), 1)[0];
		}
		return result;
	};
	Array.prototype.shuffle = function (randomiseAllDimensions) {
		const _temp = [], result = [];
		if (randomiseAllDimensions) {
			for (let i = 0; i < this.length; i++) {
				if (Array.isArray(this[i])) {
					_temp.push(this[i].shuffle());
				} else {
					_temp.push(this[i]);
				}
			}
		} else {
			for (let i = 0; i < this.length; i++) {
				_temp.push(this[i]);
			}
		}
		while (_temp.length > 0) {
			result.push(_temp.splice(~~(Math.random() * _temp.length), 1)[0]);
		}
		return result;
	};
	String.prototype.pick = function () {
		return this[~~(Math.random() * this.length)];
	}
	Array.prototype.pick = function (searchAllDimensions) {
		let _temp = this;
		if (searchAllDimensions) {
			_temp = _temp.flat(Infinity);
		}
		return _temp[~~(Math.random() * _temp.length)];
	};
	function clone(arr) {
		const result = [];
		for (let i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i])) {
				result.push(clone(arr[i]));
			} else {
				result.push(arr[i]);
			}
		}
		return result;
	}
	return {
		"int": function (min, max = null) {
			if (max === null) {
				return ~~(Math.random() * min);
			} else if (min === max) {
				return min;
			} else if (min > max) {
				[min, max] = [max, min];
			}
			return Math.round(Math.random() * (max - min)) + min;
		},
		"float": function (min, max = null) {
			if (max === null) {
				return Math.random() * min;
			} else if (min === max) {
				return min;
			} else if (min > max) {
				[min, max] = [max, min];
			}
			return Math.random() * (max - min) + min;
		},
		"string": function (characters, length) {
			let str = "";
			for (let i = 0; i < length; i++) {
				str += characters[~~(Math.random() * characters.length)];
			}
			return str;
		},
		"array": function (items, length) {
			const arr = [];
			for (let i = 0; i < length; i++) {
				arr.push(items[~~(Math.random() * items.length)]);
			}
			return arr;
		},
		"shuffle": function shuffle(item, randomiseAllDimensions = false) {
			if (Array.isArray(item)) {
				const _temp = [];
				if (randomiseAllDimensions) {
					for (let i = 0; i < item.length; i++) {
						if (Array.isArray(item[i])) {
							_temp.push(shuffle(item[i]));
						} else {
							_temp.push(item[i]);
						}
					}
				} else {
					for (let i = 0; i < item.length; i++) {
						if (Array.isArray(item[i])) {
							_temp.push(clone(item[i]));
						} else {
							_temp.push(item[i]);
						}
					}
				}
				const result = [];
				while (_temp.length > 0) {
					result.push(_temp.splice(~~(Math.random() * _temp.length), 1)[0]);
				}
				return result;
			} else if (typeof item === "string") {
				const _temp = item.split("");
				let result = "";
				while (_temp.length > 0) {
					result += _temp.splice(~~(Math.random() * _temp.length), 1)[0];
				}
				return result;
			}
			return null;
		},
		"pick": function (item, searchAllDimensions = true) {
			if (typeof item === "string") {
				return item[~~(Math.random() * item.length)];
			} else if (Array.isArray(item)) {
				if (searchAllDimensions) {
					item = item.flat(Infinity);
				}
				return item[~~(Math.random() * item.length)];
			}
			return null;
		}
	};
})();
console.log("Loaded Randomiser.js by Matthew James");
