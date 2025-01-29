"use strict";

const Tokeniser = (function () {
	const numberRegex = /-?(\d+\.d+|\.\d+|\d+)(\s?(e|E)(\+|-)?\d+)?/g;
	return Object.freeze({
		settings: Object.seal({
			operators: ["<", ">", "=", "+", "-", "*", "/", "?", "!"],
			separators: [",", ".", ";", ":", " ", "\t", "\n"],
			groupers: ["(", ")", "[", "]", "{", "}", '"', '"', "'", "'"],
			keepWhiteSpacesAsTokens: false,
			trimTokens: true
		}),
		isNumber: function (value) {
			if (typeof value === "number") {
				return true;
			} else if (typeof value === "string") {
				return numberRegex.test(value);
			}
			return false;
		},
		closeGrouper: function (grouper) {
			const idx = this.settings.groupers.indexOf(grouper);
			if (idx !== -1 && idx < this.settings.groupers.length - 1) {
				return this.settings.groupers[idx + 1];
			}
			return null;
		},
		tokenType: function (token) {
			if (this.settings.operators.includes(token)) {
				return "operator";
			} else if (this.settings.separators.includes(token)) {
				return "separator";
			} else if (this.settings.groupers.includes(token)) {
				return "grouper";
			}
			return "other";
		},
		parseString: function (str) {
			if (typeof str !== "string") {
				if (str === null || str === "null") {
					return "null";
				} else if (typeof str === "object") {
					str = JSON.stringify(str);
				} else {
					str = str.toString();
				}
			}
			let tokens = [], _tempToken = "";
			for (const char of str) {
				if (this.tokenType(_tempToken) !== this.tokenType(char) || this.tokenType(char) === "separator") {
					if (_tempToken.trim() !== "") {
						tokens.push(this.settings.trimTokens ? _tempToken.trim() : _tempToken);
					} else if (this.settings.keepWhiteSpacesAsTokens) {
						tokens.push(_tempToken);
					}
					_tempToken = char;
					if (this.tokenType(_tempToken) === "separator") {
						if (_tempToken.trim() !== "") {
							tokens.push(this.settings.trimTokens ? _tempToken.trim() : _tempToken);
						} else if (this.settings.keepWhiteSpacesAsTokens) {
							tokens.push(_tempToken);
						}
						_tempToken = "";
					}
				} else {
					_tempToken += char;
				}
			}
			if (_tempToken.trim() !== "") {
				tokens.push(this.settings.trimTokens ? _tempToken.trim() : _tempToken);
			} else if (this.settings.keepWhiteSpacesAsTokens) {
				tokens.push(_tempToken);
			}
			return tokens.filter((token) => token !== "");
		}
	});
})();
console.log("Loaded Tokeniser.js by Matthew James");
