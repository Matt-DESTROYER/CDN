"use strict";

const Test = (function () {
	const equals = function (a, b, caseSensitive = true) {
		if (a === null) {
			return b === null;
		} else if (a === undefined) {
			return b === undefined;
		} else if (isNaN(a)) {
			return isNaN(b);
		} else if (typeof a !== typeof b) {
			return false;
		} else if (Array.isArray(a)) {
			if (!Array.isArray(b)) {
				return false;
			}
			if (a.length !== b.length) {
				return false;
			}
			for (let i = 0; i < a.length; i++) {
				if (a[i] !== b[i]) {
					return false;
				}
			}
			return true;
		} else if (typeof a === "string" && !caseSensitive) {
			a = a.toLowerCase();
			b = b.toLowerCase();
		} else if (typeof a === "object") {
			if (Object.keys(a).length !== Object.keys(b).length) {
				return false;
			}
			for (const key in a) {
				if (Array.isArray(a[key]) && !equals(a[key], b[key])) {
					return false;
				} else if (typeof a[key] === "object" && !equals(a[key], b[key])) {
					return false;
				} else if (a[key] !== b[key]) {
					return false;
				}
			}
			return true;
		}
		return a === b;
	};
	const similar = function (a, b, threshold, caseSensitive = true) {
		if (typeof a !== typeof b) {
			return false;
		}
		if (Array.isArray(a)) {
			while (a.length < b.length) {
				a.push(undefined);
			}
			while (a.length > b.length) {
				b.push(undefined);
			}
			let same = 0,
				total = 0;
			a.forEach((x, i) => {
				if (equals(b[i], x)) {
					same++;
				} else if (b.includes(x)) {
					same += 0.25;
				}
				total++;
			});
			return same / total * 100 >= threshold;
		} else if (typeof a === "number") {
			return Math.max(a, b) - Math.min(a, b) > threshold;
		} else if (typeof a === "string") {
			if (!caseSensitive) {
				a = a.toLowerCase();
				b = b.toLowerCase();
			}
			while (a.length < b.length) {
				a += " ";
			}
			while (a.length > b.length) {
				b += " ";
			}
			let same = 0,
				total = 0;
			a.split("").forEach((x, i) => {
				if (b[i] === x) {
					same++;
				} else if (b.includes(x)) {
					same += 0.25;
				}
				total++;
			});
			return same / total * 100 >= threshold;
		} else if (typeof a === "object") {
			let same = 0,
				total = 0,
				keys = [];
			for (let key in a) {
				keys.push(key);
				if (b[key]) {
					if (a[key] === b[key]) {
						same++;
					}
				}
				total++;
			}
			for (let key in b) {
				if (!keys.includes(key)) {
					if (a[key]) {
						if (a[key] === b[key]) {
							same++;
						}
					}
					total++;
				}
			}
			return same / total * 100 >= threshold;
		}
		throw new TypeError("[Test.similar] Unexpected input type...");
	};
	const functionSpeed = function (func, tests, printStats = false) {
		let times = [],
			output = [],
			time, tempOutput;
		for (let i = 0; i < tests.length; i++) {
			time = Date.now();
			tempOutput = func(...tests[i]);
			times.push(Date.now() - time);
			output.push(tempOutput);
		}
		if (printStats) {
			for (let i = 0; i < times.length; i++) {
				console.log("Given the input " + tests[i].join(", ") + " the input function took " + times[i] / 1000 + " seconds and output " + output[i]);
			}
			console.log("Average speed: " + (times.reduce((a, b) => a + b) / times.length) / 1000 + " seconds");
		}
		return times;
	};
	return {
		"equals": equals,
		"similar": similar,
		"functionSpeed": functionSpeed
	};
})();
console.log("Loaded Test.js by Matthew James");
