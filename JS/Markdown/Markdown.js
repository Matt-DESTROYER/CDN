const Markdown = (function () {
	const settings = {
		"lua": {
			"keywords": ["and", "break", "do", "else", "elseif", "end", "for", "function", "if", "in", "local", "nil", "not", "or", "repeat", "return", "then", "until", "while"],
			"operators": ["<", ">", "=", "+", "-", "*", "/", "^", "%", "==", "~=", "<=", ">="],
			"groupers": []
		},
		"js": {
			"keywords": ["abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"],
			"operators": ["<", ">", "=", "+", "-", "*", "/", "?", "!", "**", "??", "~", "&", "&&", "^", "%", "==", "===", "|", "||", "|=", "&=", "^="],
			"groupers": ["`", "`", "/*", "*/"]
		}
	};
	const newlineRegexp = /\n/g;
	const whitespaceRegexp = /\s/g;
	const htmlRegexp = /<\/?[a-zA-Z]+?.*?>/g;
	const Tokeniser = (function () { const t = /-?\d+(\.\d+)?((e|E)(\+|-)?\d+)?/g; return { settings: { operators: ["<", ">", "=", "+", "-", "*", "/", "?", "!"], separators: [",", ".", ";", ":", " ", "\t", "\n"], groupers: ["(", ")", "[", "]", "{", "}", '"', '"', "'", "'"], keepWhiteSpacesAsTokens: !1, trimTokens: !0 }, isNumber: function (e) { return "number" == typeof e || "string" == typeof e && t.test(e) }, closeGrouper: function (t) { return this.settings.groupers.includes(t) ? this.settings.groupers[this.settings.groupers.indexOf(t) + 1] : null }, tokenType: function (t) { return this.settings.operators.includes(t) ? "operator" : this.settings.separators.includes(t) ? "separator" : this.settings.groupers.includes(t) ? "grouper" : "other" }, parseString: function (t) { if ("string" != typeof t) { if (null === t) return "null"; t = "object" == typeof t ? JSON.stringify(t) : t.toString() } let e = [], s = ""; for (let i = 0; i < t.length; i++)this.tokenType(t[i]) !== this.tokenType(s) || "separator" === this.tokenType(t[i]) ? ("" !== s.trim() ? e.push(this.settings.trimTokens ? s.trim() : s) : this.settings.keepWhiteSpacesAsTokens && e.push(s), s = t[i], "separator" === this.tokenType(s) && ("" !== s.trim() ? e.push(this.settings.trimTokens ? s.trim() : s) : this.settings.keepWhiteSpacesAsTokens && e.push(s), s = "")) : s += t[i]; return "" !== s.trim() ? e.push(this.settings.trimTokens ? s.trim() : s) : this.settings.keepWhiteSpacesAsTokens && e.push(s), e.filter(t => "" !== t) } } })(); console.log("Loaded Tokeniser.js by Matthew James");
	Tokeniser.settings.keepWhiteSpacesAsTokens = true;
	Tokeniser.settings.trimTokens = false;
	function codify(text, lang = null) {
		if (!lang) {
			lang = "js";
		} else {
			lang = lang.toLowerCase();
			if (lang === "python") {
				lang = "py";
			} else if (lang === "javascript") {
				lang = "js";
			} else if (lang === "c#" || lang === "csharp" || lang === "c-sharp") {
				lang = "cs";
			} else if (lang === "c++" || lang === "cplusplus" || lang === "c-plus-plus") {
				lang = "cpp";
			}
			if (!(lang in settings)) {
				lang = "js";
			}
		}
		Tokeniser.settings.operators = settings[lang].operators;
		Tokeniser.settings.groupers = settings[lang].groupers;
		const tokens = Tokeniser.parseString(text), variables = [];
		let result = "";
		for (let i = 0; i < tokens.length; i++) {
			switch (lang) {
				case "lua":
					if (tokens[i][0] === "-") {
						result += "<comment>";
						while (tokens[i].includes("\n")) {
							i++;
							result += tokens[i].includes("\n") ? tokens[i].substr(0, tokens[i].indexOf("\n")) + "</comment>" : tokens[i];
						}
						result += "\n" + codify(tokens[i].substr(tokens[i].indexOf("\n") + 1), lang);
					} else if (tokens[i].substr(0, 3) === "-[[") {
						result += "<comment>" + tokens[i];
						while (!tokens[i].includes("\n")) {
							i++;
							result += tokens[i].includes("\n") ? tokens[i].substr(0, tokens[i].indexOf("\n")) + "</comment>" : tokens[i];
						}
						result += "\n" + codify(tokens[i].substr(tokens[i].indexOf("\n") + 1), lang);
					} else if (tokens[i].includes("\"") || tokens[i].includes("'")) {
						let string;
						if (tokens[i].includes("\"")) {
							string = "\"";
						} else {
							string = "'";
						}
						for (let j = 0; j < tokens[i].length; i++) {
							if (tokens[i][j] !== string) {
								result += tokens[i];
							} else {
								i = j + 1;
								break;
							}
						}
						while (tokens[i](string[0]) && tokens[i - 1] !== "\\") {
							string += tokens[i];
							i++;
						}
						result += "<string>" + string + string[0] + "</string>";
					} else if (tokens[i] === "true" || tokens[i] === "false") {
						result += "<boolean>" + tokens[i] + "</boolean>";
					} else if (settings.lua.keywords.includes(tokens[i])) {
						result += "<keyword>" + tokens[i] + "</keyword>";
					} else if (Tokeniser.isNumber(tokens[i])) {
						result += "<number>" + tokens[i] + "</number>";
					} else if (variables.includes(tokens[i])) {
						result += "<variable>" + tokens[i] + "</variable>";
					} else {
						result += tokens[i];
					}
					break;
				case "js":
					if (tokens[i] === "/*") {
						result += "<comment>" + tokens[i];
						i++;
						while (tokens[i] !== "*/") {
							result += tokens[i];
							i++;
						}
						result += tokens[i] + "</comment>";
					} else if (tokens[i].substr(0, 2) === "//") {
						result += "<comment>" + tokens[i];
						while (!newLineRegexp.test(tokens[i])) {
							i++;
							result += tokens[i].includes("\n") ? tokens[i].substr(0, tokens[i].indexOf("\n")) + "</comment>" : tokens[i];
						}
						result += "\n" + codify(tokens[i].substr(tokens[i].indexOf("\n") + 1), lang);
					} else if (tokens[i] === "true" || tokens[i] === "false") {
						result += "<boolean>" + tokens[i] + "</boolean>";
					} else if (settings.js.keywords.includes(tokens[i])) {
						result += "<keyword>" + tokens[i] + "</keyword>";
						if (tokens[i] === "var" || tokens[i] === "let" || tokens[i] === "const") {
							while (i < tokens.length) {
								i++;
								if (i >= tokens.length) {
									break;
								}
								while (tokens[i].trim() === "") {
									if (i >= tokens.length) {
										break;
									}
									result += tokens[i];
									i++;
								}
								if (i >= tokens.length) {
									break;
								}
								variables.push(tokens[i]);
								result += "<variable>" + tokens[i] + "</variable>";
								i++;
								if (i >= tokens.length) {
									break;
								}
								while (tokens[i].trim() === "") {
									if (i >= tokens.length) {
										break;
									}
									result += tokens[i];
									i++;
								}
								if (i >= tokens.length) {
									break;
								}
								if (tokens[i] === "=") {
									result += "<operator>" + tokens[i] + "</operator>";
									i++;
									if (i >= tokens.length) {
										break;
									}
									while (tokens[i].trim() === "") {
										if (i >= tokens.length) {
											break;
										}
										result += tokens[i];
										i++;
									}
									if (i >= tokens.length) {
										break;
									}
									if (Tokeniser.tokenType(tokens[i]) === "grouper") {
										const grouper = tokens[i];
										let _tempCode = tokens[i];
										i++;
										if (i >= tokens.length) {
											break;
										}
										while (tokens[i] !== Tokeniser.closeGrouper(grouper)) {
											if (i >= tokens.length) {
												break;
											}
											_tempCode += tokens[i];
											i++;
										}
										if (i >= tokens.length) {
											break;
										}
										result += codify(_tempCode + tokens[i], lang);
									} else {
										result += codify(tokens[i], lang);
									}
									i++;
									if (i >= tokens.length) {
										break;
									}
									while (tokens[i].trim() === "") {
										if (i >= tokens.length) {
											break;
										}
										result += tokens[i];
										i++;
									}
									if (i >= tokens.length) {
										break;
									}
								}
								if (i >= tokens.length) {
									break;
								}
								if (tokens[i] === ",") {
									result += tokens[i];
								} else {
									i--;
									break;
								}
							}
						}
					} else if (Tokeniser.isNumber(tokens[i])) {
						result += "<number>" + tokens[i] + "</number>";
					} else if (tokens[i] === "\"" || tokens[i] === "'") {
						let string = tokens[i];
						i++;
						while (tokens[i] !== string[0] && tokens[i - 1] !== "\\") {
							string += tokens[i];
							i++;
						}
						result += "<string>" + string + string[0] + "</string>";
					} else if (variables.includes(tokens[i])) {
						result += "<variable>" + tokens[i] + "</variable>";
					} else {
						result += tokens[i];
					}
					break;
			}
		}
		return result;
	}
	return function (text) {
		text = text.replace(htmlRegexp, "");
		let result = "", idx;
		for (let i = 0; i < text.length; i++) {
			switch (text[i]) {
				case "*":
					idx = text.indexOf("*", i + 1);
					if (idx !== -1 && (text.indexOf("\n", i + 1) === -1 || text.indexOf("\n", i + 1) > idx)) {
						result += "<strong>" + text.substr(i + 1, idx - i - 1) + "</strong>";
						i = idx;
					} else {
						result += text[i];
					}
					break;
				case "_":
					idx = text.indexOf("_", i + 1);
					if (idx !== -1 && (text.indexOf("\n", i + 1) === -1 || text.indexOf("\n", i + 1) > idx)) {
						result += "<em>" + text.substr(i + 1, idx - i - 1) + "</em>";
						i = idx;
					} else {
						result += text[i];
					}
					break;
				case "`":
					if (text.substr(i, 3) === "```") {
						idx = text.indexOf("```", i + 1);
						if (idx !== -1) {
							let lang = "";
							for (i += 3; i < text.length; i++) {
								if (whitespaceRegexp.test(text[i])) {
									i++;
									break;
								}
								lang += text[i];
							}
							result += "<br><pre class=\"code\">" + codify(text.substr(i, idx - i), lang) + "</pre><br>";
							i = idx + 2;
						} else {
							result += text[i];
						}
					} else {
						idx = text.indexOf("`", i + 1);
						if (idx !== -1) {
							result += "<pre class=\"code\">" + text.substr(i + 1, idx - i - 1) + "</pre>";
							i = idx;
						} else {
							result += text[i];
						}
					}
					break;
				default:
					result += text[i];
					break;
			}
		}
		return result.replace(newlineRegexp, "<br>");
	};
})();
console.log("Loaded Markdown.js by Matthew James");
